# Inventario de recursos visuales

**Proyecto:** Portafolio Andrxss  
**Propietario:** Jaime Andrés Parra Sánchez  
**Tema:** Persona 3 Reload

Este archivo resume los recursos visuales usados por la interfaz y su procedencia. Los recursos de Persona son © Atlus / Sega y se usan con fines personales y no comerciales.

## Recursos propios del portafolio

| Ruta | Uso |
|---|---|
| `public/favicon.svg` | Icono del sitio, letra `A` roja y blanca sobre azul marino |
| `public/og-cover.png` | Portada social 1200x630 |
| `public/images/about-makoto.webp` | Retrato usado en el diálogo de `About.tsx` |
| `public/images/p5-logo.webp` | Distintivo del diálogo de Makoto |
| `public/projects/carely-1.webp` | Captura de Carely |
| `public/projects/carely-2.webp` | Captura de Carely |
| `public/projects/anime-cli-1.webp` | Captura de Anime CLI |
| `public/projects/README.md` | Listado de capturas esperadas |

Si una captura de proyecto no existe, `Resume.tsx` muestra un marcador de posición limpio con el nombre del proyecto.

## Recursos de Persona

| Ruta | Uso |
|---|---|
| `public/videos/menu.mp4` | Vídeo base del menú |
| `public/videos/menu-intro.mp4` | Introducción del menú |
| `public/videos/skills.mp4` | Fondo de currículum y proyectos secundarios |
| `public/videos/status.enhanced.mp4` | Fondo de enlaces |
| `public/videos/equip.mp4` | Fondo de GitHub |
| `public/posters/*.webp` | Primer frame de cada vídeo; se usa en transiciones y mientras el vídeo se decodifica |
| `public/images/char1.webp` | Recorte de personaje en GitHub |
| `public/images/icon1.png` | Icono de la barra de GitHub |
| `public/images/shards/*.png` | Fragmentos de color de los enlaces |
| `public/fonts/persona.woff2` | Tipografía del cartel de carga |
| `public/sfx/*.wav` | Sonidos de navegación y confirmación |

## Sustitución

Para reutilizar el proyecto con recursos propios:

1. Reemplaza los vídeos y retratos en `public/videos` y `public/images`.
2. Reemplaza las tipografías de Persona en `app/globals.css`.
3. Actualiza `public/favicon.svg` y `public/og-cover.png`.
4. Coloca las capturas reales en `public/projects` respetando los nombres del README.
