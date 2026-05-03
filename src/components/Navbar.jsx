import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Download } from "lucide-react";
import CVModal from "./CVModal";

/* ── Nav links ───────────────────────────────────────────────────── */
const NAV_LINKS = [
  { label: "Home",     href: "#home"         },
  { label: "About",    href: "#about"        },
  { label: "Skills",   href: "#skills"       },
  { label: "Projects", href: "#featured-projects" },
  { label: "Reviews",  href: "#testimonials" },
  { label: "Contact",  href: "#contact"      },
];

function scrollTo(href) {
  document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [showCV, setShowCV] = useState(false);
  const mobileRef = useRef(null);

  /* ── Scroll detection ─────────────────────────────────────────── */
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  /* ── Active section via scroll position ────────────────────────── */
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      let currentActive = "home";

      for (const link of NAV_LINKS) {
        const id = link.href.slice(1);
        const element = document.getElementById(id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            currentActive = id;
          }
        }
      }
      setActiveLink(currentActive);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Trigger once on mount
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ── Mobile drawer GSAP ───────────────────────────────────────── */
  useEffect(() => {
    if (!mobileRef.current) return;
    if (menuOpen) {
      gsap.fromTo(mobileRef.current,
        { opacity: 0, y: -12, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 0.28, ease: "power3.out" }
      );
    } else {
      gsap.to(mobileRef.current, { opacity: 0, y: -8, duration: 0.16, ease: "power2.in" });
    }
  }, [menuOpen]);

  const close = () => setMenuOpen(false);

  return (
    <>
      {/* ══════════════════ HEADER BAR ══════════════════════════════ */}
      <header
        className="fixed top-0 inset-x-0 z-50 transition-all duration-400"
        style={{
          height: scrolled ? "60px" : "70px",
          background: scrolled
            ? "rgba(255, 255, 255, 0.03)"
            : "rgba(255, 255, 255, 0.01)",
          backdropFilter: "blur(24px) saturate(180%)",
          WebkitBackdropFilter: "blur(24px) saturate(180%)",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          boxShadow: scrolled ? "0 6px 32px rgba(0,0,0,0.5)" : "none",
          transition: "height 0.4s ease, background 0.4s ease, box-shadow 0.4s ease",
        }}
      >
        {/* Responsive grid: 2 cols on mobile (logo | buttons), 3 cols on desktop */}
        <div className="h-full max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-3 items-center">

          {/* ── Col 1: Logo (far left) ─────────────────────────────── */}
          <div className="flex items-center">
            <a
              href="#home"
              data-cursor-hover
              onClick={(e) => { e.preventDefault(); close(); scrollTo("#home"); }}
              className="group select-none flex items-center gap-2"
              aria-label="AUA — Ahsan Ullah Afzal"
            >
              <span
                className="font-jakarta font-black text-xl text-white tracking-tight"
                style={{
                  letterSpacing: "-0.01em",
                  animation: "logoBreathe 3s ease-in-out infinite",
                }}
              >
                AUA<span className="text-accent">.</span>
              </span>
              {/* Breathing glow keyframe */}
              <style>{`
                @keyframes logoBreathe {
                  0%, 100% { text-shadow: 0 0 6px rgba(59,130,246,0.35), 0 0 12px rgba(59,130,246,0.15); }
                  50%       { text-shadow: 0 0 18px rgba(59,130,246,0.85), 0 0 36px rgba(99,102,241,0.45), 0 0 60px rgba(59,130,246,0.20); }
                }
              `}</style>
            </a>
          </div>

          {/* ── Col 2: Nav links (centered, desktop only) ─────────── */}
          <nav className="hidden md:flex items-center justify-center gap-0">
            {NAV_LINKS.map(({ label, href }) => {
              const id = href.slice(1);
              const active = activeLink === id;
              return (
                <a
                  key={label}
                  href={href}
                  data-cursor-hover
                  onClick={(e) => { e.preventDefault(); scrollTo(href); }}
                  className="relative group px-4 py-1.5 text-[13.5px] font-medium transition-colors duration-200 select-none"
                  style={{ color: active ? "#fff" : "rgba(255,255,255,0.45)" }}
                >
                  {label}

                  {/* Active underline */}
                  <span
                    className="absolute bottom-[-2px] left-0 right-0 mx-4 h-[1.5px] rounded-full transition-all duration-300"
                    style={{
                      background: "linear-gradient(90deg,#3b82f6,#818cf8)",
                      transform: active ? "scaleX(1)" : "scaleX(0)",
                      opacity:   active ? 1 : 0,
                      transformOrigin: "left",
                    }}
                  />
                  {/* Hover underline */}
                  {!active && (
                    <span
                      className="absolute bottom-[-2px] left-0 right-0 mx-4 h-[1.5px] rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                      style={{ background: "rgba(255,255,255,0.20)" }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* ── Col 3: Right buttons (desktop) + hamburger (mobile) ── */}
          <div className="flex items-center justify-end gap-2">
            {/* Hire Me */}
            <a
              href="#contact"
              data-cursor-hover
              onClick={(e) => { e.preventDefault(); scrollTo("#contact"); }}
              className="hidden md:inline-flex items-center px-5 py-2 rounded-full text-sm font-semibold text-white transition-all duration-250"
              style={{
                background: "linear-gradient(135deg,#3b82f6,#2563eb)",
                boxShadow: "0 0 0 1px rgba(59,130,246,0.45), 0 3px 16px rgba(59,130,246,0.25)",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.boxShadow = "0 0 0 1px rgba(59,130,246,0.8), 0 4px 28px rgba(59,130,246,0.55)")}
              onMouseLeave={(e) =>
                (e.currentTarget.style.boxShadow = "0 0 0 1px rgba(59,130,246,0.45), 0 3px 16px rgba(59,130,246,0.25)")}
            >
              Hire Me
            </a>

            {/* Download CV — opens CV Modal */}
            <button
              data-cursor-hover
              onClick={() => setShowCV(true)}
              className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium text-white/60 transition-all duration-250 hover:text-white"
              style={{ border: "1px solid rgba(255,255,255,0.14)", background: "rgba(255,255,255,0.03)" }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor="rgba(59,130,246,0.55)"; e.currentTarget.style.background="rgba(59,130,246,0.08)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor="rgba(255,255,255,0.14)"; e.currentTarget.style.background="rgba(255,255,255,0.03)"; }}
            >
              <Download size={13} strokeWidth={2} />
              Download CV
            </button>

            {/* Hamburger */}
            <button
              className="md:hidden flex flex-col justify-center items-center w-9 h-9 rounded-xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] transition-colors gap-[5px]"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="block w-[18px] h-[1.5px] bg-white/70 rounded-full transition-all duration-300 origin-center"
                  style={{
                    transform:
                      menuOpen && i === 0 ? "rotate(45deg) translate(4.5px, 4.5px)"
                      : menuOpen && i === 2 ? "rotate(-45deg) translate(4.5px, -4.5px)"
                      : "none",
                    opacity: menuOpen && i === 1 ? 0 : 1,
                  }}
                />
              ))}
            </button>
          </div>
        </div>
      </header>

      {/* ══════════════════ MOBILE DRAWER ══════════════════════════════ */}
      {menuOpen && (
        <>
          <div
            className="fixed inset-0 z-40 md:hidden"
            style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(3px)" }}
            onClick={close}
          />
          <div
            ref={mobileRef}
            className="fixed top-[68px] left-4 right-4 z-50 md:hidden rounded-2xl overflow-hidden"
            style={{
              background: "rgba(15, 15, 20, 0.3)",
              backdropFilter: "blur(32px) saturate(200%)",
              WebkitBackdropFilter: "blur(32px) saturate(200%)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              boxShadow: "0 32px 64px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)",
            }}
          >
            <nav className="p-3 flex flex-col gap-1">
              {NAV_LINKS.map(({ label, href }) => {
                const id = href.slice(1);
                const active = activeLink === id;
                return (
                  <a
                    key={label}
                    href={href}
                    onClick={(e) => { e.preventDefault(); close(); scrollTo(href); }}
                    className="flex items-center justify-between px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-200"
                    style={{
                      color:      active ? "#fff" : "rgba(255,255,255,0.48)",
                      background: active ? "rgba(59,130,246,0.10)" : "transparent",
                      borderLeft: `2px solid ${active ? "#3b82f6" : "transparent"}`,
                    }}
                  >
                    <span>{label}</span>
                    {active && <span className="w-1.5 h-1.5 rounded-full bg-accent" />}
                  </a>
                );
              })}
              <div className="mx-1 mt-2 pt-3 border-t border-white/[0.07] flex flex-col gap-2">
                <a
                  href="#contact"
                  onClick={(e) => { e.preventDefault(); close(); scrollTo("#contact"); }}
                  className="flex items-center justify-center w-full py-3.5 rounded-xl text-sm font-semibold text-white"
                  style={{
                    background: "linear-gradient(135deg,#3b82f6,#2563eb)",
                    boxShadow: "0 4px 20px rgba(59,130,246,0.35)",
                  }}
                >
                  Hire Me
                </a>
                <button
                  onClick={() => { close(); setShowCV(true); }}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-medium text-white/55"
                  style={{ border: "1px solid rgba(255,255,255,0.10)" }}
                >
                  <Download size={13} /> Download CV
                </button>
              </div>
            </nav>
          </div>
        </>
      )}
      {showCV && <CVModal onClose={() => setShowCV(false)} />}
    </>
  );
}
