"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { motion } from "framer-motion";

const posterStyle = (poster?: string): CSSProperties | undefined =>
  poster
    ? {
        backgroundImage: `url(${poster})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }
    : undefined;

// ── ABOUT / MENU — your original panel slide in/out ──────────────────────────

const PANEL_COLORS = [
  "#0a1230",
  "#0d1a3a",
  "#111c3f",
  "#08122c",
  "#050b1f",
];

function PanelTransition({ poster }: { poster?: string }) {
  const [phase, setPhase] = useState<"in" | "out">("in");

  useEffect(() => {
    const t = setTimeout(() => setPhase("out"), 580);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "row" }}
    >
      {PANEL_COLORS.map((color, i) => (
        <motion.div
          key={`${phase}-${i}`}
          initial={{ y: phase === "in" ? "-100%" : "0%" }}
          animate={{ y: phase === "in" ? "0%" : "100%" }}
          transition={{
            duration: 0.38,
            delay: i * 0.045,
            ease: phase === "in" ? [0.22, 1, 0.36, 1] : [0.64, 0, 0.78, 0],
          }}
          style={{ backgroundColor: color, ...posterStyle(poster), flex: "1 0 20%", height: "100%" }}
        />
      ))}
    </div>
  );
}

// ── RESUME — parallelogram cards slide in from left ───────────────────────────

function ResumeTransition({ poster }: { poster?: string }) {
  const cards = [
    { top: "14vh", color: "#0f1760", delay: 0 },
    { top: "31vh", color: "#7ff6ff", delay: 0.05 },
    { top: "48vh", color: "#ffffff", delay: 0.1 },
    { top: "65vh", color: "#0f1760", delay: 0.15 },
  ];

  return (
    <>
      {cards.map((card, i) => (
        <motion.div
          key={i}
          style={{
            position: "absolute",
            left: "-6vw",
            top: card.top,
            width: "78vw",
            height: "14vh",
            background: card.color,
            ...posterStyle(poster),
            zIndex: 10 - i,
            clipPath: "polygon(0 0, 97% 0, 100% 100%, 3% 100%)",
            boxShadow: card.color === "#ffffff" ? "10px 0 0 #d63232" : "none",
          }}
          initial={{ x: -900, opacity: 1 }}
          animate={{ x: [-900, 30, 0, 900] }}
          transition={{
            duration: 0.6,
            delay: card.delay,
            times: [0, 0.48, 0.7, 1],
            ease: [0.76, 0, 0.24, 1],
          }}
        />
      ))}
    </>
  );
}

// ── SOCIALS / GITHUB — skewed vertical stripes from right ─────────────────────

function StripesTransition({ poster }: { poster?: string }) {
  const stripes = [
    { color: "#00184c", left: "72vw", width: "24vw", delay: 0 },
    { color: "#00dff7", left: "80vw", width: "14vw", delay: 0.06 },
    { color: "#ffffff", left: "88vw", width:  "8vw", delay: 0.12 },
  ];

  return (
    <>
      {stripes.map((stripe, i) => (
        <motion.div
          key={i}
          style={{
            position: "absolute",
            top: "-6vh",
            left: stripe.left,
            width: stripe.width,
            height: "112vh",
            background: stripe.color,
            ...posterStyle(poster),
            zIndex: 10 - i,
            transform: "skewX(-16deg)",
            transformOrigin: "top",
          }}
          initial={{ y: -1200, opacity: 1 }}
          animate={{ y: [-1200, 0, 0, 1200] }}
          transition={{
            duration: 0.56,
            delay: stripe.delay,
            times: [0, 0.42, 0.58, 1],
            ease: [0.76, 0, 0.24, 1],
          }}
        />
      ))}
    </>
  );
}

// ── DEFAULT — 3 colored blocks scaleX ────────────────────────────────────────

function DefaultTransition({ poster }: { poster?: string }) {
  const blocks = ["#0a1230", "#0d1a3a", "#111c3f"];

  return (
    <>
      {blocks.map((color, i) => (
        <motion.div
          key={i}
          style={{
            position: "absolute",
            inset: 0,
            background: color,
            ...posterStyle(poster),
            zIndex: 10 - i,
            originX: 0,
          }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: [0, 1, 1, 0] }}
          transition={{
            duration: 0.45,
            delay: i * 0.05,
            times: [0, 0.4, 0.6, 1],
            ease: [0.76, 0, 0.24, 1],
          }}
        />
      ))}
    </>
  );
}

// ── MAIN EXPORT ───────────────────────────────────────────────────────────────

interface TransitionProps {
  variant?: "panel" | "resume" | "stripes" | "default";
  poster?: string;
}

export default function Transition({ variant = "panel", poster }: TransitionProps) {
  return (
    <div className="absolute inset-0 z-[999] pointer-events-none overflow-hidden">
      {variant === "panel"   && <PanelTransition poster={poster} />}
      {variant === "resume"  && <ResumeTransition poster={poster} />}
      {variant === "stripes" && <StripesTransition poster={poster} />}
      {variant === "default" && <DefaultTransition poster={poster} />}
    </div>
  );
}