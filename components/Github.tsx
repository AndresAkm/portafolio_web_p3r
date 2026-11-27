"use client";

import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";
import { useIsMobile } from "./useIsMobile";

// ── DATA ──────────────────────────────────────────────────────────────────────

const CHAR = "/images/char1.png";

const ITEM = {
  id: "github",
  label: "GITHUB",
  icon: "</>",
  barIcon: "/images/icon1.png",
  href: "https://github.com/AndresAkm",
  handle: "@AndresAkm",
  subtitle: "Repositorios públicos activos (@AndresAkm) · Python, JavaScript, Dart",
  stats: [
    { tag: "REP", value: "3+", color: "#6e40c9" },
    { tag: "STACK", value: "3", color: "#f1e05a" },
  ],
  links: [
    { label: "VER CÓDIGO", url: "https://github.com/AndresAkm" },
  ],
};

// ── COMPONENT ─────────────────────────────────────────────────────────────────

export default function Github({ onBack }: { onBack?: () => void }) {

  const prefersReducedMotion = usePrefersReducedMotion();
  const isMobile = useIsMobile();
  const [mounted, setMounted]       = useState(false);
  const [focused, setFocused]       = useState(false); // right panel focused
  const [activeLink, setActiveLink] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {

    const onKey = (e: KeyboardEvent) => {

      if (!focused) {
        if (e.key === "ArrowRight" || e.key === "Enter") {
          setFocused(true);
          setActiveLink(0);
        }
      } else {
        if (e.key === "ArrowLeft")  setFocused(false);
        if (e.key === "Enter")      window.open(ITEM.links[activeLink].url, "_blank", "noopener,noreferrer");
      }

    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);

  }, [focused, activeLink]);

  if (isMobile) {
    return (
      <div className="absolute inset-0 overflow-hidden" id="github-screen">
        <video autoPlay={!prefersReducedMotion} loop={!prefersReducedMotion} muted playsInline preload={prefersReducedMotion ? "none" : "metadata"} data-mobile-bg="" className="absolute inset-0 h-full w-full object-cover">
          <source src="/videos/equip.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0" style={{ zIndex: 1, background: "linear-gradient(180deg, rgba(4,9,26,0.6) 0%, rgba(4,9,26,0.86) 100%)" }} />
        <div data-mobile-scroll="" style={{ position: "absolute", inset: 0, zIndex: 10, overflowY: "auto", padding: "20px 16px calc(104px + var(--safe-bottom))", display: "flex", flexDirection: "column", justifyContent: "center", gap: 16 }}>
          <div style={{ fontFamily: "var(--font-anton), sans-serif", fontSize: "clamp(2.2rem,10vw,3.2rem)", letterSpacing: 2, color: "#f6fbff" }}>GITHUB</div>
          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", inset: "8px -4px -8px 8px", background: "#c4001a", clipPath: "polygon(24px 0, 100% 0, calc(100% - 16px) 100%, 0 100%)" }} />
            <div style={{ position: "relative", padding: "18px 16px", background: "#ffffff", clipPath: "polygon(24px 0, 100% 0, calc(100% - 16px) 100%, 0 100%)", boxShadow: "0 8px 24px rgba(0,0,0,0.65)" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                <span style={{ fontFamily: "var(--font-anton), sans-serif", fontSize: "clamp(1.2rem,5.2vw,1.6rem)", letterSpacing: -1, color: "#111", transform: "rotate(-8deg)" }}>LÍDER</span>
                <span style={{ fontFamily: "var(--font-bebas), sans-serif", fontSize: 22, color: "#6e40c9" }}>{ITEM.icon}</span>
              </div>
              <div style={{ marginTop: 12, fontFamily: "var(--font-bebas), sans-serif", fontSize: "clamp(1.3rem,5.6vw,1.7rem)", letterSpacing: 3, color: "#111" }}>{ITEM.label}</div>
              <div style={{ fontFamily: "var(--font-bebas), sans-serif", fontSize: "clamp(0.85rem,3.6vw,1rem)", letterSpacing: 2, color: "rgba(0,0,0,0.55)" }}>{ITEM.handle}</div>
              <div style={{ marginTop: 8, fontFamily: "var(--font-montserrat), sans-serif", fontWeight: 300, fontSize: "clamp(0.75rem,3.3vw,0.88rem)", lineHeight: 1.35, color: "rgba(0,0,0,0.62)" }}>{ITEM.subtitle}</div>
              <div style={{ display: "flex", gap: 18, marginTop: 14 }}>
                {ITEM.stats.map(stat => (
                  <div key={stat.tag} style={{ display: "flex", alignItems: "baseline", gap: 5 }}>
                    <span style={{ fontFamily: "var(--font-bebas), sans-serif", fontSize: 11, letterSpacing: 1, padding: "1px 4px", border: `1px solid ${stat.color}`, color: stat.color }}>{stat.tag}</span>
                    <span style={{ fontFamily: "var(--font-bebas), sans-serif", fontSize: 22, fontStyle: "italic", color: "#111" }}>{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <button onClick={() => window.open(ITEM.links[0].url, "_blank", "noopener,noreferrer")} style={{ minHeight: 52, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 14px", fontFamily: "var(--font-bebas), sans-serif", fontSize: 17, letterSpacing: 2, color: "#08153f", background: "#8df6ff", border: "none", cursor: "pointer", clipPath: "polygon(0 0, 100% 0, calc(100% - 12px) 100%, 0 100%)" }}>
            <span>{ITEM.links[0].label}</span>
            <span>ABRIR →</span>
          </button>
        </div>
        <button onClick={() => onBack?.()} style={{ position: "absolute", left: 16, right: 16, bottom: "calc(12px + var(--safe-bottom))", zIndex: 40, minHeight: 48, display: "flex", alignItems: "center", justifyContent: "center", gap: 10, fontFamily: "var(--font-bebas), sans-serif", fontSize: 18, letterSpacing: 2, color: "#fff", background: "rgba(6,12,38,0.92)", border: "2px solid rgba(141,246,255,0.35)", borderRadius: 4, cursor: "pointer" }}>
          <span style={{ fontSize: 20, lineHeight: 1 }}>←</span>
          <span>VOLVER AL MENÚ</span>
        </button>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden" id="github-screen">

      {/* BG VIDEO */}
      <video
        autoPlay={!prefersReducedMotion} loop={!prefersReducedMotion} muted playsInline
        preload={prefersReducedMotion ? "none" : "metadata"}
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/videos/equip.mp4" type="video/mp4" />
      </video>

      {/* ENTRY MASK */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 9,
          overflow: "hidden",
          background: "#0047FF",
          clipPath: "circle(0 at 50% 50%)",
          animation: "github-entry-reveal 1.2s cubic-bezier(0.16,1,0.3,1) forwards",
          pointerEvents: "none",
        }}
      >
      </div>

      <style>{`
        @keyframes github-entry-reveal {
          from { clip-path: circle(0 at 50% 50%); opacity: 1; }
          85%  { opacity: 1; }
          to   { clip-path: circle(150vmax at 50% 50%); opacity: 0; }
        }
        @keyframes sc-arrow-left {
          0%, 100% { transform: translateX(0); opacity: 1; }
          50%       { transform: translateX(-5px); opacity: 0.4; }
        }
        @keyframes sc-arrow-right {
          0%, 100% { transform: translateX(0); opacity: 1; }
          50%       { transform: translateX(5px); opacity: 0.4; }
        }
        @keyframes sc-right-nav-pop {
          0%   { opacity: 0; transform: scale(0.55) translateY(-10px); }
          65%  { opacity: 1; transform: scale(1.1) translateY(2px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes sc-infobar-in {
          0%   { opacity: 0; transform: translateX(40px); }
          60%  { opacity: 1; transform: translateX(-4px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        .gh-arrow-left  { animation: sc-arrow-left  0.8s ease-in-out infinite; display: inline-block; }
        .gh-arrow-right { animation: sc-arrow-right 0.8s ease-in-out infinite; display: inline-block; }
        .gh-nav-pop     { animation: sc-right-nav-pop 0.38s cubic-bezier(0.22,1,0.36,1) both; }
        .gh-infobar-in  { animation: sc-infobar-in 0.35s cubic-bezier(0.22,1,0.36,1) both; }
      `}</style>

      {/* ── SINGLE BAR ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 10,
          pointerEvents: "none",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
        }}
      >
        <div
          onClick={() => window.open(ITEM.href, "_blank", "noopener,noreferrer")}
          onMouseEnter={() => {}}
          style={{
            position: "relative",
            flexShrink: 0,
            pointerEvents: "all",
            cursor: "pointer",
            transform: mounted ? "translateX(0)" : "translateX(-100%)",
            transition: "transform 0.55s cubic-bezier(0.22,1,0.36,1)",
          }}
        >

          {/* RED UNDERLAY */}
          <div
            style={{
              position: "absolute",
              top: 0, left: 0,
              width: "45vw",
              height: 90,
              background: "#c4001a",
              clipPath: "polygon(50% 0, 100% 0, 100% 100%, calc(50% - 10px) 100%)",
              transform: "translateY(-7px)",
              opacity: 1,
              zIndex: 0,
              pointerEvents: "none",
            }}
          />

          {/* MAIN BAR */}
          <div
            style={{
              position: "relative",
              width: "45vw",
              height: 90,
              background: "#111",
              clipPath: "polygon(0 0, 100% 0, calc(100% - 14px) 100%, 0 100%)",
              boxShadow: "0 6px 24px rgba(0,0,0,0.65)",
              overflow: "hidden",
              zIndex: 1,
            }}
          >

            {/* WHITE FILL */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "#fff",
                clipPath: "polygon(22% 0, 100% 0, calc(100% - 14px) 100%, calc(22% + 138px) 100%)",
                zIndex: 0,
              }}
            />

            {/* SHADE */}
            <div
              style={{
                position: "absolute",
                top: 0, bottom: 0, left: "73%", width: "6%",
                background: "linear-gradient(90deg, rgba(0,0,0,0.15) 0%, transparent 100%)",
                zIndex: 1,
                pointerEvents: "none",
              }}
            />

            {/* CHARACTER */}
            <img
              src={CHAR}
              alt=""
              decoding="async"
              style={{
                position: "absolute",
                top: 0, left: 110,
                height: "100%", width: "auto", maxWidth: 160,
                objectFit: "cover", objectPosition: "top",
                pointerEvents: "none",
                zIndex: 3,
                clipPath: "polygon(20px 0%, 100% 0%, calc(100% - 20px) 100%, 0% 100%)",
              }}
            />

            {/* CONTENT */}
            <div
              style={{
                position: "relative",
                zIndex: 4,
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0 20px",
              }}
            >

              {/* ROLE */}
              <div
                style={{
                  fontFamily: "var(--font-anton), sans-serif",
                  fontSize: 50,
                  letterSpacing: -2,
                  color: "#fff",
                  transform: "rotate(-30deg)",
                  userSelect: "none",
                  lineHeight: 1,
                  padding: "0 16px 0 8px",
                  flexShrink: 0,
                }}
              >
                LÍDER
              </div>

              {/* LABEL */}
              <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 3 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ fontSize: 22, userSelect: "none" }}>{ITEM.icon}</span>
                  <span
                    style={{
                      fontFamily: "var(--font-bebas), sans-serif",
                      fontSize: 28,
                      letterSpacing: 4,
                      color: "#111",
                      userSelect: "none",
                    }}
                  >
                    {ITEM.label}
                  </span>
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-bebas), sans-serif",
                    fontSize: 14,
                    letterSpacing: 2,
                    color: "rgba(0,0,0,0.45)",
                    userSelect: "none",
                  }}
                >
                  {ITEM.handle}
                </div>
                <div
                  style={{
                    maxWidth: 300,
                    fontFamily: "var(--font-montserrat), sans-serif",
                    fontWeight: 300,
                    fontSize: 10,
                    lineHeight: 1.2,
                    color: "rgba(0,0,0,0.5)",
                    textAlign: "center",
                    userSelect: "none",
                  }}
                >
                  {ITEM.subtitle}
                </div>
              </div>

              {/* STATS */}
              <div style={{ display: "flex", alignItems: "center", gap: 10, paddingRight: 24, flexShrink: 0 }}>
                {ITEM.stats.map(s => (
                  <div key={s.tag} style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
                      <span style={{ fontFamily: "var(--font-bebas), sans-serif", fontSize: 9, letterSpacing: 1.5, padding: "1px 4px", border: `1px solid ${s.color}`, color: s.color, lineHeight: 1.4, userSelect: "none" }}>{s.tag}</span>
                      <span style={{ fontFamily: "var(--font-bebas), sans-serif", fontSize: 26, fontStyle: "italic", color: "#111", letterSpacing: 1, userSelect: "none" }}>{s.value}</span>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 1, marginTop: 2, width: "100%" }}>
                      <div style={{ height: 3, background: s.color, width: "100%" }} />
                      <div style={{ height: 2, background: "#000", width: "100%" }} />
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* ── RIGHT NAV LABEL ── */}
      {mounted && (
        <div
          className="gh-nav-pop"
          style={{
            position: "fixed",
            top: 40, right: 40,
            display: "flex",
            alignItems: "center",
            gap: 6,
            pointerEvents: "none",
            zIndex: 50,
          }}
        >
          <span className="gh-arrow-left" style={{ fontFamily: "var(--font-bebas), sans-serif", fontSize: 22, color: "#c4001a" }}>◄</span>
          <span style={{ fontFamily: "var(--font-bebas), sans-serif", fontSize: 100, letterSpacing: 3, lineHeight: 1, color: "#fff", WebkitTextStroke: "2px #000", userSelect: "none" }}>LB</span>
          <span style={{ fontFamily: "var(--font-bebas), sans-serif", fontSize: 28, letterSpacing: 3, color: "#111", padding: "0 8px", userSelect: "none" }}>GITHUB</span>
          <span style={{ fontFamily: "var(--font-bebas), sans-serif", fontSize: 100, letterSpacing: 3, lineHeight: 1, color: "#fff", WebkitTextStroke: "2px #000", userSelect: "none" }}>RB</span>
          <span className="gh-arrow-right" style={{ fontFamily: "var(--font-bebas), sans-serif", fontSize: 22, color: "#c4001a" }}>►</span>
        </div>
      )}

      {/* ── LINK BAR ── */}
      {mounted && (
        <div
          className="gh-infobar-in"
          onClick={() => { setFocused(true); window.open(ITEM.links[0].url, "_blank", "noopener,noreferrer"); }}
          onMouseEnter={() => setFocused(true)}
          onMouseLeave={() => setFocused(false)}
          style={{
            position: "fixed",
            right: 0,
            left: "65%",
            top: 155,
            height: 46,
            background: focused ? "#111" : "transparent",
            padding: focused ? "1.5px" : 0,
            borderRadius: focused ? 8 : 0,
            pointerEvents: "all",
            cursor: "pointer",
            zIndex: 50,
            transition: "background 0.15s ease",
          }}
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
              background: focused ? "#fff" : "transparent",
              borderRadius: focused ? 7 : 0,
              display: "flex",
              alignItems: "center",
              overflow: "hidden",
            }}
          >
            {focused && (
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: "#c4001a", zIndex: 1 }} />
            )}

            <img
              src={ITEM.barIcon}
              alt=""
              decoding="async"
              loading="lazy"
              style={{ height: "55%", width: "auto", flexShrink: 0, marginLeft: 14, objectFit: "contain" }}
            />

            <span style={{ flex: 1, fontFamily: "var(--font-bebas), sans-serif", fontSize: 22, letterSpacing: 2, color: "#111", padding: "0 14px", userSelect: "none" }}>
              {ITEM.links[0].label}
            </span>

            <span style={{ height: "70%", background: "#000", display: "flex", alignItems: "center", padding: "0 12px", fontFamily: "var(--font-bebas), sans-serif", fontSize: 20, letterSpacing: 1, color: "#fff", flexShrink: 0, borderRadius: 6, marginRight: 4, userSelect: "none" }}>
              ABRIR
            </span>
          </div>
        </div>
      )}

      {/* FOOTER HINTS */}
      <div
        style={{
          position: "fixed",
          bottom: 20, right: 28,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: 5,
          fontFamily: "var(--font-bebas), sans-serif",
          zIndex: 50,
          pointerEvents: "none",
          opacity: mounted ? 1 : 0,
          transition: "opacity 0.4s ease 0.6s",
        }}
      >
        {[["→", "ENLACE"], ["↵", "ABRIR"], ["ESC", "VOLVER"]].map(([key, label]) => (
          <div key={key} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, letterSpacing: 2, color: "rgba(255,255,255,0.22)" }}>
            <span style={{ border: "1px solid rgba(255,255,255,0.15)", borderRadius: 3, padding: "1px 6px", fontSize: 11 }}>{key}</span>
            <span>{label}</span>
          </div>
        ))}
      </div>

    </div>
  );
}