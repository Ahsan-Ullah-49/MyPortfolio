import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import profileImg from "../assets/ProfileImage.png";

gsap.registerPlugin(ScrollTrigger);

/* ══════════════════════════════════════════════════════════════════
   GRADIENT TECH SPAN — Electric Blue → Purple gradient text
══════════════════════════════════════════════════════════════════ */
function Tech({ children }) {
  return (
    <span
      style={{
        background: "linear-gradient(135deg, #38bdf8 0%, #818cf8 50%, #a855f7 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        fontWeight: 600,
      }}
    >
      {children}
    </span>
  );
}

/* ══════════════════════════════════════════════════════════════════
   BENTO BADGE — Individual info card inside the right panel
══════════════════════════════════════════════════════════════════ */
function BentoBadge({ icon, label, sublabel, glow, delay }) {
  const ref = useRef(null);

  useEffect(() => {
    // Subtle perpetual float
    gsap.to(ref.current, {
      y: -8,
      duration: 2.5 + Math.random() * 1.2,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
      delay: delay || 0,
    });
  }, [delay]);

  return (
    <div
      ref={ref}
      className="flex items-center gap-3 px-4 py-3 rounded-2xl"
      style={{
        background: "rgba(255,255,255,0.04)",
        backdropFilter: "blur(20px)",
        border: `1px solid ${glow}33`,
        boxShadow: `0 0 24px ${glow}18, inset 0 1px 0 rgba(255,255,255,0.06)`,
        willChange: "transform",
      }}
    >
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-base"
        style={{
          background: `${glow}18`,
          border: `1px solid ${glow}40`,
          boxShadow: `0 0 12px ${glow}25`,
        }}
      >
        {icon}
      </div>
      <div>
        <p className="text-white font-semibold text-sm leading-none">{label}</p>
        <p className="text-white/40 text-[11px] mt-1 font-mono tracking-wider">{sublabel}</p>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   SKILL PILL — Small inline chip for the skills grid
══════════════════════════════════════════════════════════════════ */
const SKILL_PILLS = [
  { label: "React",       color: "#60a5fa" },
  { label: "Three.js",    color: "#e5e7eb" },
  { label: "GSAP",        color: "#a3e635" },
  { label: "Tailwind CSS",color: "#22d3ee" },
  { label: "Python",      color: "#facc15" },
  { label: "JavaScript",  color: "#fb923c" },
  { label: "UI/UX",       color: "#c084fc" },
];

/* ══════════════════════════════════════════════════════════════════
   3D TILT CARD — Right column glassmorphic visual
══════════════════════════════════════════════════════════════════ */
function TiltCard() {
  const cardRef = useRef(null);
  const glowRef = useRef(null);

  const onMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const { left, top, width, height } = card.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    const rotateX = ((y / height) - 0.5) * -18;
    const rotateY = ((x / width) - 0.5) * 18;
    const glowX = (x / width) * 100;
    const glowY = (y / height) * 100;

    gsap.to(card, {
      rotateX,
      rotateY,
      duration: 0.4,
      ease: "power2.out",
    });

    if (glowRef.current) {
      glowRef.current.style.background = `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(56,189,248,0.18) 0%, transparent 65%)`;
    }
  };

  const onMouseLeave = () => {
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.7,
      ease: "elastic.out(1, 0.5)",
    });
    if (glowRef.current) glowRef.current.style.background = "none";
  };

  return (
    <div
      className="relative w-full"
      style={{ perspective: "900px" }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <div
        ref={cardRef}
        className="relative rounded-3xl overflow-hidden"
        style={{
          background: "rgba(255,255,255,0.03)",
          backdropFilter: "blur(28px) saturate(180%)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow:
            "0 32px 80px rgba(0,0,0,0.55), 0 0 0 1px rgba(56,189,248,0.10), inset 0 1px 0 rgba(255,255,255,0.08)",
          willChange: "transform",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Animated Live Border */}
        <div 
          className="absolute inset-0 pointer-events-none z-0 rounded-3xl overflow-hidden"
          style={{
            padding: "1.5px",
            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
        >
          <div 
            className="absolute left-1/2 top-1/2 w-[200%] h-[200%]"
            style={{
              transform: "translate(-50%, -50%)",
              background: "conic-gradient(from 0deg, transparent 70%, #38bdf8 85%, #a855f7 100%)",
              animation: "spinBorder 9s linear infinite"
            }}
          />
        </div>

        {/* Mouse-follow glow overlay */}
        <div ref={glowRef} className="absolute inset-0 pointer-events-none z-10 rounded-3xl transition-all duration-150" />

        {/* Top ambient glow stripe */}
        <div
          className="absolute top-0 left-0 right-0 h-px pointer-events-none"
          style={{ background: "linear-gradient(90deg, transparent, rgba(56,189,248,0.5), rgba(168,85,247,0.5), transparent)" }}
        />

        <div className="p-6 flex flex-col gap-5">

          {/* Header label */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span
                className="font-jakarta font-black text-xl text-white tracking-tight select-none"
                style={{
                  letterSpacing: "-0.01em",
                  animation: "logoBreathe 3s ease-in-out infinite",
                }}
              >
                AUA<span style={{ color: "#3b82f6" }}>.</span>
              </span>
            </div>
          </div>

          {/* Profile Image */}
          <div className="flex justify-center">
            <div
              className="relative w-24 h-24 rounded-full flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, rgba(56,189,248,0.08), rgba(168,85,247,0.08))",
                border: "1px solid rgba(56,189,248,0.20)",
                boxShadow: "0 0 40px rgba(56,189,248,0.15)",
              }}
            >
              <img src={profileImg} alt="Ahsan Ullah Afzal" className="w-full h-full rounded-full object-cover p-[2px]" />
              {/* Orbit ring */}
              <div
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{
                  border: "1px dashed rgba(56,189,248,0.18)",
                  animation: "orbitSpin 12s linear infinite",
                }}
              />
              {/* Orbit dot */}
              <div
                className="absolute w-2 h-2 rounded-full"
                style={{
                  top: "-4px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  background: "#3b82f6",
                  boxShadow: "0 0 8px #3b82f6",
                  animation: "orbitSpin 12s linear infinite",
                  transformOrigin: "0 52px",
                }}
              />
            </div>
          </div>

          {/* Name + Role */}
          <div className="text-center">
            <h3 className="font-jakarta font-bold text-white text-lg leading-tight">Ahsan Ullah Afzal</h3>
            <p className="text-white/40 text-xs mt-1 font-mono tracking-wide">Creative Frontend Developer & UI/UX Designer</p>
          </div>

          {/* Badges */}
          <div className="flex flex-col gap-3">
            <BentoBadge
              icon="🚀"
              label="AI-Integrated Workflow"
              sublabel="Modern AI tooling"
              glow="#38bdf8"
              delay={0}
            />
            <BentoBadge
              icon="⚡"
              label="Started at 16"
              sublabel="First website · 1+ year experience"
              glow="#a855f7"
              delay={0.4}
            />
            <BentoBadge
              icon="🎨"
              label="UI/UX Precision"
              sublabel="Design + Code synergy"
              glow="#f472b6"
              delay={0.8}
            />
          </div>

          {/* Skills grid */}
          <div>
            <p className="font-mono text-[9px] tracking-[0.3em] text-white/25 uppercase mb-3">Tech Stack</p>
            <div className="flex flex-wrap gap-2">
              {SKILL_PILLS.map(({ label, color }) => (
                <span
                  key={label}
                  className="px-2.5 py-1 rounded-full text-[11px] font-mono font-medium"
                  style={{
                    background: `${color}14`,
                    border: `1px solid ${color}35`,
                    color,
                  }}
                >
                  {label}
                </span>
              ))}
            </div>
          </div>

          {/* Bottom status bar */}
          <div
            className="flex items-center gap-2 py-2.5 px-3 rounded-xl"
            style={{ background: "rgba(74,222,128,0.06)", border: "1px solid rgba(74,222,128,0.15)" }}
          >
            <div
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ background: "#4ade80", boxShadow: "0 0 8px #4ade80", animation: "pulseDot 2s ease-in-out infinite" }}
            />
            <span className="text-[11px] text-green-400/80 font-mono tracking-wide">Available for freelance projects</span>
          </div>
        </div>

        {/* Bottom ambient glow stripe */}
        <div
          className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
          style={{ background: "linear-gradient(90deg, transparent, rgba(168,85,247,0.3), rgba(56,189,248,0.3), transparent)" }}
        />
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   ABOUT SECTION
══════════════════════════════════════════════════════════════════ */
export default function About() {
  const sectionRef   = useRef(null);
  const headingRef   = useRef(null);
  const underlineRef = useRef(null);
  const para1Ref     = useRef(null);
  const para2Ref     = useRef(null);
  const para3Ref     = useRef(null);
  const para4Ref     = useRef(null);
  const rightRef     = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      /* ── Initial hidden states ──────────────────────────────────── */
      gsap.set(headingRef.current,   { opacity: 0, y: 40 });
      gsap.set(underlineRef.current, { scaleX: 0, transformOrigin: "left center" });
      gsap.set(
        [para1Ref.current, para2Ref.current, para3Ref.current, para4Ref.current],
        { opacity: 0, y: 40 }
      );
      gsap.set(rightRef.current, { opacity: 0, scale: 0.88, y: 30 });

      /* ── Master timeline with ScrollTrigger ─────────────────────── */
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
          end: "bottom 20%",
          toggleActions: "play none none none",
        },
      });

      // 1. Heading slides up
      tl.to(headingRef.current, {
        opacity: 1, y: 0,
        duration: 0.8, ease: "power3.out",
      })
      // 2. Underline expands
      .to(underlineRef.current, {
        scaleX: 1,
        duration: 0.6, ease: "power3.out",
      }, "-=0.4")
      // 3. Paragraphs stagger up
      .to(para1Ref.current, { opacity: 1, y: 0, duration: 0.65, ease: "power3.out" }, "-=0.15")
      .to(para2Ref.current, { opacity: 1, y: 0, duration: 0.65, ease: "power3.out" }, "-=0.40")
      .to(para3Ref.current, { opacity: 1, y: 0, duration: 0.65, ease: "power3.out" }, "-=0.40")
      .to(para4Ref.current, { opacity: 1, y: 0, duration: 0.65, ease: "power3.out" }, "-=0.40")
      // 4. Right card scales in
      .to(rightRef.current, {
        opacity: 1, scale: 1, y: 0,
        duration: 0.90, ease: "power3.out",
      }, "-=0.85");

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative"
      style={{ padding: "96px 0 80px" }}
    >
      {/* Subtle section ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 20% 60%, rgba(56,189,248,0.05) 0%, transparent 65%), radial-gradient(ellipse 50% 50% at 80% 40%, rgba(168,85,247,0.05) 0%, transparent 65%)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6">

        {/* ────────────────── Asymmetric 2-col grid ──────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-12 lg:gap-16 items-start">

          {/* ══════════ LEFT: Content ══════════════════════════════════ */}
          <div className="flex flex-col gap-8">

            {/* Heading */}
            <div>
              {/* Eyebrow */}
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="h-px w-8"
                  style={{ background: "linear-gradient(90deg, transparent, #38bdf8)" }}
                />
                <span className="font-mono text-[10px] tracking-[0.40em] text-sky-400/60 uppercase">
                  Who I Am
                </span>
              </div>

              {/* Main heading */}
              <div ref={headingRef} className="relative inline-block">
                <h2
                  className="heading-primary"
                  style={{ fontSize: "clamp(2.5rem, 5vw, 3.8rem)" }}
                >
                  About Me
                  {/* Glowing dot accent */}
                  <span
                    className="inline-block w-2 h-2 rounded-full ml-2 align-middle"
                    style={{
                      background: "#38bdf8",
                      boxShadow: "0 0 12px #38bdf8, 0 0 24px rgba(56,189,248,0.5)",
                      animation: "pulseDot 2.5s ease-in-out infinite",
                    }}
                  />
                </h2>

                {/* Animated underline */}
                <div
                  ref={underlineRef}
                  className="mt-3 h-[3px] rounded-full"
                  style={{
                    width: "72px",
                    background: "linear-gradient(90deg, #38bdf8, #a855f7)",
                    boxShadow: "0 0 12px rgba(56,189,248,0.5)",
                  }}
                />
              </div>
            </div>

            {/* ── Paragraphs ── */}
            <div className="flex flex-col gap-6">

              {/* P1 */}
              <p
                ref={para1Ref}
                className="text-gray-300 leading-relaxed"
                style={{ fontSize: "clamp(0.92rem, 1.5vw, 1.02rem)" }}
              >
                I'm a passionate front-end developer with strong experience in building modern,
                responsive, and visually engaging web interfaces. My journey in tech started when I
                created my first website at{" "}
                <Tech>16</Tech>, and since then I've loved bringing designs to life with clean,
                efficient code.
              </p>

              {/* P2 */}
              <p
                ref={para2Ref}
                className="text-gray-300 leading-relaxed"
                style={{ fontSize: "clamp(0.92rem, 1.5vw, 1.02rem)" }}
              >
                I specialize in{" "}
                <Tech>HTML</Tech>,{" "}
                <Tech>CSS</Tech>,{" "}
                <Tech>Tailwind CSS</Tech>,{" "}
                <Tech>React</Tech>,{" "}
                <Tech>GSAP</Tech>,{" "}
                <Tech>Three.js</Tech>,{" "}
                <Tech>Python</Tech>, and{" "}
                <Tech>JavaScript</Tech>, with a sharp eye for <Tech>UI/UX design</Tech>. My workflow blends
                creativity with technical precision to craft smooth, intuitive, and user-focused
                digital experiences.
              </p>

              {/* P3 */}
              <p
                ref={para3Ref}
                className="text-gray-300 leading-relaxed"
                style={{ fontSize: "clamp(0.92rem, 1.5vw, 1.02rem)" }}
              >
                I craft immersive and modern digital experiences. I focus on building responsive,
                interactive, and visually striking realities that engage users, spark curiosity, and
                leave a lasting impression. My goal is to blend creativity with clean functionality to
                deliver smooth, meaningful, and memorable digital moments.
              </p>

              {/* P4 — AI Highlighted */}
              <div
                ref={para4Ref}
                className="relative rounded-2xl px-5 py-4"
                style={{
                  background: "rgba(56,189,248,0.05)",
                  border: "1px solid rgba(56,189,248,0.18)",
                  boxShadow: "0 0 30px rgba(56,189,248,0.07)",
                }}
              >
                {/* Left accent bar */}
                <div
                  className="absolute left-0 top-3 bottom-3 w-[3px] rounded-full"
                  style={{ background: "linear-gradient(180deg, #38bdf8, #a855f7)" }}
                />
                <p
                  className="text-gray-200 leading-relaxed pl-3"
                  style={{ fontSize: "clamp(0.92rem, 1.5vw, 1.02rem)" }}
                >
                  I am an expert in utilizing{" "}
                  <Tech>AI tools</Tech> according to modern world requirements to optimize workflows
                  and deliver cutting-edge solutions.
                </p>
              </div>
            </div>


          </div>

          {/* ══════════ RIGHT: 3D Tilt Glassmorphic Card ═══════════════ */}
          <div ref={rightRef} className="flex items-start justify-center lg:justify-end lg:sticky lg:top-32">
            <div className="w-full max-w-sm">
              <TiltCard />
            </div>
          </div>

        </div>
      </div>

      {/* Keyframes */}
      <style>{`
        @keyframes pulseDot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.6; transform: scale(1.3); }
        }
        @keyframes orbitSpin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes logoBreathe {
          0%, 100% { text-shadow: 0 0 6px rgba(59,130,246,0.35), 0 0 12px rgba(59,130,246,0.15); }
          50%       { text-shadow: 0 0 18px rgba(59,130,246,0.85), 0 0 36px rgba(99,102,241,0.45), 0 0 60px rgba(59,130,246,0.20); }
        }
        @keyframes spinBorder {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to   { transform: translate(-50%, -50%) rotate(360deg); }
        }
      `}</style>
    </section>
  );
}
