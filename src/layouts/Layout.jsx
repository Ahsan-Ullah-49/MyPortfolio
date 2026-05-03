import Navbar from "../components/Navbar";
import ParticleBackground from "../components/ParticleBackground";
import CustomCursor from "../components/CustomCursor";

/**
 * Layout.jsx
 * ──────────────────────────────────────────────────────────────────
 * Global wrapper that provides:
 *   • Deep dark background (primary #050505)
 *   • Ambient radial glow blobs for cinematic depth
 *   • Fixed Navbar
 *   • A smooth-scroll container for page sections
 *   • Subtle noise texture overlay
 */
export default function Layout({ children }) {
  return (
    <div className="relative min-h-screen bg-primary text-white overflow-x-hidden">

      {/* ── Ambient background glows ──────────────────────────────── */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">

        {/* Top-left blue glow */}
        <div
          className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full
                     opacity-[0.12] blur-[120px]"
          style={{ background: "radial-gradient(circle, #3b82f6 0%, transparent 70%)" }}
        />

        {/* Bottom-right purple accent glow */}
        <div
          className="absolute -bottom-60 -right-40 w-[700px] h-[700px] rounded-full
                     opacity-[0.10] blur-[140px]"
          style={{ background: "radial-gradient(circle, #6366f1 0%, transparent 70%)" }}
        />

        {/* Centre subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />

        {/* Noise texture */}
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.035]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <filter id="noise-filter">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.85"
              numOctaves="4"
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise-filter)" />
        </svg>
      </div>

      {/* ── Custom cursor (global) ────────────────────────────────── */}
      <CustomCursor />

      {/* ── Three.js particle canvas (global bg) ─────────────────── */}
      <ParticleBackground />

      {/* ── Fixed Navbar ──────────────────────────────────────────── */}
      <Navbar />

      {/* ── Main scrollable content ───────────────────────────────── */}
      <main
        id="main-content"
        className="relative z-10"
        style={{ scrollBehavior: "smooth" }}
      >
        {children}
      </main>
    </div>
  );
}
