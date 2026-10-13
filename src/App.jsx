import React, { useState, useEffect } from "react";
import {
  DEFAULT_PROFILE,
  DEFAULT_PROJECTS,
  DEFAULT_CERTIFICATES,
  DEFAULT_SKILLS,
  DEFAULT_ACTIVITY_LOGS,
} from "./data/portfolioData";

import CustomCursor from "./components/CustomCursor";
import IntroScreen from "./components/IntroScreen";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Certificates from "./components/Certificates";
import Timeline from "./components/Timeline";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

import { initializeApp } from "firebase/app";
import { getFirestore, doc, onSnapshot, setDoc, collection, addDoc } from "firebase/firestore";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  signInAnonymously,
} from "firebase/auth";
import { Sparkles, Check } from "lucide-react";

const firebaseConfig = {
  apiKey: "AIzaSyCBMHoaPc0aGZ4MV18zkDZd5c4-tWSRXl0",
  authDomain: "dhiraj-portfolio-09.firebaseapp.com",
  projectId: "dhiraj-portfolio-09",
  storageBucket: "dhiraj-portfolio-09.firebasestorage.app",
  messagingSenderId: "749904624186",
  appId: "1:749904624186:web:8738bf7931636d46481303",
  measurementId: "G-DN3GZZDHJV",
};

const isFirebaseConfigured = firebaseConfig.apiKey !== "YOUR_API_KEY";

let app, db, auth;
try {
  if (isFirebaseConfigured) {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    auth = getAuth(app);
  }
} catch (error) {
  console.error("Firebase initialization error:", error);
}

const ADMIN_EMAIL = "dhidna9090@gmail.com";
const APP_ID = "my_portfolio_v1";

const compressImage = (file, maxWidth = 650, quality = 0.6) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ratio = Math.min(maxWidth / img.width, 1);
        canvas.width = img.width * ratio;
        canvas.height = img.height * ratio;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  });
};

const getApproxSizeKB = (obj) => {
  try {
    return Math.round(new Blob([JSON.stringify(obj)]).size / 1024);
  } catch {
    return 0;
  }
};

export default function App() {
  const [profile, setProfile] = useState(DEFAULT_PROFILE);
  const [projects, setProjects] = useState(DEFAULT_PROJECTS);
  const [certificates, setCertificates] = useState(DEFAULT_CERTIFICATES);
  const [skillGroups, setSkillGroups] = useState(DEFAULT_SKILLS);
  const [activityLogs, setActivityLogs] = useState(DEFAULT_ACTIVITY_LOGS);

  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("top");
  const [editMode, setEditMode] = useState(false);

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showIntro, setShowIntro] = useState(() => {
    try {
      return !sessionStorage.getItem("portfolio_intro_seen");
    } catch {
      return true;
    }
  });
  const [toastMessage, setToastMessage] = useState("");
  const [sendingMsg, setSendingMsg] = useState(false);

  const isAdminUser = user && user.email === ADMIN_EMAIL;

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 4500);
  };

  // Scroll position & Progress tracking
  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 20);

      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setScrollProgress((winScroll / (height || 1)) * 100);

      // Active Section Spy
      const sections = ["top", "work", "skills", "certificates", "activity", "contact"];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 160 && rect.bottom >= 160) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Firebase Auth & Data sync
  useEffect(() => {
    if (!isFirebaseConfigured || !auth || !db) {
      setTimeout(() => setLoading(false), 300);
      return;
    }

    const unsubscribeAuth = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        if (currentUser.email && currentUser.email !== ADMIN_EMAIL) {
          showToast("Logged in as guest.");
          setEditMode(false);
        }
      } else {
        try {
          await signInAnonymously(auth);
        } catch (err) {
          // Anonymous login disabled, proceed in public read mode
        }
      }
    });

    const docRef = doc(db, "portfolios", APP_ID);
    const unsubscribeData = onSnapshot(
      docRef,
      (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.profile) setProfile(data.profile);
          if (data.projects) setProjects(data.projects);
          if (data.certificates) setCertificates(data.certificates);
          if (data.skillGroups) setSkillGroups(data.skillGroups);
          if (data.activityLogs) setActivityLogs(data.activityLogs);
        }
        setLoading(false);
      },
      (error) => {
        console.warn("Firestore data sync notice:", error);
        setLoading(false);
      }
    );

    return () => {
      unsubscribeAuth();
      unsubscribeData();
    };
  }, []);

  const saveAllData = async (turnOffEditMode = false) => {
    if (!isAdminUser) {
      showToast("Only the authenticated administrator can save modifications.");
      return;
    }

    if (!isFirebaseConfigured || !db) {
      showToast("Demo Mode: Changes updated locally (connect Firebase to persist).");
      if (turnOffEditMode) setEditMode(false);
      return;
    }

    const payload = { profile, projects, certificates, skillGroups, activityLogs };
    const sizeKB = getApproxSizeKB(payload);
    if (sizeKB > 900) {
      showToast(`Payload is large (${sizeKB}KB / 1024KB limit). Please optimize images.`);
      return;
    }

    try {
      showToast("Saving changes to Cloud Database...");
      const docRef = doc(db, "portfolios", APP_ID);
      await setDoc(docRef, { ...payload, lastUpdated: new Date().toISOString() }, { merge: true });
      showToast("All portfolio changes saved successfully!");
      if (turnOffEditMode) setEditMode(false);
    } catch (error) {
      showToast("Error saving data: " + error.message);
    }
  };

  const handleSendMessage = async (msgData, resetFormCallback) => {
    if (!msgData.name || !msgData.email || !msgData.message) {
      showToast("Please provide all required fields before sending.");
      return;
    }

    setSendingMsg(true);
    try {
      if (isFirebaseConfigured && db) {
        await addDoc(collection(db, "artifacts", APP_ID, "public", "data", "messages"), {
          name: msgData.name,
          email: msgData.email,
          message: msgData.message,
          timestamp: new Date().toISOString(),
        });
        showToast("Message transmitted successfully! I will reply shortly.");
      } else {
        showToast("Message processed locally (Demo mode). Thank you!");
      }
      resetFormCallback();
    } catch (err) {
      console.error(err);
      showToast("Message could not be saved. Please email me directly.");
    } finally {
      setSendingMsg(false);
    }
  };

  const handleGoogleLogin = async () => {
    if (!isFirebaseConfigured) {
      setUser({ email: ADMIN_EMAIL, uid: "mock-demo-id" });
      showToast("Demo Mode: Logged in as Admin.");
      return;
    }
    if (!auth) return showToast("Firebase authentication is not initialized.");
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
      showToast("Signed in successfully.");
    } catch (error) {
      showToast("Sign in failed: " + error.message);
    }
  };

  const handleLogout = async () => {
    if (!isFirebaseConfigured) {
      setUser(null);
      setEditMode(false);
      showToast("Logged out of Demo Mode.");
      return;
    }
    if (!auth) return;
    try {
      await signOut(auth);
      setEditMode(false);
      showToast("Logged out securely.");
    } catch (error) {}
  };

  const scrollToSection = (id) => {
    if (id === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleProjectImageUpload = async (index, e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const compressed = await compressImage(file, 800, 0.65);
    setProjects((prev) =>
      prev.map((p, idx) => (idx === index ? { ...p, image: compressed } : p))
    );
    showToast("Project visual attached.");
  };

  const handleCertImageUpload = async (index, e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const compressed = await compressImage(file, 600, 0.6);
    setCertificates((prev) =>
      prev.map((c, idx) => (idx === index ? { ...c, image: compressed } : c))
    );
    showToast("Certificate visual attached.");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#030508] text-[#F0C96E] font-mono text-xs tracking-widest relative overflow-hidden">
        <div className="glow-field" />
        <div className="relative w-16 h-16 mb-6">
          <div className="absolute inset-0 border-2 border-[#C9A84C]/20 rounded-full" />
          <div className="absolute inset-0 border-2 border-transparent border-t-[#F0C96E] border-r-[#C9A84C] rounded-full animate-spin" />
          <div className="absolute inset-2 border border-[#22D3EE]/30 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-[#F0C96E] animate-pulse" />
          </div>
        </div>
        <span className="uppercase tracking-[0.3em] text-[#475569] animate-pulse text-[10px]">
          Initializing Portfolio System...
        </span>
        <div className="mt-3 flex gap-1">
          {[0,1,2].map(i => (
            <span key={i} className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]/60 animate-bounce" style={{ animationDelay: `${i * 150}ms` }} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030508] text-[#EFF6FF] font-body relative overflow-x-hidden selection:bg-[#C9A84C]/25 selection:text-white">
      {/* Dynamic Cursor for Desktop */}
      <CustomCursor />

      {/* Deep space background — star field + nebula glows */}
      <div className="glow-field" />
      {/* Floating ambient orbs — CSS keyframes, zero JS overhead */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />
      {/* Film grain texture */}
      <div className="grain-overlay" />

      {/* Premium rainbow scroll progress bar */}
      <div
        className="scroll-progress"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Floating Toast Notification — premium glass pill */}
      <div
        className={`fixed top-20 left-1/2 -translate-x-1/2 z-[100] px-5 py-2.5 rounded-full font-mono text-xs tracking-wider border border-[#C9A84C]/50 bg-[#070B12]/90 backdrop-blur-2xl text-[#F0C96E] shadow-[0_8px_32px_rgba(0,0,0,0.5),0_0_20px_rgba(200,160,70,0.15)] transition-all duration-400 flex items-center gap-2.5 ${
          toastMessage
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-8 pointer-events-none"
        }`}
      >
        <Sparkles size={13} className="text-[#F0C96E]" />
        <span>{toastMessage}</span>
      </div>

      {/* Snappy, dismissible greeting intro */}
      {showIntro && <IntroScreen onComplete={() => setShowIntro(false)} />}

      {/* Sticky Navigation Header */}
      <Navbar
        profile={profile}
        scrolled={scrolled}
        activeSection={activeSection}
        onNavigate={scrollToSection}
        isAdminUser={isAdminUser}
        editMode={editMode}
        onToggleEditMode={() => {
          if (editMode) {
            saveAllData(true);
          } else {
            setEditMode(true);
          }
        }}
      />

      {/* Admin Floating Editing Control Bar — premium */}
      {editMode && isAdminUser && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#070B12]/95 border border-[#C9A84C]/60 px-6 py-3 rounded-2xl shadow-[0_0_40px_rgba(200,160,70,0.2),0_20px_60px_rgba(0,0,0,0.6)] backdrop-blur-2xl flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="status-dot" />
            <span className="font-mono text-xs uppercase tracking-wider text-[#F0C96E] font-semibold">
              Live CMS Active
            </span>
          </div>

          <div className="h-4 w-px bg-white/10" />

          <button
            onClick={() => saveAllData(false)}
            className="btn-gold font-mono text-xs uppercase tracking-wider px-4 py-1.5 rounded-lg flex items-center gap-1.5 cursor-pointer"
          >
            <Check size={13} />
            <span>Save Now</span>
          </button>

          <button
            onClick={() => setEditMode(false)}
            className="font-mono text-xs uppercase tracking-wider text-[#475569] hover:text-[#94A3B8] transition-colors cursor-pointer"
          >
            Exit
          </button>
        </div>
      )}

      {/* Main Page Content Wrapper */}
      <main className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 relative z-10">
        <Hero
          profile={profile}
          setProfile={setProfile}
          editMode={editMode}
          onNavigate={scrollToSection}
        />

        <Projects
          projects={projects}
          setProjects={setProjects}
          editMode={editMode}
          onImageUpload={handleProjectImageUpload}
        />

        <Skills
          skillGroups={skillGroups}
          setSkillGroups={setSkillGroups}
          editMode={editMode}
        />

        <Certificates
          certificates={certificates}
          setCertificates={setCertificates}
          editMode={editMode}
          onImageUpload={handleCertImageUpload}
        />

        <Timeline
          activityLogs={activityLogs}
          setActivityLogs={setActivityLogs}
          editMode={editMode}
        />

        <Contact
          profile={profile}
          setProfile={setProfile}
          editMode={editMode}
          onSubmitMessage={handleSendMessage}
          sendingMsg={sendingMsg}
          showToast={showToast}
        />
      </main>

      {/* Footer */}
      <Footer
        profile={profile}
        user={user}
        onLogin={handleGoogleLogin}
        onLogout={handleLogout}
        onScrollToTop={() => scrollToSection("top")}
      />
    </div>
  );
}
