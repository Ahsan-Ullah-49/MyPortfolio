import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function CustomCursor() {
  const dotRef   = useRef(null);
  const ringRef  = useRef(null);

  useEffect(() => {
    const dot  = dotRef.current;
    const ring = ringRef.current;

    if (!dot || !ring) return;

    // Hide the default OS cursor on the whole page
    document.body.style.cursor = "none";

    /* ── Position trackers ─────────────────────────────────────── */
    let mouseX = window.innerWidth  / 2;
    let mouseY = window.innerHeight / 2;
    let ringX  = mouseX;
    let ringY  = mouseY;

    // Place them off-screen initially so they don't flash at origin
    gsap.set([dot, ring], { x: mouseX, y: mouseY, opacity: 0 });

    /* ── Mouse move handler ──────────────────────────────────────── */
    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Dot snaps instantly
      gsap.set(dot, { x: mouseX, y: mouseY });

      // Fade in once mouse is detected
      gsap.to([dot, ring], { opacity: 1, duration: 0.3 });
    };

    /* ── GSAP ticker — ring lags behind ─────────────────────────── */
    const ticker = gsap.ticker.add(() => {
      // Lerp ring toward mouse (trailing effect)
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      gsap.set(ring, { x: ringX, y: ringY });
    });

    /* ── Hover expansion on interactive elements ─────────────────── */
    const onEnter = () => {
      gsap.to(ring, {
        width: 56,
        height: 56,
        borderColor: "rgba(59,130,246,0.9)",
        backgroundColor: "rgba(59,130,246,0.08)",
        duration: 0.35,
        ease: "power2.out",
      });
      gsap.to(dot, { scale: 0.4, duration: 0.25 });
    };

    const onLeave = () => {
      gsap.to(ring, {
        width: 36,
        height: 36,
        borderColor: "rgba(255,255,255,0.55)",
        backgroundColor: "transparent",
        duration: 0.35,
        ease: "power2.out",
      });
      gsap.to(dot, { scale: 1, duration: 0.25 });
    };

    // Click burst
    const onClick = () => {
      gsap.timeline()
        .to(ring, { scale: 1.6, opacity: 0.3, duration: 0.18, ease: "power2.out" })
        .to(ring, { scale: 1,   opacity: 1,   duration: 0.25, ease: "power2.in" });
    };

    const targets = document.querySelectorAll("a, button, [data-cursor-hover]");
    targets.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("click", onClick);

    // Hide when mouse leaves viewport
    const onLeaveWindow = () => gsap.to([dot, ring], { opacity: 0, duration: 0.3 });
    const onEnterWindow = () => gsap.to([dot, ring], { opacity: 1, duration: 0.3 });
    document.addEventListener("mouseleave", onLeaveWindow);
    document.addEventListener("mouseenter", onEnterWindow);

    return () => {
      document.body.style.cursor = "";
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("click", onClick);
      document.removeEventListener("mouseleave", onLeaveWindow);
      document.removeEventListener("mouseenter", onEnterWindow);
      gsap.ticker.remove(ticker);
      targets.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);

  return (
    <>
      {/* Inner dot — snaps instantly */}
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: -4,
          left: -4,
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: "#3b82f6",
          pointerEvents: "none",
          zIndex: 9999,
          mixBlendMode: "difference",
          willChange: "transform",
        }}
      />

      {/* Outer ring — trails with lag */}
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: -18,
          left: -18,
          width: 36,
          height: 36,
          borderRadius: "50%",
          border: "1.5px solid rgba(255,255,255,0.55)",
          pointerEvents: "none",
          zIndex: 9998,
          willChange: "transform",
          mixBlendMode: "difference",
          transition: "width 0.35s, height 0.35s",
        }}
      />
    </>
  );
}
