import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Code2, Wind, PenTool, Braces, Hexagon, Zap, Box, BrainCircuit } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const SKILLS_DATA = [
  { name: "HTML & CSS", level: "Expert", percent: 100, color: "#f97316", icon: Code2 },
  { name: "Tailwind CSS", level: "Fluent", percent: 100, color: "#38bdf8", icon: Wind },
  { name: "UI/UX Design", level: "Creative Core", percent: 100, color: "#d946ef", icon: PenTool },
  { name: "JavaScript", level: "Advanced", percent: 90, color: "#facc15", icon: Braces },
  { name: "React.js", level: "Architect", percent: 90, color: "#60a5fa", icon: Hexagon },
  { name: "GSAP", level: "Motion Expert", percent: 80, color: "#a3e635", icon: Zap },
  { name: "Three.js", level: "3D Visualization", percent: 70, color: "#f3f4f6", icon: Box },
  { name: "Python", level: "Logic & AI", percent: 60, color: "#3b82f6", icon: BrainCircuit },
];

function SkillCard({ skill, index }) {
  const cardRef = useRef(null);
  const progressRef = useRef(null);
  const glowRef = useRef(null);
  const [val, setVal] = useState(0);

  const Icon = skill.icon;

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 90%", // Trigger only when the card hits the bottom 10% of the screen
          toggleActions: "play none none none",
        }
      });

      // 1. Entrance animation
      tl.from(cardRef.current, {
        opacity: 0,
        scale: 0.5,
        rotationY: 15,
        rotationZ: -2,
        y: 60,
        duration: 0.8,
        ease: "back.out(1.7)",
        delay: (index % 4) * 0.1, // Stagger left-to-right per row
        onComplete: () => {
          gsap.to(cardRef.current, {
            y: "-=12",
            duration: 2 + Math.random() * 1.5,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
          });
        }
      })
      // 2. Progress Bar fill
      .fromTo(progressRef.current,
        { width: "0%" },
        { width: `${skill.percent}%`, duration: 1.5, ease: "power3.out" },
        "-=0.1"
      );

      // 3. Counter (synchronous with progress bar)
      const obj = { v: 0 };
      tl.to(obj, {
        v: skill.percent,
        duration: 1.5,
        ease: "power3.out",
        onUpdate: () => setVal(Math.round(obj.v)),
      }, "<");

    });

    return () => ctx.revert();
  }, [skill.percent, index]);

  const handleHover = () => {
    gsap.to(cardRef.current, { scale: 1.04, duration: 0.4, ease: "power2.out", borderColor: `${skill.color}55`, boxShadow: `0 10px 30px -10px ${skill.color}40` });
    gsap.to(glowRef.current, { opacity: 0.15, scale: 1.1, duration: 0.4, ease: "power2.out" });
  };
  const handleLeave = () => {
    gsap.to(cardRef.current, { scale: 1, duration: 0.4, ease: "power2.out", borderColor: "rgba(255,255,255,0.1)", boxShadow: "none" });
    gsap.to(glowRef.current, { opacity: 0, scale: 1, duration: 0.4, ease: "power2.out" });
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleHover}
      onMouseLeave={handleLeave}
      className="relative p-6 rounded-3xl flex flex-col gap-5 overflow-hidden group cursor-default"
      style={{
        background: "rgba(10, 10, 12, 0.4)",
        backdropFilter: "blur(16px) saturate(180%)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        willChange: "transform",
      }}
    >
      {/* Neon Hover Glow (Behind everything) */}
      <div
        ref={glowRef}
        className="absolute inset-0 pointer-events-none rounded-3xl"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${skill.color} 0%, transparent 65%)`,
          opacity: 0,
          mixBlendMode: "screen",
          zIndex: 0,
        }}
      />

      <div className="relative z-10 flex items-start justify-between">
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
          style={{
            background: `linear-gradient(135deg, ${skill.color}15, transparent)`,
            border: `1px solid ${skill.color}40`,
            boxShadow: `0 0 20px ${skill.color}15`,
            color: skill.color,
          }}
        >
          <Icon size={24} strokeWidth={1.5} />
        </div>
        <div className="font-mono font-bold text-3xl transition-all duration-300" style={{ color: skill.color, textShadow: `0 0 16px ${skill.color}40` }}>
          {val}<span className="text-lg text-white/50">%</span>
        </div>
      </div>

      <div className="relative z-10 mt-1">
        <h3 className="font-jakarta font-bold text-xl text-white tracking-wide">{skill.name}</h3>
        <p className="text-white/40 text-[10px] uppercase tracking-[0.2em] font-mono mt-1.5">{skill.level}</p>
      </div>

      {/* Progress Bar Container */}
      <div className="relative z-10 w-full h-1.5 mt-3 rounded-full overflow-hidden"
        style={{ background: "rgba(255,255,255,0.06)", boxShadow: "inset 0 1px 2px rgba(0,0,0,0.5)" }}>
        <div
          ref={progressRef}
          className="absolute left-0 top-0 h-full rounded-full"
          style={{
            background: `linear-gradient(90deg, transparent, ${skill.color})`,
            boxShadow: `0 0 12px ${skill.color}`,
          }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="relative bg-transparent" style={{ padding: "96px 0" }}>
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        
        {/* Section Heading */}
        <div ref={headingRef} className="mb-14">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8" style={{ background: "linear-gradient(90deg, transparent, #38bdf8)" }} />
            <span className="font-mono text-[10px] tracking-[0.40em] text-sky-400/60 uppercase">
              Technical Expertise
            </span>
          </div>
          <h2 className="heading-primary" style={{ fontSize: "clamp(2.5rem, 5vw, 3.8rem)" }}>
            My Technical Arsenal
          </h2>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {SKILLS_DATA.map((skill, index) => (
            <SkillCard key={skill.name} skill={skill} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
