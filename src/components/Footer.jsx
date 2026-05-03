import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ── Animated SVG Wave ───────────────────────────────────────────── */
function AnimatedWave() {
  return (
    <div className="absolute bottom-0 left-0 right-0 pointer-events-none overflow-hidden leading-none">
      <svg
        viewBox="0 0 1440 100"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="w-full h-20"
        style={{ display: "block" }}
      >
        <defs>
          <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="#3b82f6" stopOpacity="0.08" />
            <stop offset="50%"  stopColor="#6366f1" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.08" />
          </linearGradient>
        </defs>
        {/* Wave 1 — slow */}
        <path
          d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,100 L0,100 Z"
          fill="url(#waveGrad)"
          style={{ animation: "waveMove1 8s ease-in-out infinite" }}
        />
        {/* Wave 2 — faster, offset phase */}
        <path
          d="M0,60 C200,20 440,90 720,55 C1000,20 1240,90 1440,60 L1440,100 L0,100 Z"
          fill="rgba(59,130,246,0.04)"
          style={{ animation: "waveMove2 6s ease-in-out infinite reverse" }}
        />
      </svg>
    </div>
  );
}

/* ── Social icon data ────────────────────────────────────────────── */
const socials = [
  {
    name: "GitHub",
    url: "https://github.com/Ahsan-Ullah-49",
    color: "#ffffff",
    path: "M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.03-2.682-.103-.253-.447-1.27.098-2.646 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.376.202 2.394.1 2.646.64.698 1.026 1.591 1.026 2.682 0 3.84-2.337 4.687-4.565 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z",
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/ahsan-ullah-a168a525a/",
    color: "#0a66c2",
    path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/dolla_g49/",
    color: "#e1306c",
    path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z",
  },
  {
    name: "WhatsApp",
    url: "https://wa.me/923265075365",
    color: "#25d366",
    path: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z",
  },
];

/* ── Magnetic Social Icon ────────────────────────────────────────── */
function MagneticIcon({ name, url, color, path }) {
  const btnRef = useRef(null);

  const onMove = (e) => {
    const btn = btnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) * 0.35;
    const dy = (e.clientY - cy) * 0.35;
    gsap.to(btn, { x: dx, y: dy, duration: 0.3, ease: "power2.out" });
  };

  const onLeave = () => {
    gsap.to(btnRef.current, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1,0.5)" });
  };

  return (
    <a
      ref={btnRef}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={name}
      data-cursor-hover
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="group relative flex items-center justify-center w-12 h-12 rounded-2xl transition-colors duration-300"
      style={{ 
        background: "rgba(255, 255, 255, 0.05)",
        backdropFilter: "blur(16px)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        willChange: "transform" 
      }}
    >
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-5 h-5 text-white/50 group-hover:text-white transition-colors duration-300"
        style={{ "--hover-color": color }}
      >
        <path d={path} fill={color} fillOpacity="0.6" className="group-hover:fill-opacity-100 transition-all" />
      </svg>
      {/* Tooltip */}
      <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-[10px] font-mono text-white/50 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        {name}
      </span>
    </a>
  );
}

/* ── Main Footer ─────────────────────────────────────────────────── */
export default function Footer() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const ctaRef     = useRef(null);
  const metaRef    = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      tl.fromTo(headingRef.current,
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      )
      .fromTo(ctaRef.current,
        { opacity: 0, y: 30, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: "back.out(1.5)" },
        "-=0.5"
      )
      .fromTo(metaRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8 },
        "-=0.2"
      );

      // Add floating animation to the Ready to Build heading
      gsap.to(headingRef.current, {
        y: "-=15",
        duration: 2.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 1
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={sectionRef}
      className="relative z-10 overflow-hidden border-t border-white/[0.05]"
      style={{ background: "linear-gradient(to bottom, transparent, rgba(59,130,246,0.03) 50%, #050505)" }}
    >
      {/* ── "Ready to Build?" section ──────────────────────────── */}
      <div className="max-w-5xl mx-auto px-6 pt-28 pb-20 text-center">

        {/* Ambient glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-[120px] pointer-events-none"
          style={{ background: "radial-gradient(ellipse, rgba(59,130,246,0.08) 0%, transparent 70%)" }}
        />

        <p className="font-mono text-[11px] tracking-[0.4em] text-accent uppercase mb-6">
          Open to New Projects
        </p>

        <h2
          ref={headingRef}
          className="font-display font-extrabold leading-none tracking-tight mb-20 md:mb-24 text-white relative z-10"
          style={{ fontSize: "clamp(3rem, 9vw, 7rem)" }}
        >
          Ready to{" "}
          <span className="gradient-text">Build?</span>
        </h2>

        {/* CTA */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 relative z-20">
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}
            className="relative inline-flex items-center justify-center gap-2 px-10 py-4 rounded-full text-sm font-semibold text-white transition-all duration-300"
            style={{
              background: "linear-gradient(135deg,#3b82f6 0%,#2563eb 100%)",
              boxShadow: "0 0 0 1px rgba(59,130,246,0.5),0 4px 24px rgba(59,130,246,0.35)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = "0 0 0 1px rgba(59,130,246,0.9),0 6px 40px rgba(59,130,246,0.65)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "0 0 0 1px rgba(59,130,246,0.5),0 4px 24px rgba(59,130,246,0.35)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            Start a Project
          </a>
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=ahsanullahofficial49@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-10 py-4 rounded-full text-sm font-semibold text-white border border-[#3b82f6]/30 hover:border-[#3b82f6] hover:bg-[#3b82f6]/10 transition-all duration-300"
          >
            ahsanullahofficial49@gmail.com
          </a>
        </div>

        {/* Social icons row */}
        <div className="flex items-center justify-center gap-4 mb-20">
          {socials.map((s) => (
            <MagneticIcon key={s.name} {...s} />
          ))}
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-10" />

        {/* Meta row */}
        <div
          ref={metaRef}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 text-white/20 text-xs font-mono tracking-widest"
        >
          <span>© {new Date().getFullYear()} Ahsan Ullah. All rights reserved.</span>
          <span className="flex items-center gap-2">
            Crafted with
            <span className="text-accent">♥</span>
            using React · Tailwind · GSAP · Three.js
          </span>
          <span>Designed & Developed by Ahsan</span>
        </div>
      </div>

      {/* ── Animated SVG Wave (decorative bottom) ──────────────── */}
      <AnimatedWave />

      {/* Wave animation keyframes injected inline */}
      <style>{`
        @keyframes waveMove1 {
          0%, 100% { d: path("M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,100 L0,100 Z"); }
          50%       { d: path("M0,55 C200,10 480,80 720,50 C960,20 1200,80 1440,55 L1440,100 L0,100 Z"); }
        }
        @keyframes waveMove2 {
          0%, 100% { d: path("M0,60 C200,20 440,90 720,55 C1000,20 1240,90 1440,60 L1440,100 L0,100 Z"); }
          50%       { d: path("M0,45 C240,85 480,15 720,45 C960,75 1200,15 1440,45 L1440,100 L0,100 Z"); }
        }
      `}</style>
    </footer>
  );
}
