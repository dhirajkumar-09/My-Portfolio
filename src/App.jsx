import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  ArrowUpRight,
  Mail,
  Upload,
  ArrowUp,
  Sparkles,
  BadgeCheck,
  Pencil,
  Check,
  Trash2,
  Plus,
  X,
  Image as ImageIcon,
  LogIn,
  LogOut,
  Link as LinkIcon,
  PlayCircle,
  ExternalLink,
  Code2,
  Activity,
  Calendar,
  ShieldCheck,
  Send,
  MessageSquare
} from "lucide-react";

import { initializeApp } from "firebase/app";
import { getFirestore, doc, onSnapshot, setDoc, collection, addDoc } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, signInAnonymously } from "firebase/auth";

const LinkedinIcon = ({ size = 14, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const Github = ({ size = 14, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.333-1.755-1.333-1.755-1.089-.744.083-.729.083-.729 1.205.084 1.84 1.237 1.84 1.237 1.07 1.834 2.809 1.304 3.495.997.108-.775.418-1.305.762-1.605-2.665-.303-5.467-1.332-5.467-5.93 0-1.31.468-2.38 1.235-3.22-.123-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.241 2.873.118 3.176.77.84 1.235 1.91 1.235 3.22 0 4.61-2.807 5.625-5.479 5.921.43.372.823 1.102.823 2.222 0 1.606-.015 2.898-.015 3.293 0 .322.216.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
  </svg>
);

const firebaseConfig = {
  apiKey: "AIzaSyCBMHoaPc0aGZ4MV18zkDZd5c4-tWSRXl0",
  authDomain: "dhiraj-portfolio-09.firebaseapp.com",
  projectId: "dhiraj-portfolio-09",
  storageBucket: "dhiraj-portfolio-09.firebasestorage.app",
  messagingSenderId: "749904624186",
  appId: "1:749904624186:web:8738bf7931636d46481303",
  measurementId: "G-DN3GZZDHJV"
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

const DEFAULT_PROFILE = {
  name: "Dhiraj Kumar",
  role: "Full-Stack Engineer",
  focus: "Systems · Interfaces · Infrastructure",
  headline: "Crafting digital experiences,",
  headlineAccent: "rooted in purpose.",
  intro: "Six years designing and shipping products end to end — merging technical precision with elegant design. Selected work, credentials, and how to reach me, below.",
  email: "dhidna9090@gmail.com",
  linkedin: "https://www.linkedin.com/in/dhiraj-kumar-01b185350",
  github: "https://github.com/dhirajkumar-09",
  stats: [
    { k: "Years experience", v: "06" },
    { k: "Projects shipped", v: "24" },
    { k: "Certifications", v: "09" },
  ],
};

const DEFAULT_PROJECTS = [
  {
    title: "Ledgerline",
    subtitle: "Expense Automation Platform",
    desc: "A reconciliation engine that ingests bank feeds and receipts, then auto-categorizes spend for small teams. Cut manual bookkeeping time by 70% for pilot customers.",
    stack: ["React", "Node.js", "PostgreSQL", "AWS Lambda"],
    live: "#",
    source: "#",
    linkedin: "#",
    image: null,
    video: "",
  }
];

const DEFAULT_CERTIFICATES = [
  { 
    seal: "AWS", 
    title: "AWS Certified Solutions Architect", 
    issuer: "Amazon Web Services", 
    date: "2025",
    desc: "Architecting secure, highly available, and scalable systems on AWS.",
    verifyUrl: "https://aws.amazon.com/verification",
    image: null
  }
];

const DEFAULT_SKILLS = [
  { label: "Languages", items: ["TypeScript", "Python", "Go", "SQL", "Rust"] },
  { label: "Frameworks & Platforms", items: ["React", "Next.js", "Node.js", "Docker", "Kubernetes"] },
];

const DEFAULT_ACTIVITY_LOGS = [
  { date: "August 2026", title: "Portfolio V2 Launched", desc: "Designed and engineered a new portfolio with React, Firebase real-time CMS, and custom animations." },
  { date: "July 2026", title: "Ledgerline Beta Release", desc: "Successfully onboarded the first pilot users to the expense automation platform." },
  { date: "March 2026", title: "AWS Certification", desc: "Earned the AWS Certified Solutions Architect credential." }
];

const NAV = [
  { id: "work", label: "Work" },
  { id: "certificates", label: "Certificates" },
  { id: "skills", label: "Toolkit" },
  { id: "activity", label: "Timeline" },
  { id: "contact", label: "Contact" },
];

const emptyProject = () => ({ title: "New Project", subtitle: "Short subtitle", desc: "Describe what it does and the impact it had.", stack: ["Tech"], live: "#", source: "#", linkedin: "#", image: null, video: "" });
const emptyCert = () => ({ seal: "NEW", title: "Certificate name", issuer: "Issuing organization", date: "2026", desc: "Brief description of the certification.", verifyUrl: "#", image: null });
const emptyLog = () => ({ date: "New Date", title: "New Milestone", desc: "Describe what happened." });

const compressImage = (file, maxWidth = 800, quality = 0.6) => {
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

const GREETINGS = [
  "Hello", 
  "नमस्ते", 
  "Hola", 
  "Bonjour", 
  "Ciao", 
  "Welcome",
  "DHIRAJ KUMAR"
];

// Transformed Terminal into a sleek light-mode variant
const AnimatedTerminal = () => {
  const [step, setStep] = useState(0);
  const [cmd1, setCmd1] = useState("");
  const [cmd2, setCmd2] = useState("");
  const [cmd3, setCmd3] = useState("");

  useEffect(() => {
    let t1 = "whoami";
    let i1 = 0;
    let int1;

    const startDelay = setTimeout(() => {
      int1 = setInterval(() => {
        setCmd1(t1.slice(0, i1 + 1));
        i1++;

        if (i1 === t1.length) {
          clearInterval(int1);
          setTimeout(() => setStep(1), 600);
        }
      }, 120);
    }, 1200);

    return () => {
      clearTimeout(startDelay);
      clearInterval(int1);
    };
  }, []);

  useEffect(() => {
    if (step >= 1) {
      let t2 = "cat profile.json";
      let i2 = 0;

      let int2 = setInterval(() => {
        setCmd2(t2.slice(0, i2 + 1));
        i2++;

        if (i2 === t2.length) {
          clearInterval(int2);
          setTimeout(() => setStep(2), 600);
        }
      }, 100);

      return () => clearInterval(int2);
    }
  }, [step]);

  useEffect(() => {
    if (step >= 2) {
      let t3 = "./run --build port";
      let i3 = 0;

      let int3 = setInterval(() => {
        setCmd3(t3.slice(0, i3 + 1));
        i3++;

        if (i3 === t3.length) {
          clearInterval(int3);

          setTimeout(() => setStep(3), 800);
          setTimeout(() => setStep(4), 1500);
          setTimeout(() => setStep(5), 2200);
          setTimeout(() => setStep(6), 2900);
          setTimeout(() => setStep(7), 3600);
          setTimeout(() => setStep(8), 4300);
        }
      }, 80);

      return () => clearInterval(int3);
    }
  }, [step]);

  return (
    <div className="w-full max-w-[450px] ml-auto rounded-2xl overflow-hidden border border-[var(--border)] bg-[var(--panel)] shadow-xl font-mono text-[12px] md:text-[13px] text-left hover-float">
      {/* Top Window Bar - Light Theme */}
      <div className="flex items-center px-4 py-3 bg-[var(--bg)] border-b border-[var(--border)]">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-[#FF5F56] border border-black/10"></div>
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-black/10"></div>
          <div className="w-3 h-3 rounded-full bg-[#27C93F] border border-black/10"></div>
        </div>
        <div className="flex-1 text-center text-[var(--text-faint)] text-xs font-semibold">
          dhiraj@portfolio:~
        </div>
      </div>

      {/* Terminal Body */}
      <div className="p-5 md:p-6 space-y-4 text-[var(--text-dim)] leading-relaxed">
        <div>
          <span className="text-[var(--gold)] font-semibold">dhiraj@local</span>
          <span className="text-[var(--text-faint)]">:~</span>$ {cmd1}
          {step === 0 && <span className="w-2 h-4 bg-[var(--text-dim)] ml-1 inline-block animate-pulse align-middle"></span>}
          {step >= 1 && <div className="mt-1 text-[var(--text)] font-semibold">dhiraj-kumar</div>}
        </div>

        {step >= 1 && (
          <div>
            <span className="text-[var(--gold)] font-semibold">dhiraj@local</span>
            <span className="text-[var(--text-faint)]">:~</span>$ {cmd2}
            {step === 1 && <span className="w-2 h-4 bg-[var(--text-dim)] ml-1 inline-block animate-pulse align-middle"></span>}
            {step >= 2 && (
              <div className="mt-1 text-[var(--text-dim)]">
                {"{"}
                <div className="pl-4">
                  <span className="text-[var(--gold-bright)]">"user"</span>:{" "}
                  <span className="text-[var(--text)]">"Dhiraj"</span>,
                </div>
                <div className="pl-4">
                  <span className="text-[var(--gold-bright)]">"role"</span>:{" "}
                  <span className="text-[var(--text)]">"Full-Stack Engineer"</span>,
                </div>
                <div className="pl-4">
                  <span className="text-[var(--gold-bright)]">"focus"</span>: [
                  <span className="text-[var(--text)]">"Systems"</span>,{" "}
                  <span className="text-[var(--text)]">"Interfaces"</span>],
                </div>
                <div className="pl-4">
                  <span className="text-[var(--gold-bright)]">"status"</span>:{" "}
                  <span className="text-[var(--text)]">"Building digital experiences"</span>
                </div>
                {"}"}
              </div>
            )}
          </div>
        )}

        {step >= 2 && (
          <div>
            <span className="text-[var(--gold)] font-semibold">dhiraj@local</span>
            <span className="text-[var(--text-faint)]">:~</span>$ {cmd3}
            {step === 2 && <span className="w-2 h-4 bg-[var(--text-dim)] ml-1 inline-block animate-pulse align-middle"></span>}
            {step >= 3 && <div className="mt-1 text-green-700">✓ System diagnostics passed</div>}
            {step >= 4 && <div className="text-green-700">✓ Portfolio dashboard rendered</div>}
            {step >= 5 && <div className="text-green-700">✓ Projects loaded successfully</div>}
            {step >= 6 && <div className="text-green-700">✓ Credentials verified</div>}
            {step >= 7 && <div className="text-green-700 font-semibold mt-2">✓ Ready for connection.</div>}
          </div>
        )}

        {step >= 8 && (
          <div className="pt-2">
            <span className="text-[var(--gold)] font-semibold">dhiraj@local</span>
            <span className="text-[var(--text-faint)]">:~</span>${" "}
            <span className="w-2 h-4 bg-[var(--text)] ml-1 inline-block animate-pulse align-middle"></span>
          </div>
        )}
      </div>
    </div>
  );
};

const IntroScreen = React.memo(({ onComplete }) => {
  const [index, setIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    let timeout;
    if (isExiting) return;

    if (index < GREETINGS.length - 1) {
      timeout = setTimeout(() => {
        setIndex((prev) => prev + 1);
      }, 400); 
    } else {
      timeout = setTimeout(() => {
        setIsExiting(true);
        setTimeout(onComplete, 1200); 
      }, 1500); 
    }
    return () => clearTimeout(timeout);
  }, [index, isExiting, onComplete]);

  const isFinalName = index === GREETINGS.length - 1;

  return (
    <div
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[var(--bg)] transition-all duration-[1200ms] ease-[cubic-bezier(0.76,0,0.24,1)] ${
        isExiting ? "-translate-y-full opacity-90 shadow-2xl" : "translate-y-0 opacity-100"
      }`}
    >
      <div className="flex items-center gap-4 md:gap-6 text-[var(--text)] font-display text-4xl md:text-5xl lg:text-7xl relative z-10 transition-transform duration-500">
        {!isFinalName && <span className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[var(--gold)] animate-pulse" />}
        <h2 className={isFinalName ? "final-intro-text tracking-tight font-medium" : "animate-intro-text font-light"}>
          {GREETINGS[index]}
        </h2>
      </div>
    </div>
  );
});

const CustomCursor = () => {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [delayedMousePos, setDelayedMousePos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const mousePosRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY };
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    
    let animationFrameId;
    const render = () => {
      setDelayedMousePos((prev) => {
        const dx = mousePosRef.current.x - prev.x;
        const dy = mousePosRef.current.y - prev.y;
        return { x: prev.x + dx * 0.2, y: prev.y + dy * 0.2 };
      });
      animationFrameId = requestAnimationFrame(render);
    };
    render();

    const handleMouseOver = (e) => {
      const target = e.target;
      if (target.tagName?.toLowerCase() === 'button' || target.tagName?.toLowerCase() === 'a' || target.closest?.('button') || target.closest?.('a')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };
    window.addEventListener("mouseover", handleMouseOver);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      <div 
        className="fixed top-0 left-0 w-2.5 h-2.5 bg-[var(--text)] rounded-full pointer-events-none z-[9999]"
        style={{ transform: `translate3d(${mousePos.x - 5}px, ${mousePos.y - 5}px, 0) scale(${isHovering ? 0 : 1})`, transition: 'transform 0.15s ease-out' }}
      />
      <div 
        className="fixed top-0 left-0 w-12 h-12 border border-[var(--gold)] rounded-full pointer-events-none z-[9998] flex items-center justify-center backdrop-blur-[1px]"
        style={{ 
          transform: `translate3d(${delayedMousePos.x - 24}px, ${delayedMousePos.y - 24}px, 0) scale(${isHovering ? 1.4 : 1})`, 
          backgroundColor: isHovering ? 'rgba(182, 141, 86, 0.08)' : 'transparent',
          transition: 'transform 0.1s linear, background-color 0.3s ease, border-color 0.3s ease'
        }}
      >
      </div>
    </>
  );
};

export default function Portfolio() {
  const [profile, setProfile] = useState(DEFAULT_PROFILE);
  const [projects, setProjects] = useState(DEFAULT_PROJECTS);
  const [certificates, setCertificates] = useState(DEFAULT_CERTIFICATES);
  const [skillGroups, setSkillGroups] = useState(DEFAULT_SKILLS);
  const [activityLogs, setActivityLogs] = useState(DEFAULT_ACTIVITY_LOGS);

  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [editMode, setEditMode] = useState(false);
  
  const [msgForm, setMsgForm] = useState({ name: "", email: "", message: "" });
  const [sendingMsg, setSendingMsg] = useState(false);
  
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showIntro, setShowIntro] = useState(true);
  const [toastMessage, setToastMessage] = useState("");

  const isAdminUser = user && user.email === ADMIN_EMAIL;

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setScrollProgress((winScroll / height) * 100);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const forceBlurBeforeClick = (e) => {
      const active = document.activeElement;
      if (
        active &&
        active !== e.target &&
        active.getAttribute &&
        active.getAttribute("contenteditable") === "true" &&
        !active.contains(e.target)
      ) {
        active.blur();
      }
    };
    document.addEventListener("mousedown", forceBlurBeforeClick, true);
    return () => document.removeEventListener("mousedown", forceBlurBeforeClick, true);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    
    if (!loading && !showIntro) {
      setTimeout(() => {
        document.querySelectorAll(".reveal-up, .reveal-scale, .reveal-left, .reveal-right, .reveal-rotate").forEach((el) => observer.observe(el));
      }, 300);
    }
    
    return () => observer.disconnect();
  }, [projects.length, certificates.length, loading, showIntro]);

  useEffect(() => {
    if (!isFirebaseConfigured) {
      setTimeout(() => setLoading(false), 500); 
      return;
    }

    if (!auth || !db) {
      setLoading(false);
      return;
    }

    const unsubscribeAuth = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        if (currentUser.email && currentUser.email !== ADMIN_EMAIL) {
          showToast("Logged in, but you don't have admin editing rights.");
          setEditMode(false);
        }
      } else {
        try {
          await signInAnonymously(auth);
        } catch (error) {
          console.warn("Anonymous sign-in skipped or failed.");
        }
      }
    });

    const safetyTimer = setTimeout(() => {
      setLoading((prev) => (prev ? false : prev));
    }, 4000);

    const docRef = doc(db, 'portfolios', APP_ID);
    const unsubscribeData = onSnapshot(docRef, (docSnap) => {
      clearTimeout(safetyTimer);
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.profile) setProfile(data.profile);
        if (data.projects) setProjects(data.projects);
        if (data.certificates) setCertificates(data.certificates);
        if (data.skillGroups) setSkillGroups(data.skillGroups);
        if (data.activityLogs) setActivityLogs(data.activityLogs);
      }
      setLoading(false);
    }, (error) => {
      clearTimeout(safetyTimer);
      setLoading(false);
    });

    return () => {
      clearTimeout(safetyTimer);
      unsubscribeAuth();
      unsubscribeData();
    };
  }, []);

  const saveAllData = async (turnOffEditMode = false) => {
    if (!isAdminUser) {
      showToast("Only the admin can save changes.");
      return;
    }
    
    if (!isFirebaseConfigured) {
      showToast("Mock Save: Data will not persist. Add Firebase credentials!");
      if (turnOffEditMode) setEditMode(false);
      return;
    }

    const payload = { profile, projects, certificates, skillGroups, activityLogs };
    const sizeKB = getApproxSizeKB(payload);
    if (sizeKB > 900) {
      showToast(`Data too large (${sizeKB}KB / 1024KB limit). Remove images.`);
      return;
    }

    try {
      showToast("Saving changes...");
      const docRef = doc(db, 'portfolios', APP_ID);
      await setDoc(docRef, { ...payload, lastUpdated: new Date().toISOString() }, { merge: true });
      showToast("Changes saved successfully!");
      if (turnOffEditMode) setEditMode(false);
    } catch (error) {
      showToast("Error saving data. " + error.message);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!msgForm.name || !msgForm.email || !msgForm.message) {
      showToast("Please fill in all fields before sending.");
      return;
    }
    
    setSendingMsg(true);
    try {
      if (isFirebaseConfigured && db) {
        await addDoc(collection(db, 'artifacts', APP_ID, 'public', 'data', 'messages'), {
          name: msgForm.name,
          email: msgForm.email,
          message: msgForm.message,
          timestamp: new Date().toISOString()
        });
        showToast("Message sent successfully!");
      } else {
        showToast("Demo Mode: Message processed locally.");
      }
      setMsgForm({ name: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
      showToast("Error sending message.");
    } finally {
      setSendingMsg(false);
    }
  };

  const handleGoogleLogin = async () => {
    if (!isFirebaseConfigured) {
      showToast("Demo Mode: Logging in as Admin (Fake)");
      setUser({ email: ADMIN_EMAIL, uid: "mock-demo-id" });
      return;
    }
    if (!auth) return showToast("Firebase not initialized.");
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
    } catch (error) {
      showToast("Login failed: " + error.message);
    }
  };

  const handleLogout = async () => {
    if (!isFirebaseConfigured) {
      setUser(null); setEditMode(false);
      showToast("Logged out from Demo Mode.");
      return;
    }
    if (!auth) return;
    try {
      await signOut(auth); setEditMode(false);
      showToast("Logged out successfully.");
    } catch (error) {}
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 5000);
  };

  const goTo = (id) => (e) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleCertImageChange = async (i, e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const compressedImage = await compressImage(file);
    updateCert(i, { image: compressedImage });
  };

  const handleProjectImageChange = async (i, e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const compressedImage = await compressImage(file, 800, 0.7);
    updateProject(i, { image: compressedImage });
  };

  // Simplified Mouse Move handler for softer, elegant hover
  const handleCardMouseMove = (e) => {
    const { currentTarget: target } = e;
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    target.style.setProperty("--mouse-x", `${x}px`);
    target.style.setProperty("--mouse-y", `${y}px`);
  };

  const handleIntroComplete = useCallback(() => {
    setShowIntro(false);
  }, []);

  const initials = profile.name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();

  const Editable = ({ value, onChange, tag: Tag = "span", className = "", style = {}, placeholder = "" }) => (
    <Tag
      contentEditable={editMode}
      suppressContentEditableWarning
      onBlur={(e) => onChange(e.currentTarget.textContent.trim() || placeholder)}
      className={className}
      style={{
        ...style,
        outline: "none",
        borderRadius: 4,
        ...(editMode ? { background: "rgba(182,141,86,0.1)", boxShadow: "0 0 0 1px rgba(182,141,86,0.4)", cursor: "text", padding: "1px 4px", margin: "-1px -4px", transition: "all 0.2s" } : {}),
      }}
    >
      {value}
    </Tag>
  );

  const TagEditor = ({ items, onChange }) => {
    const [draft, setDraft] = useState("");
    return (
      <div className="flex flex-wrap gap-2 items-center">
        {items.map((tag, i) => (
          <span key={i} className="tag-pill group relative font-mono text-[11px] uppercase tracking-wide px-4 py-1.5 rounded-full inline-flex items-center gap-1.5 overflow-hidden">
            <span className="relative z-10">{tag}</span>
            {editMode && (
              <button onClick={() => onChange(items.filter((_, idx) => idx !== i))} className="relative z-10 opacity-70 hover:opacity-100 hover:text-red-500 ml-1 transition-colors">
                <X size={12} />
              </button>
            )}
            <div className="absolute inset-0 bg-black/5 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 z-0"></div>
          </span>
        ))}
        {editMode && (
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && draft.trim()) {
                onChange([...items, draft.trim()]);
                setDraft("");
              }
            }}
            placeholder="+ add, Enter"
            className="font-mono text-[11px] uppercase tracking-wide px-3 py-1.5 rounded-full bg-transparent transition-colors focus:border-[var(--gold)]"
            style={{ border: "1px dashed var(--border)", color: "var(--text-dim)", width: 110, outline: "none" }}
          />
        )}
      </div>
    );
  };

  const updateProject = (i, patch) => setProjects((prev) => prev.map((p, idx) => (idx === i ? { ...p, ...patch } : p)));
  const updateCert = (i, patch) => setCertificates((prev) => prev.map((c, idx) => (idx === i ? { ...c, ...patch } : c)));
  const updateLog = (i, patch) => setActivityLogs((prev) => prev.map((l, idx) => (idx === i ? { ...l, ...patch } : l)));

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FDFBF7] text-[#2C2A25] font-mono text-sm tracking-widest relative overflow-hidden">
        <div className="z-10 flex flex-col items-center gap-6">
          <div className="w-12 h-12 border-t-2 border-l-2 border-[#B68D56] rounded-full animate-spin"></div>
          <span className="uppercase tracking-[0.2em] animate-pulse">Initializing...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="font-body selection:bg-[#B68D56]/20 selection:text-[var(--text)]" style={{ background: "var(--bg)", color: "var(--text)", minHeight: "100vh", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;1,9..144,300;1,9..144,400&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500;600&display=swap');

        :root{
          --bg: #FDFBF7; 
          --panel: #FFFFFF; 
          --panel-strong: #F5F2EB;
          --border: #E8E2D6; 
          --border-soft: #F0EBE1;
          --gold: #B68D56; 
          --gold-bright: #D4AF79;
          --text: #2C2824; 
          --text-dim: #635E56; 
          --text-faint: #969188;
        }
        
        .font-display{ font-family: 'Fraunces', serif; }
        .font-body{ font-family: 'Inter', sans-serif; }
        .font-mono{ font-family: 'JetBrains Mono', monospace; }
        .font-cursive{ font-family: 'Fraunces', serif; font-style: italic; font-weight: 300; }

        section[id]{ scroll-margin-top: 120px; }
        html{ scroll-behavior: smooth; cursor: none; }

        .glow-field { 
          background: 
            radial-gradient(800px circle at 85% 10%, rgba(182, 141, 86, 0.05), transparent 60%), 
            radial-gradient(1000px circle at 10% 90%, rgba(212, 175, 121, 0.04), transparent 50%);
          filter: blur(50px);
          animation: ambient-shift 25s ease-in-out infinite alternate;
        }
        
        .grain { 
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.35'/%3E%3C/svg%3E"); 
          opacity: 0.12; mix-blend-mode: multiply; pointer-events: none;
        }

        @keyframes ambient-shift {
          0% { transform: scale(1) translate(0,0); }
          50% { transform: scale(1.05) translate(-1%, 1%); }
          100% { transform: scale(1) translate(1%, -1%); }
        }

        @keyframes intro-text {
          0% { opacity: 0; transform: translateY(20px); filter: blur(5px); }
          20% { opacity: 1; transform: translateY(0); filter: blur(0); }
          80% { opacity: 1; transform: translateY(0); filter: blur(0); }
          100% { opacity: 0; transform: translateY(-20px); filter: blur(5px); }
        }
        .animate-intro-text {
          animation: intro-text 0.4s cubic-bezier(0.22, 1, 0.36, 1) infinite;
        }

        .final-intro-text {
          animation: intro-final-pop 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        @keyframes intro-final-pop {
          0% { opacity: 0; transform: translateY(20px); filter: blur(8px); }
          100% { opacity: 1; transform: translateY(0); filter: blur(0); }
        }

        .editorial-card {
          position: relative;
          background: var(--panel);
          border: 1px solid var(--border);
          border-radius: 1.5rem;
          overflow: hidden;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.6s ease;
        }
        
        .editorial-card::before {
          content: "";
          position: absolute;
          inset: 0;
          opacity: 0;
          transition: opacity 0.4s ease;
          background: radial-gradient(
            800px circle at var(--mouse-x, 0) var(--mouse-y, 0),
            rgba(182, 141, 86, 0.05),
            transparent 40%
          );
          z-index: 0;
          pointer-events: none;
        }
        
        .editorial-card:hover { 
          transform: translateY(-8px);
          box-shadow: 0 25px 50px -12px rgba(44,40,36,0.06), 0 0 15px rgba(182,141,86,0.05);
        }
        .editorial-card:hover::before { opacity: 1; }
        
        .editorial-content { position: relative; z-index: 1; }

        .btn-gold{ 
          background: var(--text); 
          color: var(--bg); 
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1); 
          cursor: none; border: none; 
          position: relative; overflow: hidden;
        }
        .btn-gold::after {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(rgba(255,255,255,0), rgba(255,255,255,0.1), rgba(255,255,255,0));
          transform: translateY(-100%); transition: transform 0.6s;
        }
        .btn-gold:hover::after { transform: translateY(100%); }
        .btn-gold:hover{ transform: translateY(-3px) scale(1.02); box-shadow: 0 15px 30px rgba(44,40,36,0.15); background: var(--gold); }
        
        .btn-outline{ 
          border: 1px solid var(--border); color: var(--text); 
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1); 
          cursor: none; background: transparent; 
        }
        .btn-outline:hover{ 
          border-color: var(--gold); 
          background: rgba(182,141,86,0.05); 
          transform: translateY(-3px); 
          color: var(--gold);
        }

        .tag-pill{ border: 1px solid var(--border); color: var(--text-dim); transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
        .tag-pill:hover{ border-color: var(--gold); color: var(--gold); transform: translateY(-2px); }

        .reveal-up { opacity: 0; transform: translateY(50px); transition: all 1.2s cubic-bezier(0.22, 1, 0.36, 1); }
        .reveal-up.is-visible { opacity: 1; transform: translateY(0); }
        
        .reveal-scale { opacity: 0; transform: scale(0.9) translateY(30px); transition: all 1.2s cubic-bezier(0.22, 1, 0.36, 1); }
        .reveal-scale.is-visible { opacity: 1; transform: scale(1) translateY(0); }

        .reveal-left { opacity: 0; transform: translateX(-40px); transition: all 1.2s cubic-bezier(0.22, 1, 0.36, 1); }
        .reveal-left.is-visible { opacity: 1; transform: translateX(0); }
        
        .reveal-right { opacity: 0; transform: translateX(40px); transition: all 1.2s cubic-bezier(0.22, 1, 0.36, 1); }
        .reveal-right.is-visible { opacity: 1; transform: translateX(0); }

        .hover-float { transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1); animation: floating 6s ease-in-out infinite; }
        .hover-float:hover { animation-play-state: paused; transform: translateY(-8px); }

        @keyframes floating {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        .nav-link{ position:relative; color:var(--text-dim); transition:color .3s ease; cursor:none; background:none; border:none; }
        .nav-link:hover{ color:var(--text); }
        .nav-link::after{ 
          content:""; position:absolute; left:0; bottom:-4px; height:1px; width:0%; 
          background:var(--gold); transition:width .4s cubic-bezier(0.16, 1, 0.3, 1); 
        }
        .nav-link:hover::after{ width:100%; }

        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: var(--bg); }
        ::-webkit-scrollbar-thumb { background: var(--border); border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: var(--gold); }

        .proj-num{ color: var(--border-soft); transition: color 0.5s ease; }
        .editorial-card:hover .proj-num { color: rgba(182,141,86,0.15); }
      `}</style>

      <CustomCursor />

      {/* Scroll Progress Indicator */}
      <div className="fixed top-0 left-0 h-[3px] bg-[var(--gold)] z-[100] transition-all duration-150" style={{ width: `${scrollProgress}%` }} />

      <div className={`fixed top-24 left-1/2 -translate-x-1/2 z-[100] px-5 py-2.5 rounded-full font-mono text-xs tracking-wider border border-[var(--border)] transition-all duration-500 flex items-center gap-2 ${toastMessage ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8 pointer-events-none'}`} 
           style={{ background: "var(--panel)", color: "var(--text)", boxShadow: "0 10px 30px rgba(44,40,36,0.1)" }}>
        <Sparkles size={14} className="text-[var(--gold)]" /> {toastMessage}
      </div>

      <div className="fixed inset-0 pointer-events-none glow-field z-0" />
      <div className="fixed inset-0 pointer-events-none grain z-0" />

      {showIntro && (
        <IntroScreen onComplete={handleIntroComplete} />
      )}

      {/* Navigation Shell */}
      <div className="relative z-10">
        <header
          className="nav-shell fixed top-0 w-full z-50 transition-all duration-500"
          style={{
            background: scrolled ? "rgba(253, 251, 247, 0.85)" : "transparent",
            backdropFilter: scrolled ? "blur(12px)" : "none",
            borderBottom: scrolled ? "1px solid var(--border-soft)" : "1px solid transparent",
            paddingTop: scrolled ? "0" : "1rem"
          }}
        >
          <nav className="max-w-7xl mx-auto px-6 md:px-12 h-24 flex items-center justify-between">
            <button onClick={goTo("top")} className="group flex items-center gap-4 cursor-none bg-transparent border-none">
              <span className="w-10 h-10 rounded-full flex items-center justify-center font-display text-base overflow-hidden border border-[var(--border)] text-[var(--gold)] group-hover:bg-[var(--gold)] group-hover:text-[var(--bg)] transition-colors relative bg-[var(--panel)] shadow-sm">
                {initials}
              </span>
              <div className="flex flex-col items-start">
                <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-[var(--text)] transition-colors">{profile.name}</span>
                <span className="font-mono text-[9px] tracking-widest text-[var(--text-faint)] uppercase mt-0.5">Portfolio</span>
              </div>
            </button>
            
            <div className="hidden md:flex gap-10">
              {NAV.map((n) => (
                <button key={n.id} onClick={goTo(n.id)} className="nav-link font-mono text-[10px] tracking-widest uppercase py-2">{n.label}</button>
              ))}
            </div>
            
            <div className="flex items-center gap-4">
              {isAdminUser && (
                <button
                  onClick={() => { if (editMode) saveAllData(true); else setEditMode(true); }}
                  className="btn-outline hidden sm:inline-flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase px-5 py-3 rounded-full"
                  style={editMode ? { background: "rgba(182,141,86,0.1)", borderColor: "var(--gold)", color: "var(--gold)" } : {}}
                >
                  {editMode ? <Check size={14} /> : <Pencil size={14} />}
                  {editMode ? "Save & Exit" : "Edit Site"}
                </button>
              )}
              <button onClick={goTo("contact")} className="btn-gold hidden sm:inline-flex font-mono text-[10px] tracking-widest uppercase px-6 py-3 rounded-full shadow-sm">
                Let's talk
              </button>
            </div>
          </nav>
        </header>

        {editMode && isAdminUser && (
          <div className="max-w-7xl mx-auto px-6 md:px-12 pt-32">
            <div className="font-mono text-[10px] tracking-wide px-4 py-3 rounded-xl flex items-center gap-3 bg-[var(--panel)] shadow-md" style={{ border: "1px solid var(--gold)", color: "var(--gold)" }}>
              <div className="w-2 h-2 rounded-full bg-[var(--gold)] animate-pulse"></div>
              Live Edit Mode active. Changes are public upon saving.
            </div>
          </div>
        )}

        {/* Hero Section */}
        <main id="top" className="max-w-7xl mx-auto px-6 md:px-12">
          <section className="min-h-[90vh] pt-32 pb-16 flex flex-col justify-center relative">
            <div className="w-full grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center relative z-10">
              
              {/* Left Column: Text Content */}
              <div className="flex flex-col items-start text-left">
                <div className="reveal-up">
                  <p className="font-mono text-[10px] tracking-[0.25em] uppercase mb-8 flex items-center gap-3 text-[var(--gold)] font-medium">
                    <span className="w-8 h-[1px] bg-[var(--gold)]"></span>
                    <Editable value={profile.role} onChange={(v) => setProfile((p) => ({ ...p, role: v }))} /> 
                    <span className="opacity-40">/</span> 
                    <Editable value={profile.focus} onChange={(v) => setProfile((p) => ({ ...p, focus: v }))} />
                  </p>
                </div>

                <h1 className="font-display leading-[1.1] reveal-up delay-100 text-[var(--text)]" style={{ fontSize: "clamp(42px, 6.5vw, 90px)", fontWeight: 400, letterSpacing: "-0.02em" }}>
                  <Editable value={profile.headline} onChange={(v) => setProfile((p) => ({ ...p, headline: v }))} className="block mb-2" />
                  <Editable value={profile.headlineAccent} onChange={(v) => setProfile((p) => ({ ...p, headlineAccent: v }))} className="text-[var(--gold)] font-cursive block pb-2" />
                </h1>

                <p className="mt-8 max-w-md text-[15px] md:text-[17px] leading-[1.8] font-light reveal-up delay-200 text-[var(--text-dim)]">
                  <Editable tag="span" value={profile.intro} onChange={(v) => setProfile((p) => ({ ...p, intro: v }))} />
                </p>

                <div className="flex gap-4 md:gap-6 mt-12 flex-wrap reveal-up delay-300">
                  <button onClick={goTo("work")} className="btn-gold font-mono text-[10px] tracking-widest uppercase px-8 py-4 rounded-full font-semibold flex items-center gap-3">
                    View the work <ArrowUpRight size={14} />
                  </button>
                  <button onClick={goTo("contact")} className="btn-outline font-mono text-[10px] tracking-widest uppercase px-8 py-4 rounded-full flex items-center gap-3 bg-[var(--panel)]">
                    Let's Collaborate
                  </button>
                </div>
              </div>

              {/* Right Column: Animated Visual */}
              <div className="reveal-left delay-400 w-full relative z-10 hidden md:block">
                 <AnimatedTerminal />
              </div>
              
              <div className="reveal-up delay-400 w-full relative z-10 md:hidden mt-8">
                 <AnimatedTerminal />
              </div>

            </div>

            {/* Bottom Stats Row */}
            <div className="flex gap-10 lg:gap-20 mt-24 flex-wrap justify-start lg:justify-start w-full z-10 reveal-up delay-500 border-t border-[var(--border)] pt-12">
              {profile.stats.map((s, i) => (
                <div key={i} className="flex items-center gap-10 lg:gap-20 group relative hover-float">
                  <div className="relative z-10 cursor-none flex flex-col gap-2">
                    <div className="font-display text-[38px] md:text-[46px] leading-none transition-colors duration-300 text-[var(--text)]">
                      <Editable value={s.v} onChange={(v) => setProfile((p) => ({ ...p, stats: p.stats.map((st, idx) => (idx === i ? { ...st, v } : st)) }))} />
                    </div>
                    <div className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.2em] opacity-80 text-[var(--gold)] leading-relaxed max-w-[100px]">
                      <Editable value={s.k} onChange={(v) => setProfile((p) => ({ ...p, stats: p.stats.map((st, idx) => (idx === i ? { ...st, k: v } : st)) }))} />
                    </div>
                  </div>
                  {i < profile.stats.length - 1 && <div className="hidden sm:block w-[1px] h-12 bg-[var(--border)]" />}
                </div>
              ))}
            </div>
          </section>

          {/* Work Section */}
          <section id="work" className="py-32 relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-screen h-[1px] bg-[var(--border)] opacity-60"></div>
            
            <SectionHead eyebrow="Selected Work" title="Featured Projects" count={`${projects.length} artifacts`} />
            
            <div className="grid grid-cols-1 gap-16 md:gap-24 mt-20">
              {[...projects].reverse().map((p, originalIndex) => {
                const i = projects.length - 1 - originalIndex; 
                return (
                  <div 
                    key={i} 
                    className="editorial-card group reveal-up"
                    style={{ transitionDelay: `${originalIndex * 150}ms` }}
                    onMouseMove={handleCardMouseMove}
                  >
                    <div className="editorial-content p-8 md:p-14">
                      
                      {editMode && (
                        <div className="absolute top-6 right-6 flex gap-2 z-20">
                          <span className="w-10 h-10 rounded-full flex items-center justify-center bg-red-50 border border-red-100 text-red-500 cursor-none hover:bg-red-100 transition-all" onClick={() => setProjects((prev) => prev.filter((_, idx) => idx !== i))}>
                            <Trash2 size={16} />
                          </span>
                        </div>
                      )}

                      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-12 lg:gap-20 items-center">
                        <div className="order-2 lg:order-1 flex flex-col h-full justify-center">
                          <div className="font-display proj-num text-[70px] leading-none mb-6 select-none opacity-20">
                            {String(originalIndex + 1).padStart(2, "0")}
                          </div>
                          
                          <h3 className="font-display text-3xl md:text-4xl font-light mb-4 text-[var(--text)]">
                            <Editable value={p.title} onChange={(v) => updateProject(i, { title: v })} />
                          </h3>
                          
                          <div className="font-mono text-[10px] uppercase tracking-widest text-[var(--gold)] mb-8 flex items-center gap-4">
                            <span className="w-6 h-[1px] bg-[var(--gold)] opacity-50"></span>
                            <Editable value={p.subtitle} onChange={(v) => updateProject(i, { subtitle: v })} />
                          </div>
                          
                          <p className="text-[15px] leading-[1.8] text-[var(--text-dim)] font-light mb-10">
                            <Editable tag="span" value={p.desc} onChange={(v) => updateProject(i, { desc: v })} placeholder="Describe the project challenge, solution, and impact..." />
                          </p>
                          
                          <div className="mb-10">
                            <TagEditor items={p.stack} onChange={(items) => updateProject(i, { stack: items })} />
                          </div>

                          <div className="flex flex-wrap gap-4 mt-auto">
                            {editMode ? (
                              <div className="flex flex-col gap-3 w-full">
                                <InputRow icon={<ExternalLink size={14}/>} value={p.live} onChange={(v) => updateProject(i, { live: v })} placeholder="Live URL" color="var(--gold)" />
                                <InputRow icon={<Github size={14}/>} value={p.source} onChange={(v) => updateProject(i, { source: v })} placeholder="Source URL" color="var(--text-dim)" />
                              </div>
                            ) : (
                              <>
                                {p.live !== "#" && (
                                  <a href={p.live} target="_blank" rel="noopener noreferrer" className="font-mono text-[10px] uppercase tracking-widest flex items-center gap-2 text-[var(--text)] hover:text-[var(--gold)] transition-colors cursor-none">
                                    <ExternalLink size={14} /> Live Site
                                  </a>
                                )}
                                {p.source !== "#" && (
                                  <a href={p.source} target="_blank" rel="noopener noreferrer" className="font-mono text-[10px] uppercase tracking-widest flex items-center gap-2 text-[var(--text-dim)] hover:text-[var(--text)] transition-colors cursor-none">
                                    <Github size={14} /> Source Code
                                  </a>
                                )}
                              </>
                            )}
                          </div>
                        </div>

                        {/* FULL PREVIEW CONTAINER */}
                        <div className="order-1 lg:order-2 relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-[var(--border)] bg-[var(--bg)] group/img shrink-0 shadow-lg flex items-center justify-center">
                          {p.image ? (
                            <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover/img:scale-105 transition-all duration-700 ease-out" />
                          ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center text-[var(--border)] bg-[var(--panel-strong)]">
                              <ImageIcon size={64} strokeWidth={1} />
                              <span className="font-mono text-xs uppercase tracking-widest mt-4 opacity-70">Project Visual</span>
                            </div>
                          )}
                          
                          {editMode && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/70 backdrop-blur-sm opacity-0 hover:opacity-100 transition-opacity p-6 z-20">
                              <label className="btn-outline bg-white px-6 py-3 rounded-full flex items-center gap-3 cursor-none">
                                <ImageIcon size={16} /> 
                                <span className="font-mono text-[10px] tracking-widest uppercase">Upload Image</span>
                                <input type="file" accept="image/*" className="hidden" onChange={(e) => handleProjectImageChange(i, e)} />
                              </label>
                              {p.image && (
                                <button onClick={() => updateProject(i, { image: null })} className="mt-4 font-mono text-[10px] uppercase text-red-500 tracking-widest">
                                  Remove Image
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              
              {editMode && (
                <div className="editorial-card border-dashed border-2 bg-transparent hover:bg-white/50 cursor-none min-h-[250px] flex flex-col items-center justify-center text-[var(--text-dim)] hover:text-[var(--gold)] transition-all" onClick={() => setProjects((prev) => [...prev, emptyProject()])}>
                  <div className="editorial-content flex flex-col items-center gap-4">
                    <div className="w-16 h-16 rounded-full border border-current flex items-center justify-center bg-white">
                      <Plus size={24} />
                    </div>
                    <span className="font-mono text-xs uppercase tracking-widest">Add New Project</span>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Certificates Section */}
          <section id="certificates" className="py-32 relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-screen h-[1px] bg-[var(--border)] opacity-60"></div>
            
            <SectionHead eyebrow="Credentials" title="Certifications" count={`${certificates.length} verified`} />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
              {[...certificates].reverse().map((c, originalIndex) => {
                const i = certificates.length - 1 - originalIndex;
                return (
                  <div key={i} className="editorial-card group reveal-up flex flex-col h-full min-h-[300px]" style={{ transitionDelay: `${originalIndex * 100}ms` }} onMouseMove={handleCardMouseMove}>
                    <div className="absolute top-0 left-0 w-full h-[3px] bg-[var(--gold)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    <div className="editorial-content p-8 flex flex-col h-full">
                      {editMode && (
                        <div className="absolute top-4 right-4 z-20">
                          <span className="w-8 h-8 rounded-full flex items-center justify-center bg-red-50 text-red-500 cursor-none hover:bg-red-100 transition-all" onClick={() => setCertificates((prev) => prev.filter((_, idx) => idx !== i))}>
                            <Trash2 size={14} />
                          </span>
                        </div>
                      )}

                      <div className="flex items-center justify-between mb-8">
                        <span className="font-mono text-[9px] tracking-[0.2em] uppercase px-3 py-1.5 rounded-full border border-[var(--gold)] text-[var(--gold)] bg-[var(--gold)]/5">
                          <Editable value={c.seal} onChange={(v) => updateCert(i, { seal: v })} />
                        </span>
                        <BadgeCheck size={24} className="text-[var(--border)] group-hover:text-[var(--gold)] transition-colors duration-500" strokeWidth={1.2} />
                      </div>
                      
                      <h4 className="font-display text-xl leading-snug font-light mb-3 text-[var(--text)]">
                        <Editable value={c.title} onChange={(v) => updateCert(i, { title: v })} />
                      </h4>
                      
                      <div className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-dim)] mb-5 flex items-center gap-2">
                        <Editable value={c.issuer} onChange={(v) => updateCert(i, { issuer: v })} />
                      </div>
                      
                      <p className="text-[13px] leading-[1.7] text-[var(--text-faint)] font-light mb-6 flex-grow">
                        <Editable tag="span" value={c.desc} onChange={(v) => updateCert(i, { desc: v })} placeholder="Add certificate description..." />
                      </p>

                      {c.image && (
                        <div className="mb-6 rounded-xl overflow-hidden border border-[var(--border-soft)] group/img relative h-40 bg-[var(--bg)] w-full shrink-0 flex items-center justify-center p-1">
                          <img src={c.image} alt={c.title} className="w-full h-full object-contain mix-blend-multiply opacity-90 group-hover/img:opacity-100 transition-opacity" />
                        </div>
                      )}

                      {editMode && (
                        <div className="space-y-3 mb-6">
                          <label className="border border-dashed border-[var(--border)] rounded-xl p-4 flex flex-col items-center justify-center gap-2 cursor-none hover:border-[var(--gold)] hover:bg-[var(--gold)]/5 transition-colors">
                            <ImageIcon size={16} color="var(--text-dim)" />
                            <span className="font-mono text-[9px] uppercase tracking-widest text-[var(--text-dim)]">Attach Image</span>
                            <input type="file" accept="image/*" className="hidden" onChange={(e) => handleCertImageChange(i, e)} />
                          </label>
                          <InputRow icon={<ShieldCheck size={14}/>} value={c.verifyUrl} onChange={(v) => updateCert(i, { verifyUrl: v })} placeholder="Verification URL" color="var(--gold)" />
                        </div>
                      )}

                      <div className="flex justify-between items-center mt-auto pt-5 border-t border-[var(--border-soft)]">
                        <span className="font-mono text-[10px] tracking-widest text-[var(--text-faint)]">
                          <Editable value={c.date} onChange={(v) => updateCert(i, { date: v })} />
                        </span>
                        
                        {!editMode && c.verifyUrl && c.verifyUrl !== "#" ? (
                          <a href={c.verifyUrl} target="_blank" rel="noopener noreferrer" className="font-mono text-[10px] uppercase tracking-widest text-[var(--gold)] hover:underline flex items-center gap-1.5 cursor-none">
                            <ShieldCheck size={13} /> Verify <ArrowUpRight size={11} />
                          </a>
                        ) : (
                          <span className="font-mono text-[9px] uppercase tracking-widest text-[var(--text-dim)]">Verified</span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
              
              {editMode && (
                <div className="editorial-card border-dashed border-2 bg-transparent hover:bg-white/50 cursor-none min-h-[250px] flex flex-col items-center justify-center text-[var(--text-dim)] hover:text-[var(--gold)] transition-all" onClick={() => setCertificates((prev) => [...prev, emptyCert()])}>
                  <div className="editorial-content flex flex-col items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-white border border-current flex items-center justify-center">
                      <Plus size={18} />
                    </div>
                    <span className="font-mono text-[10px] uppercase tracking-widest">Add Credential</span>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Activity Section */}
          <section id="activity" className="py-32 relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-screen h-[1px] bg-[var(--border)] opacity-60"></div>
            
            <SectionHead eyebrow="Timeline" title="Activity & Milestones" count={`${activityLogs.length} updates`} />
            
            <div className="mt-20 relative before:absolute before:inset-0 before:ml-4 md:before:ml-6 before:-translate-x-px before:h-full before:w-[2px] before:bg-[var(--border)]">
              <div className="space-y-12">
                {[...activityLogs].reverse().map((log, originalIndex) => {
                  const i = activityLogs.length - 1 - originalIndex;
                  return (
                    <div key={i} className="relative pl-12 md:pl-20 reveal-right group" style={{ transitionDelay: `${originalIndex * 100}ms` }}>
                      <div className="absolute left-[9px] md:left-[17px] top-6 w-3 h-3 rounded-full bg-[var(--panel)] border-2 border-[var(--gold)] shadow-[0_0_10px_rgba(182,141,86,0.3)] group-hover:bg-[var(--gold)] group-hover:scale-125 transition-all duration-300"></div>
                      
                      {editMode && (
                        <div className="absolute top-0 right-0 z-20">
                          <span className="w-8 h-8 rounded-full flex items-center justify-center bg-red-50 text-red-500 cursor-none hover:bg-red-100 transition-all" onClick={() => setActivityLogs((prev) => prev.filter((_, idx) => idx !== i))}>
                            <Trash2 size={14} />
                          </span>
                        </div>
                      )}

                      <div className="editorial-card p-6 md:p-8" onMouseMove={handleCardMouseMove}>
                        <div className="editorial-content">
                          <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-widest text-[var(--gold)] mb-2">
                            <Calendar size={13} />
                            <Editable value={log.date} onChange={(v) => updateLog(i, { date: v })} placeholder="e.g. Aug 2026" />
                          </div>
                          <h4 className="font-display text-xl md:text-2xl mb-3 text-[var(--text)]">
                            <Editable value={log.title} onChange={(v) => updateLog(i, { title: v })} placeholder="Milestone Title" />
                          </h4>
                          <p className="text-[14px] leading-[1.8] text-[var(--text-dim)] font-light">
                            <Editable tag="span" value={log.desc} onChange={(v) => updateLog(i, { desc: v })} placeholder="Describe this milestone or activity..." />
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {editMode && (
                <div className="relative pl-12 md:pl-20 mt-12">
                  <div className="absolute left-[9px] md:left-[17px] top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[var(--bg)] border-2 border-[var(--border)]"></div>
                  <div className="editorial-card border-dashed border-2 bg-transparent hover:bg-white/50 cursor-none py-6 flex flex-col items-center justify-center text-[var(--text-dim)] hover:text-[var(--gold)] transition-all" onClick={() => setActivityLogs((prev) => [...prev, emptyLog()])}>
                    <div className="editorial-content flex items-center gap-3">
                      <Plus size={16} />
                      <span className="font-mono text-[10px] uppercase tracking-widest">Add Log Entry</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>

          <section id="skills" className="py-32 relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-screen h-[1px] bg-[var(--border)] opacity-60"></div>
            
            <SectionHead eyebrow="Toolkit" title="Capabilities & Stack" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 mt-16 reveal-up">
              {skillGroups.map((group, gi) => (
                <div key={gi} className="relative pl-6 border-l border-[var(--border)] hover:border-[var(--gold)] transition-colors duration-500 reveal-scale" style={{ transitionDelay: `${gi * 150}ms` }}>
                  <div className="absolute top-0 -left-[5px] w-[9px] h-[9px] rounded-full bg-[var(--bg)] border-2 border-[var(--border)]"></div>
                  <div className="absolute top-0 -left-[5px] w-[9px] h-[9px] rounded-full bg-[var(--gold)] opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <h4 className="font-mono text-[10px] uppercase tracking-[0.2em] mb-6 flex items-center gap-3 text-[var(--text)] font-semibold">
                    <Sparkles size={14} className="text-[var(--gold)]" />
                    <Editable value={group.label} onChange={(v) => setSkillGroups((prev) => prev.map((g, idx) => (idx === gi ? { ...g, label: v } : g)))} />
                  </h4>
                  <div className="pt-2">
                    <TagEditor items={group.items} onChange={(items) => setSkillGroups((prev) => prev.map((g, idx) => (idx === gi ? { ...g, items } : g)))} />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" className="py-32 relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-screen h-[1px] bg-[var(--border)] opacity-60"></div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="editorial-card rounded-[2rem] p-10 md:p-14 reveal-left" onMouseMove={handleCardMouseMove}>
                <div className="editorial-content">
                  <div className="w-12 h-12 border border-[var(--border)] rounded-full flex items-center justify-center mb-8 bg-[var(--bg)] shadow-sm">
                    <Mail size={20} className="text-[var(--gold)]" />
                  </div>
                  
                  <p className="font-mono text-[10px] tracking-[0.3em] uppercase mb-4 text-[var(--gold)]">Initiate Contact</p>
                  
                  <h2 className="font-display text-3xl md:text-4xl leading-tight mb-6 font-light text-[var(--text)]">
                    Let's build something <span className="text-[var(--gold)] font-cursive">extraordinary.</span>
                  </h2>
                  
                  <p className="text-[15px] leading-relaxed text-[var(--text-dim)] font-light mb-10">
                    Whether you have an exciting project in mind, a technical challenge to discuss, or just want to connect — my inbox is always open.
                  </p>

                  <div className="space-y-4 mb-10">
                    <a href={`mailto:${profile.email}`} className="font-mono text-xs text-[var(--text)] hover:text-[var(--gold)] flex items-center gap-3 cursor-none transition-colors font-medium">
                      <Editable value={profile.email} onChange={(v) => setProfile((p) => ({ ...p, email: v }))} />
                    </a>
                  </div>

                  <div className="flex gap-6 items-center pt-8 border-t border-[var(--border-soft)]">
                    <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="text-[var(--text-dim)] hover:text-[var(--gold)] transition-colors cursor-none hover:scale-110 transform duration-300">
                      <LinkedinIcon size={20} />
                    </a>
                    <a href={profile.github} target="_blank" rel="noopener noreferrer" className="text-[var(--text-dim)] hover:text-[var(--gold)] transition-colors cursor-none hover:scale-110 transform duration-300">
                      <Github size={20} />
                    </a>
                  </div>

                  {editMode && (
                    <div className="mt-8 space-y-3 pt-6 border-t border-[var(--border)]">
                      <InputRow icon={<LinkedinIcon size={14}/>} value={profile.linkedin} onChange={(v) => setProfile((p) => ({ ...p, linkedin: v }))} placeholder="LinkedIn URL" color="var(--text-dim)" />
                      <InputRow icon={<Github size={14}/>} value={profile.github} onChange={(v) => setProfile((p) => ({ ...p, github: v }))} placeholder="GitHub URL" color="var(--text-dim)" />
                    </div>
                  )}
                </div>
              </div>

              <div className="editorial-card rounded-[2rem] p-10 md:p-14 reveal-right" onMouseMove={handleCardMouseMove}>
                <div className="editorial-content">
                  <div className="flex items-center gap-3 mb-8">
                    <MessageSquare size={18} className="text-[var(--gold)]" />
                    <h3 className="font-display text-2xl font-light text-[var(--text)]">Send a Direct Message</h3>
                  </div>

                  <form onSubmit={handleSendMessage} className="space-y-6">
                    <div>
                      <label className="block font-mono text-[9px] uppercase tracking-widest text-[var(--text-dim)] mb-2 font-semibold">Your Name</label>
                      <input
                        type="text"
                        required
                        value={msgForm.name}
                        onChange={(e) => setMsgForm({ ...msgForm, name: e.target.value })}
                        placeholder="Jane Doe"
                        className="w-full bg-[var(--bg)] border border-[var(--border)] rounded-xl px-4 py-3.5 font-mono text-xs text-[var(--text)] outline-none focus:border-[var(--gold)] focus:bg-white transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-[9px] uppercase tracking-widest text-[var(--text-dim)] mb-2 font-semibold">Your Email</label>
                      <input
                        type="email"
                        required
                        value={msgForm.email}
                        onChange={(e) => setMsgForm({ ...msgForm, email: e.target.value })}
                        placeholder="jane@example.com"
                        className="w-full bg-[var(--bg)] border border-[var(--border)] rounded-xl px-4 py-3.5 font-mono text-xs text-[var(--text)] outline-none focus:border-[var(--gold)] focus:bg-white transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-[9px] uppercase tracking-widest text-[var(--text-dim)] mb-2 font-semibold">Message</label>
                      <textarea
                        required
                        rows={4}
                        value={msgForm.message}
                        onChange={(e) => setMsgForm({ ...msgForm, message: e.target.value })}
                        placeholder="Hello, I'd love to discuss an opportunity..."
                        className="w-full bg-[var(--bg)] border border-[var(--border)] rounded-xl px-4 py-3.5 font-mono text-xs text-[var(--text)] outline-none focus:border-[var(--gold)] focus:bg-white transition-colors resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={sendingMsg}
                      className="btn-gold w-full font-mono text-[10px] uppercase tracking-widest py-4 rounded-xl font-semibold flex items-center justify-center gap-2"
                    >
                      {sendingMsg ? "Sending..." : <>Send Message <Send size={14} /></>}
                    </button>
                  </form>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center gap-6 mt-24 font-mono text-[9px] uppercase tracking-widest text-[var(--text-faint)] reveal-up delay-200">
              <span className="flex items-center gap-2">
                © {new Date().getFullYear()} {profile.name} <span className="w-1 h-1 rounded-full bg-[var(--gold)]"></span> Crafted with Care
              </span>
              
              <div className="flex gap-8 items-center">
                {user ? (
                  <button onClick={handleLogout} className="flex items-center gap-2 hover:text-[var(--text)] transition-colors cursor-none">
                    <LogOut size={13} /> Sign Out
                  </button>
                ) : (
                  <button onClick={handleGoogleLogin} className="flex items-center gap-2 hover:text-[var(--gold)] transition-colors cursor-none group">
                    <LogIn size={13} className="group-hover:translate-x-1 transition-transform" /> Admin
                  </button>
                )}
                
                <button onClick={goTo("top")} className="flex items-center gap-2 hover:text-[var(--gold)] transition-colors cursor-none group">
                  Top <ArrowUp size={13} className="group-hover:-translate-y-1 transition-transform" />
                </button>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

function SectionHead({ eyebrow, title, count }) {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 reveal-left">
      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] mb-4 flex items-center gap-4 text-[var(--gold)] font-medium">
          <span className="w-12 h-[1px] bg-[var(--gold)] opacity-60"></span>
          {eyebrow}
        </p>
        <h2 className="font-display font-light text-[var(--text)]" style={{ fontSize: "clamp(34px, 4vw, 54px)" }}>{title}</h2>
      </div>
      {count && (
        <div className="font-mono text-[9px] font-semibold uppercase tracking-widest text-[var(--text-dim)] border border-[var(--border)] px-4 py-2 rounded-full bg-[var(--panel)]">
          {count}
        </div>
      )}
    </div>
  );
}

function InputRow({ icon, value, onChange, placeholder, color }) {
  return (
    <div className="flex items-center gap-3 bg-[var(--bg)] border border-[var(--border-soft)] rounded-lg px-4 py-3 focus-within:border-[var(--gold)] transition-colors">
      <div style={{ color }}>{icon}</div>
      <input
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="font-mono text-[10px] bg-transparent w-full outline-none text-[var(--text)] placeholder-[var(--text-faint)] tracking-wider"
      />
    </div>
  );
}
