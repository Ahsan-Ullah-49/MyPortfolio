/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#050505",
        secondary: "#101010",
        accent: "#3b82f6",
        "accent-hover": "#2563eb",
        "surface": "#1a1a1a",
        "surface-2": "#242424",
        "border-subtle": "rgba(255,255,255,0.08)",
        "text-muted": "#6b7280",
        "text-soft": "#9ca3af",
      },
      fontFamily: {
        sans:    ["Inter", "system-ui", "sans-serif"],
        display: ["'Syne'", "Inter", "sans-serif"],
        jakarta: ["'Plus Jakarta Sans'", "Inter", "sans-serif"],
        mono:    ["'JetBrains Mono'", "monospace"],
      },
      backdropBlur: {
        xs: "2px",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease forwards",
        "slide-up": "slideUp 0.6s ease forwards",
        "glow-pulse": "glowPulse 3s ease-in-out infinite",
        "scroll-dot": "scrollDot 1.8s ease-in-out infinite",
        "bounce-slow": "bounceSlow 2.5s ease-in-out infinite",
        "shine": "shine 3s ease-in-out infinite",
        "gradient-spin": "gradientSpin 4s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        glowPulse: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(59,130,246,0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(59,130,246,0.6)" },
        },
        scrollDot: {
          "0%":   { transform: "translateY(0)",   opacity: "1" },
          "80%":  { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)",   opacity: "0" },
        },
        bounceSlow: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%":      { transform: "translateY(8px)" },
        },
        shine: {
          "0%": { transform: "translateX(-150%) skewX(-15deg)" },
          "20%, 100%": { transform: "translateX(250%) skewX(-15deg)" },
        },
        gradientSpin: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "noise":
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
};
