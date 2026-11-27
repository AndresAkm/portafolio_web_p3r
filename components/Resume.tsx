"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "./useIsMobile";

// ── DATA ──────────────────────────────────────────────────────────────────────

type SummaryPanel = {
  index: string;
  title: string;
  progress: string;
  rows: { index: string; title: string; status: string }[];
  bottom: { title: string; bullets: string[] };
};

type DetailSection = {
  heading: string;
  date: string;
  bullets: string[];
  images?: string[];
  repo?: string;
  repoLabel?: string;
  certificate?: string;
  certificateLabel?: string;
};

type DetailPanel = {
  title: string;
  sections: DetailSection[];
};

const ITEMS = [
  { id: "i",   badge: "I",   title: "EXPERIENCIA", subtitle: "Trayectoria práctica",     rank: 9 },
  { id: "ii",  badge: "II",  title: "HABILIDADES", subtitle: "Stack principal",          rank: 7 },
  { id: "iii", badge: "III", title: "PROYECTOS",  subtitle: "Destacados",                rank: 6 },
  { id: "iv",  badge: "IV",  title: "EDUCACIÓN",  subtitle: "SENA y certificaciones",    rank: 5 },
];

const SUMMARY_PANELS: SummaryPanel[] = [
  {
    index: "01", title: "REGISTRO DE TRAYECTORIA", progress: "1",
    rows: [
      { index: "01", title: "Desarrollador Full-Stack (Proyectos Independientes y Formativos)", status: "2025 – Actualidad" },
    ],
    bottom: { title: "PERFIL", bullets: [
      "Desarrollador Full-Stack Junior (Web & Mobile)",
      "Construyendo soluciones web y móviles desde cero con código limpio y arquitectura sólida.",
      "Antioquia, Colombia · github.com/AndresAkm",
    ]},
  },
  {
    index: "02", title: "ÁRBOL DE HABILIDADES", progress: "4",
    rows: [
      { index: "BACK", title: "Python · Django · Node.js · APIs REST", status: "En uso" },
      { index: "FRONT", title: "JavaScript (ES6+) · HTML5 · CSS3 · Bootstrap 5 · React · Tailwind CSS · Flutter", status: "En uso" },
      { index: "DDBB", title: "MySQL · MariaDB · MongoDB · Modelado Entidad-Relación (ER)", status: "Avanzado" },
      { index: "TOOLS", title: "Git · Linux · Docker · Next.js", status: "En uso" },
    ],
    bottom: { title: "KIT PRINCIPAL", bullets: [
      "Backend con Python, Django y Node.js",
      "Interfaces web y móviles con React, Flutter, Bootstrap 5 y Tailwind CSS",
      "Persistencia SQL y NoSQL con MySQL, MariaDB y MongoDB",
    ]},
  },
  {
    index: "03", title: "REGISTRO DE PROYECTOS", progress: "2",
    rows: [
      { index: "01", title: "Carely — Plataforma E-Commerce & App Móvil", status: "2026" },
      { index: "02", title: "Anime CLI — Buscador y Catálogo en Terminal", status: "2026" },
    ],
    bottom: { title: "IMPACTO", bullets: [
      "2 plataformas sincronizadas (Web + App móvil) y flujo de pago integrado",
      "Búsqueda instantánea por consola con filtrado por estado y género",
    ]},
  },
  {
    index: "04", title: "REGISTRO ACADÉMICO", progress: "'26",
    rows: [
      { index: "01", title: "Tecnólogo en Análisis y Desarrollo de Software — SENA", status: "2023 – 2026" },
      { index: "02", title: "Curso especial en Construcción de Bases de Datos con MySQL", status: "04 nov 2026" },
      { index: "03", title: "Curso especial en Implementación de Bases de Datos NoSQL", status: "15 oct 2025" },
    ],
    bottom: { title: "", bullets: [] as string[] },
  },
];

const EXPANDED_PANELS: DetailPanel[] = [
  {
    title: "EXPERIENCIA — DETALLE COMPLETO",
    sections: [
      {
        heading: "Desarrollador Full-Stack (Proyectos Independientes y Formativos)",
        date: "2025 – Actualidad · Antioquia, Colombia · Desarrollo Propio / SENA",
        bullets: [
          "Diseñé y desarrollé Carely, una plataforma e-commerce de cuidado personal con aplicación web y app móvil en Flutter.",
          "Implementé persistencia híbrida combinando bases de datos relacionales (MySQL/MariaDB) con almacenamiento documental en MongoDB Atlas.",
          "Desarrollé herramientas CLI interactivas de consulta de anime desde la terminal consumiendo APIs externas y manejo asíncrono de datos.",
          "Arquitectura multiplataforma (Web + Android/Flutter), integración de pasarela de pagos (Wompi) y persistencia híbrida SQL + NoSQL.",
        ],
        repo: "https://github.com/AndresAkm",
        repoLabel: "VER CÓDIGO",
      },
    ],
  },
  {
    title: "HABILIDADES — DETALLE COMPLETO",
    sections: [
      {
        heading: "BACKEND",
        date: "En uso",
        bullets: ["Python · Django · Node.js · APIs REST"],
      },
      {
        heading: "FRONTEND & MOBILE",
        date: "En uso",
        bullets: ["JavaScript (ES6+) · HTML5 · CSS3 · Bootstrap 5 · React · Tailwind CSS · Flutter"],
      },
      {
        heading: "BASES DE DATOS",
        date: "Avanzado",
        bullets: ["MySQL · MariaDB · MongoDB · Modelado Entidad-Relación (ER)"],
      },
      {
        heading: "HERRAMIENTAS",
        date: "En uso",
        bullets: ["Git · Linux · Docker · Next.js"],
      },
    ],
  },
  {
    title: "PROYECTOS — DETALLE COMPLETO",
    sections: [
      {
        heading: "Carely — Plataforma E-Commerce & App Móvil",
        date: "2026 · Desarrollador Full-Stack",
        bullets: [
          "Problema: Necesidad de una tienda digital moderna para productos de cuidado personal con experiencia fluida tanto en navegador web como en dispositivos móviles y pagos locales.",
          "Solución: Plataforma integral con backend en Python/Django y Node.js, arquitectura de base de datos híbrida (MySQL/MariaDB + MongoDB Atlas), pasarela de pagos Wompi y app móvil en Flutter.",
          "Stack: Python, Django, Node.js, Flutter, MySQL, MariaDB, MongoDB Atlas, Bootstrap 5, Wompi.",
          "Resultados: 2 plataformas sincronizadas (Web + App móvil), catálogo dinámico, carrito de compras y flujo de pago integrado.",
        ],
        images: ["/projects/carely-1.webp", "/projects/carely-2.webp"],
        repo: "https://github.com/AndresAkm/Carely",
        repoLabel: "VER REPOSITORIO",
      },
      {
        heading: "Anime CLI — Buscador y Catálogo de Anime en Terminal",
        date: "2026 · Desarrollador Backend / CLI",
        bullets: [
          "Problema: Consultar sinopsis, puntuaciones, episodios y estados de emisión de anime de forma rápida y ligera sin abrir navegadores pesados.",
          "Solución: Aplicación de línea de comandos interactiva que consume APIs públicas de anime, procesa respuestas JSON de forma asíncrona y renderiza tablas y fichas estilizadas directamente en la terminal.",
          "Stack: JavaScript / Node.js, Python, REST API, CLI.",
          "Resultados: Búsqueda instantánea por consola, filtrado por estado/género y cero consumo gráfico de navegador.",
        ],
        images: ["/projects/anime-cli-1.webp"],
        repo: "https://github.com/AndresAkm/ani-esp.git",
        repoLabel: "VER REPOSITORIO",
      },
    ],
  },
  {
    title: "EDUCACIÓN — DETALLE COMPLETO",
    sections: [
      {
        heading: "Tecnólogo en Análisis y Desarrollo de Software",
        date: "2023 – 2026 (En curso) · SENA · Antioquia, Colombia",
        bullets: ["Formación técnica en análisis, diseño y desarrollo de software."],
      },
      {
        heading: "Curso Especial en Construcción de Bases de Datos con MySQL",
        date: "Certificado el 04 de noviembre de 2026 · SENA",
        bullets: ["Modelado y construcción de bases de datos relacionales con MySQL."],
        certificate: "/certificates/sena-mysql-2026.pdf",
        certificateLabel: "VER CERTIFICADO",
      },
      {
        heading: "Curso Especial en Implementación de Bases de Datos NoSQL",
        date: "Certificado el 15 de octubre de 2025 · SENA",
        bullets: ["Implementación de bases de datos documentales con enfoque NoSQL."],
        certificate: "/certificates/sena-nosql-2025.pdf",
        certificateLabel: "VER CERTIFICADO",
      },
    ],
  },
];

// You´re the prettiest line of code in my IDE

// ── SHARED STYLES ────────────────────────────────────────────────────────────

const panelBg    = "linear-gradient(135deg, rgba(19,43,132,0.97) 0%, rgba(9,22,86,0.97) 52%, rgba(4,11,50,0.98) 100%)";
const panelClip  = "polygon(0 0, 100% 0, calc(100% - 18px) 100%, 0 100%)";
const rowClip   = "polygon(0 0, 100% 0, calc(100% - 14px) 100%, 0 100%)";
const bottomBg   = "linear-gradient(120deg, rgba(5,13,57,0.98) 0%, rgba(10,30,92,0.97) 100%)";
const CARD_BLUES = ["#10185f", "#123b88", "#0d2f77", "#17479d"];
const BADGE_BLUES = ["#0b113d", "#0a235c", "#0a1d52", "#0b2c69"];
const ROW_BLUES = [
  "linear-gradient(100deg, rgba(8,18,72,0.98) 0%, rgba(14,38,112,0.96) 100%)",
  "linear-gradient(100deg, rgba(10,30,94,0.98) 0%, rgba(18,55,132,0.96) 100%)",
  "linear-gradient(100deg, rgba(7,24,82,0.98) 0%, rgba(13,47,120,0.96) 100%)",
  "linear-gradient(100deg, rgba(12,36,104,0.98) 0%, rgba(22,66,146,0.96) 100%)",
];
const cardBg = (index: number) => CARD_BLUES[index % CARD_BLUES.length];
const badgeBg = (index: number) => BADGE_BLUES[index % BADGE_BLUES.length];
const rowBg = (index: number) => ROW_BLUES[index % ROW_BLUES.length];

function ProjectShot({ src, label, wide = false }: { src: string; label: string; wide?: boolean }) {
  const [failed, setFailed] = useState(false);

  return (
    <div style={{
      position: "relative",
      flex: wide ? "1 1 100%" : "0 0 132px",
      width: wide ? "100%" : 132,
      height: wide ? undefined : 88,
      aspectRatio: wide ? "3 / 2" : undefined,
      background: "linear-gradient(135deg, rgba(15,28,105,0.98) 0%, rgba(4,10,44,0.98) 100%)",
      clipPath: "polygon(0 0, 100% 0, calc(100% - 12px) 100%, 0 100%)",
      boxShadow: "inset 0 0 0 1px rgba(141,246,255,0.32)",
      overflow: "hidden",
    }}>
      {!failed ? (
        <img
          src={src}
          alt={`Captura de ${label}`}
          decoding="async"
          loading="lazy"
          onError={() => setFailed(true)}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
      ) : (
        <div style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 4,
          padding: 8,
          textAlign: "center",
        }}>
          <span style={{ fontFamily: "var(--font-bebas), sans-serif", fontSize: 14, letterSpacing: 2, color: "#8df6ff" }}>
            CAPTURA PENDIENTE
          </span>
          <span style={{ fontFamily: "var(--font-montserrat), sans-serif", fontWeight: 300, fontSize: 9, lineHeight: 1.25, color: "rgba(205,232,255,0.72)" }}>
            {label}
          </span>
        </div>
      )}
    </div>
  );
}

// ── COMPONENT ─────────────────────────────────────────────────────────────────

export default function Resume({ onBack }: { onBack?: () => void }) {

  const isMobile = useIsMobile();
  const [active, setActive]     = useState(0);
  const [mounted, setMounted]   = useState(false);
  const [expanded, setExpanded] = useState(false); // Enter/→ shows full detail

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp")    { setActive(i => Math.max(0, i - 1)); setExpanded(false); }
      if (e.key === "ArrowDown")  { setActive(i => Math.min(ITEMS.length - 1, i + 1)); setExpanded(false); }
      if (e.key === "ArrowRight" || e.key === "Enter") setExpanded(true);
      if (e.key === "ArrowLeft")  setExpanded(false);
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);

  }, []);

  const summary  = SUMMARY_PANELS[active];
  const detail   = EXPANDED_PANELS[active];

  if (isMobile) {
    return (
      <div className="absolute inset-0 overflow-hidden" id="resume-screen">
        <div className="absolute inset-0" style={{ zIndex: 1, background: "linear-gradient(180deg, rgba(4,9,26,0.55) 0%, rgba(4,9,26,0.82) 100%)" }} />
        <div data-mobile-scroll="" style={{ position: "absolute", inset: 0, zIndex: 10, overflowY: "auto", padding: "18px 16px calc(104px + var(--safe-bottom))" }}>
          <div style={{ fontFamily: "var(--font-anton), sans-serif", fontSize: "clamp(2.2rem,9vw,3rem)", letterSpacing: 2, color: "#f6fbff", marginBottom: 12 }}>LISTA</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {ITEMS.map((item, index) => {
              const isActive = active === index;
              return (
                <button
                  key={item.id}
                  onClick={() => { setActive(index); setExpanded(false); }}
                  style={{ width: "100%", minHeight: 74, display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", textAlign: "left", cursor: "pointer", background: isActive ? "#ffffff" : cardBg(index), color: isActive ? "#0a0f1c" : "#cde8ff", border: "none", clipPath: "polygon(0 0, calc(100% - 14px) 0, 100% 100%, 14px 100%)", boxShadow: isActive ? "5px 5px 0 #d63232" : "0 5px 0 rgba(5,13,59,0.85)" }}
                >
                  <span style={{ flex: "0 0 42px", height: 52, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-bebas), sans-serif", fontSize: 22, color: "#d2fdff", background: badgeBg(index), clipPath: "polygon(14% 0, 100% 0, 84% 100%, 0 100%)" }}>{item.badge}</span>
                  <span style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 3 }}>
                    <span style={{ fontFamily: "var(--font-anton), sans-serif", fontSize: "clamp(1.05rem,5vw,1.5rem)", lineHeight: 1 }}>{item.title}</span>
                    <span style={{ fontFamily: "var(--font-bebas), sans-serif", fontSize: "clamp(0.7rem,3.2vw,0.85rem)", letterSpacing: 1, opacity: 0.78 }}>{item.subtitle}</span>
                  </span>
                  <span style={{ fontFamily: "var(--font-anton), sans-serif", fontSize: "clamp(1.4rem,6vw,2rem)", color: isActive ? "#c4001a" : "#8df6ff" }}>{item.rank}</span>
                </button>
              );
            })}
          </div>
          <div style={{ marginTop: 16, padding: 14, background: panelBg, clipPath: panelClip, boxShadow: "inset 0 0 0 1px rgba(133,244,255,0.16), 8px 8px 0 rgba(0,6,30,0.55)" }}>
            <div style={{ margin: -14, marginBottom: 14, padding: "12px 14px", background: "linear-gradient(90deg, #8ef5ff 0%, #d3fdff 100%)", color: "#08153f", fontFamily: "var(--font-anton), sans-serif", fontSize: "clamp(1rem,4.6vw,1.35rem)", letterSpacing: 1, clipPath: "polygon(0 0, 100% 0, calc(100% - 14px) 100%, 0 100%)" }}>
              {expanded ? detail.title : summary.title}
            </div>
            {!expanded ? (
              <>
                {summary.rows.map((row, index) => (
                  <div key={index} style={{ display: "flex", flexDirection: "column", gap: 2, padding: "10px 12px", marginBottom: 8, background: rowBg(index), borderLeft: "3px solid #8df6ff" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                      <span style={{ fontFamily: "var(--font-bebas), sans-serif", fontSize: 13, letterSpacing: 1, color: "#8df6ff" }}>{row.index}</span>
                      <span style={{ fontFamily: "var(--font-bebas), sans-serif", fontSize: 13, letterSpacing: 1, color: "#ff5e88" }}>{row.status}</span>
                    </div>
                    <span style={{ fontFamily: "var(--font-montserrat), sans-serif", fontWeight: 300, fontSize: "clamp(0.82rem,3.6vw,0.95rem)", lineHeight: 1.35, color: "#cde8ff" }}>{row.title}</span>
                  </div>
                ))}
                {summary.bottom.title && (
                  <div style={{ marginTop: 12, padding: 12, background: bottomBg, border: "1px solid rgba(141,246,255,0.2)" }}>
                    <div style={{ fontFamily: "var(--font-bebas), sans-serif", fontSize: 14, letterSpacing: 2, color: "#8df6ff", marginBottom: 6 }}>{summary.bottom.title}</div>
                    {summary.bottom.bullets.map((bullet, index) => (
                      <div key={index} style={{ fontFamily: "var(--font-montserrat), sans-serif", fontWeight: 300, fontSize: "clamp(0.75rem,3.3vw,0.88rem)", lineHeight: 1.4, color: "#cde8ff", marginTop: 4 }}>{bullet}</div>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {detail.sections.map((section, index) => (
                  <div key={index} style={{ padding: 12, background: rowBg(index), borderLeft: "3px solid #8df6ff" }}>
                    <div style={{ fontFamily: "var(--font-anton), sans-serif", fontSize: "clamp(1rem,4.6vw,1.3rem)", lineHeight: 1.1, color: "#8df6ff" }}>{section.heading}</div>
                    {section.date && <div style={{ fontFamily: "var(--font-bebas), sans-serif", fontSize: "clamp(0.7rem,3vw,0.82rem)", letterSpacing: 1, color: "rgba(133,244,255,0.62)", marginTop: 3 }}>{section.date}</div>}
                    {section.bullets.map((bullet, bulletIndex) => (
                      <div key={bulletIndex} style={{ fontFamily: "var(--font-montserrat), sans-serif", fontWeight: 300, fontSize: "clamp(0.76rem,3.35vw,0.88rem)", lineHeight: 1.45, color: "#cde8ff", marginTop: 8, paddingLeft: 10, borderLeft: "2px solid rgba(133,244,255,0.25)" }}>{bullet}</div>
                    ))}
                    {section.images && section.images.length > 0 && (
                      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 12 }}>
                        {section.images.map(image => <ProjectShot key={image} src={image} label={section.heading} wide />)}
                      </div>
                    )}
                    {(section.repo || section.certificate) && (
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 12 }}>
                        {section.repo && (
                          <a href={section.repo} target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", padding: "6px 12px", fontFamily: "var(--font-bebas), sans-serif", fontSize: 15, letterSpacing: 2, color: "#08153f", background: "#8df6ff", textDecoration: "none" }}>
                            {section.repoLabel ?? "VER REPOSITORIO"} →
                          </a>
                        )}
                        {section.certificate && (
                          <a href={section.certificate} target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", padding: "6px 12px", fontFamily: "var(--font-bebas), sans-serif", fontSize: 15, letterSpacing: 2, color: "#8df6ff", background: "transparent", border: "2px solid rgba(141,246,255,0.65)", textDecoration: "none" }}>
                            {section.certificateLabel ?? "VER CERTIFICADO"} →
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
            <button onClick={() => setExpanded(value => !value)} style={{ width: "100%", minHeight: 46, marginTop: 14, fontFamily: "var(--font-bebas), sans-serif", fontSize: 16, letterSpacing: 2, color: "#8df6ff", background: "transparent", border: "2px solid rgba(141,246,255,0.65)", borderRadius: 4, cursor: "pointer" }}>
              {expanded ? "← RESUMEN" : "DETALLE COMPLETO →"}
            </button>
          </div>
          <div style={{ marginTop: 14, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, padding: "10px 12px", fontFamily: "var(--font-bebas), sans-serif", fontSize: 13, letterSpacing: 2, color: "rgba(220,240,255,0.7)", background: "rgba(6,12,38,0.82)", border: "1px solid rgba(141,246,255,0.22)" }}>
            <span>CURRÍCULUM PDF</span>
            <span style={{ color: "#ff5e88" }}>PRÓXIMAMENTE</span>
          </div>
        </div>
        <button onClick={() => onBack?.()} style={{ position: "absolute", left: 16, right: 16, bottom: "calc(12px + var(--safe-bottom))", zIndex: 40, minHeight: 48, display: "flex", alignItems: "center", justifyContent: "center", gap: 10, fontFamily: "var(--font-bebas), sans-serif", fontSize: 18, letterSpacing: 2, color: "#fff", background: "rgba(6,12,38,0.92)", border: "2px solid rgba(141,246,255,0.35)", borderRadius: 4, cursor: "pointer" }}>
          <span style={{ fontSize: 20, lineHeight: 1 }}>←</span>
          <span>VOLVER AL MENÚ</span>
        </button>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden" id="resume-screen">

      {/* ENTRY MASK */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 9, overflow: "hidden",
        background: "#0a1230",
        backgroundImage: "url('/posters/skills.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        clipPath: "circle(0 at 50% 50%)",
        animation: "resume-entry-reveal 1.2s cubic-bezier(0.16,1,0.3,1) forwards",
        pointerEvents: "none",
      }}>
      </div>

      <style>{`
        @keyframes resume-entry-reveal {
          from { clip-path: circle(0 at 50% 50%); opacity: 1; }
          85%  { opacity: 1; }
          to   { clip-path: circle(150vmax at 50% 50%); opacity: 0; }
        }
      `}</style>

      {/* ── CARD LIST ── */}
      <div style={{
        position: "absolute", top: "9vh", left: "2.8vw",
        width: "min(47vw, 720px)", display: "flex", flexDirection: "column", gap: 10,
        zIndex: 10, transform: "scale(0.9)", transformOrigin: "top left",
      }}>

        <div style={{
          fontFamily: "var(--font-anton), sans-serif", fontSize: 92, lineHeight: 0.9,
          color: "#f6fbff", letterSpacing: 2, margin: "0 0 6px 12px",
          opacity: mounted ? 1 : 0, transform: mounted ? "translateX(0)" : "translateX(-24px)",
          transition: "opacity 0.35s ease, transform 0.35s ease",
        }}>LISTA</div>

        {ITEMS.map((item, index) => {
          const isActive = active === index;
          return (
            <div
              key={item.id}
              onMouseEnter={() => { setActive(index); setExpanded(false); }}
              onClick={() => { setActive(index); setExpanded(v => index === active ? !v : false); }}
              style={{
                position: "relative", cursor: "pointer",
                opacity: mounted ? 1 : 0,
                transform: mounted ? "translateX(0)" : "translateX(-48px)",
                transition: `opacity 0.4s ease ${index * 55}ms, transform 0.4s cubic-bezier(0.22,1,0.36,1) ${index * 55}ms`,
              }}
            >
              <div style={{
                position: "relative", height: 112,
                background: isActive ? "#ffffff" : cardBg(index),
                clipPath: "polygon(0 0, 97% 0, 100% 100%, 3% 100%)",
                boxShadow: isActive ? "10px 8px 0 #d63232" : "0 8px 0 rgba(5,13,59,0.85)",
                transform: isActive ? "translateX(6px)" : "translateX(0)",
                transition: "transform 0.22s ease, background 0.22s ease, box-shadow 0.22s ease",
                overflow: "visible",
              }}>
                {/* BADGE */}
                <div style={{
                  position: "absolute", top: 10, left: -10, width: 56, height: 70,
                  background: isActive ? "#000" : badgeBg(index),
                  border: `3px solid ${isActive ? "#000" : "#9cf7ff"}`,
                  clipPath: "polygon(14% 0, 100% 0, 84% 100%, 0 100%)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transform: "rotate(-8deg)", boxShadow: "0 4px 0 rgba(0,0,0,0.28)", zIndex: 2,
                }}>
                  <span style={{ fontFamily: "var(--font-bebas), sans-serif", fontSize: 36, color: "#d2fdff", letterSpacing: 1, transform: "rotate(8deg)", display: "block" }}>{item.badge}</span>
                </div>
                {/* INNER */}
                <div style={{ position: "absolute", inset: 0, padding: "14px 22px 14px 62px", display: "flex", alignItems: "flex-start", justifyContent: "space-between", zIndex: 1 }}>
                  <div style={{ fontFamily: "var(--font-anton), sans-serif", fontSize: 56, lineHeight: 0.9, letterSpacing: 1, color: isActive ? "#000" : "#a5f6ff", transition: "color 0.22s ease" }}>{item.title}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 2, flexShrink: 0 }}>
                    <div style={{ fontFamily: "var(--font-bebas), sans-serif", fontSize: 28, letterSpacing: 2, color: isActive ? "#000" : "#9ffbff", transition: "color 0.22s ease" }}>RANGO</div>
                    <div style={{ fontFamily: "var(--font-anton), sans-serif", fontSize: 70, lineHeight: 0.82, color: isActive ? "#000" : "#9ffbff", transition: "color 0.22s ease" }}>{item.rank}</div>
                  </div>
                </div>
                {/* SUBTITLE */}
                <div style={{
                  position: "absolute", left: 64, right: 14, bottom: 12, height: 34,
                  background: isActive ? "#000" : "#85f4ff",
                  clipPath: "polygon(0 0, 100% 0, calc(100% - 10px) 100%, 0 100%)",
                  display: "flex", alignItems: "center", padding: "0 18px", zIndex: 1,
                }}>
                  <span style={{ fontFamily: "var(--font-bebas), sans-serif", fontSize: 28, lineHeight: 1, letterSpacing: 1, color: isActive ? "#fff" : "#041238" }}>{item.subtitle}</span>
                </div>
              </div>
            </div>
          );
        })}

      </div>

      {/* ── RIGHT PANEL ── */}
      <AnimatePresence mode="wait">
        {!expanded ? (

          // ── SUMMARY VIEW ──
          <motion.div
            key={`summary-${active}`}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 30 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "absolute", top: "9.5vh", right: "4.5vw",
              width: "min(39vw, 620px)", maxHeight: "82vh", overflowY: "auto", zIndex: 10,
              padding: "22px 24px 24px 24px",
              background: panelBg, clipPath: panelClip,
              boxShadow: "inset 0 0 0 1px rgba(133,244,255,0.16), 16px 16px 0 rgba(0,6,30,0.55)",
            }}
          >
            {/* TOP BAR */}
            <div style={{
              display: "grid", gridTemplateColumns: "70px 1fr auto",
              alignItems: "center", gap: 14, minHeight: 92, padding: "0 18px",
              background: "linear-gradient(90deg, #8ef5ff 0%, #d3fdff 100%)",
              clipPath: "polygon(0 0, 100% 0, calc(100% - 16px) 100%, 0 100%)",
              color: "#08153f", boxShadow: "10px 0 0 rgba(255,94,136,0.88)",
            }}>
              <div style={{ fontFamily: "var(--font-anton), sans-serif", fontSize: 46, lineHeight: 1 }}>{summary.index}</div>
              <div style={{ fontFamily: "var(--font-anton), sans-serif", fontSize: 42, lineHeight: 0.92, letterSpacing: 1 }}>{summary.title}</div>
              <div style={{ fontFamily: "var(--font-bebas), sans-serif", fontSize: 42, letterSpacing: 2 }}>{summary.progress}</div>
            </div>

            {/* ROWS */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 18 }}>
              {summary.rows.map((row, rowIndex) => (
                <div key={row.index} style={{
                  display: "grid", gridTemplateColumns: "50px 1fr auto",
                  alignItems: "center", gap: 14, minHeight: 56, padding: "0 14px",
                  background: rowBg(rowIndex), clipPath: rowClip,
                  boxShadow: "inset 0 0 0 1px rgba(140,239,255,0.12)",
                }}>
                  <div style={{ fontFamily: "var(--font-bebas), sans-serif", fontSize: 22, letterSpacing: 1, color: "#94f4ff" }}>{row.index}</div>
                  <div style={{ fontFamily: "var(--font-anton), sans-serif", fontSize: 22, lineHeight: 1.1, color: "#f2fcff" }}>{row.title}</div>
                  <div style={{ fontFamily: "var(--font-bebas), sans-serif", fontSize: 18, color: "#06133b", background: "#8df6ff", padding: "5px 10px", clipPath: "polygon(0 0, 100% 0, calc(100% - 8px) 100%, 0 100%)", whiteSpace: "nowrap" }}>{row.status}</div>
                </div>
              ))}
            </div>

            {/* BOTTOM */}
            {summary.bottom.bullets.length > 0 && (
              <div style={{ marginTop: 22, padding: 18, background: bottomBg, clipPath: "polygon(0 0, 100% 0, calc(100% - 16px) 100%, 0 100%)" }}>
                <div style={{ fontFamily: "var(--font-bebas), sans-serif", fontSize: 30, letterSpacing: 2, color: "#91f5ff", marginBottom: 14 }}>{summary.bottom.title}</div>
                {summary.bottom.bullets.map((b, i) => (
                  <div key={i} style={{ fontFamily: "var(--font-anton), sans-serif", fontSize: 19, lineHeight: 1.2, color: "#edfaff", marginBottom: 8 }}>{b}</div>
                ))}
              </div>
            )}

            {/* EXPAND BUTTON */}
            <div style={{ marginTop: 16, display: "flex", justifyContent: "flex-end" }}>
              <button
                onClick={() => setExpanded(true)}
                style={{
                  display: "flex", alignItems: "center", gap: 10,
                  fontFamily: "var(--font-bebas), sans-serif", fontSize: 20, letterSpacing: 2,
                  color: "#06133b", background: "#8df6ff", border: "none", cursor: "pointer",
                  padding: "9px 18px",
                  clipPath: "polygon(0 0, 100% 0, calc(100% - 10px) 100%, 0 100%)",
                  boxShadow: "5px 5px 0 rgba(255,94,136,0.85)",
                }}
              >
                <span style={{ lineHeight: 1 }}>DETALLE COMPLETO</span>
                <span style={{ fontSize: 22, lineHeight: 1 }}>→</span>
              </button>
            </div>

          </motion.div>

        ) : (

          // ── EXPANDED VIEW ──
          <motion.div
            key={`expanded-${active}`}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 30 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "absolute", top: "9.5vh", right: "4.5vw",
              width: "min(39vw, 620px)", maxHeight: "82vh", zIndex: 10,
              padding: "22px 24px 24px 24px",
              background: panelBg, clipPath: panelClip,
              boxShadow: "inset 0 0 0 1px rgba(133,244,255,0.16), 16px 16px 0 rgba(0,6,30,0.55)",
              overflowY: "auto",
            }}
          >
            {/* TOP BAR */}
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              minHeight: 72, padding: "0 18px", marginBottom: 0,
              background: "linear-gradient(90deg, #8ef5ff 0%, #d3fdff 100%)",
              clipPath: "polygon(0 0, 100% 0, calc(100% - 16px) 100%, 0 100%)",
              color: "#08153f", boxShadow: "10px 0 0 rgba(255,94,136,0.88)",
            }}>
              <div style={{ fontFamily: "var(--font-anton), sans-serif", fontSize: 32, lineHeight: 1, letterSpacing: 1 }}>{detail.title}</div>
              <button onClick={() => setExpanded(false)} style={{ fontFamily: "var(--font-bebas), sans-serif", fontSize: 17, letterSpacing: 2, color: "#08153f", background: "transparent", border: "2px solid #08153f", borderRadius: 4, padding: "5px 12px", cursor: "pointer" }}>← RESUMEN</button>
            </div>

            {/* SECTIONS */}
            <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 18 }}>
              {detail.sections.map((section, si) => (
                <div key={si} style={{
                  padding: 16, background: rowBg(si),
                  clipPath: rowClip,
                  boxShadow: "inset 0 0 0 1px rgba(140,239,255,0.12)",
                }}>
                  {/* SECTION HEADING */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 10 }}>
                    <div style={{ fontFamily: "var(--font-anton), sans-serif", fontSize: 22, color: "#8df6ff", letterSpacing: 1 }}>{section.heading}</div>
                    {section.date && (
                      <div style={{ fontFamily: "var(--font-bebas), sans-serif", fontSize: 14, color: "rgba(133,244,255,0.5)", letterSpacing: 1, flexShrink: 0, marginLeft: 8 }}>{section.date}</div>
                    )}
                  </div>
                  {/* BULLETS */}
                  {section.bullets.map((b, bi) => (
                    <div key={bi} style={{
                      fontFamily: "var(--font-montserrat), sans-serif", fontWeight: 300,
                      fontSize: 13, lineHeight: 1.5, color: "#cde8ff",
                      marginBottom: 6, paddingLeft: 12,
                      borderLeft: "2px solid rgba(133,244,255,0.25)",
                    }}>{b}</div>
                  ))}
                  {section.images && section.images.length > 0 && (
                    <div style={{ display: "flex", gap: 10, marginTop: 12, flexWrap: "wrap" }}>
                      {section.images.map(image => (
                        <ProjectShot key={image} src={image} label={section.heading} />
                      ))}
                    </div>
                  )}
                  {(section.repo || section.certificate) && (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 12 }}>
                      {section.repo && (
                        <a
                          href={section.repo}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            display: "inline-flex", alignItems: "center", gap: 8,
                            padding: "5px 12px",
                            fontFamily: "var(--font-bebas), sans-serif", fontSize: 16, letterSpacing: 2,
                            color: "#08153f", background: "#8df6ff", textDecoration: "none",
                            clipPath: "polygon(0 0, 100% 0, calc(100% - 10px) 100%, 0 100%)",
                          }}
                        >
                          {section.repoLabel ?? "VER REPOSITORIO"} →
                        </a>
                      )}
                      {section.certificate && (
                        <a
                          href={section.certificate}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            display: "inline-flex", alignItems: "center", gap: 8,
                            padding: "5px 12px",
                            fontFamily: "var(--font-bebas), sans-serif", fontSize: 16, letterSpacing: 2,
                            color: "#8df6ff", background: "transparent", textDecoration: "none",
                            border: "2px solid rgba(141,246,255,0.65)",
                          }}
                        >
                          {section.certificateLabel ?? "VER CERTIFICADO"} →
                        </a>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* COLLAPSE BUTTON */}
            <div style={{ marginTop: 16, display: "flex", justifyContent: "flex-end" }}>
              <button
                onClick={() => setExpanded(false)}
                style={{
                  display: "flex", alignItems: "center", gap: 10,
                  fontFamily: "var(--font-bebas), sans-serif", fontSize: 20, letterSpacing: 2,
                  color: "#8df6ff", background: "transparent",
                  border: "2px solid rgba(141,246,255,0.65)", borderRadius: 4, cursor: "pointer",
                  padding: "8px 18px",
                }}
              >
                <span style={{ fontSize: 22, lineHeight: 1 }}>←</span>
                <span style={{ lineHeight: 1 }}>RESUMEN</span>
              </button>
            </div>

          </motion.div>

        )}
      </AnimatePresence>

      <div
        aria-disabled="true"
        style={{
          position: "absolute", bottom: 22, left: 28, zIndex: 20,
          display: "flex", alignItems: "center", gap: 10,
          padding: "8px 14px",
          fontFamily: "var(--font-bebas), sans-serif", fontSize: 16, letterSpacing: 2,
          color: "rgba(220,240,255,0.72)", background: "rgba(6,12,38,0.82)",
          border: "2px solid rgba(141,246,255,0.28)", borderRadius: 4,
          opacity: mounted ? 1 : 0, transition: "opacity 0.4s ease 0.6s",
          pointerEvents: "none",
        }}
      >
        <span>CURRÍCULUM PDF</span>
        <span style={{ color: "#ff5e88" }}>PRÓXIMAMENTE</span>
      </div>

      {/* VOLVER AL MENÚ */}
      <button
        onClick={() => onBack?.()}
        style={{
          position: "absolute", bottom: 20, right: 28, zIndex: 20,
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
