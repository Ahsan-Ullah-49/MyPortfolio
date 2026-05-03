import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import universityImg from "../assets/university.PNG";
import velitoxImg    from "../assets/velitox.PNG";
import foodImg       from "../assets/food.PNG";

gsap.registerPlugin(ScrollTrigger);

/* ─── Project Data ──────────────────────────────────────────────── */
const PROJECTS = [
  {
    id:          1,
    title:       "University of Sahiwal",
    subtitle:    "Website Redesign",
    description:
      "A complete digital transformation of the University of Sahiwal's web presence — modernising the student experience with a clean, accessible, and high-performance architecture that truly reflects the institution's identity.",
    tech:        ["HTML", "CSS", "Tailwind CSS", "Javascript"],
    image:       universityImg,
    github:      "https://github.com/Ahsan-Ullah-49/Uni-Sahiwal-Assignment.git",
    liveDemo:    "https://uniofsahiwal.netlify.app/",
    reverse:     false,
  },
  {
    id:          2,
    title:       "Velitox",
    subtitle:    "Productivity Suite SaaS",
    description:
      "A premium SaaS productivity platform engineered for modern teams — powered by silky GSAP micro-animations, immersive Three.js visuals, and a blazing-fast React architecture built for scale and delight.",
    tech:        ["React", "GSAP", "Three.js", "Tailwind CSS"],
    image:       velitoxImg,
    github:      "https://github.com/Ahsan-Ullah-49/My-Small-Projects.git",
    liveDemo:    "https://velitox.vercel.app/",
    reverse:     true,
  },
  {
    id:          3,
    title:       "Restaurant Website",
    subtitle:    "Fast Food + Admin Panel",
    description:
      "A full-featured restaurant web application complete with a live menu, smooth ordering flow, and a powerful admin panel — all crafted on a clean mobile-first vanilla stack that performs beautifully on every device.",
    tech:        ["Javascript", "Tailwind CSS", "HTML"],
    image:       foodImg,
    github:      "https://github.com/Ahsan-Ullah-49/aufp.git",
    liveDemo:    "https://aufp.vercel.app/",
    reverse:     false,
  },
];

/* ─── Single Project Row ────────────────────────────────────────── */
function ProjectRow({ project, index }) {
  const rowRef     = useRef(null);
  const imgWrapRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const imgFrom     = project.reverse ? { opacity: 0, x: 80  } : { opacity: 0, x: -80 };
    const contentFrom = project.reverse ? { opacity: 0, x: -80 } : { opacity: 0, x: 80  };

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger:      rowRef.current,
        start:        "top 80%",
        toggleActions: "play none none none",
      },
    });

    // Slide-in animation
    tl.fromTo(imgWrapRef.current, imgFrom, { opacity: 1, x: 0, duration: 1, ease: "power3.out" })
      .fromTo(contentRef.current, contentFrom, { opacity: 1, x: 0, duration: 1, ease: "power3.out" }, "-=0.75");

    // Float / Drift Animation (Y-axis)
    tl.add(() => {
        gsap.to(imgWrapRef.current, {
            y: "-=12",
            duration: 2.5 + Math.random(),
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
        });
    });

    return () => tl.kill();
  }, [project.reverse]);

  return (
    <div
      ref={rowRef}
      className={`flex flex-col ${project.reverse ? "lg:flex-row-reverse" : "lg:flex-row"} items-center gap-10 lg:gap-16`}
    >
      {/* ── IMAGE SIDE ──────────────────────────────────────────── */}
      <div className="w-full lg:w-1/2 opacity-0" ref={imgWrapRef}>
        {/* Animated Border Container */}
        <div className="relative rounded-2xl p-[1px] group overflow-hidden bg-transparent">
             {/* Neon Blue Border Pulse (Default State) */}
            <div className="absolute inset-0 rounded-2xl border border-[#3b82f6]/40 shadow-[0_0_15px_rgba(59,130,246,0.4)] transition-all duration-300 group-hover:opacity-0 pointer-events-none" />

            {/* Running Light Effect (Hover State) */}
            <div className="absolute inset-[-50%] opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[conic-gradient(from_0deg,transparent_70%,#3b82f6_100%)] animate-[gradientSpin_3s_linear_infinite] pointer-events-none" />
            
            {/* Inner Content Wrapper to clip the spinning background */}
            <div className="relative rounded-2xl overflow-hidden bg-[#0a0a0a]/60 backdrop-blur-xl m-[1px]">
                {/* Project number badge */}
                <div
                    className="absolute top-4 left-4 z-20 w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold font-mono"
                    style={{
                    background: "rgba(59,130,246,0.20)",
                    border:     "1px solid #3b82f6",
                    color:      "#3b82f6",
                    }}
                >
                    {String(index + 1).padStart(2, "0")}
                </div>

                {/* Main Image */}
                <img
                    src={project.image}
                    alt={project.title}
                    className="w-full aspect-video object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* The Shine Animation Overlay */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden z-10 rounded-2xl">
                    <div className="w-[150%] h-full absolute top-0 -left-[150%] bg-gradient-to-r from-transparent via-[#3b82f6]/30 to-transparent -skew-x-[15deg] animate-[shine_3s_ease-in-out_infinite]" />
                </div>
                
                {/* Inner Glow Border */}
                <div
                    className="absolute inset-0 rounded-2xl pointer-events-none z-10"
                    style={{ boxShadow: "inset 0 0 0 1px rgba(59,130,246,0.15)" }}
                />
            </div>
        </div>
      </div>

      {/* ── CONTENT SIDE ────────────────────────────────────────── */}
      <div ref={contentRef} className="w-full lg:w-1/2 opacity-0 flex flex-col gap-5">

        {/* Eye-brow label */}
        <div className="flex items-center gap-3">
          <div
            className="h-px w-6"
            style={{ background: "linear-gradient(90deg, transparent, #3b82f6)" }}
          />
          <span
            className="font-mono text-[10px] tracking-[0.35em] uppercase"
            style={{ color: "#3b82f6" }}
          >
            {project.subtitle}
          </span>
        </div>

        {/* Title */}
        <h3
          className="text-3xl md:text-4xl font-bold text-[#ffffff] leading-tight"
          style={{ fontFamily: "'Syne','Inter',sans-serif" }}
        >
          {project.title}
        </h3>

        {/* Description */}
        <p
          className="text-[#a1a1aa] text-base leading-relaxed"
          style={{ fontFamily: "'Inter',sans-serif" }}
        >
          {project.description}
        </p>

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span
              key={t}
              className="text-[11px] font-mono tracking-widest uppercase px-3 py-1.5 rounded-full"
              style={{
                color:      "#ffffff",
                background: "rgba(59,130,246,0.15)",
                border:     "1px solid rgba(59,130,246,0.40)",
              }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex gap-4 mt-2">

          {/* Live Demo — Solid Blue */}
          <a
            href={project.liveDemo}
            target="_blank"
            rel="noopener noreferrer"
            className="group/btn inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-sm font-semibold text-white"
            style={{
              background: "linear-gradient(135deg,#3b82f6 0%,#2563eb 100%)",
              boxShadow: "0 0 0 1px rgba(59,130,246,0.5),0 4px 24px rgba(59,130,246,0.35)",
              transition: "box-shadow 0.3s ease, transform 0.3s ease",
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
            <span>Live Demo</span>
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1"
              viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>

          {/* GitHub — Outline Blue */}
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white"
            style={{
              background: "transparent",
              boxShadow: "0 0 0 1px rgba(59,130,246,0.40)",
              color: "rgba(255,255,255,0.65)",
              transition: "box-shadow 0.3s ease, transform 0.3s ease, color 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = "0 0 0 1px rgba(59,130,246,0.80),0 4px 20px rgba(59,130,246,0.30)";
              e.currentTarget.style.color = "#fff";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "0 0 0 1px rgba(59,130,246,0.40)";
              e.currentTarget.style.color = "rgba(255,255,255,0.65)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.03-2.682-.103-.253-.447-1.27.098-2.646 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.376.202 2.394.1 2.646.64.698 1.026 1.591 1.026 2.682 0 3.84-2.337 4.687-4.565 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
            </svg>
            <span>GitHub</span>
          </a>

        </div>
      </div>
    </div>
  );
}

/* ─── Section ───────────────────────────────────────────────────── */
export default function FeaturedProjects() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="featured-projects"
      ref={sectionRef}
      className="relative py-32 bg-transparent overflow-hidden z-10"
    >
      <div className="section-container text-left">

        {/* ── Section Header ─────────────────────────────────────── */}
        <div ref={headingRef} className="mb-20 md:mb-28">
          <div className="flex items-center gap-3 mb-4">
            <div
              className="h-px w-8"
              style={{ background: "linear-gradient(90deg, transparent, #3b82f6)" }}
            />
            <span
              className="font-mono text-[10px] tracking-[0.40em] uppercase"
              style={{ color: "#3b82f6" }}
            >
              Selected Works
            </span>
          </div>

          <h2
            className="heading-primary"
            style={{ fontSize: "clamp(2.5rem, 5vw, 3.8rem)" }}
          >
            Featured Projects
          </h2>

          <p
            className="mt-4 text-[#a1a1aa] text-base max-w-lg"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            A curated selection of real projects — click any link to explore them live.
          </p>
        </div>

        {/* ── Alternating Project Rows ────────────────────────────── */}
        <div className="flex flex-col gap-24 md:gap-32">
          {PROJECTS.map((project, idx) => (
            <ProjectRow key={project.id} project={project} index={idx} />
          ))}
        </div>

      </div>
    </section>
  );
}
