import React, { useState, useEffect } from "react";
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
  PlayCircle
} from "lucide-react";

// IMPORT FIREBASE (Ensure you have firebase installed in your project: npm install firebase)
import { initializeApp } from "firebase/app";
import { getFirestore, doc, onSnapshot, setDoc } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";

// Custom LinkedIn icon (lucide-react removed this export in newer versions)
const LinkedinIcon = ({ size = 14, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

// Custom GitHub icon (lucide-react removed this export in newer versions)
const Github = ({ size = 14, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.333-1.755-1.333-1.755-1.089-.744.083-.729.083-.729 1.205.084 1.84 1.237 1.84 1.237 1.07 1.834 2.809 1.304 3.495.997.108-.775.418-1.305.762-1.605-2.665-.303-5.467-1.332-5.467-5.93 0-1.31.468-2.38 1.235-3.22-.123-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.241 2.873.118 3.176.77.84 1.235 1.91 1.235 3.22 0 4.61-2.807 5.625-5.479 5.921.43.372.823 1.102.823 2.222 0 1.606-.015 2.898-.015 3.293 0 .322.216.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
  </svg>
);

// REPLACE THESE WITH YOUR ACTUAL FIREBASE CONFIG FROM STEP 2
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

// Initialize Firebase safely
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

// THE EMAIL THAT HAS PERMISSION TO EDIT THE PORTFOLIO (Your exact Google email)
const ADMIN_EMAIL = "dhidna9090@gmail.com"; 
const APP_ID = "my_portfolio_v1";

const DEFAULT_PROFILE = {
  name: "Dhiraj Kumar",
  role: "Full-Stack Engineer",
  focus: "Systems · Interfaces · Infrastructure",
  headline: "I build software that",
  headlineAccent: "earns trust.",
  intro: "Six years designing and shipping products end to end — from database schema to the pixel a user taps. Selected work, credentials, and how to reach me, below.",
  email: "dhidna9090@gmail.com",
  linkedin: "https://www.linkedin.com/in/dhiraj-kumar-01b185350?utm_source=share_via&utm_content=profile&utm_medium=member_android",
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
    image: null
  }
];

const DEFAULT_SKILLS = [
  { label: "Languages", items: ["TypeScript", "Python", "Go", "SQL", "Rust"] },
  { label: "Frameworks & Platforms", items: ["React", "Next.js", "Node.js", "Docker", "Kubernetes"] },
];

const NAV = [
  { id: "work", label: "Work" },
  { id: "certificates", label: "Certificates" },
  { id: "skills", label: "Toolkit" },
  { id: "contact", label: "Contact" },
];

const emptyProject = () => ({ title: "New Project", subtitle: "Short subtitle", desc: "Describe what it does and the impact it had.", stack: ["Tech"], live: "#", source: "#", linkedin: "#", image: null, video: "" });
const emptyCert = () => ({ seal: "NEW", title: "Certificate name", issuer: "Issuing organization", date: "2026", desc: "Brief description of the certification.", image: null });

// Image Compressor to prevent hitting Firestore size limits
const compressImage = (file, maxWidth = 500, quality = 0.55) => {
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

// Rough size check so the admin gets a clear warning BEFORE a save silently
// fails because the combined data (profile photo + all project/cert images)
// exceeds Firestore's 1MB per-document limit.
const getApproxSizeKB = (obj) => {
  try {
    return Math.round(new Blob([JSON.stringify(obj)]).size / 1024);
  } catch {
    return 0;
  }
};

export default function Portfolio() {
  const [profile, setProfile] = useState(DEFAULT_PROFILE);
  const [projects, setProjects] = useState(DEFAULT_PROJECTS);
  const [certificates, setCertificates] = useState(DEFAULT_CERTIFICATES);
  const [skillGroups, setSkillGroups] = useState(DEFAULT_SKILLS);
  const [photo, setPhoto] = useState(null);

  const [visible, setVisible] = useState({});
  const [scrolled, setScrolled] = useState(false);
  const [editMode, setEditMode] = useState(false);
  
  // Auth & Firebase State
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState("");

  const isAdminUser = user && user.email === ADMIN_EMAIL;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // FIX: When editing a contentEditable field and then clicking a button
  // (like "Save & Exit"), the field's blur-triggered re-render can shift
  // the layout between mousedown and click, causing the click to "miss"
  // the button entirely. Forcing an immediate blur on mousedown (capture
  // phase, before React processes anything) settles the layout early so
  // the actual click lands correctly.
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
          if (entry.isIntersecting) setVisible((prev) => ({ ...prev, [entry.target.dataset.reveal]: true }));
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll("[data-reveal]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [projects.length, certificates.length]);

  useEffect(() => {
    if (!isFirebaseConfigured) {
      // If Firebase is not configured, just stop loading and show default data
      setLoading(false);
      return;
    }

    if (!auth || !db) {
      setLoading(false);
      return;
    }

    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser && currentUser.email !== ADMIN_EMAIL) {
        showToast("Logged in, but you don't have admin editing rights.");
        setEditMode(false);
      }
    });

    // SAFETY TIMEOUT: if Firebase/Firestore doesn't respond within 6 seconds
    // (e.g. Firestore DB not created yet, wrong rules, or network issue),
    // stop showing "Loading..." forever and just show the default content.
    const safetyTimer = setTimeout(() => {
      setLoading((prev) => {
        if (prev) {
          console.warn(
            "Firestore took too long to respond. Showing default content. " +
            "Check: 1) Firestore Database is created in Firebase Console, " +
            "2) Firestore security rules allow read access, " +
            "3) firebaseConfig values are correct."
          );
        }
        return false;
      });
    }, 6000);

    const docRef = doc(db, 'portfolios', APP_ID);
    const unsubscribeData = onSnapshot(docRef, (docSnap) => {
      clearTimeout(safetyTimer);
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.profile) setProfile(data.profile);
        if (data.projects) setProjects(data.projects);
        if (data.certificates) setCertificates(data.certificates);
        if (data.skillGroups) setSkillGroups(data.skillGroups);
        if (data.photo) setPhoto(data.photo);
      }
      setLoading(false);
    }, (error) => {
      clearTimeout(safetyTimer);
      console.error("Error fetching data from Firestore:", error.code, error.message);
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

    const payload = { profile, projects, certificates, skillGroups, photo };
    const sizeKB = getApproxSizeKB(payload);
    if (sizeKB > 900) {
      showToast(
        `Data too large (${sizeKB}KB / 1024KB limit). Remove or replace some images before saving.`
      );
      return;
    }

    try {
      showToast("Saving changes...");
      const docRef = doc(db, 'portfolios', APP_ID);
      await setDoc(docRef, {
        ...payload,
        lastUpdated: new Date().toISOString()
      }, { merge: true });
      showToast("Changes saved successfully!");
      if (turnOffEditMode) setEditMode(false);
    } catch (error) {
      console.error("Error saving data:", error);
      showToast("Error saving data. " + error.message);
    }
  };

  const handleGoogleLogin = async () => {
    if (!isFirebaseConfigured) {
      showToast("Demo Mode: Logging in as Admin (Fake)");
      setUser({ email: ADMIN_EMAIL, uid: "mock-demo-id" });
      return;
    }

    if (!auth) return showToast("Firebase not initialized.");
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Login Error:", error);
      showToast("Login failed: " + error.message);
    }
  };

  const handleLogout = async () => {
    if (!isFirebaseConfigured) {
      setUser(null);
      setEditMode(false);
      showToast("Logged out from Demo Mode.");
      return;
    }

    if (!auth) return;
    try {
      await signOut(auth);
      setEditMode(false);
      showToast("Logged out securely.");
    } catch (error) {
      console.error("Logout Error:", error);
    }
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

  const handlePhotoChange = async (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const compressedImage = await compressImage(file);
    setPhoto(compressedImage);
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
    const compressedImage = await compressImage(file, 700, 0.6);
    updateProject(i, { image: compressedImage });
  };

  const initials = profile.name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
  const reveal = (key) => `transition-all duration-700 ease-out ${visible[key] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`;

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
        ...(editMode ? { background: "rgba(212,175,106,0.08)", boxShadow: "0 0 0 1px rgba(212,175,106,0.35)", cursor: "text", padding: "1px 4px", margin: "-1px -4px" } : {}),
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
          <span key={i} className="tag-pill font-mono text-[11px] uppercase tracking-wide px-3 py-1.5 rounded-full inline-flex items-center gap-1.5">
            {tag}
            {editMode && (
              <button onClick={() => onChange(items.filter((_, idx) => idx !== i))} className="opacity-70 hover:opacity-100">
                <X size={11} />
              </button>
            )}
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
            className="font-mono text-[11px] uppercase tracking-wide px-3 py-1.5 rounded-full bg-transparent"
            style={{ border: "1px dashed var(--border)", color: "var(--text-dim)", width: 110, outline: "none" }}
          />
        )}
      </div>
    );
  };

  const updateProject = (i, patch) => setProjects((prev) => prev.map((p, idx) => (idx === i ? { ...p, ...patch } : p)));
  const updateCert = (i, patch) => setCertificates((prev) => prev.map((c, idx) => (idx === i ? { ...c, ...patch } : c)));

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-[#0A0E14] text-[#E8C888] font-mono text-sm uppercase tracking-widest">Loading Portfolio...</div>;
  }

  return (
    <div className="font-body" style={{ background: "var(--bg)", color: "var(--text)", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');

        :root{
          --bg:#0A0E14; --panel: rgba(255,255,255,0.03); --panel-strong: rgba(255,255,255,0.045);
          --border: rgba(255,255,255,0.09); --border-soft: rgba(255,255,255,0.06);
          --gold:#D4AF6A; --gold-bright:#E8C888;
          --text:#EFEFEF; --text-dim:#9A9FA8; --text-faint:#5C616B;
        }
        .font-display{ font-family:'Fraunces', serif; }
        .font-body{ font-family:'Inter', sans-serif; }
        .font-mono{ font-family:'JetBrains Mono', monospace; }

        section[id]{ scroll-margin-top: 96px; }

        .glow-field{ background: radial-gradient(650px circle at 82% -8%, rgba(212,175,106,0.16), transparent 60%), radial-gradient(500px circle at 6% 18%, rgba(212,175,106,0.06), transparent 55%); }
        .grain{ background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E"); opacity:0.05; mix-blend-mode: overlay; }

        .nav-shell{ transition: background .3s ease, border-color .3s ease; }
        .nav-link{ position:relative; color:var(--text-dim); transition:color .2s ease; cursor:pointer; background:none; border:none; }
        .nav-link:hover{ color:var(--text); }
        .nav-link::after{ content:""; position:absolute; left:0; bottom:-6px; height:1px; width:0%; background:var(--gold-bright); transition:width .25s ease; }
        .nav-link:hover::after{ width:100%; }

        .btn-gold{ background: linear-gradient(135deg, var(--gold-bright), var(--gold)); color:#1a1408; transition: transform .2s ease, box-shadow .2s ease, filter .2s ease; cursor:pointer; border:none; }
        .btn-gold:hover{ transform:translateY(-2px); box-shadow:0 12px 28px rgba(212,175,106,0.25); filter:brightness(1.05); }
        .btn-outline{ border:1px solid var(--border); color:var(--text); transition: all .2s ease; cursor:pointer; background:none; }
        .btn-outline:hover{ border-color: rgba(212,175,106,0.5); background: rgba(212,175,106,0.06); transform:translateY(-2px); }
        .btn-edit{ transition: all .2s ease; cursor:pointer; }
        .btn-edit:hover{ transform:translateY(-2px); }

        .avatar-box{ cursor:pointer; }
        .avatar-box .upload-hint{ opacity:0; transition:opacity .2s ease; }
        .avatar-box:hover .upload-hint{ opacity:1; }
        .avatar-box:hover .initials{ opacity:0.2; }

        .pulse-dot{ position:relative; }
        .pulse-dot::before{ content:""; position:absolute; inset:0; border-radius:50%; background:#5FD37A; opacity:0.55; animation: pulse 2s ease-out infinite; }
        @keyframes pulse{ 0%{ transform:scale(1); opacity:0.55; } 100%{ transform:scale(2.4); opacity:0; } }

        .card{ background: var(--panel); border:1px solid var(--border-soft); transition: background .25s ease, border-color .25s ease, transform .25s ease, box-shadow .25s ease; position:relative; }
        .card:hover{ background: var(--panel-strong); border-color: rgba(212,175,106,0.25); transform: translateY(-4px); box-shadow: 0 20px 40px rgba(0,0,0,0.35); }

        .proj-num{ -webkit-text-stroke: 1px var(--border); color:transparent; }
        .cert-card::before{ content:""; position:absolute; top:0; left:0; right:0; height:2px; background: linear-gradient(90deg, var(--gold-bright), transparent); }
        .tag-pill{ border:1px solid var(--border-soft); color:var(--text-dim); transition: all .2s ease; }
        .tag-pill:hover{ border-color: rgba(212,175,106,0.4); color: var(--gold-bright); }

        .card-controls{ position:absolute; top:12px; right:12px; display:flex; gap:6px; z-index:5; }
        .icon-btn{ width:28px; height:28px; border-radius:50%; display:flex; align-items:center; justify-content:center; background:rgba(10,14,20,0.7); border:1px solid var(--border); cursor:pointer; transition:all .15s ease; }
        .icon-btn:hover{ border-color:var(--gold-bright); }
        .add-card{ border:1.5px dashed var(--border); display:flex; align-items:center; justify-content:center; flex-direction:column; gap:8px; cursor:pointer; color:var(--text-dim); transition:all .2s ease; min-height:190px; }
        .add-card:hover{ border-color:var(--gold-bright); color:var(--gold-bright); background:rgba(212,175,106,0.04); }

        ::selection{ background: var(--gold); color:#1a1408; }
        html{ scroll-behavior:smooth; }
        [contenteditable]:empty:before{ content: attr(data-placeholder); color: var(--text-faint); }
      `}</style>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] px-4 py-2 rounded-full font-mono text-xs tracking-wider" 
             style={{ background: "rgba(212,175,106,0.9)", color: "#1a1408", boxShadow: "0 4px 20px rgba(0,0,0,0.3)" }}>
          {toastMessage}
        </div>
      )}

      <div className="fixed inset-0 pointer-events-none glow-field" style={{ zIndex: 0 }} />
      <div className="fixed inset-0 pointer-events-none grain" style={{ zIndex: 0 }} />

      <div className="relative" style={{ zIndex: 1 }}>
        <header
          className="nav-shell sticky top-0 z-50"
          style={{
            background: scrolled ? "rgba(10,14,20,0.75)" : "transparent",
            backdropFilter: scrolled ? "blur(14px)" : "none",
            borderBottom: scrolled ? "1px solid var(--border-soft)" : "1px solid transparent",
          }}
        >
          <nav className="max-w-6xl mx-auto px-8 h-20 flex items-center justify-between">
            <button onClick={goTo("top")} className="flex items-center gap-2.5" style={{ background: "none", border: "none", cursor: "pointer" }}>
              <span className="w-8 h-8 rounded-full flex items-center justify-center font-display text-sm overflow-hidden" style={{ border: "1px solid var(--border)", color: "var(--gold-bright)" }}>
                {photo ? <img src={photo} alt={profile.name} className="w-full h-full object-cover" /> : initials}
              </span>
              <span className="font-mono text-xs tracking-widest uppercase" style={{ color: "var(--text-dim)" }}>{profile.name}</span>
            </button>
            
            <div className="hidden md:flex gap-10">
              {NAV.map((n) => (
                <button key={n.id} onClick={goTo(n.id)} className="nav-link font-mono text-xs tracking-wider uppercase">{n.label}</button>
              ))}
            </div>
            
            <div className="flex items-center gap-3">
              {isAdminUser && (
                <button
                  onClick={() => {
                    if (editMode) saveAllData(true);
                    else setEditMode(true);
                  }}
                  className="btn-edit hidden sm:inline-flex items-center gap-2 font-mono text-xs tracking-wider uppercase px-4 py-2.5 rounded-full"
                  style={{
                    border: editMode ? "1px solid var(--gold-bright)" : "1px solid var(--border)",
                    color: editMode ? "var(--gold-bright)" : "var(--text-dim)",
                    background: editMode ? "rgba(212,175,106,0.08)" : "transparent",
                  }}
                >
                  {editMode ? <Check size={13} /> : <Pencil size={13} />}
                  {editMode ? "Save & Exit" : "Edit Site"}
                </button>
              )}
              <button onClick={goTo("contact")} className="btn-outline hidden sm:inline-flex font-mono text-xs tracking-wider uppercase px-5 py-2.5 rounded-full">
                Let's talk
              </button>
            </div>
          </nav>
        </header>

        {editMode && isAdminUser && (
          <div className="max-w-6xl mx-auto px-8 pt-4">
            <div className="font-mono text-[11px] tracking-wide px-4 py-2.5 rounded-lg inline-flex items-center gap-2" style={{ background: "rgba(212,175,106,0.08)", border: "1px solid rgba(212,175,106,0.3)", color: "var(--gold-bright)" }}>
              <Pencil size={12} /> Edit mode is ON. Changes apply directly to the site for everyone. Don't forget to click "Save & Exit" when done.
            </div>
          </div>
        )}

        <main id="top" className="max-w-6xl mx-auto px-8">
          <section className="pt-20 pb-24 grid grid-cols-1 md:grid-cols-[1.2fr_0.8fr] gap-16 items-center">
            <div>
              <p className="font-mono text-xs tracking-widest uppercase mb-4" style={{ color: "var(--gold-bright)" }}>
                <Editable value={profile.role} onChange={(v) => setProfile((p) => ({ ...p, role: v }))} /> — <Editable value={profile.focus} onChange={(v) => setProfile((p) => ({ ...p, focus: v }))} />
              </p>

              <h1 className="font-display leading-[1.05]" style={{ fontSize: "clamp(38px,5.2vw,68px)", fontWeight: 500 }}>
                <Editable value={profile.headline} onChange={(v) => setProfile((p) => ({ ...p, headline: v }))} />
                <br />
                <Editable value={profile.headlineAccent} onChange={(v) => setProfile((p) => ({ ...p, headlineAccent: v }))} style={{ color: "var(--gold-bright)" }} />
              </h1>

              <p className="mt-7 max-w-lg text-[16px] leading-relaxed" style={{ color: "var(--text-dim)" }}>
                <Editable tag="span" value={profile.intro} onChange={(v) => setProfile((p) => ({ ...p, intro: v }))} />
              </p>

              <div className="flex gap-4 mt-10 flex-wrap">
                <button onClick={goTo("work")} className="btn-gold font-mono text-xs tracking-wider uppercase px-7 py-4 rounded-full font-semibold inline-flex items-center gap-2">
                  View the work <ArrowUpRight size={14} />
                </button>
                <button onClick={goTo("contact")} className="btn-outline font-mono text-xs tracking-wider uppercase px-7 py-4 rounded-full">
                  Get in touch
                </button>
              </div>

              <div data-reveal="stats" className={`flex gap-10 mt-16 flex-wrap ${reveal("stats")}`}>
                {profile.stats.map((s, i) => (
                  <div key={i} className="flex items-center gap-10">
                    <div>
                      <div className="font-display" style={{ fontSize: 30, color: "var(--gold-bright)" }}>
                        <Editable value={s.v} onChange={(v) => setProfile((p) => ({ ...p, stats: p.stats.map((st, idx) => (idx === i ? { ...st, v } : st)) }))} />
                      </div>
                      <div className="font-mono text-[10px] uppercase tracking-wider mt-1" style={{ color: "var(--text-faint)" }}>
                        <Editable value={s.k} onChange={(v) => setProfile((p) => ({ ...p, stats: p.stats.map((st, idx) => (idx === i ? { ...st, k: v } : st)) }))} />
                      </div>
                    </div>
                    {i < profile.stats.length - 1 && <div style={{ width: 1, height: 32, background: "var(--border)" }} />}
                  </div>
                ))}
              </div>
            </div>

            {/* PROFILE PHOTO */}
            <div data-reveal="photo" className={`flex justify-center ${reveal("photo")}`}>
              <div className="relative">
                <label
                  htmlFor="photoInput"
                  className="avatar-box relative flex items-center justify-center rounded-full overflow-hidden"
                  style={{ width: 260, height: 260, border: "1px solid var(--border)", background: "linear-gradient(155deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))" }}
                >
                  {photo ? (
                    <img src={photo} alt={profile.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="initials font-display" style={{ fontSize: 68, color: "var(--gold-bright)", opacity: 0.85, transition: "opacity .2s ease" }}>{initials}</span>
                  )}
                  
                  {editMode && (
                    <div className="upload-hint absolute inset-0 flex flex-col items-center justify-center gap-2 rounded-full" style={{ background: "rgba(10,14,20,0.6)" }}>
                      <Upload size={22} color="var(--gold-bright)" />
                      <span className="font-mono text-[10px] tracking-wider uppercase" style={{ color: "var(--gold-bright)" }}>Change photo</span>
                    </div>
                  )}
                </label>
                {editMode && <input id="photoInput" type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />}
              </div>
            </div>
          </section>

          <section id="work" className="py-24" style={{ borderTop: "1px solid var(--border-soft)" }}>
            <SectionHead eyebrow="Selected Work" title="Things I've shipped" count={`${projects.length} total`} />
            <div className="grid grid-cols-1 gap-5">
              {projects.map((p, i) => (
                <div key={i} data-reveal={`proj-${i}`} className={`card rounded-2xl p-8 md:p-10 ${reveal(`proj-${i}`)}`}>
                  {editMode && (
                    <div className="card-controls">
                      <span className="icon-btn" onClick={() => setProjects((prev) => prev.filter((_, idx) => idx !== i))}>
                        <Trash2 size={13} color="#E88" />
                      </span>
                    </div>
                  )}

                  {/* PREVIEW IMAGE */}
                  {p.image && (
                    <div className="mb-7 rounded-xl overflow-hidden" style={{ border: "1px solid var(--border-soft)" }}>
                      <img src={p.image} alt={p.title} className="w-full h-auto object-cover max-h-80" />
                    </div>
                  )}
                  {editMode && (
                    <div className="mb-7 flex flex-wrap gap-3">
                      <label className="border border-dashed rounded-lg px-4 py-3 flex items-center gap-2 cursor-pointer hover:border-[var(--gold-bright)] transition-colors" style={{ borderColor: "var(--border)" }}>
                        <ImageIcon size={15} color="var(--text-dim)" />
                        <span className="font-mono text-[10px] uppercase tracking-wider" style={{ color: "var(--text-dim)" }}>
                          {p.image ? "Replace preview image" : "Add preview image"}
                        </span>
                        <input type="file" accept="image/*" className="hidden" onChange={(e) => handleProjectImageChange(i, e)} />
                      </label>
                      {p.image && (
                        <button
                          onClick={() => updateProject(i, { image: null })}
                          className="font-mono text-[10px] uppercase tracking-wider px-3 py-3 rounded-lg"
                          style={{ border: "1px dashed var(--border)", color: "#E88" }}
                        >
                          Remove image
                        </button>
                      )}
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-[100px_1fr_auto] gap-6 items-start">
                    <div className="font-display proj-num" style={{ fontSize: 56, lineHeight: 1 }}>{String(i + 1).padStart(2, "0")}</div>
                    <div>
                      <div className="flex items-baseline gap-3 flex-wrap">
                        <h3 className="font-display text-2xl" style={{ fontWeight: 500 }}>
                          <Editable value={p.title} onChange={(v) => updateProject(i, { title: v })} />
                        </h3>
                        <span className="font-mono text-xs uppercase tracking-wide" style={{ color: "var(--text-faint)" }}>
                          <Editable value={p.subtitle} onChange={(v) => updateProject(i, { subtitle: v })} />
                        </span>
                      </div>
                      <p className="mt-3 text-[15px] leading-relaxed max-w-xl" style={{ color: "var(--text-dim)" }}>
                        <Editable tag="span" value={p.desc} onChange={(v) => updateProject(i, { desc: v })} placeholder="Add a project description here..." />
                      </p>
                      <div className="mt-5">
                        <TagEditor items={p.stack} onChange={(items) => updateProject(i, { stack: items })} />
                      </div>
                    </div>
                    <div className="flex md:flex-col gap-4 md:gap-3 md:items-end" style={{ minWidth: editMode ? 200 : "auto" }}>
                      {editMode ? (
                        <>
                          <div className="flex items-center gap-1.5 w-full">
                            <ArrowUpRight size={12} color="var(--gold-bright)" />
                            <input
                              value={p.live}
                              onChange={(e) => updateProject(i, { live: e.target.value })}
                              placeholder="Website (Live) URL"
                              className="font-mono text-[11px] px-2 py-1.5 rounded-md bg-transparent w-full"
                              style={{ border: "1px dashed var(--border)", color: "var(--gold-bright)", outline: "none" }}
                            />
                          </div>
                          <div className="flex items-center gap-1.5 w-full">
                            <Github size={12} color="var(--text-dim)" />
                            <input
                              value={p.source}
                              onChange={(e) => updateProject(i, { source: e.target.value })}
                              placeholder="GitHub repo URL"
                              className="font-mono text-[11px] px-2 py-1.5 rounded-md bg-transparent w-full"
                              style={{ border: "1px dashed var(--border)", color: "var(--text-dim)", outline: "none" }}
                            />
                          </div>
                          <div className="flex items-center gap-1.5 w-full">
                            <LinkedinIcon size={12} color="var(--text-dim)" />
                            <input
                              value={p.linkedin || ""}
                              onChange={(e) => updateProject(i, { linkedin: e.target.value })}
                              placeholder="LinkedIn post URL (optional)"
                              className="font-mono text-[11px] px-2 py-1.5 rounded-md bg-transparent w-full"
                              style={{ border: "1px dashed var(--border)", color: "var(--text-dim)", outline: "none" }}
                            />
                          </div>
                          <div className="flex items-center gap-1.5 w-full">
                            <PlayCircle size={12} color="var(--text-dim)" />
                            <input
                              value={p.video || ""}
                              onChange={(e) => updateProject(i, { video: e.target.value })}
                              placeholder="Demo video URL (optional)"
                              className="font-mono text-[11px] px-2 py-1.5 rounded-md bg-transparent w-full"
                              style={{ border: "1px dashed var(--border)", color: "var(--text-dim)", outline: "none" }}
                            />
                          </div>
                        </>
                      ) : (
                        <>
                          <a href={p.live} target="_blank" rel="noopener noreferrer" className="font-mono text-xs uppercase tracking-wide flex items-center gap-1.5" style={{ color: "var(--gold-bright)" }}>
                            <ArrowUpRight size={13} /> Website
                          </a>
                          <a href={p.source} target="_blank" rel="noopener noreferrer" className="font-mono text-xs uppercase tracking-wide flex items-center gap-1.5" style={{ color: "var(--text-dim)" }}>
                            <Github size={13} /> GitHub
                          </a>
                          {p.linkedin && p.linkedin !== "#" && (
                            <a href={p.linkedin} target="_blank" rel="noopener noreferrer" className="font-mono text-xs uppercase tracking-wide flex items-center gap-1.5" style={{ color: "var(--text-dim)" }}>
                              <LinkedinIcon size={13} /> LinkedIn
                            </a>
                          )}
                          {p.video && (
                            <a href={p.video} target="_blank" rel="noopener noreferrer" className="font-mono text-xs uppercase tracking-wide flex items-center gap-1.5" style={{ color: "var(--text-dim)" }}>
                              <PlayCircle size={13} /> Watch Demo
                            </a>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {editMode && (
                <div className="add-card rounded-2xl" onClick={() => setProjects((prev) => [...prev, emptyProject()])}>
                  <Plus size={20} />
                  <span className="font-mono text-xs uppercase tracking-wide">Add project</span>
                </div>
              )}
            </div>
          </section>

          <section id="certificates" className="py-24" style={{ borderTop: "1px solid var(--border-soft)" }}>
            <SectionHead eyebrow="Credentials" title="Certificates on record" count={`${certificates.length} total`} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {certificates.map((c, i) => (
                <div key={i} data-reveal={`cert-${i}`} className={`card cert-card rounded-2xl p-7 flex flex-col justify-between min-h-[190px] ${reveal(`cert-${i}`)}`}>
                  {editMode && (
                    <div className="card-controls">
                      <span className="icon-btn" onClick={() => setCertificates((prev) => prev.filter((_, idx) => idx !== i))}>
                        <Trash2 size={13} color="#E88" />
                      </span>
                    </div>
                  )}

                  <div className="flex items-center justify-between pr-8">
                    <span className="font-mono text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-full" style={{ border: "1px solid var(--border)", color: "var(--gold-bright)" }}>
                      <Editable value={c.seal} onChange={(v) => updateCert(i, { seal: v })} />
                    </span>
                    <BadgeCheck size={18} color="var(--gold-bright)" strokeWidth={1.6} />
                  </div>
                  
                  <div className="mt-5">
                    <h4 className="font-display text-[18px] leading-snug" style={{ fontWeight: 500 }}>
                      <Editable value={c.title} onChange={(v) => updateCert(i, { title: v })} />
                    </h4>
                    <p className="font-mono text-xs mt-2" style={{ color: "var(--text-faint)" }}>
                      <Editable value={c.issuer} onChange={(v) => updateCert(i, { issuer: v })} />
                    </p>
                    <p className="text-[13px] mt-4 leading-relaxed" style={{ color: "var(--text-dim)" }}>
                       <Editable tag="span" value={c.desc} onChange={(v) => updateCert(i, { desc: v })} placeholder="Add certificate description..." />
                    </p>
                  </div>

                  {c.image && (
                    <div className="mt-5 rounded-lg overflow-hidden border border-[var(--border-soft)]">
                       <img src={c.image} alt={c.title} className="w-full h-auto object-cover max-h-48" />
                    </div>
                  )}

                  {editMode && (
                    <label className="mt-5 border border-dashed border-[var(--border)] rounded-lg p-3 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-[var(--gold-bright)] transition-colors">
                       <ImageIcon size={16} color="var(--text-dim)" />
                       <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-dim)]">Upload Image</span>
                       <input type="file" accept="image/*" className="hidden" onChange={(e) => handleCertImageChange(i, e)} />
                    </label>
                  )}

                  <div className="flex justify-between items-center mt-5 pt-4" style={{ borderTop: "1px solid var(--border-soft)" }}>
                    <span className="font-mono text-[11px]" style={{ color: "var(--text-faint)" }}>
                      <Editable value={c.date} onChange={(v) => updateCert(i, { date: v })} />
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-wide" style={{ color: "var(--gold-bright)" }}>Verify →</span>
                  </div>
                </div>
              ))}
              {editMode && (
                <div className="add-card rounded-2xl" onClick={() => setCertificates((prev) => [...prev, emptyCert()])}>
                  <Plus size={20} />
                  <span className="font-mono text-xs uppercase tracking-wide">Add certificate</span>
                </div>
              )}
            </div>
          </section>

          <section id="skills" className="py-24" style={{ borderTop: "1px solid var(--border-soft)" }}>
            <SectionHead eyebrow="Toolkit" title="What I work with" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {skillGroups.map((group, gi) => (
                <div key={gi}>
                  <div className="font-mono text-[11px] uppercase tracking-widest mb-4 flex items-center gap-2" style={{ color: "var(--gold-bright)" }}>
                    <Sparkles size={12} />
                    <Editable value={group.label} onChange={(v) => setSkillGroups((prev) => prev.map((g, idx) => (idx === gi ? { ...g, label: v } : g)))} />
                  </div>
                  <TagEditor items={group.items} onChange={(items) => setSkillGroups((prev) => prev.map((g, idx) => (idx === gi ? { ...g, items } : g)))} />
                </div>
              ))}
            </div>
          </section>

          <footer id="contact" className="py-24" style={{ borderTop: "1px solid var(--border-soft)" }}>
            <div className="card rounded-3xl px-8 py-16 md:px-16 text-center" style={{ background: "radial-gradient(600px circle at 50% -20%, rgba(212,175,106,0.1), transparent 60%), var(--panel)" }}>
              <p className="font-mono text-xs tracking-widest uppercase mb-5" style={{ color: "var(--gold-bright)" }}>Contact</p>
              <h2 className="font-display leading-tight max-w-2xl mx-auto" style={{ fontSize: "clamp(30px,4.5vw,52px)", fontWeight: 500 }}>
                Have something to build? <span style={{ color: "var(--gold-bright)" }}>Let's talk.</span>
              </h2>
              <div className="flex gap-4 mt-10 flex-wrap justify-center">
                <a href={`mailto:${profile.email}`} className="btn-gold font-mono text-xs tracking-wider uppercase px-7 py-4 rounded-full font-semibold inline-flex items-center gap-2">
                  <Mail size={14} /> <Editable value={profile.email} onChange={(v) => setProfile((p) => ({ ...p, email: v }))} />
                </a>
                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="btn-outline font-mono text-xs tracking-wider uppercase px-7 py-4 rounded-full inline-flex items-center gap-2">
                  <LinkedinIcon size={14} /> LinkedIn
                </a>
                <a href={profile.github} target="_blank" rel="noopener noreferrer" className="btn-outline font-mono text-xs tracking-wider uppercase px-7 py-4 rounded-full inline-flex items-center gap-2">
                  <Github size={14} /> GitHub
                </a>
              </div>

              {editMode && (
                <div className="mt-8 max-w-md mx-auto flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <LinkedinIcon size={13} />
                    <input
                      value={profile.linkedin}
                      onChange={(e) => setProfile((p) => ({ ...p, linkedin: e.target.value }))}
                      placeholder="LinkedIn profile URL"
                      className="font-mono text-[11px] px-3 py-2 rounded-md bg-transparent w-full"
                      style={{ border: "1px dashed var(--border)", color: "var(--text)", outline: "none" }}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Github size={13} />
                    <input
                      value={profile.github}
                      onChange={(e) => setProfile((p) => ({ ...p, github: e.target.value }))}
                      placeholder="GitHub profile URL"
                      className="font-mono text-[11px] px-3 py-2 rounded-md bg-transparent w-full"
                      style={{ border: "1px dashed var(--border)", color: "var(--text)", outline: "none" }}
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-between items-center flex-wrap gap-4 mt-14 font-mono text-[11px]" style={{ color: "var(--text-faint)" }}>
              <span>© 2026 {profile.name}. Crafted with care.</span>
              
              <div className="flex gap-6 items-center">
                {user ? (
                  <button onClick={handleLogout} className="flex items-center gap-1.5 hover:text-[var(--text)] transition-colors">
                    <LogOut size={12} /> Sign Out ({user.email})
                  </button>
                ) : (
                  <button onClick={handleGoogleLogin} className="flex items-center gap-1.5 hover:text-[var(--gold-bright)] transition-colors">
                    <LogIn size={12} /> Admin Login
                  </button>
                )}
                
                <button onClick={goTo("top")} className="flex items-center gap-1.5" style={{ color: "var(--text-dim)", background: "none", border: "none", cursor: "pointer" }}>
                  Back to top <ArrowUp size={12} />
                </button>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}

function SectionHead({ eyebrow, title, count }) {
  return (
    <div className="flex items-end justify-between mb-14 flex-wrap gap-4">
      <div>
        <p className="font-mono text-xs uppercase tracking-widest mb-3" style={{ color: "var(--gold-bright)" }}>{eyebrow}</p>
        <h2 className="font-display" style={{ fontSize: "clamp(28px,3.5vw,44px)", fontWeight: 500 }}>{title}</h2>
      </div>
      {count && <div className="font-mono text-[13px]" style={{ color: "var(--text-faint)" }}>{count}</div>}
    </div>
  );
}
