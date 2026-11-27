"use client";

import { useEffect, useState, type CSSProperties, type FocusEvent, type FormEvent } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";
import { useIsMobile } from "./useIsMobile";

// ── DATA ──────────────────────────────────────────────────────────────────────

const CHARS = [
  "/images/shards/cyan.png",
  "/images/shards/yellow.png",
  "/images/shards/pink.png",
  "/images/shards/red.png",
];

const ITEMS = [
  {
    id: "linkedin",
    label: "LINKEDIN",
    logo: "linkedin",
    accent: "#48d2ff",
    href: "https://www.linkedin.com/in/jaime-andr%C3%A9s-parra-sanchez-365586378/",
    handle: "Jaime Andrés Parra Sánchez",
    links: [
      { label: "PERFIL PROFESIONAL", url: "https://www.linkedin.com/in/jaime-andr%C3%A9s-parra-sanchez-365586378/" },
    ],
  },
  {
    id: "github",
    label: "GITHUB",
    logo: "github",
    accent: "#e8c100",
    href: "https://github.com/AndresAkm",
    handle: "@AndresAkm",
    links: [
      { label: "VER CÓDIGO", url: "https://github.com/AndresAkm" },
    ],
  },
  {
    id: "instagram",
    label: "INSTAGRAM",
    logo: "instagram",
    accent: "#d63bd6",
    href: "https://www.instagram.com/andres_akm_",
    handle: "@andres_akm_",
    links: [
      { label: "RED SOCIAL", url: "https://www.instagram.com/andres_akm_" },
    ],
  },
  {
    id: "email",
    label: "CONTACTAME",
    logo: "email",
    accent: "#e8002d",
    href: "mailto:jaym3gd2431@gmail.com",
    handle: "jaym3gd2431@gmail.com",
    links: [
      { label: "REDACTAR CORREO", url: "mailto:jaym3gd2431@gmail.com" },
    ],
  },
];

const EMAIL_INDEX = ITEMS.findIndex((item) => item.id === "email");

// ── BRAND LOGOS (inline white SVG, recolourable via `color`) ───────────────────

const LOGO_PATHS: Record<string, string> = {
  linkedin: "M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 110-4.13 2.06 2.06 0 010 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z",
  github: "M12 .3a12 12 0 00-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.3-1.8-1.3-1.8-1.1-.7.1-.7.1-.7 1.2 0 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2 0-.3-.5-1.5.2-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 016 0c2.3-1.5 3.3-1.2 3.3-1.2.7 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.5.3.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0012 .3z",
  instagram: "M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 01-1.38-.9 3.7 3.7 0 01-.9-1.38c-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16zM12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63c-.79.3-1.46.72-2.12 1.38C1.36 2.67.94 3.34.63 4.14.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.3.8.72 1.47 1.38 2.13.66.66 1.33 1.08 2.12 1.38.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56.8-.3 1.47-.72 2.13-1.38.66-.66 1.08-1.33 1.38-2.13.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91-.3-.8-.72-1.47-1.38-2.13A5.9 5.9 0 0019.86.63c-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 100 12.32 6.16 6.16 0 000-12.32zm0 10.16a4 4 0 110-8 4 4 0 010 8zm7.85-10.4a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z",
  email: "M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z",
};

// Floating P3R "shatter" particles that fly off the right edge of the active bar.
// Each value is in vw so they scale with the bars. tx/ty = drift, r = base rotation.
const SHARD_FIELD = [
  { top: "8%",  w: 0.9,  h: 0.55, tx: 5.2, ty: -2.6, r: 18,  dur: 2.4, delay: 0,    clip: "polygon(0 0, 100% 28%, 62% 100%)" },
  { top: "62%", w: 1.3,  h: 0.8,  tx: 6.4, ty: 2.2,  r: -22, dur: 2.9, delay: 0.35, clip: "polygon(0 18%, 100% 0, 78% 100%)" },
  { top: "30%", w: 0.6,  h: 0.4,  tx: 4.1, ty: -0.6, r: 40,  dur: 2.1, delay: 0.6,  clip: "polygon(0 0, 100% 50%, 0 100%)" },
  { top: "82%", w: 0.75, h: 0.5,  tx: 5.7, ty: 3.4,  r: -10, dur: 3.2, delay: 0.15, clip: "polygon(0 0, 100% 22%, 40% 100%)" },
  { top: "44%", w: 1.0,  h: 0.62, tx: 7.0, ty: 0.4,  r: 30,  dur: 2.6, delay: 0.5,  clip: "polygon(0 30%, 100% 0, 88% 100%)" },
  { top: "18%", w: 0.5,  h: 0.34, tx: 4.6, ty: -1.8, r: -34, dur: 2.0, delay: 0.85, clip: "polygon(0 0, 100% 50%, 30% 100%)" },
];

function Shards({ accent, active }: { accent: string; active: boolean }) {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: "44vw",
        width: "10vw",
        height: "100%",
        pointerEvents: "none",
        zIndex: 5,
        opacity: active ? 1 : 0,
        transition: "opacity 0.2s ease",
      }}
    >
      {SHARD_FIELD.map((s, i) => (
        <div
          key={i}
          className={active ? "sc-shard" : undefined}
          style={{
            position: "absolute",
            top: s.top,
            left: 0,
            width: `${s.w}vw`,
            height: `${s.h}vw`,
            background: accent,
            clipPath: s.clip,
            filter: `drop-shadow(0 0 0.28vw ${accent})`,
            ["--tx" as string]: `${s.tx}vw`,
            ["--ty" as string]: `${s.ty}vw`,
            ["--r" as string]: `${s.r}deg`,
            ["--dur" as string]: `${s.dur}s`,
            ["--delay" as string]: `${s.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

function Logo({ id, color, size = "1.94vw" }: { id: string; color: string; size?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill={color} style={{ width: size, height: size, flexShrink: 0, transition: "fill 0.2s ease, width 0.2s ease, height 0.2s ease" }}>
      <path d={LOGO_PATHS[id]} />
    </svg>
  );
}

function ContactForm({ accent, onClose, mobile = false }: { accent: string; onClose: () => void; mobile?: boolean }) {
  const [status, setStatus] = useState("");
  const [sending, setSending] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (sending) return;

    const form = event.currentTarget;
    const data = new FormData(form);
    setSending(true);
    setStatus("ENVIANDO...");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          correo: String(data.get("correo") ?? "").trim(),
          asunto: String(data.get("asunto") ?? "").trim(),
          mensaje: String(data.get("mensaje") ?? "").trim(),
        }),
      });
      const result = await response.json().catch(() => ({ error: "NO SE PUDO ENVIAR" })) as { error?: string };

      if (!response.ok) {
        setStatus(result.error ?? "NO SE PUDO ENVIAR");
      } else {
        setStatus("MENSAJE ENVIADO ✓");
        form.reset();
      }
    } catch {
      setStatus("NO SE PUDO ENVIAR");
    } finally {
      setSending(false);
    }
  };

  const onFieldFocus = (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    event.currentTarget.style.borderColor = accent;
    event.currentTarget.style.boxShadow = `0 0 ${mobile ? "10px" : "0.8vw"} ${accent}55`;
  };

  const onFieldBlur = (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    event.currentTarget.style.borderColor = "rgba(141,246,255,0.24)";
    event.currentTarget.style.boxShadow = "none";
  };

  const field: CSSProperties = {
    width: "100%",
    minHeight: mobile ? 44 : "2.7vw",
    background: "rgba(6,12,38,0.86)",
    border: "1px solid rgba(141,246,255,0.24)",
    borderRadius: mobile ? 3 : "0.21vw",
    color: "#f6fbff",
    fontFamily: "var(--font-montserrat), sans-serif",
    fontWeight: 300,
    fontSize: mobile ? "0.88rem" : "0.88vw",
    letterSpacing: mobile ? 0.3 : "0.04vw",
    padding: mobile ? "0 12px" : "0 0.68vw",
    outline: "none",
    transition: "border-color 0.2s ease, box-shadow 0.2s ease",
  };

  const label: CSSProperties = {
    fontFamily: "var(--font-bebas), sans-serif",
    fontSize: mobile ? "0.82rem" : "0.95vw",
    letterSpacing: mobile ? 1.6 : "0.12vw",
    color: "rgba(205,232,255,0.75)",
  };

  const outer: CSSProperties = mobile
    ? { position: "relative", width: "100%", marginTop: 16, zIndex: 20 }
    : {
        position: "fixed",
        right: "3.88vw",
        top: "16.26vh",
        width: "34vw",
        minWidth: "26vw",
        zIndex: 55,
        pointerEvents: "all",
        filter: `drop-shadow(0 0 0.97vw ${accent}aa)`,
      };

  const panel: CSSProperties = mobile
    ? {
        position: "relative",
        padding: "16px 16px 18px",
        background: "rgba(10,15,28,0.9)",
        clipPath: "polygon(12px 0, 100% 0, calc(100% - 12px) 100%, 0 100%)",
        boxShadow: "0 8px 24px rgba(0,0,0,0.6)",
      }
    : {
        position: "relative",
        padding: "1.25vw 1.5vw 1.4vw",
        background: "rgba(10,15,28,0.9)",
        clipPath: "polygon(1.39vw 0, 100% 0, calc(100% - 1.11vw) 100%, 0 100%)",
        boxShadow: "0 0.42vw 1.52vw rgba(0,0,0,0.65)",
      };

  return (
    <div data-contact-form="" className="sc-infobar-in" style={outer}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: accent,
          clipPath: mobile
            ? "polygon(12px 0, 100% 0, calc(100% - 12px) 100%, 0 100%)"
            : "polygon(1.39vw 0, 100% 0, calc(100% - 1.11vw) 100%, 0 100%)",
          transform: mobile ? "translate(3px, 4px)" : "translate(0.55vw, 0.49vw)",
          opacity: 0.7,
          pointerEvents: "none",
        }}
      />
      <div style={panel}>
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: mobile ? 4 : "0.35vw", background: accent, transform: "skewX(-20deg)", transformOrigin: "top", opacity: 0.9 }} />

        <div style={{ display: "flex", alignItems: "center", gap: mobile ? 10 : "0.9vw", marginBottom: mobile ? 14 : "1vw" }}>
          <div
            style={{
              width: mobile ? 34 : "2.36vw",
              height: mobile ? 34 : "2.36vw",
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: accent,
              clipPath: "polygon(14% 0, 100% 0, 86% 100%, 0 100%)",
            }}
          >
            <Logo id="email" color="#fff" size={mobile ? "19px" : "1.39vw"} />
          </div>
          <span
            style={{
              flex: 1,
              fontFamily: "var(--font-anton), sans-serif",
              fontSize: mobile ? "1.25rem" : "1.59vw",
              letterSpacing: mobile ? 1.2 : "0.14vw",
              transform: "skewX(-9deg)",
              color: "#f6fbff",
              textShadow: `0 0 ${mobile ? "12px" : "0.69vw"} ${accent}66`,
              userSelect: "none",
            }}
          >
            REDACTAR CORREO
          </span>
          <button
            type="button"
            onClick={onClose}
            style={{
              flexShrink: 0,
              fontFamily: "var(--font-bebas), sans-serif",
              fontSize: mobile ? "0.78rem" : "0.95vw",
              letterSpacing: mobile ? 1.3 : "0.1vw",
              color: "rgba(255,255,255,0.72)",
              background: "transparent",
              border: "1px solid rgba(141,246,255,0.28)",
              borderRadius: 3,
              padding: mobile ? "5px 8px" : "0.24vw 0.5vw",
              cursor: "pointer",
            }}
          >
            CERRAR ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: mobile ? 10 : "0.62vw" }}>
          <label htmlFor="contact-correo" style={label}>TU CORREO</label>
          <input id="contact-correo" name="correo" type="email" required autoComplete="email" placeholder="tu@correo.com" style={field} onFocus={onFieldFocus} onBlur={onFieldBlur} />

          <label htmlFor="contact-asunto" style={label}>ASUNTO</label>
          <input id="contact-asunto" name="asunto" type="text" placeholder="ASUNTO DEL MENSAJE" style={field} onFocus={onFieldFocus} onBlur={onFieldBlur} />

          <label htmlFor="contact-mensaje" style={label}>MENSAJE</label>
          <textarea
            id="contact-mensaje"
            name="mensaje"
            required
            rows={4}
            placeholder="ESCRIBE TU MENSAJE..."
            style={{ ...field, minHeight: mobile ? 108 : "7vw", paddingTop: mobile ? 11 : "0.55vw", paddingBottom: mobile ? 11 : "0.55vw", resize: "vertical" }}
            onFocus={onFieldFocus}
            onBlur={onFieldBlur}
          />

          <button
            type="submit"
            disabled={sending}
            style={{
              width: "100%",
              minHeight: mobile ? 46 : "2.8vw",
              marginTop: mobile ? 2 : "0.2vw",
              fontFamily: "var(--font-bebas), sans-serif",
              fontSize: mobile ? "1rem" : "1.25vw",
              letterSpacing: mobile ? 2 : "0.14vw",
              color: "#fff",
              background: "#c4001a",
              border: "none",
              cursor: sending ? "wait" : "pointer",
              opacity: sending ? 0.7 : 1,
              clipPath: mobile
                ? "polygon(12px 0, 100% 0, calc(100% - 12px) 100%, 0 100%)"
                : "polygon(0.9vw 0, 100% 0, calc(100% - 0.7vw) 100%, 0 100%)",
              boxShadow: `0 ${mobile ? 3 : "0.21vw"} 0 rgba(0,0,0,0.45)`,
            }}
          >
            {sending ? "ENVIANDO..." : "ENVIAR A JAYM3GD2431 →"}
          </button>

          {status && (
            <span aria-live="polite" style={{ fontFamily: "var(--font-bebas), sans-serif", fontSize: mobile ? "0.76rem" : "0.9vw", letterSpacing: mobile ? 1.3 : "0.1vw", color: status === "MENSAJE ENVIADO ✓" ? "#4dff9b" : "#ff5e88", textShadow: status === "MENSAJE ENVIADO ✓" ? `0 0 ${mobile ? "10px" : "0.69vw"} rgba(77,255,155,0.5)` : "none" }}>
              {status}
            </span>
          )}
        </form>
      </div>
    </div>
  );
}

// ── COMPONENT ─────────────────────────────────────────────────────────────────

export default function Socials({ onBack }: { onBack?: () => void }) {

  const prefersReducedMotion = usePrefersReducedMotion();
  const isMobile = useIsMobile();
  const [active, setActive]           = useState(0);
  const [mounted, setMounted]         = useState(false);
  const [activeLink, setActiveLink]   = useState(0);
  const [focus, setFocus]             = useState<"left" | "right">("left");
  const [contactOpen, setContactOpen] = useState(false);

  // mailto: must navigate the current document — window.open(_blank) just opens a dead tab
  const openLink = (url: string) => {
    if (url.startsWith("mailto:")) {
      window.location.href = url;
    } else {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {

    const onKey = (e: KeyboardEvent) => {

      if (contactOpen) {
        if (e.key === "Escape") {
          e.preventDefault();
          e.stopPropagation();
          setContactOpen(false);
          setFocus("left");
        }
        return;
      }

      if (focus === "left") {

        if (e.key === "ArrowUp")   setActive(i => Math.max(0, i - 1));
        if (e.key === "ArrowDown") setActive(i => Math.min(ITEMS.length - 1, i + 1));

        if (e.key === "ArrowRight") {
          setFocus("right");
          setActiveLink(0);
        }

        if (e.key === "Enter") {
          if (active === EMAIL_INDEX) {
            setContactOpen(true);
            setFocus("right");
            setActiveLink(0);
          } else {
            openLink(ITEMS[active].href);
          }
        }

      } else {

        const linkCount = ITEMS[active].links.length;
        if (e.key === "ArrowUp")   setActiveLink(i => Math.max(0, i - 1));
        if (e.key === "ArrowDown") setActiveLink(i => Math.min(linkCount - 1, i + 1));
        if (e.key === "ArrowLeft") setFocus("left");

        if (e.key === "Enter") {
          if (active === EMAIL_INDEX) {
            setContactOpen(true);
          } else {
            openLink(ITEMS[active].links[activeLink].url);
          }
        }

      }

    };

    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);

  }, [active, focus, activeLink, contactOpen]);

  const item = ITEMS[active];

  if (isMobile) {
    return (
      <div className="absolute inset-0 overflow-hidden" id="socials-screen">
        <div className="absolute inset-0" style={{ zIndex: 1, background: "linear-gradient(180deg, rgba(4,9,26,0.6) 0%, rgba(4,9,26,0.86) 100%)" }} />
        <div data-mobile-scroll="" style={{ position: "absolute", inset: 0, zIndex: 10, overflowY: "auto", padding: "20px 16px calc(104px + var(--safe-bottom))" }}>
          <div style={{ fontFamily: "var(--font-anton), sans-serif", fontSize: "clamp(2.2rem,10vw,3.2rem)", letterSpacing: 2, color: "#f6fbff", marginBottom: 4 }}>ENLACES</div>
          <div style={{ fontFamily: "var(--font-bebas), sans-serif", fontSize: "clamp(0.75rem,3.3vw,0.9rem)", letterSpacing: 2, color: "rgba(205,232,255,0.65)", marginBottom: 16 }}>PERFIL PROFESIONAL Y CONTACTO</div>
          {active === EMAIL_INDEX && contactOpen && (
            <ContactForm
              accent={ITEMS[EMAIL_INDEX].accent}
              mobile
              onClose={() => { setContactOpen(false); setFocus("left"); }}
            />
          )}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {ITEMS.map((linkItem, index) => (
              <button
                key={linkItem.id}
                onClick={() => {
                  setActive(index);
                  if (index === EMAIL_INDEX) {
                    setContactOpen(true);
                    setFocus("right");
                    setActiveLink(0);
                    requestAnimationFrame(() => {
                      document.querySelector<HTMLElement>("[data-mobile-scroll]")?.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
                    });
                  } else {
                    setContactOpen(false);
                    openLink(linkItem.href);
                  }
                }}
                style={{ position: "relative", width: "100%", minHeight: 76, padding: 0, textAlign: "left", cursor: "pointer", background: "transparent", border: "none" }}
              >
                <div style={{ position: "absolute", inset: "6px -4px -6px 6px", background: linkItem.accent, clipPath: "polygon(14px 0, 100% 0, calc(100% - 14px) 100%, 0 100%)", opacity: active === index ? 1 : 0.55 }} />
                <div style={{ position: "relative", display: "flex", alignItems: "center", gap: 12, minHeight: 76, padding: "12px 14px", background: active === index ? "#fafbff" : "rgba(10,15,28,0.9)", clipPath: "polygon(14px 0, 100% 0, calc(100% - 14px) 100%, 0 100%)" }}>
                  <span style={{ flex: "0 0 40px", height: 40, display: "flex", alignItems: "center", justifyContent: "center", background: linkItem.accent, clipPath: "polygon(14% 0, 100% 0, 86% 100%, 0 100%)" }}>
                    <Logo id={linkItem.logo} color="#fff" size="24px" />
                  </span>
                  <span style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 3 }}>
                    <span style={{ fontFamily: "var(--font-anton), sans-serif", fontSize: "clamp(1.1rem,5vw,1.45rem)", lineHeight: 1, color: active === index ? "#0a0f1c" : "#f6fbff" }}>{linkItem.label}</span>
                    <span style={{ fontFamily: "var(--font-montserrat), sans-serif", fontWeight: 300, fontSize: "clamp(0.78rem,3.4vw,0.9rem)", lineHeight: 1.25, color: active === index ? "rgba(10,15,28,0.68)" : "rgba(205,232,255,0.72)" }}>{linkItem.handle}</span>
                  </span>
                  <span style={{ flexShrink: 0, fontFamily: "var(--font-bebas), sans-serif", fontSize: "clamp(0.75rem,3.2vw,0.88rem)", letterSpacing: 1, color: active === index ? linkItem.accent : "rgba(141,246,255,0.72)" }}>{linkItem.links[0].label}</span>
                </div>
              </button>
            ))}
          </div>
          <div style={{ marginTop: 16, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, padding: "10px 12px", fontFamily: "var(--font-bebas), sans-serif", fontSize: 13, letterSpacing: 2, color: "rgba(220,240,255,0.7)", background: "rgba(6,12,38,0.82)", border: "1px solid rgba(141,246,255,0.22)" }}>
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
    <div className="absolute inset-0 overflow-hidden" id="socials-screen">

      <style>{`
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
        @keyframes sc-shard-float {
          0%   { opacity: 0; transform: translate(0, 0) rotate(var(--r)) scale(0.6); }
          18%  { opacity: 1; }
          100% { opacity: 0; transform: translate(var(--tx), var(--ty)) rotate(calc(var(--r) + 55deg)) scale(1); }
        }
        .sc-shard { animation: sc-shard-float var(--dur) ease-out infinite; animation-delay: var(--delay); will-change: transform, opacity; }
        .sc-arrow-left  { animation: sc-arrow-left  0.8s ease-in-out infinite; display: inline-block; }
        .sc-arrow-right { animation: sc-arrow-right 0.8s ease-in-out infinite; display: inline-block; }
        .sc-right-nav-pop { animation: sc-right-nav-pop 0.38s cubic-bezier(0.22,1,0.36,1) both; }
        .sc-infobar-in { animation: sc-infobar-in 0.35s cubic-bezier(0.22,1,0.36,1) both; }
      `}</style>

      {/* ── LEFT: BAR LIST ── */}
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
          gap: "0.42vw",
        }}
      >
        {ITEMS.map((it, i) => {

          const isActive = active === i;

          return (
            <div
              key={it.id}
              onClick={() => {
                if (isActive) {
                  if (i === EMAIL_INDEX) {
                    setContactOpen(true);
                    setFocus("right");
                    setActiveLink(0);
                  } else {
                    openLink(it.href);
                  }
                } else {
                  setActive(i);
                  setFocus("left");
                  setContactOpen(false);
                }
              }}
              onMouseEnter={() => {
                setActive(i);
                if (i !== EMAIL_INDEX) setContactOpen(false);
              }}
              style={{
                position: "relative",
                flexShrink: 0,
                pointerEvents: "all",
                cursor: "pointer",
                transform: mounted ? "translateX(0)" : "translateX(-100%)",
                transition: `transform 0.55s cubic-bezier(0.22,1,0.36,1) ${i * 80}ms, filter 0.25s ease`,
                filter: isActive ? `drop-shadow(0 0 16px ${it.accent}) drop-shadow(0 0 5px ${it.accent})` : "none",
              }}
            >

              {/* ACCENT UNDERLAY — peeks out on active, coloured per link */}
              <div
                style={{
                  position: "absolute",
                  top: 0, left: 0,
                  width: "45vw",
                  height: isActive ? "6.24vw" : "4.43vw",
                  background: it.accent,
                  clipPath: "polygon(50% 0, 100% 0, 100% 100%, calc(50% - 0.69vw) 100%)",
                  transform: "translateY(-0.49vw)",
                  opacity: isActive ? 1 : 0,
                  transition: "opacity 0.2s ease, height 0.3s cubic-bezier(0.22,1,0.36,1)",
                  zIndex: 0,
                  pointerEvents: "none",
                }}
              />

              {/* MAIN BAR */}
              <div
                style={{
                  position: "relative",
                  width: "45vw",
                  height: isActive ? "6.24vw" : "4.43vw",
                  background: "#111",
                  clipPath: "polygon(0 0, 100% 0, calc(100% - 0.97vw) 100%, 0 100%)",
                  boxShadow: "0 0.4vw 1.7vw rgba(0,0,0,0.65)",
                  transition: "height 0.3s cubic-bezier(0.22,1,0.36,1)",
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
                    clipPath: isActive
                      ? "polygon(22% 0, 100% 0, calc(100% - 0.97vw) 100%, calc(22% + 9.56vw) 100%)"
                      : "polygon(100% 0, 100% 0, calc(100% - 2.22vw) 100%, calc(100% - 2.22vw) 100%)",
                    transition: "clip-path 0.35s cubic-bezier(0.22,1,0.36,1)",
                    zIndex: 0,
                  }}
                />

                {/* CHARACTER SHARD */}
                <img
                  src={CHARS[i]}
                  alt=""
                  style={{
                    position: "absolute",
                    top: 0, left: 0,
                    height: "100%", width: "auto", maxWidth: "15.94vw",
                    objectFit: "cover", objectPosition: "left top",
                    pointerEvents: "none",
                    zIndex: 3,
                    clipPath: "polygon(0 0%, 100% 0%, calc(100% - 1.66vw) 100%, 0% 100%)",
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
                    padding: "0 1.39vw",
                  }}
                >

                  {/* spacer reserving the shard column */}
                  <div style={{ width: "13.86vw", flexShrink: 0 }} />

                  {/* LABEL + HANDLE (slanted, P3R mockup type) */}
                  <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "0.14vw" }}>
                    <span
                      style={{
                        fontFamily: "var(--font-anton), sans-serif",
                        fontSize: "2.36vw",
                        letterSpacing: "0.14vw",
                        transform: "skewX(-9deg)",
                        color: isActive ? "#111" : "rgba(255,255,255,0.88)",
                        transition: "color 0.2s ease",
                        userSelect: "none",
                      }}
                    >
                      {it.label}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-bebas), sans-serif",
                        fontSize: "1.04vw",
                        letterSpacing: "0.14vw",
                        fontWeight: 700,
                        transform: "skewX(-9deg)",
                        color: it.accent,
                        maxHeight: isActive ? "1.52vw" : 0,
                        opacity: isActive ? 1 : 0,
                        overflow: "hidden",
                        transition: "max-height 0.28s cubic-bezier(0.22,1,0.36,1), opacity 0.2s ease",
                        userSelect: "none",
                      }}
                    >
                      {it.handle}
                    </span>
                  </div>

                  {/* BRAND LOGO — right corner of the box */}
                  <div style={{ flexShrink: 0, display: "flex", alignItems: "center", paddingRight: "1.25vw" }}>
                    <Logo id={it.logo} color={isActive ? "#111" : "#fff"} size={isActive ? "2.22vw" : "1.94vw"} />
                  </div>

                </div>

              </div>

              {/* FLOATING SHATTER SHARDS — fly off the right edge on active */}
              <Shards accent={it.accent} active={isActive} />
            </div>
          );

        })}
      </div>

      {/* ── RIGHT NAV HEADER — platform name leads, LB/RB recede ── */}
      {mounted && (
        <div
          style={{
            position: "fixed",
            top: "5.67vh", right: "3.88vw",
            width: "34vw",
            minWidth: "26vw",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            pointerEvents: "none",
            zIndex: 50,
          }}
        >
          {/* nav row: ◄ LB · NAME · RB ► — legibility from text outline, no panel */}
          <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", gap: "1.52vw", padding: "0.42vw 0.28vw 0.69vw" }}>

            <span
              style={{
                fontFamily: "var(--font-bebas), sans-serif",
                fontSize: "1.45vw",
                letterSpacing: "0.21vw",
                color: "#fff",
                WebkitTextStroke: "0.07vw rgba(8,10,20,0.9)",
                paintOrder: "stroke fill",
                textShadow: "0 0.07vw 0.28vw rgba(0,0,0,0.85)",
                display: "flex",
                alignItems: "center",
                gap: "0.49vw",
                userSelect: "none",
              }}
            >
              <span className="sc-arrow-left" style={{ fontSize: "0.97vw" }}>◄</span> LB
            </span>

            <div key={active} className="sc-right-nav-pop" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.49vw" }}>
              <span
                style={{
                  fontFamily: "var(--font-anton), sans-serif",
                  fontSize: "3.05vw",
                  letterSpacing: "0.28vw",
                  lineHeight: 1,
                  transform: "skewX(-9deg)",
                  color: item.accent,
                  WebkitTextStroke: "0.087vw rgba(8,10,20,0.92)",
                  paintOrder: "stroke fill",
                  textShadow: `0 0.07vw 0.42vw rgba(0,0,0,0.85), 0 0 1.39vw ${item.accent}55`,
                  userSelect: "none",
                }}
              >
                {item.label}
              </span>
              {/* accent underline — short, centered */}
              <div
                style={{
                  width: "4.02vw",
                  height: "0.21vw",
                  background: item.accent,
                  boxShadow: `0 0 0.69vw ${item.accent}, 0 0.07vw 0.21vw rgba(0,0,0,0.8)`,
                  transform: "skewX(-9deg)",
                }}
              />
            </div>

            <span
              style={{
                fontFamily: "var(--font-bebas), sans-serif",
                fontSize: "1.45vw",
                letterSpacing: "0.21vw",
                color: "#fff",
                WebkitTextStroke: "0.07vw rgba(8,10,20,0.9)",
                paintOrder: "stroke fill",
                textShadow: "0 0.07vw 0.28vw rgba(0,0,0,0.85)",
                display: "flex",
                alignItems: "center",
                gap: "0.49vw",
                userSelect: "none",
              }}
            >
              RB <span className="sc-arrow-right" style={{ fontSize: "0.97vw" }}>►</span>
            </span>
          </div>
        </div>
      )}

      {/* ── RIGHT: ACTION BANNER — leaning, layered Persona shard ── */}
      {mounted && active === EMAIL_INDEX && contactOpen ? (
        <ContactForm accent={item.accent} onClose={() => { setContactOpen(false); setFocus("left"); }} />
      ) : mounted && item.links.map((link, i) => {
        const live = focus === "right" && activeLink === i;
        return (
          <div
            key={`${active}-${i}`}
            className="sc-infobar-in"
            onClick={() => {
              setFocus("right");
              setActiveLink(i);
              if (active === EMAIL_INDEX) setContactOpen(true);
              else openLink(link.url);
            }}
            onMouseEnter={() => { setFocus("right"); setActiveLink(i); }}
            onMouseLeave={() => setFocus("left")}
            style={{
              position: "fixed",
              right: "3.88vw",
              top: `${16.26 + i * 8.62}vh`,
              width: "34vw",
              minWidth: "26vw",
              height: "4.02vw",
              pointerEvents: "all",
              cursor: "pointer",
              zIndex: 50,
              animationDelay: `${i * 50}ms`,
              filter: live ? `drop-shadow(0 0 0.97vw ${item.accent}aa)` : "none",
              transition: "filter 0.25s ease",
            }}
          >
            {/* ACCENT SHARD — peeks bottom-right behind the panel */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: item.accent,
                clipPath: "polygon(1.39vw 0, 100% 0, calc(100% - 1.11vw) 100%, 0 100%)",
                transform: "translate(0.55vw, 0.49vw)",
                opacity: live ? 1 : 0.55,
                transition: "opacity 0.2s ease",
              }}
            />

            {/* MAIN PANEL — sheared parallelogram, leans with the cards */}
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "100%",
                background: live ? "#fafbff" : "rgba(10,15,28,0.82)",
                clipPath: "polygon(1.39vw 0, 100% 0, calc(100% - 1.11vw) 100%, 0 100%)",
                boxShadow: "0 0.42vw 1.52vw rgba(0,0,0,0.55)",
                display: "flex",
                alignItems: "center",
                overflow: "hidden",
                transition: "background 0.2s ease",
              }}
            >
              {/* accent edge sliver on the left lean */}
              <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "0.35vw", background: item.accent, transform: "skewX(-20deg)", transformOrigin: "top", opacity: 0.9 }} />

              {/* icon chip */}
              <div
                style={{
                  marginLeft: "1.8vw",
                  width: "2.36vw", height: "2.36vw",
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: item.accent,
                  clipPath: "polygon(14% 0, 100% 0, 86% 100%, 0 100%)",
                }}
              >
                <Logo id={item.logo} color="#fff" size="1.39vw" />
              </div>

              {/* action label */}
              <span
                style={{
                  flex: 1,
                  marginLeft: "1.11vw",
                  fontFamily: "var(--font-anton), sans-serif",
                  fontSize: "1.59vw",
                  letterSpacing: "0.14vw",
                  transform: "skewX(-9deg)",
                  color: live ? "#0a0f1c" : "rgba(255,255,255,0.9)",
                  transition: "color 0.2s ease",
                  userSelect: "none",
                }}
              >
                {link.label}
              </span>

              {/* OPEN → */}
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.55vw",
                  paddingRight: "1.8vw",
                  flexShrink: 0,
                  fontFamily: "var(--font-bebas), sans-serif",
                  fontSize: "1.45vw",
                  letterSpacing: "0.14vw",
                  color: live ? item.accent : "rgba(255,255,255,0.55)",
                  transition: "color 0.2s ease",
                  userSelect: "none",
                }}
              >
                ABRIR <span className={live ? "sc-arrow-right" : ""} style={{ fontSize: "1.18vw" }}>→</span>
              </span>
            </div>
          </div>
        );
      })}

      {mounted && (
        <div
          aria-disabled="true"
          style={{
            position: "fixed", bottom: "2.4vh", left: "1.94vw", zIndex: 60,
            display: "flex", alignItems: "center", gap: 10,
            padding: "10px 14px",
            fontFamily: "var(--font-bebas), sans-serif", fontSize: 16, letterSpacing: 2,
            color: "rgba(220,240,255,0.72)", background: "rgba(6,12,38,0.82)",
            border: "2px solid rgba(141,246,255,0.28)", borderRadius: 4,
            pointerEvents: "none",
          }}
        >
          <span>CURRÍCULUM PDF</span>
          <span style={{ color: "#ff5e88" }}>PRÓXIMAMENTE</span>
        </div>
      )}

      {/* FOOTER HINTS */}
      <div
        style={{
          position: "fixed",
          bottom: "9vh", right: "1.94vw",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: "0.35vw",
          fontFamily: "var(--font-bebas), sans-serif",
          zIndex: 50,
          pointerEvents: "none",
          opacity: mounted ? 1 : 0,
          transition: "opacity 0.4s ease 0.6s",
        }}
      >
        {[["↑↓", "SELECCIONAR"], ["→", "ENLACES"], ["↵", "ABRIR"], ["ESC", "VOLVER"]].map(([key, label]) => (
          <div key={key} style={{ display: "flex", alignItems: "center", gap: "0.55vw", fontSize: "0.9vw", letterSpacing: "0.14vw", color: "rgba(255,255,255,0.22)" }}>
            <span style={{ border: "1px solid rgba(255,255,255,0.15)", borderRadius: 3, padding: "0.07vw 0.42vw", fontSize: "0.76vw" }}>{key}</span>
            <span>{label}</span>
          </div>
        ))}
      </div>

      {/* VOLVER AL MENÚ */}
      <button
        onClick={() => onBack?.()}
        style={{
          position: "fixed", bottom: "2.4vh", right: "1.94vw", zIndex: 60,
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