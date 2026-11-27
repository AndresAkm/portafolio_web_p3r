"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";
import { useIsMobile } from "./useIsMobile";

// ── DATA ──────────────────────────────────────────────────────────────────────
// Each entry is one tappable dialogue page. "\n" forces a line break.

const SPEAKER = "MAKOTO";

const PAGES = [
  "¡Hola! Soy Makoto. Bienvenido al archivo personal de Andrxss (Jaime Andrés Parra Sánchez), desarrollador de software en formación desde Antioquia, Colombia.",
  "Actualmente cursa Análisis y Desarrollo de Software en el SENA, especializándose en construir aplicaciones web y móviles completas de principio a fin.",
  "Su arsenal técnico combina Python, Django, JavaScript, Node.js y Flutter, respaldado por modelado de datos relacionales (MySQL/MariaDB) y no relacionales (MongoDB).",
  "Le apasiona entender cómo funcionan los sistemas por debajo: desde el diseño de bases de datos hasta el despliegue en la nube.",
  "Si buscas a alguien autodidacta, analítico y listo para aportar en un equipo de desarrollo, revisa sus proyectos o envíale un mensaje.",
];

const TYPE_SPEED = 9;

// Floating P5 confetti shards — {left%, top%, size, color, dur, delay}
const SHARDS = [
  { x: 12, y: 18, s: 14, c: "#2f8bff", d: 7,  delay: 0   },
  { x: 30, y: 70, s: 9,  c: "#9fd4ff", d: 9,  delay: 1.2 },
  { x: 48, y: 12, s: 11, c: "#ffffff", d: 8,  delay: 0.6 },
  { x: 66, y: 60, s: 8,  c: "#2f8bff", d: 10, delay: 2.1 },
  { x: 80, y: 28, s: 13, c: "#7fb6ff", d: 7.5, delay: 1.6 },
  { x: 90, y: 75, s: 10, c: "#ffffff", d: 9.5, delay: 0.9 },
  { x: 22, y: 44, s: 7,  c: "#2f8bff", d: 11, delay: 2.6 },
];

// ── COMPONENT ─────────────────────────────────────────────────────────────────

export default function About({ onBack }: { onBack?: () => void }) {

  const prefersReducedMotion = usePrefersReducedMotion();
  const isMobile = useIsMobile();
  const [mounted, setMounted] = useState(false);
  const [page, setPage]       = useState(0);
  const [shown, setShown]     = useState(0);   // chars revealed of current page
  const tickRef = useRef<HTMLAudioElement | null>(null);

  const full = PAGES[page];
  const done = shown >= full.length;
  const isLast = page >= PAGES.length - 1;

  // mount-in
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    let interval: number | undefined;
    const timer = window.setTimeout(() => {
      if (prefersReducedMotion) {
        setShown(full.length);
        return;
      }
      setShown(0);
      if (!tickRef.current) {
        tickRef.current = new Audio("/sfx/deck_ui_navigation.wav");
        tickRef.current.preload = "auto";
      }
      let i = 0;
      interval = window.setInterval(() => {
        i += 1;
        setShown(i);
        if (i % 3 === 0 && full[i - 1] !== " " && full[i - 1] !== "\n" && tickRef.current) {
          tickRef.current.currentTime = 0;
          tickRef.current.volume = 0.06;
          tickRef.current.play().catch(() => {});
        }
        if (i >= full.length && interval !== undefined) window.clearInterval(interval);
      }, TYPE_SPEED);
    }, 0);
    return () => {
      window.clearTimeout(timer);
      if (interval !== undefined) window.clearInterval(interval);
    };
  }, [page, mounted, full, prefersReducedMotion]);

  const advance = useCallback(() => {
    if (!done) { setShown(full.length); return; }
    const sfx = new Audio("/sfx/deck_ui_navigation.wav");
    sfx.volume = 0.5;
    sfx.play().catch(() => {});
    setPage(p => (p + 1) % PAGES.length);
  }, [done, full.length]);

  // keyboard: Enter/→/Space advance, ESC back
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        advance();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [advance]);

  if (isMobile) {
    return (
      <div className="absolute inset-0 overflow-hidden" style={{ background: "#0a1230" }}>
        <div className="absolute inset-0 select-none" style={{ zIndex: 0, pointerEvents: "none", backgroundImage: "url('/images/about-makoto.webp')", backgroundSize: "cover", backgroundPosition: "32% center" }} />
        <div style={{ position: "absolute", inset: 0, zIndex: 1, background: "linear-gradient(180deg, rgba(4,9,26,0.15) 0%, rgba(4,9,26,0.55) 55%, rgba(4,9,26,0.9) 100%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", inset: 0, zIndex: 10, display: "flex", flexDirection: "column", justifyContent: "flex-end", gap: 12, padding: "18px 16px calc(88px + var(--safe-bottom))" }}>
          <div style={{ alignSelf: "flex-end", marginRight: 4, padding: "5px 12px 6px", background: "#0a1230", color: "#8df6ff", fontFamily: "var(--font-bebas), sans-serif", fontSize: "clamp(18px,5.5vw,24px)", letterSpacing: 3, clipPath: "polygon(0 0, 100% 0, calc(100% - 12px) 100%, 0 100%)" }}>
            {SPEAKER}
          </div>
          <div
            data-mobile-scroll=""
            onClick={advance}
            style={{ position: "relative", maxHeight: "46vh", overflowY: "auto", padding: "18px 18px 22px", background: "rgba(245,249,255,0.96)", border: "2px solid rgba(8,17,54,0.8)", clipPath: "polygon(0 0, calc(100% - 18px) 0, 100% 12px, 100% 100%, 18px 100%, 0 calc(100% - 12px))", boxShadow: "6px 6px 0 rgba(6,15,44,0.72)", cursor: "pointer" }}
          >
            <span style={{ fontFamily: "var(--font-montserrat), sans-serif", fontWeight: 400, fontSize: "clamp(0.88rem,4vw,1rem)", lineHeight: 1.45, color: "#0b1730" }}>
              {full.slice(0, shown)}
            </span>
            <span style={{ marginLeft: 2, fontFamily: "var(--font-bebas), sans-serif", fontSize: 18, color: "#2f8bff" }}>_</span>
          </div>
          <button
            onClick={advance}
            style={{ alignSelf: "stretch", minHeight: 48, fontFamily: "var(--font-bebas), sans-serif", fontSize: 18, letterSpacing: 2, color: "#fff", background: "#c4001a", border: "none", cursor: "pointer", clipPath: "polygon(12px 0, 100% 0, calc(100% - 12px) 100%, 0 100%)" }}
          >
            {!done ? "VER TODO" : isLast ? "REINICIAR" : "CONTINUAR"}
          </button>
        </div>
        <button
          onClick={() => onBack?.()}
          style={{ position: "absolute", left: 16, right: 16, bottom: "calc(12px + var(--safe-bottom))", zIndex: 40, minHeight: 48, display: "flex", alignItems: "center", justifyContent: "center", gap: 10, fontFamily: "var(--font-bebas), sans-serif", fontSize: 18, letterSpacing: 2, color: "#fff", background: "rgba(6,12,38,0.92)", border: "2px solid rgba(141,246,255,0.35)", borderRadius: 4, cursor: "pointer" }}
        >
          <span style={{ fontSize: 20, lineHeight: 1 }}>←</span>
          <span>VOLVER AL MENÚ</span>
        </button>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden" style={{ background: "#0a1230" }}>

      {/* ── BACKGROUND ART (Makoto + ABOUT + scene) ── */}
      <motion.img
        src="/images/about-makoto.webp"
        alt=""
        decoding="async"
        initial={{ opacity: 0, scale: 1.04 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 w-full h-full object-cover select-none"
        style={{ zIndex: 0, pointerEvents: "none" }}
        draggable={false}
      />

      {/* ── FLOATING CONFETTI SHARDS ── */}
      <div className="absolute inset-0" style={{ zIndex: 1, pointerEvents: "none" }}>
        {SHARDS.map((sh, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${sh.x}%`,
              top: `${sh.y}%`,
              width: sh.s,
              height: sh.s,
              background: sh.c,
              opacity: 0.55,
              clipPath: "polygon(0 0, 100% 28%, 38% 100%)",
              animation: `aboutShard ${sh.d}s ease-in-out ${sh.delay}s infinite`,
            }}
          />
        ))}
      </div>
      <style>{`
        @keyframes aboutShard {
          0%   { transform: translateY(0) rotate(0deg);    opacity: 0.15; }
          50%  { transform: translateY(-26px) rotate(160deg); opacity: 0.6; }
          100% { transform: translateY(0) rotate(360deg);  opacity: 0.15; }
        }
      `}</style>

      {/* ── DIALOGUE BOX (code-rendered, P5 jagged outline) ── */}
      <motion.div
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: mounted ? 1 : 0, x: mounted ? 0 : 60 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
        onClick={advance}
        style={{
          position: "absolute",
          left: "34vw",
          right: "3vw",
          top: "54vh",
          bottom: "11vh",
          zIndex: 10,
          cursor: "pointer",
        }}
      >

        {/* JAGGED BOX OUTLINE — pointer on the LEFT edge, aimed at Makoto */}
        <svg
          viewBox="0 0 1240 600"
          preserveAspectRatio="none"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "visible", zIndex: 0 }}
        >
          <path
            d="M 120 24 L 1232 14 L 1224 584 L 112 592 L 120 410 L 0 388 L 122 300 Z"
            fill="#0a0c12"
            vectorEffect="non-scaling-stroke"
            style={{ filter: "drop-shadow(0 18px 40px rgba(0,0,0,0.6))" }}
          />
          {/* white outline draws itself in on mount */}
          <motion.path
            d="M 120 24 L 1232 14 L 1224 584 L 112 592 L 120 410 L 0 388 L 122 300 Z"
            fill="none"
            stroke="#ffffff"
            strokeWidth={3}
            strokeLinejoin="miter"
            vectorEffect="non-scaling-stroke"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: mounted ? 1 : 0 }}
            transition={{ duration: 0.7, ease: "easeInOut", delay: 0.3 }}
          />
        </svg>


        {/* NAME TAG — blue, top-RIGHT, slams in */}
        <motion.div
          initial={{ opacity: 0, x: 30, rotate: -6, scale: 0.85 }}
          animate={{ opacity: mounted ? 1 : 0, x: 0, rotate: 0, scale: 1 }}
          transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1], delay: 0.55 }}
          style={{
            position: "absolute",
            right: 18,
            top: -30,
            background: "linear-gradient(180deg, #2f8bff 0%, #1f6fe0 100%)",
            color: "#fff",
            fontFamily: "var(--font-anton), sans-serif",
            fontSize: 26,
            letterSpacing: 3,
            padding: "4px 20px 6px 26px",
            clipPath: "polygon(18px 0, 100% 0, 100% 100%, 0 100%)",
            boxShadow: "0 4px 0 rgba(0,0,0,0.4)",
            userSelect: "none",
            transformOrigin: "right center",
            zIndex: 12,
          }}>
          {SPEAKER}
        </motion.div>

        {/* TEXT */}
        <div style={{
          position: "relative",
          zIndex: 11,
          height: "100%",
          padding: "26px 44px 26px 12%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          fontFamily: "'JetBrains Mono', 'Consolas', monospace",
          color: "#f2f5ff",
          fontSize: "clamp(0.95rem, 1.45vw, 1.55rem)",
          lineHeight: 1.55,
          letterSpacing: 0.3,
          whiteSpace: "pre-wrap",
        }}>
          {full.slice(0, shown)}
          {!done && (
            <span style={{ opacity: 0.7 }}>▌</span>
          )}
        </div>

        {/* ▼ ADVANCE CARET — pulses when the line is done */}
        {done && (
          <motion.div
            animate={prefersReducedMotion ? { opacity: 1 } : { opacity: [0.25, 1, 0.25], y: [0, 3, 0] }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
            style={{
              position: "absolute",
              right: 26,
              bottom: 16,
              zIndex: 12,
              color: "#fff",
              fontSize: 22,
              lineHeight: 1,
              userSelect: "none",
            }}
          >
            ▼
          </motion.div>
        )}

        {/* page dots */}
        <div style={{
          position: "absolute",
          left: "12%",
          bottom: 14,
          display: "flex",
          gap: 7,
          zIndex: 12,
        }}>
          {PAGES.map((_, i) => (
            <div key={i} style={{
              width: 8, height: 8,
              transform: "rotate(45deg)",
              background: i === page ? "#2f8bff" : "rgba(255,255,255,0.25)",
              transition: "background 0.2s ease",
            }} />
          ))}
        </div>
      </motion.div>

      {/* ── TAP HINT ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: mounted ? 1 : 0 }}
        transition={{ delay: 0.8, duration: 0.4 }}
        style={{
          position: "absolute",
          bottom: 76, right: 28,
          zIndex: 25,
          fontFamily: "var(--font-bebas), sans-serif",
          fontSize: 14,
          letterSpacing: 2,
          color: "rgba(255,255,255,0.4)",
          pointerEvents: "none",
        }}
      >
        {isLast && done ? "TOCA PARA REPETIR" : "TOCA / ↵  PARA CONTINUAR"}
      </motion.div>

      {/* P5 PHANTOM THIEVES BADGE — Persona cred, not larping */}
      <motion.img
        src="/images/p5-logo.webp"
        alt="Ladrones Fantasma"
        decoding="async"
        loading="lazy"
        initial={{ opacity: 0, scale: 0.6, rotate: -12 }}
        animate={{ opacity: mounted ? 0.92 : 0, scale: 1, rotate: 0 }}
        transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1], delay: 0.7 }}
        className="select-none"
        style={{
          position: "absolute",
          right: 30,
          top: 26,
          width: "clamp(64px, 8vw, 128px)",
          height: "auto",
          zIndex: 20,
          pointerEvents: "none",
          filter: "drop-shadow(0 4px 10px rgba(0,0,0,0.5))",
        }}
        draggable={false}
      />

      {/* VOLVER AL MENÚ */}
      <button
        onClick={() => onBack?.()}
        style={{
          position: "absolute", bottom: 20, right: 28, zIndex: 40,
          display: "flex", alignItems: "center", gap: 10,
          fontFamily: "var(--font-bebas), sans-serif", fontSize: 20, letterSpacing: 2,
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
