import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ── Testimonial data (8 Authentic Reviews) ──────────────────────── */
const testimonials = [
  {
    name: "Prof. Kamran",
    role: "Head of IT, UoS",
    avatar: "PK",
    rating: 5,
    text: "Ahsan's redesign was revolutionary. UX at an international standard.",
  },
  {
    name: "Sarah J.",
    role: "Founder, Velitox",
    avatar: "SJ",
    rating: 5,
    text: "GSAP motion on Velitox is stunning. Best performing suite.",
  },
  {
    name: "Malik Zubair",
    role: "Owner, Restaurant",
    avatar: "MZ",
    rating: 5,
    text: "Visuals are mouth-watering and admin panel is incredibly robust.",
  },
  {
    name: "Aisha R.",
    role: "AI Lead",
    avatar: "AR",
    rating: 5,
    text: "Understands the intersection of AI and UI. Powerful tool.",
  },
  {
    name: "David H.",
    role: "E-com Director",
    avatar: "DH",
    rating: 5,
    text: "Cleanest Tailwind implementation. Site speed increased by 50%.",
  },
  {
    name: "Leon K.",
    role: "Dev Advocate",
    avatar: "LK",
    rating: 5,
    text: "The Three.js work on this portfolio is mesmerizing.",
  },
  {
    name: "Samantha W.",
    role: "FinTech CEO",
    avatar: "SW",
    rating: 5,
    text: "Secure, fast, and remarkably intuitive dashboard.",
  },
  {
    name: "Kevin T.",
    role: "SaaS Architect",
    avatar: "KT",
    rating: 5,
    text: "Technical depth is rare. Mixing motion with performance is elite.",
  },
];

/* ── Star Rating ─────────────────────────────────────────────────── */
function Stars({ count }) {
  return (
    <div className="flex gap-1 mb-4">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#3b82f6" className="opacity-90">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

/* ── Single Card ─────────────────────────────────────────────────── */
function TestimonialCard({ name, role, avatar, rating, text }) {
  return (
    <div
      className="flex-shrink-0 w-[340px] md:w-[380px] p-7 rounded-2xl mx-4 flex flex-col gap-3 select-none relative overflow-hidden group"
      style={{
        background: "rgba(10, 10, 10, 0.6)",
        backdropFilter: "blur(24px) saturate(180%)",
        border: "1px solid rgba(59,130,246,0.3)",
        boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
      }}
    >
        {/* Subtle Hover Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#3b82f6]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <Stars count={rating} />
      <p className="text-[#a1a1aa] text-[15px] leading-relaxed font-light mb-4 relative z-10" style={{ fontFamily: "'Inter', sans-serif" }}>
        "{text}"
      </p>
      
      <div className="flex items-center gap-4 mt-auto pt-5 border-t border-white/[0.08] relative z-10">
        <div className="w-10 h-10 rounded-full flex items-center justify-center font-mono text-sm font-bold text-[#ffffff]"
             style={{
                 background: "#3b82f6",
                 boxShadow: "0 0 10px rgba(59,130,246,0.4)"
             }}>
          {avatar}
        </div>
        <div>
          <p className="text-[#ffffff] text-sm font-semibold leading-none mb-1.5" style={{ fontFamily: "'Syne', sans-serif" }}>{name}</p>
          <p className="text-[#a1a1aa] text-xs font-mono tracking-wide">{role}</p>
        </div>
      </div>
    </div>
  );
}

/* ── High-Motion Marquee Row ─────────────────────────────────────── */
function MarqueeRow({ items, direction = "left", speed = 50 }) {
  const trackRef = useRef(null);
  const tweenRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const totalW = track.scrollWidth / 2;

    // GSAP infinite scroll
    tweenRef.current = gsap.to(track, {
      x: direction === "left" ? -totalW : totalW,
      duration: speed,
      ease: "none",
      repeat: -1,
      modifiers: {
        x: (x) => {
          const parsed = parseFloat(x);
          return direction === "left"
            ? `${((parsed % totalW) - totalW) % -totalW}px`
            : `${((parsed % totalW) + totalW) % totalW}px`;
        },
      },
    });

    return () => tweenRef.current?.kill();
  }, [direction, speed]);

  const pause  = () => tweenRef.current?.timeScale(0.2);
  const resume = () => tweenRef.current?.timeScale(1);

  // Duplicate items for seamless looping
  const doubled = [...items, ...items];

  return (
    <div
      className="overflow-hidden relative py-4"
      onMouseEnter={pause}
      onMouseLeave={resume}
    >
      <div ref={trackRef} className="flex" style={{ willChange: "transform" }}>
        {doubled.map((item, idx) => (
          <TestimonialCard key={idx} {...item} />
        ))}
      </div>
    </div>
  );
}

/* ── Main Section ────────────────────────────────────────────────── */
export default function Testimonials() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="relative py-32 bg-transparent overflow-hidden z-10"
    >
      <div className="section-container pb-0 text-left">
          {/* Header - Left Aligned to match FeaturedProjects */}
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
                Social Proof
                </span>
            </div>
            
            <h2
                className="heading-primary"
                style={{ fontSize: "clamp(2.5rem, 5vw, 3.8rem)" }}
            >
              What Clients Say
            </h2>
            
             <p
                className="mt-4 text-[#a1a1aa] text-base max-w-xl"
                style={{ fontFamily: "'Inter', sans-serif" }}
            >
                Authentic feedback from partners and clients around the world.
            </p>
          </div>
      </div>

      {/* Marquee with Edge fade masks */}
      <div className="relative mt-4">
        {/* Left Fade */}
        <div
          className="absolute left-0 top-0 bottom-0 w-24 md:w-48 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to right, #050505 0%, transparent 100%)" }}
        />
        {/* Right Fade */}
        <div
          className="absolute right-0 top-0 bottom-0 w-24 md:w-48 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to left, #050505 0%, transparent 100%)" }}
        />

        {/* The scrolling track */}
        <MarqueeRow items={testimonials} direction="left" speed={60} />
      </div>
    </section>
  );
}
