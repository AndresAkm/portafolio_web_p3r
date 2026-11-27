# Andrxss — Estado del proyecto

**Última actualización:** 2026-11-25

## Estado actual

Portafolio de Jaime Andrés Parra Sánchez con estética de Persona 3 Reload. Todos los datos visibles de la plantilla fueron reemplazados por información real de Andrxss.

- **Sitio:** `https://andrxsportfolio.vercel.app`
- **Repositorio de código:** `https://github.com/AndresAkm`
- **Stack:** Next.js 16.2.6, React 19.2.4, TypeScript 5, Tailwind CSS v4 y framer-motion.
- **Idioma:** español en todo el contenido visible. Se conservan marcas técnicas y el titular `Andrxss' / portafolio`.
- **Accesibilidad:** `MotionConfig reducedMotion="user"`, hook `usePrefersReducedMotion` y media query global para `prefers-reduced-motion`. Los vídeos dejan de reproducirse automáticamente cuando el usuario prefiere menos movimiento.
- **Responsive:** cada sub-pantalla tiene una rama móvil propia con `useIsMobile()` (<=768px), scroll interno, botones táctiles amplios, tipografía `clamp` y `env(safe-area-inset-bottom)`. El diseño de escritorio permanece en su rama original. `Github` ahora recibe `onBack`, así que también tiene salida táctil.
- **Vídeos en móvil:** en móvil se evita la precarga completa de `menu.mp4` y `menu-intro.mp4`; se usa `preload="metadata"` y un crop vertical consistente vía `[data-mobile-bg]`. Con `prefers-reduced-motion`, los vídeos no se precargan ni se reproducen. Las URLs blob se liberan al desmontar/cambiar de breakpoint.

## Contenido

- **Menú:** HUD con `ENFOQUE ACTUAL -> FULL-STACK DEV` y `ESTADO -> PRACTICANTE EN TECNOPARQUE`; controles `↑↓ NAVEGAR`, `A CONFIRMAR`, `ESC VOLVER`; footer con Antioquia, Colombia (UTC-5), respuesta en menos de 24 horas y copyright.
- **Acerca de:** Makoto presenta cinco páginas de texto real sin emojis ni arte ASCII; máquina de escribir rápida y salto directo al texto con movimiento reducido.
- **Currículum:** trayectoria independiente/formativa, habilidades por categoría, educación del SENA, tres proyectos destacados con capturas y enlaces, y ranura de currículum PDF en `PRÓXIMAMENTE`.
- **Enlaces:** LinkedIn, GitHub, Instagram, correo y ranura de currículum PDF deshabilitada.
- **Proyectos secundarios:** pantalla `PRÓXIMAMENTE` conservada con vídeo `skills.mp4`.

## Título diagonal

Especificación vigente en `components/Menu.tsx`:

- Contenedor: `top:calc(4% - 4px); left:4%`.
- Dos líneas: `Andrxss'` / `portafolio` en Anton 400.
- Segunda línea con `marginLeft:30px` en escritorio y `24px` en móvil.
- Tipografía `clamp(3.8rem, 7vw, 6.8rem)` en escritorio y `clamp(2.16rem, 9vw, 3.2rem)` en móvil.
- `letterSpacing:-0.02em`, `lineHeight:0.86`, `rotate(24deg)` desde `top left`.
- Entrada escalonada con 0.08s de diferencia entre líneas.

## Recursos creados

- `public/favicon.svg`: letra `A` roja y blanca sobre azul marino.
- `public/og-cover.png`: portada 1200x630 con identidad Andrxss.
- `public/projects/README.md`: nombres de capturas esperadas y nota de portada social.

## Verificación

- `npm run build`: correcto. Compila TypeScript y genera las rutas estáticas `/` y `/_not-found`.
- `npm run lint`: 14 problemas, 6 errores y 8 avisos. Los errores están en `components/Menu.tsx` y son heredados de la lógica previa de audio/vídeo (`setState` dentro de effects y acceso a refs durante render). No aparecen errores nuevos en las secciones reescritas.
- No quedan referencias a datos de la plantilla anterior en archivos `ts`, `tsx`, `md`, `json`, `svg` ni `css`.
