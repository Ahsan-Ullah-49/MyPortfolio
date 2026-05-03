import { useEffect, useRef } from "react";

/* ══════════════════════════════════════════════════════════════════
   ParticleBackground — Optimized Canvas 2D
══════════════════════════════════════════════════════════════════ */

/* ── Tunable constants ─────────────────────────────────────────── */
const STAR_COUNT      = 1800;   // stars (bucketed draw = cheap)
const NODE_COUNT      = 140;    // web nodes
const CONNECT_D_SQ    = 190 * 190; // distance² threshold (increased for denser web)
const MOUSE_R         = 240;    // cursor influence radius (px)
const MOUSE_R_SQ      = MOUSE_R * MOUSE_R;
const MOUSE_LERP      = 0.12;   // smoothing factor (snappier mouse follow)
const BASE_ALPHA      = 0.25;   // always-on line opacity (increased visibility)
const BOOST_ALPHA     = 0.55;   // extra alpha when node is near cursor
const DOT_BASE        = 0.35;   // always-on dot opacity
const DOT_BOOST       = 0.95;   // dot opacity at cursor
const REPULSE_FORCE   = 0.5;    // how hard cursor pushes nodes
const RETURN_SPEED    = 0.035;  // how fast nodes return to base drift after push

// Electric Blue #3b82f6
const EB_R = 59, EB_G = 130, EB_B = 246;
// Pre-baked rgba prefix
const EB_PRE = `rgba(${EB_R},${EB_G},${EB_B},`;

export default function ParticleBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    ctx.imageSmoothingEnabled = false;

    let W = 0, H = 0;
    let animId;

    /* ── Resize handler ─────────────────────────────────────────── */
    const resize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width  = W;
      canvas.height = H;
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    /* ── Mouse state ────────────────────────────────────────────── */
    let rawX = -9999, rawY = -9999;
    let smoothX = -9999, smoothY = -9999;

    const onMouseMove = (e) => { rawX = e.clientX; rawY = e.clientY; };
    const onMouseLeave = () => { rawX = -9999; rawY = -9999; };

    window.addEventListener("mousemove",  onMouseMove,  { passive: true });
    document.addEventListener("mouseleave", onMouseLeave, { passive: true });

    /* ═══════════════════════════════════════════════════════════
       EFFECT A — Stars
    ═══════════════════════════════════════════════════════════ */
    const S_X = 0, S_Y = 1, S_BUCKET = 2, S_A = 3,
          S_VX = 4, S_VY = 5, S_PH = 6, S_FR = 7;
    const STRIDE = 8;
    const starBuf = new Float32Array(STAR_COUNT * STRIDE);
    const RADII   = [0.3, 0.7, 1.2];

    for (let i = 0; i < STAR_COUNT; i++) {
      const o = i * STRIDE;
      starBuf[o + S_X]      = Math.random() * W;
      starBuf[o + S_Y]      = Math.random() * H;
      starBuf[o + S_BUCKET] = Math.floor(Math.random() * 3);
      starBuf[o + S_A]      = Math.random() * 0.40 + 0.07;
      starBuf[o + S_VX]     = (Math.random() - 0.5) * 0.45;
      starBuf[o + S_VY]     = -(Math.random() * 0.35 + 0.10);
      starBuf[o + S_PH]     = Math.random() * Math.PI * 2;
      starBuf[o + S_FR]     = Math.random() * 0.012 + 0.004;
    }

    /* ═══════════════════════════════════════════════════════════
       EFFECT B — Web Nodes
    ═══════════════════════════════════════════════════════════ */
    const N_X = 0, N_Y = 1, N_VX = 2, N_VY = 3, N_BX = 4, N_BY = 5;
    const NSTRIDE = 6;
    const nodeBuf = new Float32Array(NODE_COUNT * NSTRIDE);

    for (let i = 0; i < NODE_COUNT; i++) {
      const o = i * NSTRIDE;
      nodeBuf[o + N_X]  = Math.random() * W;
      nodeBuf[o + N_Y]  = Math.random() * H;
      // Base slow, elegant constant drift (increased speed)
      const bx = (Math.random() - 0.5) * 1.0;
      const by = (Math.random() - 0.5) * 1.0;
      nodeBuf[o + N_BX] = bx;
      nodeBuf[o + N_BY] = by;
      nodeBuf[o + N_VX] = bx;
      nodeBuf[o + N_VY] = by;
    }

    const nodeProx = new Float32Array(NODE_COUNT); 
    let frame = 0;
    const TWO_PI = Math.PI * 2;
    const CONNECT_D = Math.sqrt(CONNECT_D_SQ);

    /* ── Main loop ──────────────────────────────────────────────── */
    const animate = () => {
      animId = requestAnimationFrame(animate);
      frame++;

      /* ── 1. Lerp mouse ────────────────────────────────────────── */
      if (smoothX < -1000) {
        smoothX = rawX; smoothY = rawY;
      } else {
        smoothX += (rawX - smoothX) * MOUSE_LERP;
        smoothY += (rawY - smoothY) * MOUSE_LERP;
      }

      ctx.clearRect(0, 0, W, H);

      /* ── 2. Stars ─────────────────────────────────────────────── */
      for (let i = 0; i < STAR_COUNT; i++) {
        const o = i * STRIDE;
        starBuf[o + S_X]  += starBuf[o + S_VX];
        starBuf[o + S_Y]  += starBuf[o + S_VY];
        starBuf[o + S_PH] += starBuf[o + S_FR];

        if (starBuf[o + S_X] < -2)    starBuf[o + S_X] = W + 2;
        if (starBuf[o + S_X] > W + 2) starBuf[o + S_X] = -2;
        if (starBuf[o + S_Y] < -2)    starBuf[o + S_Y] = H + 2;
        if (starBuf[o + S_Y] > H + 2) starBuf[o + S_Y] = -2;
      }

      for (let bucket = 0; bucket < 3; bucket++) {
        const r = RADII[bucket];
        ctx.beginPath();
        for (let i = 0; i < STAR_COUNT; i++) {
          const o = i * STRIDE;
          if (starBuf[o + S_BUCKET] !== bucket) continue;
          const twinkle = Math.sin(starBuf[o + S_PH]) * 0.28;
          const alpha   = Math.max(0, Math.min(0.55, starBuf[o + S_A] + twinkle));
          
          ctx.globalAlpha = alpha;
          ctx.beginPath();
          ctx.arc(starBuf[o + S_X], starBuf[o + S_Y], r, 0, TWO_PI);
          ctx.fillStyle = "rgb(195,210,255)";
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;

      /* ── 3. Web Nodes ─────────────────────────────────────────── */
      for (let i = 0; i < NODE_COUNT; i++) {
        const o = i * NSTRIDE;
        let vx = nodeBuf[o + N_VX];
        let vy = nodeBuf[o + N_VY];
        const bx = nodeBuf[o + N_BX];
        const by = nodeBuf[o + N_BY];

        // Smoothly return to base drift velocity (natural damping of mouse push)
        vx += (bx - vx) * RETURN_SPEED;
        vy += (by - vy) * RETURN_SPEED;

        let x  = nodeBuf[o + N_X] + vx;
        let y  = nodeBuf[o + N_Y] + vy;

        // Bounce and reverse base drift so it doesn't get stuck on walls
        if (x < 0)  { x = 0; nodeBuf[o + N_BX] *= -1; vx *= -1; }
        if (x > W)  { x = W; nodeBuf[o + N_BX] *= -1; vx *= -1; }
        if (y < 0)  { y = 0; nodeBuf[o + N_BY] *= -1; vy *= -1; }
        if (y > H)  { y = H; nodeBuf[o + N_BY] *= -1; vy *= -1; }

        const dxM  = x - smoothX;
        const dyM  = y - smoothY;
        const dMSq = dxM * dxM + dyM * dyM;

        if (dMSq < MOUSE_R_SQ && dMSq > 0.01) {
          const dM    = Math.sqrt(dMSq);
          const force = (1 - dM / MOUSE_R) * REPULSE_FORCE;
          vx += (dxM / dM) * force;
          vy += (dyM / dM) * force;
        }

        nodeBuf[o + N_X]  = x;
        nodeBuf[o + N_Y]  = y;
        nodeBuf[o + N_VX] = vx;
        nodeBuf[o + N_VY] = vy;

        const prox = dMSq < MOUSE_R_SQ
          ? Math.max(0, 1 - Math.sqrt(dMSq) / MOUSE_R)
          : 0;
        nodeProx[i] = prox;
      }

      /* ── 4. Web Lines ─────────────────────────────────────────── */
      ctx.lineWidth = 0.6;

      for (let i = 0; i < NODE_COUNT; i++) {
        const oi = i * NSTRIDE;
        const x1 = nodeBuf[oi + N_X];
        const y1 = nodeBuf[oi + N_Y];
        const p1 = nodeProx[i];

        for (let j = i + 1; j < NODE_COUNT; j++) {
          const oj = j * NSTRIDE;
          const dx = x1 - nodeBuf[oj + N_X];
          const dy = y1 - nodeBuf[oj + N_Y];
          const dSq = dx * dx + dy * dy;

          if (dSq >= CONNECT_D_SQ) continue;

          const p2       = nodeProx[j];
          const distFade = 1 - Math.sqrt(dSq) / CONNECT_D;
          const avgProx  = (p1 + p2) * 0.5;
          const alpha    = ((BASE_ALPHA + avgProx * BOOST_ALPHA) * distFade);

          if (alpha < 0.02) continue;

          ctx.globalAlpha = alpha;
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(nodeBuf[oj + N_X], nodeBuf[oj + N_Y]);
          ctx.strokeStyle = `${EB_PRE}1)`;
          ctx.stroke();
        }
      }

      /* ── 5. Node Dots ─────────────────────────────────────────── */
      for (let i = 0; i < NODE_COUNT; i++) {
        const o     = i * NSTRIDE;
        const prox  = nodeProx[i];
        const alpha = DOT_BASE + prox * (DOT_BOOST - DOT_BASE);

        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(nodeBuf[o + N_X], nodeBuf[o + N_Y], 1.4, 0, TWO_PI);
        ctx.fillStyle = `${EB_PRE}1)`;
        ctx.fill();
      }

      ctx.globalAlpha = 1;
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize",    resize);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        width:  "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none",
        display: "block",
      }}
    />
  );
}
