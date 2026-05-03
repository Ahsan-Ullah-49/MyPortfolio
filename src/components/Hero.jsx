import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import heroImage from "../assets/HeroImage.jpeg";

/* ══════════════════════════════════════════════════════════════════
   RESUME DATA  (exported so CVModal.jsx can import it)
══════════════════════════════════════════════════════════════════ */
export const RESUME = {
  name:        "Ahsan Ullah",
  role:        "Frontend Developer & UI/UX Designer",
  email:       "ahsanullahofficial49@gmail.com",
  phone:       "+923265075365",
  location:    "Okara, Pakistan",
  education:   "ICS Student (1st Year) · Govt. Post Graduate College, Okara",
  experience:  "1+ Years",
  projects:    "10+ Completed",
  clients:     "3+ Happy Clients",
  github:      "https://github.com/Ahsan-Ullah-49",
  linkedin:    "https://www.linkedin.com/in/ahsan-ullah-a168a525a/",
  instagram:   "https://www.instagram.com/dolla_g49/",
  whatsapp:    "https://wa.me/923265075365",
  skills:      ["HTML & CSS", "Tailwind CSS", "UI/UX Design", "JavaScript", "React.js", "GSAP Animations", "Three.js", "Python"],
  projectList: [
    { 
      name: "University of Sahiwal Redesign", 
      tech: ["React", "GSAP", "Tailwind", "Vite"],
      desc: "Engineered a high-performance, responsive frontend architecture with GSAP-powered motion design."
    },
    { 
      name: "Velitox SaaS Productivity", 
      tech: ["React", "Three.js", "GSAP", "Tailwind"],
      desc: "Architected an immersive 3D interactive interface with Three.js focusing on premium UI/UX fluidity."
    },
    { 
      name: "Gourmet Food System", 
      tech: ["React", "Tailwind CSS", "GSAP"],
      desc: "Optimized a silky-smooth ordering interface and interactive menu focusing on frontend excellence."
    },
  ],
};

/* ══════════════════════════════════════════════════════════════════
   ROBUST TYPEWRITER HOOK
   — uses refs for all mutable state to avoid stale closure bugs
   — only starts when `enabled` is true
══════════════════════════════════════════════════════════════════ */
function useTypewriter({ words, typeMs = 90, delMs = 60, pauseMs = 1600, enabled = true }) {
  const [display,  setDisplay]  = useState("");
  const [wordIdx,  setWordIdx]  = useState(0);
  const timerRef  = useRef(null);
  const stateRef  = useRef({ phase: "typing", char: 0, wordIdx: 0 });

  useEffect(() => {
    clearTimeout(timerRef.current);

    if (!enabled) {
      setDisplay("");
      setWordIdx(0);
      stateRef.current = { phase: "typing", char: 0, wordIdx: 0 };
      return;
    }

    const s = stateRef.current;
    s.phase = "typing"; s.char = 0; s.wordIdx = 0;

    const tick = () => {
      const word = words[s.wordIdx];
      if (s.phase === "typing") {
        s.char++;
        setDisplay(word.slice(0, s.char));
        if (s.char >= word.length) {
          s.phase = "pausing";
          timerRef.current = setTimeout(tick, pauseMs);
        } else {
          timerRef.current = setTimeout(tick, typeMs);
        }
      } else if (s.phase === "pausing") {
        s.phase = "deleting";
        timerRef.current = setTimeout(tick, delMs);
      } else {
        s.char--;
        setDisplay(word.slice(0, s.char));
        if (s.char <= 0) {
          s.wordIdx = (s.wordIdx + 1) % words.length;
          setWordIdx(s.wordIdx);
          s.phase = "typing";
          timerRef.current = setTimeout(tick, typeMs * 3);
        } else {
          timerRef.current = setTimeout(tick, delMs);
        }
      }
    };

    timerRef.current = setTimeout(tick, enabled ? 300 : 0);
    return () => clearTimeout(timerRef.current);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled]);

  return { display, wordIdx };
}

/* ══════════════════════════════════════════════════════════════════
   ANIMATED COUNTER
══════════════════════════════════════════════════════════════════ */
function Counter({ target, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref      = useRef(null);
  const started  = useRef(false);

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const steps = 40; const dur = 1200;
        let cur = 0;
        const id = setInterval(() => {
          cur += target / steps;
          if (cur >= target) { setCount(target); clearInterval(id); }
          else setCount(Math.round(cur));
        }, dur / steps);
      }
    }, { threshold: 0.6 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, [target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

/* ══════════════════════════════════════════════════════════════════
   MAGNETIC BUTTON WRAPPER
══════════════════════════════════════════════════════════════════ */
function MagBtn({ href, id, onClick, style, className, children }) {
  const ref = useRef(null);
  const move = (e) => {
    const r = ref.current.getBoundingClientRect();
    gsap.to(ref.current, {
      x: (e.clientX - r.left - r.width  / 2) * 0.28,
      y: (e.clientY - r.top  - r.height / 2) * 0.28,
      duration: 0.35, ease: "power2.out",
    });
  };
  const leave = () =>
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.55, ease: "elastic.out(1,0.5)" });

  return (
    <a ref={ref} href={href} id={id} data-cursor-hover
      onClick={onClick} onMouseMove={move} onMouseLeave={leave}
      className={className} style={{ willChange: "transform", ...style }}
    >{children}</a>
  );
}

/* ══════════════════════════════════════════════════════════════════
   STATS BAR
══════════════════════════════════════════════════════════════════ */
const STATS_DATA = [
  { num: 1, suffix: "+", label: "Year Experience",    glow: "rgba(59,130,246,0.7)",
    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg> },
  { num: 10, suffix: "+", label: "Projects Completed", glow: "rgba(168,85,247,0.7)",
    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22,4 12,14.01 9,11.01"/></svg> },
  { num: 3, suffix: "+", label: "Happy Clients",      glow: "rgba(245,158,11,0.7)",
    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
];

function StatsBar() {
  return (
    <div className="flex flex-wrap gap-6 pt-8 mt-8 border-t border-white/[0.07]">
      {STATS_DATA.map(({ num, suffix, label, glow, icon }) => (
        <div key={label} className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ color: glow.replace(/[\d.]+\)$/, "1)").replace("rgba(", "rgb(").replace(/,\s*[\d.]+\)/, ")"),
              background: glow.replace(/[\d.]+\)$/, "0.12)"),
              boxShadow: `0 0 0 1px ${glow.replace(/[\d.]+\)$/, "0.20)")}` }}>
            {icon}
          </div>
          <div>
            <p className="font-jakarta font-bold text-xl text-white leading-none"
              style={{ textShadow: `0 0 12px ${glow}` }}>
              <Counter target={num} suffix={suffix} />
            </p>
            <p className="font-mono text-[9px] text-white/35 tracking-widest uppercase mt-0.5">{label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   FLOATING IMAGE CARD WITH TECH CLOUD
══════════════════════════════════════════════════════════════════ */
const TECH_STACK = [
  { id: "react",  label: "React.js",   color: "#60a5fa", pos: { top: "8%", left: "-12%" } },
  { id: "gsap",   label: "GSAP",       color: "#a3e635", pos: { top: "28%", right: "-16%" } },
  { id: "figma",  label: "Figma",      color: "#f87171", pos: { bottom: "22%", left: "-18%" } },
  { id: "js",     label: "JavaScript", color: "#facc15", pos: { bottom: "8%", right: "-10%" } },
  { id: "python", label: "Python",     color: "#93c5fd", pos: { top: "58%", left: "-22%" } },
  { id: "three",  label: "Three.js",   color: "#e5e7eb", pos: { bottom: "-6%", left: "30%" } },
  { id: "tw",     label: "Tailwind",   color: "#22d3ee", pos: { top: "-6%", right: "25%" } },
];

function FloatingImage() {
  const containerRef = useRef(null);
  const cardRef = useRef(null);
  const tagsRef = useRef([]);

  useEffect(() => {
    // Card main float
    gsap.to(cardRef.current, {
      y: -20, rotateZ: 1.2, duration: 3.4,
      ease: "sine.inOut", yoyo: true, repeat: -1
    });

    // Independent tags float for 3D depth feel
    tagsRef.current.forEach((tag, i) => {
      if (!tag) return;
      const durX = 3 + Math.random() * 2;
      const durY = 3 + Math.random() * 2;
      
      // Guarantee a minimum motion range so it never looks static
      const dirX = Math.random() > 0.5 ? 1 : -1;
      const dirY = Math.random() > 0.5 ? 1 : -1;
      const moveX = dirX * (15 + Math.random() * 15);
      const moveY = dirY * (15 + Math.random() * 15);

      gsap.to(tag, {
        y: moveY, duration: durY, ease: "sine.inOut",
        yoyo: true, repeat: -1, delay: i * 0.2
      });
      gsap.to(tag, {
        x: moveX, duration: durX, ease: "sine.inOut",
        yoyo: true, repeat: -1, delay: i * 0.3
      });
    });
  }, []);

  return (
    <div ref={containerRef} className="relative flex items-center justify-center w-full py-10">
      <div className="absolute inset-0 rounded-3xl pointer-events-none"
        style={{ background: "radial-gradient(ellipse 75% 65% at 50% 50%, rgba(59,130,246,0.13) 0%, transparent 75%)" }} />

      {/* Wrapper that maps exactly to the card's dimensions. Tags are relative to THIS wrapper. */}
      <div className="relative mx-auto z-10"
        style={{ width:"100%", maxWidth:"340px", aspectRatio:"3/4", maxHeight:"500px" }}>
        
        {/* The Card itself (z-10) */}
        <div ref={cardRef} className="absolute inset-0 rounded-3xl overflow-hidden z-10"
          style={{
            background:"linear-gradient(145deg,rgba(59,130,246,0.12),rgba(168,85,247,0.05))",
            border:"1px solid rgba(59,130,246,0.3)",
            boxShadow:"0 0 50px rgba(59,130,246,0.25), inset 0 0 20px rgba(255,255,255,0.05)",
            willChange:"transform" }}>
          <img src={heroImage}
            alt={RESUME.name} className="w-full h-full object-cover" style={{ opacity:1 }} />
        </div>

        {/* Cloud of floating tech tags (z-20 to overlap image) */}
        {TECH_STACK.map((tech, i) => (
          <div
            key={tech.id}
            ref={(el) => (tagsRef.current[i] = el)}
            className="absolute px-3 py-1.5 rounded-full text-[11px] font-mono font-semibold z-20 pointer-events-none"
            style={{
              ...tech.pos,
              background: `rgba(5,5,5,0.65)`,
              backdropFilter: "blur(12px)",
              border: `1px solid ${tech.color}40`,
              color: tech.color,
              boxShadow: `0 8px 32px rgba(0,0,0,0.5), 0 0 12px ${tech.color}25`,
              willChange: "transform"
            }}
          >
            {tech.label}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   HERO SECTION
══════════════════════════════════════════════════════════════════ */
const LAST_NAME_COLORS = [
  "#22c55e",  // Green Glowing
  "#ef4444",  // Red Glow
  "#f59e0b",  // Golden Yellow Glow
  "#a855f7",  // Purple Glow
];
const TAGLINE_WORDS = ["UI/UX Designer", "Problem Solver", "Motion Artist"];

export default function Hero() {
  const sectionRef  = useRef(null);
  const nameRef     = useRef(null);   // "Ahsan Ullah" — single line
  const rightRef    = useRef(null);
  const eyebrowRef  = useRef(null);
  const belowRef    = useRef(null);   // tagline + buttons + stats

  /* Gate: typewriters only start after name entrance finishes */
  const [nameReady, setNameReady] = useState(false);

  /* "Afzal" colour index advances when wordIdx increments */
  const { display: afzalText, wordIdx: afzalCycle } = useTypewriter({
    words: ["Afzal", "Afzal", "Afzal", "Afzal"], typeMs: 95, delMs: 65, pauseMs: 1700, enabled: nameReady,
  });
  const typeColor = LAST_NAME_COLORS[afzalCycle % LAST_NAME_COLORS.length];

  /* Tagline role typewriter */
  const { display: taglineRole } = useTypewriter({
    words: TAGLINE_WORDS, typeMs: 80, delMs: 50, pauseMs: 2000, enabled: nameReady,
  });

  /* ── GSAP entrance ─────────────────────────────────────────────── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hide everything
      gsap.set([eyebrowRef.current, nameRef.current,
                 belowRef.current, rightRef.current], { opacity: 0 });
      gsap.set(nameRef.current,     { y: 60, filter: "blur(12px)" });
      gsap.set(eyebrowRef.current,  { y: 14 });
      gsap.set(belowRef.current,    { y: 24 });
      gsap.set(rightRef.current,    { x: 50 });

      const tl = gsap.timeline({ delay: 0.2 });

      // Eyebrow fades in
      tl.to(eyebrowRef.current, { opacity: 1, y: 0, duration: 0.55, ease: "power3.out" })

      // "Ahsan Ullah" drops in as one block
        .to(nameRef.current, {
          opacity: 1, y: 0, filter: "blur(0px)", duration: 0.80, ease: "back.out(1.4)",
          onComplete: () => setNameReady(true),   // ← unlock typewriters HERE
        }, "-=0.2")

      // Below content (tagline + buttons + stats)
        .to(belowRef.current, { opacity: 1, y: 0, duration: 0.65, ease: "power3.out" }, "-=0.2")

      // Image slides in from right
        .to(rightRef.current, { opacity: 1, x: 0, duration: 0.9, ease: "power3.out" }, "-=0.7");
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  /* Shared button style (solid blue, used for both CTAs) */
  const primaryBtnStyle = {
    background: "linear-gradient(135deg,#3b82f6 0%,#2563eb 100%)",
    boxShadow: "0 0 0 1px rgba(59,130,246,0.5),0 4px 24px rgba(59,130,246,0.35)",
    transition: "box-shadow 0.3s ease, transform 0.3s ease",
  };
  const primaryBtnHover = (e) => {
    e.currentTarget.style.boxShadow = "0 0 0 1px rgba(59,130,246,0.9),0 6px 40px rgba(59,130,246,0.65)";
    e.currentTarget.style.transform = "translateY(-2px)";
  };
  const primaryBtnLeave = (e) => {
    e.currentTarget.style.boxShadow = "0 0 0 1px rgba(59,130,246,0.5),0 4px 24px rgba(59,130,246,0.35)";
    e.currentTarget.style.transform = "translateY(0)";
  };

  return (
    <section id="home" ref={sectionRef}
      className="relative min-h-screen flex items-center"
      style={{ paddingTop: "70px" }}>

      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background:"radial-gradient(ellipse 85% 65% at 25% 50%,transparent 0%,rgba(5,5,5,0.50) 100%)" }} />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-10 items-center py-12 md:py-16">

          {/* ════════════ LEFT: Text ══════════════════════════════════ */}
          <div className="flex flex-col justify-center order-1 mt-4 md:mt-0">

            {/* Eyebrow */}
            <div ref={eyebrowRef} className="flex items-center gap-2.5 mb-6">
              <div className="h-px w-8" style={{ background:"linear-gradient(90deg,transparent,#3b82f6)" }} />
              <span className="font-mono text-[10px] tracking-[0.42em] text-accent/70 uppercase">
                Portfolio · 2026
              </span>
            </div>

            {/* Name — "Ahsan Ullah" on ONE line, "Afzal" typewriter below */}
            <div className="mb-4 leading-[0.93]">

              {/* LINE 1: "Ahsan Ullah" — single block, gradient, animated */}
              <div ref={nameRef}
                className="font-jakarta font-extrabold tracking-tight select-none"
                style={{
                  fontSize: "clamp(3.3rem, 10vw, 5.5rem)",
                  lineHeight: "1.05",
                  background: "linear-gradient(90deg,#3b82f6 0%,#818cf8 35%,#a855f7 65%,#3b82f6 100%)",
                  backgroundSize: "200% 100%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  animation: "gradientFlow 5s linear infinite",
                }}>
                Ahsan Ullah
              </div>

              {/* LINE 2: "Afzal" typewriter — starts after nameReady */}
              <div className="font-jakarta font-extrabold tracking-tight flex items-baseline gap-2"
                style={{ fontSize: "clamp(3.3rem, 10vw, 5.5rem)", lineHeight: "1.05" }}>
                <span style={{ color: typeColor, transition: "color 0.3s ease",
                  textShadow: `0 0 30px ${typeColor}55` }}>
                  {afzalText}
                </span>
                <span className="inline-block w-[3px] rounded-full align-middle flex-shrink-0"
                  style={{ height: "0.82em", background: typeColor,
                    animation: "caretBlink 1s step-end infinite",
                    boxShadow: `0 0 10px ${typeColor}` }} />
              </div>
            </div>

            {/* Everything below — tagline + buttons + stats */}
            <div ref={belowRef}>
              {/* Tagline with second typewriter */}
              <p className="font-sans font-light text-white/40 tracking-[0.16em] uppercase mb-10"
                style={{ fontSize:"clamp(0.60rem,1.3vw,0.78rem)" }}>
                Creative Frontend Developer&nbsp;·&nbsp;
                <span className="text-white/65">{taglineRole}</span>
                <span className="inline-block w-[2px] h-[0.9em] align-middle ml-[2px] rounded-sm"
                  style={{ background:"rgba(255,255,255,0.45)", animation:"caretBlink 1s step-end infinite" }} />
              </p>

              {/* CTA buttons — both magnetic, both solid blue */}
              <div className="flex flex-wrap items-center gap-3">
                {/* Primary: Get In Touch */}
                <MagBtn href="#contact" id="hero-get-in-touch"
                  onClick={(e) => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior:"smooth" }); }}
                  className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-sm font-semibold text-white"
                  style={primaryBtnStyle}
                  onMouseEnter={primaryBtnHover} onMouseLeave={primaryBtnLeave}>
                  Get In Touch
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </MagBtn>

                {/* Secondary: View Work — same solid blue */}
                <MagBtn href="#projects" id="hero-view-work"
                  onClick={(e) => { e.preventDefault(); document.querySelector("#projects")?.scrollIntoView({ behavior:"smooth" }); }}
                  className="inline-flex items-center gap-2 px-6 py-4 rounded-full text-sm font-semibold text-white"
                  style={{ ...primaryBtnStyle, background:"transparent",
                    boxShadow:"0 0 0 1px rgba(59,130,246,0.40)",
                    color:"rgba(255,255,255,0.65)" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = "0 0 0 1px rgba(59,130,246,0.80),0 4px 20px rgba(59,130,246,0.30)";
                    e.currentTarget.style.color = "#fff";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "0 0 0 1px rgba(59,130,246,0.40)";
                    e.currentTarget.style.color = "rgba(255,255,255,0.65)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}>
                  View Work
                </MagBtn>
              </div>

              {/* Stats */}
              <StatsBar />
            </div>
          </div>

          {/* ════════════ RIGHT: Image ════════════════════════════════ */}
          <div ref={rightRef} className="flex items-center justify-center order-2 relative mt-8 md:mt-0">
            <FloatingImage />
          </div>
        </div>
      </div>

      {/* Keyframes */}
      <style>{`
        @keyframes gradientFlow {
          0%   { background-position: 0%   50%; }
          100% { background-position: 200% 50%; }
        }
        @keyframes caretBlink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
        @keyframes floatTag {
          0%, 100% { transform: translateY(0px)   rotate(-1deg); }
          50%       { transform: translateY(-10px) rotate(1deg);  }
        }
      `}</style>
    </section>
  );
}
