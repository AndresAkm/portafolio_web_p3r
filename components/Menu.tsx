"use client";

import { lazy, Suspense, useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { motion, AnimatePresence, MotionConfig } from "framer-motion";
import { useIsMobile } from "./useIsMobile";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

const loadAbout = () => import("./About");
const loadResume = () => import("./Resume");
const loadGithub = () => import("./Github");
const loadSocials = () => import("./Socials");
const loadSideProjects = () => import("./Sideprojects");
const loadTransition = () => import("./Transition");

const About = lazy(loadAbout);
const Resume = lazy(loadResume);
const Github = lazy(loadGithub);
const Socials = lazy(loadSocials);
const SideProjects = lazy(loadSideProjects);
const Transition = lazy(loadTransition);

const TRACKS = [
  "/audio/reloadost-1.mp3",
  "/audio/reloadost-2.mp3",
  "/audio/reloadost-3.mp3",
  "/audio/reloadost-4.mp3",
];
const menuItems = [
  { label: "SOBRE MÍ",       screen: "about"    },
  { label: "CURRÍCULUM",     screen: "resume"   },
  { label: "PROYECTOS",      screen: "sideproj" },
  { label: "ENLACES SOCIALES", screen: "socials"  },
];

const NAV_LAYOUT = [
  { transform: "rotate(5.5deg) translateX(0px)" },
  { transform: "rotate(-4deg) translateX(18px)" },
  { transform: "rotate(-1.5deg) translateX(10px)" },
  { transform: "rotate(4.5deg) translateX(-12px)" },
];

const NAV_TONES = [
  { color: "#40D8FF", opacity: 0.95 },
  { color: "#229CEB", opacity: 0.88 },
  { color: "#229CEB", opacity: 0.82 },
  { color: "#1B7AD6", opacity: 0.78 },
];

type Variant = "panel" | "resume" | "stripes" | "default";

const VARIANT_MAP: Record<string, Variant> = {
  about:    "default",
  menu:     "panel",
  resume:   "default",
  github:   "default",
  socials:  "default",
  sideproj: "default",
};

const SCREEN_VIDEO: Record<string, string | null> = {
  menu:     null,
  about:    null,
  resume:   "skills",
  sideproj: "skills",
  github:   "equip",
  socials:  "status",
};

const SCREEN_IMAGES: Record<string, string[]> = {
  menu:     [],
  about:    ["/images/about-makoto.webp", "/images/p5-logo.webp"],
  resume:   ["/projects/carely-1.webp", "/projects/carely-2.webp", "/projects/anime-cli-1.webp"],
  sideproj: [],
  github:   ["/images/char1.webp"],
  socials:  [
    "/images/shards/cyan.png",
    "/images/shards/yellow.png",
    "/images/shards/pink.png",
    "/images/shards/red.png",
  ],
};

const warmedImages = new Set<string>();

function warmImages(screen: string) {
  for (const url of SCREEN_IMAGES[screen] ?? []) {
    if (warmedImages.has(url)) continue;
    warmedImages.add(url);
    const image = new Image();
    image.src = url;
  }
}

const SCREEN_LOADERS: Record<string, () => Promise<unknown>> = {
  about:      loadAbout,
  resume:     loadResume,
  github:     loadGithub,
  socials:    loadSocials,
  sideproj:   loadSideProjects,
  transition: loadTransition,
};

const BACKDROP_VIDEOS = [
  { key: "skills", src: "/videos/skills.mp4", poster: "/posters/skills.webp" },
  { key: "equip", src: "/videos/equip.mp4", poster: "/posters/equip.webp" },
  { key: "status", src: "/videos/status.enhanced.mp4", poster: "/posters/status.enhanced.webp" },
] as const;

function VideoBackdrop({ warmed, active, ready, onReady }: {
  warmed: Set<string>;
  active: string | null;
  ready: Set<string>;
  onReady: (key: string) => void;
}) {
  const isMobile = useIsMobile();
  const prefersReducedMotion = usePrefersReducedMotion();
  const refs = useRef<Record<string, HTMLVideoElement | null>>({});

  useEffect(() => {
    if (prefersReducedMotion) return;
    for (const item of BACKDROP_VIDEOS) {
      if (!warmed.has(item.key)) continue;
      const video = refs.current[item.key];
      if (!video) continue;
      video.preload = "auto";
      void video.play().catch(() => {});
    }
  }, [warmed, prefersReducedMotion]);

  return (
    <div className="absolute inset-0" style={{ zIndex: 0, pointerEvents: "none", background: "#050b1f" }}>
      {BACKDROP_VIDEOS.map((item) => {
        const isActive = active === item.key;
        const shouldPlay = warmed.has(item.key) && !prefersReducedMotion;
        const isReady = ready.has(item.key);
        return (
          <div
            key={item.key}
            className="absolute inset-0"
            style={{ zIndex: 0, opacity: isActive ? 1 : 0, transition: "opacity 180ms ease", pointerEvents: "none" }}
          >
            <div
              className="absolute inset-0"
              style={{
                zIndex: 0,
                backgroundImage: `url(${item.poster})`,
                backgroundSize: "cover",
                backgroundPosition: isMobile ? "center 35%" : "center",
                transform: isReady ? "scale(1)" : "scale(1.015)",
                filter: isReady ? "blur(0px)" : "blur(4px)",
                transition: "transform 600ms ease, filter 600ms ease",
              }}
            />
            <video
              ref={(el) => { refs.current[item.key] = el; }}
              autoPlay={shouldPlay}
              loop={!prefersReducedMotion}
              muted
              playsInline
              preload={warmed.has(item.key) ? "auto" : "metadata"}
              onTimeUpdate={(e) => {
                if (e.currentTarget.currentTime >= 0.2) onReady(item.key);
              }}
              aria-hidden="true"
              data-mobile-bg={isMobile ? "" : undefined}
              className="absolute inset-0 w-full h-full object-cover"
              style={{ zIndex: 1, opacity: isReady ? 1 : 0, transition: "opacity 400ms ease" }}
            >
              <source src={item.src} type="video/mp4" />
            </video>
          </div>
        );
      })}
    </div>
  );
}

const triClip = (w: number, h: number) =>
  `polygon(0px 0px, ${w}px ${h * 0.5}px, 0px ${h}px)`;

export default function Menu() {

  const isMobile = useIsMobile();
  const prefersReducedMotion = usePrefersReducedMotion();
  const heroTitleFontSize = isMobile ? "clamp(2.16rem, 9vw, 3.2rem)" : "clamp(3.8rem, 7vw, 6.8rem)";

  const [started, setStarted]             = useState(false);
  const [introFinished, setIntroFinished] = useState(false);
  const [menuVidReady, setMenuVidReady]   = useState(false);
  const [menuLoopReady, setMenuLoopReady] = useState(false);
  const [loadProgress, setLoadProgress]   = useState(0);

  const loadStartedAt = useRef<number | null>(null);

  const menuSources = { intro: "/videos/menu-intro.mp4", loop: "/videos/menu.mp4" };
  const vidsReady = true;

  const [showMenu, setShowMenu]           = useState(false);
  const [active, setActive]               = useState(0);
  const [animKey, setAnimKey]             = useState(0);
  const [currentScreen, setCurrentScreen] = useState("menu");
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Use a ref for variant so it's always current when Transition mounts
  const variantRef = useRef<Variant>("panel");
  const [transitionVariant, setTransitionVariant] = useState<Variant>("panel");

  const [warmedVideos, setWarmedVideos] = useState<Set<string>>(() => new Set());
  const warmedVideosRef = useRef<Set<string>>(new Set());

  const [videoReady, setVideoReady] = useState<Set<string>>(() => new Set());
  const videoReadyRef = useRef<Set<string>>(new Set());

  const pendingScreenRef = useRef<string | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const activate = (idx: number) => {
    setActive(idx);
    setAnimKey(k => k + 1);
  };

  /* ---------------- START ---------------- */

  const handleStart = useCallback(() => {
    setStarted(true);
    const audio = audioRef.current;
    if (audio) {
      audio.src = TRACKS[Math.floor(Math.random() * TRACKS.length)];
      audio.volume = 0.05;
      audio.play().catch(() => {});
    }
  }, []);

  const warmChunk = useCallback((screen: string) => {
    void SCREEN_LOADERS[screen]?.();
  }, []);

  const warmVideo = useCallback((key: string | null) => {
    if (!key || warmedVideosRef.current.has(key)) return;
    warmedVideosRef.current.add(key);
    setWarmedVideos(new Set(warmedVideosRef.current));
  }, []);

  const finishSwap = useCallback((screen: string) => {
    pendingScreenRef.current = null;
    if (screen === "menu") {
      setIntroFinished(false);
      setMenuVidReady(false);
      setMenuLoopReady(false);
      setShowMenu(false);
      setActive(0);
    }
    setCurrentScreen(screen);
    window.setTimeout(() => setIsTransitioning(false), screen === "menu" ? 2120 : 430);
  }, []);

  const markVideoReady = useCallback((key: string) => {
    if (videoReadyRef.current.has(key)) return;
    videoReadyRef.current = new Set(videoReadyRef.current).add(key);
    setVideoReady(videoReadyRef.current);

    const pending = pendingScreenRef.current;
    if (pending && SCREEN_VIDEO[pending] === key) finishSwap(pending);
  }, [finishSwap]);

  const warmScreen = useCallback((screen: string) => {
    warmChunk(screen);
    warmChunk("transition");
    warmImages(screen);
    warmVideo(SCREEN_VIDEO[screen] ?? null);
  }, [warmChunk, warmVideo]);

  useEffect(() => {
    if (!started) return;

    const resumeAudio = () => {
      const audio = audioRef.current;
      if (!audio || !audio.paused) return;
      audio.volume = 0.05;
      audio.play().catch(() => {});
    };

    window.addEventListener("pointerdown", resumeAudio);
    window.addEventListener("keydown", resumeAudio);
    return () => {
      window.removeEventListener("pointerdown", resumeAudio);
      window.removeEventListener("keydown", resumeAudio);
    };
  }, [started]);

  useEffect(() => {
    if (started) return;
    if (loadStartedAt.current === null) loadStartedAt.current = Date.now();

    const timer = setInterval(() => {
      const elapsed = Date.now() - (loadStartedAt.current ?? Date.now());
      const progress = Math.min(100, Math.round((elapsed / 500) * 100));
      setLoadProgress(progress);
      if (progress >= 100) {
        clearInterval(timer);
        handleStart();
      }
    }, 50);

    return () => clearInterval(timer);
  }, [started, handleStart]);

  /* ---------------- MENU DELAY ---------------- */

  useEffect(() => {
    if (!started) return;
    if (currentScreen === "menu") {
      const timer = setTimeout(() => setShowMenu(true), 1200);
      return () => clearTimeout(timer);
    }
  }, [currentScreen, started]);

  useEffect(() => {
    if (!showMenu || currentScreen !== "menu" || isMobile) return;
    const timer = setTimeout(() => {
      warmChunk("about");
      warmChunk("resume");
      warmChunk("github");
      warmChunk("socials");
      warmChunk("transition");
      warmVideo("skills");
      warmVideo("equip");
    }, 2500);
    return () => clearTimeout(timer);
  }, [showMenu, currentScreen, isMobile, warmChunk, warmVideo]);

  /* ---------------- SFX ---------------- */

  const playNavigationSfx = () => {
    const sfx = new Audio("/sfx/deck_ui_navigation.wav");
    sfx.volume = 0.85;
    sfx.play().catch(() => {});
  };

  const playSelectSfx = () => {
    const sfx = new Audio("/sfx/selectSfx.wav");
    sfx.volume = 0.85;
    sfx.play().catch(() => {});
  };

  /* ---------------- TRANSITION ---------------- */

  const transitionTo = (screen: string, skipSelectSfx = false) => {
    if (isTransitioning) return;

    warmScreen(screen);
    if (!skipSelectSfx) playSelectSfx();

    // Set the variant on the ref AND state synchronously before mounting
    const variant = VARIANT_MAP[screen] ?? "default";
    variantRef.current = variant;
    setTransitionVariant(variant);

    // Small rAF delay ensures the state has flushed before Transition mounts
    requestAnimationFrame(() => {
      setIsTransitioning(true);
    });

    const videoKey = SCREEN_VIDEO[screen];
    if (videoKey && !prefersReducedMotion && !videoReadyRef.current.has(videoKey)) {
      pendingScreenRef.current = screen;
      window.setTimeout(() => {
        if (pendingScreenRef.current !== screen) return;
        finishSwap(screen);
      }, 1400);
    } else {
      const swapDelay = screen === "menu" ? 580 : 220;
      window.setTimeout(() => finishSwap(screen), swapDelay);
    }
  };

  const backToMenu = () => {
    const sfx = new Audio("/sfx/closeSfx.wav");
    sfx.volume = 0.85;
    sfx.play().catch(() => {});
    transitionTo("menu", true);
  };

  /* ---------------- KEYBOARD ---------------- */

  useEffect(() => {
    if (!started) return;

    const handleKeyDown = (e: KeyboardEvent) => {

      if (e.key === "Escape" && currentScreen !== "menu") {
        const sfx = new Audio("/sfx/closeSfx.wav");
        sfx.volume = 0.85;
        sfx.play().catch(() => {});
        transitionTo("menu", true);
        return;
      }

      if (currentScreen === "menu") {
        if (e.key === "ArrowDown") {
          const next = Math.min(menuItems.length - 1, active + 1);
          playNavigationSfx();
          warmScreen(menuItems[next].screen);
          activate(next);
        }
        if (e.key === "ArrowUp") {
          const next = Math.max(0, active - 1);
          playNavigationSfx();
          warmScreen(menuItems[next].screen);
          activate(next);
        }
        if (e.key === "Enter") {
          transitionTo(menuItems[active].screen);
        }
      }

    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentScreen, isTransitioning, started, active]);

  return (
    <MotionConfig reducedMotion="user">
    <main className="relative w-screen h-screen overflow-hidden" style={isMobile ? { height: "100dvh" } : undefined}>

      <audio ref={audioRef} loop preload="none">
        <source src={TRACKS[0]} type="audio/mpeg" />
      </audio>

      {/* ── CARGANDO ── */}
      <AnimatePresence>
        {!started && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 z-[9999] flex flex-col items-center justify-center select-none"
            style={{ background: "#000" }}
          >
            <motion.div
              animate={prefersReducedMotion ? undefined : { opacity: [0.5, 1, 0.5] }}
              transition={prefersReducedMotion ? { duration: 0 } : { duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              style={{ fontFamily: "var(--font-persona)", fontSize: "clamp(1.5rem, 4vw, 2.5rem)", color: "#67e8f9", letterSpacing: "0.18em", transform: "skewX(-9deg)" }}
            >
              CARGANDO
            </motion.div>
            <div style={{ position: "relative", marginTop: 28, width: "min(460px, 74vw)" }}>
              <div style={{
                height: 12,
                border: "2px solid #67e8f9",
                background: "rgba(103,232,249,0.08)",
                transform: "skewX(-12deg)",
                overflow: "hidden",
                boxShadow: "0 0 18px rgba(103,232,249,0.25)",
              }}>
                <motion.div
                  animate={{ scaleX: loadProgress / 100 }}
                  transition={{ duration: 0.12, ease: "linear" }}
                  style={{ width: "100%", height: "100%", transformOrigin: "left", background: "linear-gradient(90deg, #1f6fb2, #67e8f9)" }}
                />
              </div>
              <div style={{ position: "absolute", left: -10, top: -7, width: 6, height: 26, background: "#e8002d", transform: "skewX(-12deg)" }} />
            </div>
            <div style={{
              marginTop: 16,
              width: "min(460px, 74vw)",
              display: "flex",
              justifyContent: "space-between",
              fontFamily: "var(--font-bebas), sans-serif",
              fontSize: 12,
              letterSpacing: "0.18em",
              color: "rgba(255,255,255,0.35)",
            }}>
              <span>ESTADO</span>
              <span>{loadProgress}%</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {started && (
        <>
          <VideoBackdrop
            warmed={warmedVideos}
            active={SCREEN_VIDEO[currentScreen] ?? null}
            ready={videoReady}
            onReady={markVideoReady}
          />

          {/* WHITE BACKDROP — fills the space opened up on the left */}
          {currentScreen === "menu" && (
            <div className="absolute inset-0" style={{ background: "#ffffff", zIndex: 0 }} />
          )}

          {/* LOOP VIDEO — poster layer fades into the live video once it starts playing */}
          {currentScreen === "menu" && vidsReady && (
            <div
              className="absolute inset-0"
              style={{ transform: isMobile ? "none" : "translateX(15%)", zIndex: 1, pointerEvents: "none" }}
            >
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: "url('/posters/menu.webp')",
                  backgroundSize: "cover",
                  backgroundPosition: isMobile ? "22% center" : "center",
                  transform: menuLoopReady ? "scale(1)" : "scale(1.015)",
                  filter: menuLoopReady ? "blur(0px)" : "blur(4px)",
                  transition: "transform 600ms ease, filter 600ms ease",
                }}
              />
              <video
                autoPlay={!prefersReducedMotion} loop={!prefersReducedMotion} muted playsInline
                preload={prefersReducedMotion ? "none" : "auto"}
                src={menuSources.loop}
                data-mobile-bg={isMobile ? "" : undefined}
                onPlaying={() => setMenuLoopReady(true)}
                className="absolute inset-0 w-full h-full object-cover"
                style={{
                  objectPosition: isMobile ? "22% center" : "center",
                  opacity: menuLoopReady ? 1 : 0,
                  transition: "opacity 400ms ease",
                }}
              />
            </div>
          )}

          {/* INTRO VIDEO — poster fades into live video, then the whole layer fades out when it ends */}
          {currentScreen === "menu" && vidsReady && (
            <div
              className="absolute inset-0"
              style={{
                transform: isMobile ? "none" : "translateX(15%)",
                zIndex: 2,
                opacity: introFinished ? 0 : 1,
                transition: "opacity 0.4s ease",
                pointerEvents: "none",
              }}
            >
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: "url('/posters/menu-intro.webp')",
                  backgroundSize: "cover",
                  backgroundPosition: isMobile ? "22% center" : "center",
                  transform: menuVidReady ? "scale(1)" : "scale(1.015)",
                  filter: menuVidReady ? "blur(0px)" : "blur(4px)",
                  transition: "transform 600ms ease, filter 600ms ease",
                }}
              />
              <video
                autoPlay={!prefersReducedMotion} muted playsInline
                preload={prefersReducedMotion ? "none" : "auto"}
                src={menuSources.intro}
                data-mobile-bg={isMobile ? "" : undefined}
                onCanPlayThrough={() => setMenuVidReady(true)}
                onPlaying={() => setMenuVidReady(true)}
                onEnded={() => setIntroFinished(true)}
                className="absolute inset-0 w-full h-full object-cover"
                style={{
                  objectPosition: isMobile ? "22% center" : "center",
                  opacity: menuVidReady ? 1 : 0,
                  transition: "opacity 400ms ease",
                }}
              />
            </div>
          )}

          {/* ── MENU ── */}
          {showMenu && currentScreen === "menu" && (
            <>
              {/* ── DIAGONAL TWO-LINE TITLE — top-left P3R-style graphic ── */}
              <div style={{
                position: "absolute",
                top: "calc(4% - 4px)",
                left: "4%",
                zIndex: 6,
                pointerEvents: "none",
                userSelect: "none",
                overflow: "visible",
              }}>
                <div style={{ transform: "rotate(24deg)", transformOrigin: "top left" }}>
                  <motion.div
                    initial={{ opacity: 0, x: -40, y: -20 }}
                    animate={{ opacity: 1, x: 0, y: 0 }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
                    style={{
                      fontFamily: "var(--font-anton), sans-serif",
                      fontWeight: 400,
                      fontSize: heroTitleFontSize,
                      letterSpacing: "-0.02em",
                      lineHeight: 0.86,
                      color: "#0A0D12",
                      whiteSpace: "nowrap",
                      mixBlendMode: "multiply",
                      position: "relative",
                      zIndex: 2,
                    }}
                  >
                    {"Andrxss'"}
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: -40, y: -20 }}
                    animate={{ opacity: 1, x: 0, y: 0 }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.38 }}
                    style={{
                      fontFamily: "var(--font-anton), sans-serif",
                      fontWeight: 400,
                      fontSize: heroTitleFontSize,
                      letterSpacing: "-0.02em",
                      lineHeight: 0.86,
                      color: "rgba(15, 20, 28, 0.58)",
                      whiteSpace: "nowrap",
                      marginLeft: isMobile ? "24px" : "30px",
                      position: "relative",
                      zIndex: 1,
                    }}
                  >
                    portafolio
                  </motion.div>
                </div>
              </div>

              {/* ── WALLET / STATUS BOX — top-left HUD ── */}
              <motion.div
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                style={isMobile ? {
                  position: "absolute",
                  top: "13vh",
                  right: "4vw",
                  zIndex: 25,
                  background: "#ffffff",
                  border: "2px solid #0a0f1c",
                  padding: "2vw 3vw 2.4vw",
                  width: "40vw",
                  pointerEvents: "none",
                } : {
                  position: "absolute",
                  top: "7vh",
                  right: "4vw",
                  zIndex: 25,
                  background: "#ffffff",
                  border: "2px solid #0a0f1c",
                  padding: "0.7vw 1.1vw 0.9vw",
                  width: "15vw",
                  pointerEvents: "none",
                }}
              >
                <div style={{ fontFamily: "var(--font-bebas), sans-serif", fontSize: isMobile ? "7vw" : "2.6vw", lineHeight: 0.95, color: "#0a0f1c", letterSpacing: "0.02em" }}>
                  DISPONIBLE
                </div>
                <div style={{ fontFamily: "var(--font-bebas), sans-serif", fontSize: isMobile ? "2.6vw" : "0.85vw", letterSpacing: "0.22em", color: "#2a3340", marginTop: 1 }}>
                  ENFOQUE ACTUAL
                </div>
                <div style={{ fontFamily: "var(--font-bebas), sans-serif", fontSize: isMobile ? "3vw" : "1.1vw", letterSpacing: "0.12em", color: "#1f6fb2", lineHeight: 1.1, marginTop: 2 }}>
                  FULL-STACK DEV
                </div>
                <div style={{ height: 2, background: "#0a0f1c", margin: isMobile ? "1.6vw 0 1.4vw" : "0.6vw 0 0.5vw" }} />
                <div style={{ fontFamily: "var(--font-bebas), sans-serif", fontSize: isMobile ? "2.6vw" : "0.85vw", letterSpacing: "0.22em", color: "#2a3340" }}>
                  ESTADO
                </div>
                <div style={{ fontFamily: "var(--font-bebas), sans-serif", fontSize: isMobile ? "3.6vw" : "1.08vw", letterSpacing: "0.06em", color: "#1f6fb2", lineHeight: 1.05, whiteSpace: "normal" }}>
                  PRACTICANTE EN TECNOPARQUE
                </div>
                {/* corner wedge */}
                <div style={{ position: "absolute", right: 0, bottom: 0, width: 0, height: 0, borderLeft: "14px solid transparent", borderBottom: "14px solid #0a0f1c" }} />
              </motion.div>

              {/* ── RIGHT BLOCK: navigation ── */}
              <div
                style={isMobile ? {
                  position: "absolute",
                  bottom: "calc(64px + var(--safe-bottom))",
                  left: "5vw",
                  zIndex: 20,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  pointerEvents: "none",
                } : {
                  position: "absolute",
                  top: "30vh",
                  left: "51vw",
                  zIndex: 20,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  pointerEvents: "none",
                }}
              >
                {/* NAVIGATION STACK */}
                <nav
                  style={{
                    marginTop: "0",
                    marginLeft: "0",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: "10px",
                    pointerEvents: "auto",
                  }}
                >
                  {menuItems.map((item, i) => {

                    const isActive = active === i;
                    const layout = NAV_LAYOUT[i];
                    const tone = NAV_TONES[i];
                    const fontSize = isMobile ? "clamp(1.36rem, 6.24vw, 2.24rem)" : "clamp(2.56rem, 4.64vw, 4.32rem)";
                    const textStyle: CSSProperties = {
                      fontFamily: "var(--font-anton), sans-serif",
                      fontWeight: 900,
                      fontStyle: "italic",
                      fontSize,
                      lineHeight: 0.92,
                      letterSpacing: "0.01em",
                      whiteSpace: "nowrap",
                      userSelect: "none",
                    };
                    const wedgeBoxStyle: CSSProperties = {
                      position: "absolute",
                      inset: "-12% -35% -12% -6%",
                      width: "125%",
                      height: "124%",
                      pointerEvents: "none",
                      zIndex: 1,
                    };

                    return (
                      <div
                        key={item.label}
                        onClick={() => { activate(i); transitionTo(item.screen); }}
                        onMouseEnter={() => { activate(i); playNavigationSfx(); warmScreen(item.screen); }}
                        onTouchStart={() => warmScreen(item.screen)}
                        style={{
                          position: "relative",
                          marginBottom: i === 0 ? "14px" : 0,
                          marginTop: i === 3 ? "-10px" : 0,
                          zIndex: isActive ? 20 : 10,
                          cursor: "pointer",
                          pointerEvents: "auto",
                          transform: layout.transform,
                          transformOrigin: "left center",
                        }}
                      >
                        <div style={{ position: "relative", display: "inline-block", padding: "4px 16px" }}>

                          {isActive && (
                            <motion.div
                              layoutId="p3r-active-wedge"
                              initial={false}
                              transition={{ type: "spring", stiffness: 380, damping: 28 }}
                              style={wedgeBoxStyle}
                            >
                              <svg
                                viewBox="0 0 100 100"
                                preserveAspectRatio="none"
                                style={{ width: "100%", height: "100%", overflow: "visible" }}
                              >
                                <polygon points="1,10 0,88 94,95" fill="#E61E2B" />
                                <polygon points="5,2 2,80 100,90" fill="#FFFFFF" />
                              </svg>
                            </motion.div>
                          )}

                          <span style={{
                            ...textStyle,
                            position: "relative",
                            zIndex: 2,
                            color: isActive ? "#6E000A" : tone.color,
                            opacity: isActive ? 1 : tone.opacity,
                          }}>
                            {item.label}
                          </span>

                          {isActive && (
                            <div style={{
                              ...wedgeBoxStyle,
                              zIndex: 3,
                              clipPath: "polygon(5% 2%, 2% 80%, 100% 90%)",
                            }}>
                              <span style={{
                                ...textStyle,
                                position: "absolute",
                                left: "calc(16px + 4.8%)",
                                top: "calc(4px + 9.67742%)",
                                color: "#E61E2B",
                              }}>
                                {item.label}
                              </span>
                            </div>
                          )}

                        </div>
                      </div>
                    );
                  })}
                </nav>
              </div>

              {/* ── CONTROLS — bottom-right HUD (desktop only) ── */}
              {!isMobile && <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.5 }}
                style={{
                  position: "absolute",
                  bottom: 28, right: 36,
                  zIndex: 20,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                  gap: 7,
                  fontFamily: "var(--font-bebas), sans-serif",
                  pointerEvents: "none",
                }}
              >
                {[["↑↓", "NAVEGAR"], ["A", "CONFIRMAR"], ["ESC", "VOLVER"]].map(([key, label]) => (
                  <div key={key} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 16, letterSpacing: "0.18em", color: "rgba(220,240,255,0.55)" }}>
                    <span style={{ border: "1px solid rgba(220,240,255,0.4)", padding: "1px 8px", fontSize: 14, minWidth: 30, textAlign: "center" }}>{key}</span>
                    <span>{label}</span>
                  </div>
                ))}
              </motion.div>}

              {currentScreen === "menu" && (
                <div style={{
                  position: "absolute",
                  bottom: isMobile ? "calc(8px + var(--safe-bottom))" : 20,
                  left: isMobile ? 20 : 28,
                  zIndex: 20,
                  display: "flex",
                  flexDirection: "column",
                  gap: 3,
                  maxWidth: isMobile ? "74vw" : "min(46vw, 620px)",
                  fontFamily: "var(--font-bebas), sans-serif",
                  fontSize: isMobile ? 9 : 11,
                  letterSpacing: "0.12em",
                  lineHeight: 1.35,
                  color: "rgba(10,15,28,0.62)",
                  pointerEvents: "none",
                }}>
                  <span>Antioquia, Colombia (UTC-5) · Respuesta: Menos de 24 horas</span>
                  <span>© 2026 Andrxss (Jaime Andrés Parra Sánchez). Inspirado en Persona 3 Reload.</span>
                </div>
              )}
            </>
          )}

          {/* SCREENS */}
          <Suspense fallback={null}>
            {currentScreen === "about"   && <About onBack={backToMenu} />}
            {currentScreen === "resume"  && <Resume onBack={backToMenu} />}
            {currentScreen === "github"  && <Github onBack={backToMenu} />}
            {currentScreen === "socials"   && <Socials onBack={backToMenu} />}
            {currentScreen === "sideproj"  && <SideProjects onBack={backToMenu} />}
          </Suspense>

          {/* TRANSITION — key forces remount when variant changes */}
          {isTransitioning && (
            <Suspense fallback={null}>
              <Transition
                key={transitionVariant}
                variant={transitionVariant}
              />
            </Suspense>
          )}

        </>
      )}

    </main>
    </MotionConfig>
  );
}