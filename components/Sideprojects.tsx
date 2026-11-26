"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";
import { useIsMobile } from "./useIsMobile";

export default function SideProjects({ onBack }: { onBack?: () => void }) {

  const prefersReducedMotion = usePrefersReducedMotion();
  const isMobile = useIsMobile();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  if (isMobile) {
    return (
      <div className="absolute inset-0 overflow-hidden">
        <video autoPlay={!prefersReducedMotion} loop={!prefersReducedMotion} muted playsInline preload={prefersReducedMotion ? "none" : "metadata"} data-mobile-bg="" className="absolute inset-0 h-full w-full object-cover">
          <source src="/videos/skills.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0" style={{ zIndex: 1, background: "rgba(0,0,0,0.5)" }} />
        <div style={{ position: "absolute", top: "38%", left: 0, right: 0, height: 4, zIndex: 2, background: "#c4001a" }} />
        <div style={{ position: "absolute", top: "62%", left: 0, right: 0, height: 4, zIndex: 2, background: "#c4001a" }} />
        <div style={{ position: "absolute", inset: 0, zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16, padding: "0 16px", textAlign: "center" }}>
          <div style={{ fontFamily: "Persona", fontSize: "clamp(2rem,10vw,3.2rem)", letterSpacing: "0.02em", lineHeight: 1, color: "#67e8f9", WebkitTextStroke: "1px rgba(103,232,249,0.4)" }}>PRÓXIMAMENTE</div>
          <div style={{ maxWidth: "90vw", fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(0.8rem,4vw,1rem)", letterSpacing: "clamp(1px,0.4vw,3px)", lineHeight: 1.5, color: "rgba(255,255,255,0.45)" }}>
            PROYECTOS SECUNDARIOS EN CARGA<span>_</span>
          </div>
        </div>
        <button onClick={() => onBack?.()} style={{ position: "absolute", left: 16, right: 16, bottom: "calc(12px + var(--safe-bottom))", zIndex: 40, minHeight: 48, display: "flex", alignItems: "center", justifyContent: "center", gap: 10, fontFamily: "'Bebas Neue', sans-serif", fontSize: 18, letterSpacing: 2, color: "#fff", background: "rgba(6,12,38,0.92)", border: "2px solid rgba(141,246,255,0.35)", borderRadius: 4, cursor: "pointer" }}>
          <span style={{ fontSize: 20, lineHeight: 1 }}>←</span>
          <span>VOLVER AL MENÚ</span>
        </button>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden">

      {/* BG VIDEO */}
      <video
        autoPlay={!prefersReducedMotion} loop={!prefersReducedMotion} muted playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/videos/skills.mp4" type="video/mp4" />
      </video>

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/50" />

      {/* ENTRY MASK */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 9,
          overflow: "hidden",
          background: "#0047FF",
          clipPath: "circle(0 at 50% 50%)",
          animation: "sp-entry-reveal 1.2s cubic-bezier(0.16,1,0.3,1) forwards",
          pointerEvents: "none",
        }}
      >
        <video
          autoPlay={!prefersReducedMotion} loop={!prefersReducedMotion} muted playsInline
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
        >
          <source src="/videos/skills.mp4" type="video/mp4" />
        </video>
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.5)" }} />
      </div>

      <style>{`
        @keyframes sp-entry-reveal {
          from { clip-path: circle(0 at 50% 50%); }
          to   { clip-path: circle(150vmax at 50% 50%); }
        }
        @keyframes sp-blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
        .sp-cursor { animation: sp-blink 1s step-end infinite; }
      `}</style>

      {/* CONTENT */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
        }}
      >

        {/* RED STRIPE TOP */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: mounted ? 1 : 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: "absolute",
            top: "38%",
            left: 0, right: 0,
            height: 4,
            background: "#c4001a",
            transformOrigin: "left",
          }}
        />

        {/* RED STRIPE BOTTOM */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: mounted ? 1 : 0 }}
          transition={{ duration: 0.5, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: "absolute",
            top: "62%",
            left: 0, right: 0,
            height: 4,
            background: "#c4001a",
            transformOrigin: "right",
          }}
        />

        {/* MAIN TEXT */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }}
          transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: "Persona",
            fontSize: "clamp(3rem, 8vw, 7rem)",
            color: "#67e8f9",
            letterSpacing: "0.05em",
            lineHeight: 1,
            textAlign: "center",
            WebkitTextStroke: "1px rgba(103,232,249,0.4)",
          }}
        >
          PRÓXIMAMENTE
        </motion.div>

        {/* SUBTITLE */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: mounted ? 1 : 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 22,
            letterSpacing: 6,
            color: "rgba(255,255,255,0.35)",
            marginTop: 24,
            textAlign: "center",
          }}
        >
          PROYECTOS SECUNDARIOS EN CARGA<span className={prefersReducedMotion ? undefined : "sp-cursor"}>_</span>
        </motion.div>

      </div>

      {/* FOOTER HINT */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: mounted ? 1 : 0 }}
        transition={{ delay: 1, duration: 0.4 }}
        style={{
          position: "absolute",
          bottom: 76, right: 28,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: 5,
          fontFamily: "'Bebas Neue', sans-serif",
          zIndex: 20,
          pointerEvents: "none",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, letterSpacing: 2, color: "rgba(255,255,255,0.22)" }}>
          <span style={{ border: "1px solid rgba(255,255,255,0.15)", borderRadius: 3, padding: "1px 6px", fontSize: 11 }}>ESC</span>
          <span>VOLVER</span>
        </div>
      </motion.div>

      {/* VOLVER AL MENÚ */}
      <button
        onClick={() => onBack?.()}
        style={{
          position: "absolute", bottom: 20, right: 28, zIndex: 20,
          display: "flex", alignItems: "center", gap: 10,
          fontFamily: "'Bebas Neue', sans-serif", fontSize: 20, letterSpacing: 2,
          color: "#fff", background: "#c4001a", border: "none", cursor: "pointer",
          padding: "10px 18px",
          clipPath: "polygon(12px 0, 100% 0, 100% 100%, 0 100%)",
          boxShadow: "0 4px 0 rgba(0,0,0,0.45)",
          opacity: mounted ? 1 : 0, transition: "opacity 0.4s ease 0.6s",
        }}
      >
        <span style={{ fontSize: 22, lineHeight: 1 }}>←</span>
        <span style={{ lineHeight: 1 }}>VOLVER AL MENÚ</span>
      </button>

    </div>
  );
}