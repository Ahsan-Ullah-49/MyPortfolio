import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { X, Download, Briefcase, Code2, Users, Calendar } from "lucide-react";
import { RESUME } from "./Hero";
import cvFile from "../assets/CV/Ahsan_Ullah_CV_Corrected.pdf";

/* ── CV Modal ────────────────────────────────────────────────────── */
export default function CVModal({ onClose }) {
  const overlayRef = useRef(null);
  const cardRef    = useRef(null);

  /* ── Entrance animation ────────────────────────────────────────── */
  useEffect(() => {
    gsap.fromTo(overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.3, ease: "power2.out" }
    );
    gsap.fromTo(cardRef.current,
      { opacity: 0, y: 40, scale: 0.96 },
      { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "back.out(1.4)" }
    );

    // Close on Escape
    const handleKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const handleClose = () => {
    gsap.to(cardRef.current, { opacity: 0, y: 20, scale: 0.97, duration: 0.22, ease: "power2.in" });
    gsap.to(overlayRef.current, {
      opacity: 0, duration: 0.25, delay: 0.1, ease: "power2.in",
      onComplete: onClose,
    });
  };

  const skills = RESUME.skills;
  const projects = RESUME.projectList;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)" }}
      onClick={(e) => e.target === overlayRef.current && handleClose()}
    >
      <div
        ref={cardRef}
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl"
        style={{
          background: "rgba(8,8,14,0.97)",
          border: "1px solid rgba(59,130,246,0.18)",
          boxShadow: "0 32px 80px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.04)",
        }}
      >
        {/* ── Header strip ─────────────────────────────────────────── */}
        <div
          className="sticky top-0 flex items-center justify-between px-8 py-5 rounded-t-3xl z-10"
          style={{
            background: "rgba(8,8,14,0.95)",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            backdropFilter: "blur(20px)",
          }}
        >
          <div>
            <h2 className="font-jakarta font-bold text-lg text-white leading-none">
              Curriculum Vitae
            </h2>
            <p className="font-mono text-[10px] text-accent/60 tracking-widest uppercase mt-1">
              {RESUME.name}
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Download button — place cv.pdf in /public to enable */}
            {/* // Place your actual cv.pdf in the public folder to make this work */}
            <a
              href={cvFile}
              download="Ahsan_Ullah_CV.pdf"
              className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold text-white transition-all duration-200"
              style={{
                background: "linear-gradient(135deg,#3b82f6,#2563eb)",
                boxShadow: "0 0 0 1px rgba(59,130,246,0.4), 0 3px 14px rgba(59,130,246,0.3)",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.boxShadow = "0 0 0 1px rgba(59,130,246,0.8), 0 4px 24px rgba(59,130,246,0.6)")}
              onMouseLeave={(e) =>
                (e.currentTarget.style.boxShadow = "0 0 0 1px rgba(59,130,246,0.4), 0 3px 14px rgba(59,130,246,0.3)")}
            >
              <Download size={12} />
              Download PDF
            </a>

            <button
              onClick={handleClose}
              className="flex items-center justify-center w-8 h-8 rounded-full border border-white/10 hover:border-white/25 hover:bg-white/[0.06] transition-all"
              aria-label="Close"
            >
              <X size={14} className="text-white/60" />
            </button>
          </div>
        </div>

        {/* ── Body ─────────────────────────────────────────────────── */}
        <div className="px-8 py-7 space-y-8">

          {/* Identity & Contact Links */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div className="flex items-start gap-5">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 font-jakarta font-black text-xl text-white"
                style={{
                  background: "linear-gradient(135deg,rgba(59,130,246,0.18),rgba(99,102,241,0.10))",
                  border: "1px solid rgba(59,130,246,0.30)",
                  boxShadow: "0 0 16px rgba(59,130,246,0.18)",
                }}
              >
                AU
              </div>
              <div>
                <h3 className="font-jakarta font-bold text-2xl text-white">{RESUME.name}</h3>
                <p className="text-accent text-sm font-medium mt-0.5">{RESUME.role}</p>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-2.5">
                  <span className="font-mono text-[10px] text-white/30 tracking-widest uppercase">
                    {RESUME.location}
                  </span>
                  <a href={`mailto:${RESUME.email}`} className="font-mono text-[10px] text-white/40 hover:text-white transition-colors tracking-widest">
                    {RESUME.email}
                  </a>
                  <a href={`tel:${RESUME.phone}`} className="font-mono text-[10px] text-white/40 hover:text-white transition-colors tracking-widest">
                    {RESUME.phone}
                  </a>
                </div>
              </div>
            </div>

            {/* Social Connect */}
            <div className="flex flex-wrap gap-2 pt-2 md:pt-0">
              {[
                { label: "LinkedIn", href: RESUME.linkedin },
                { label: "GitHub",   href: RESUME.github },
                { label: "WhatsApp", href: RESUME.whatsapp },
                { label: "Insta",    href: RESUME.instagram },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 text-[10px] font-mono font-medium text-white/50 hover:text-white hover:border-white/20 transition-all"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Stats pills */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: <Calendar size={14}/>, label: "Experience", val: RESUME.experience },
              { icon: <Briefcase size={14}/>, label: "Projects",  val: RESUME.projects  },
              { icon: <Users size={14}/>,    label: "Clients",    val: RESUME.clients   },
            ].map(({ icon, label, val }) => (
              <div
                key={label}
                className="flex flex-col items-center gap-1.5 py-4 rounded-2xl text-center"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
              >
                <span className="text-accent">{icon}</span>
                <span className="font-jakarta font-bold text-lg text-white leading-none">{val}</span>
                <span className="font-mono text-[9px] text-white/30 tracking-widest uppercase">{label}</span>
              </div>
            ))}
          </div>

          {/* Skills */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Code2 size={14} className="text-accent" />
              <h4 className="font-jakarta font-semibold text-sm text-white">Technical Skills</h4>
            </div>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 rounded-full font-mono text-[11px] font-medium"
                  style={{
                    background: "rgba(59,130,246,0.09)",
                    border: "1px solid rgba(59,130,246,0.22)",
                    color: "#93c5fd",
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Experience / High-Impact Projects */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Briefcase size={14} className="text-accent" />
              <h4 className="font-jakarta font-semibold text-sm text-white">Experience & Key Projects</h4>
            </div>
            <div className="space-y-4">
              {projects.map((p, i) => (
                <div
                  key={p.name}
                  className="group relative px-5 py-5 rounded-2xl transition-all"
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div className="flex items-center gap-3">
                      <span
                        className="w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-mono font-bold flex-shrink-0"
                        style={{ background: "rgba(59,130,246,0.15)", color: "#60a5fa" }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h5 className="text-white text-sm font-bold tracking-tight">{p.name}</h5>
                    </div>
                    <div className="flex flex-wrap gap-1.5 justify-end">
                      {p.tech.slice(0, 3).map(t => (
                        <span key={t} className="font-mono text-[9px] text-accent/50 uppercase tracking-tighter">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="text-white/40 text-xs leading-relaxed pl-9">
                    {p.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Professional Summary */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Code2 size={14} className="text-accent" />
              <h4 className="font-jakarta font-semibold text-sm text-white">Summary of Expertise</h4>
            </div>
            <div
              className="px-5 py-5 rounded-2xl"
              style={{
                background: "rgba(59,130,246,0.06)",
                border: "1px solid rgba(59,130,246,0.14)",
              }}
            >
              <p className="text-white font-bold text-sm mb-2">Creative Frontend Developer</p>
              <div className="flex items-center justify-between text-white/45 text-[11px] mb-4">
                <span>Remote / Freelance</span>
                <span className="font-mono text-accent">2024 – Present</span>
              </div>
              <p className="text-white/50 text-[11px] leading-relaxed">
                Specialized in architecting immersive web experiences using React, GSAP, and Three.js. 
                Focusing on high-performance interactive codebases and pixel-perfect UI/UX translation.
              </p>
            </div>
          </div>

          {/* Education Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Users size={14} className="text-accent" />
              <h4 className="font-jakarta font-semibold text-sm text-white">Education</h4>
            </div>
            <div
              className="px-5 py-5 rounded-2xl"
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <p className="text-white font-bold text-sm">ICS (Intermediate in Computer Science)</p>
              <p className="text-accent text-[11px] font-mono mt-1">Currently in 1st Year</p>
              <p className="text-white/40 text-[11px] mt-2">Govt. Post Graduate College, Okara</p>
            </div>
          </div>

          {/* Footer note */}
          <p className="text-center font-mono text-[10px] text-white/20 pb-2">
            {/* Place your actual cv.pdf in the /public folder to enable PDF download */}
            For a complete PDF copy, click "Download PDF" above.
          </p>
        </div>
      </div>
    </div>
  );
}
