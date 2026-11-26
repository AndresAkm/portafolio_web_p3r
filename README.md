<div align="center">

# Andrxss — Portafolio Persona

### Portafolio personal construido como el menú principal de **Persona 3 Reload**.

[![Sitio en vivo](https://img.shields.io/badge/live-andrxsportfolio.vercel.app-48d2ff?style=for-the-badge)](https://andrxsportfolio.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Licencia MIT](https://img.shields.io/badge/c%C3%B3digo-MIT-e8002d?style=for-the-badge)](LICENSE)

*Interfaz editorial, minimalista y tematizada con el menú más limpio del género.*

</div>

---

> Proyecto de fan. El código está bajo licencia MIT; los recursos de Persona, arte, tipografías, música y vídeo son © Atlus / Sega y no están incluidos en esa licencia.

---

## Qué es

Un sitio de una sola página que funciona como el menú de Persona 3 Reload: nombre diagonal, HUD de estado, navegación inclinada y vistas completas para **Acerca de**, **Currículum**, **Proyectos** y **Enlaces**.

| | |
|---|---|
| Interfaz P3R | Navegación inclinada, panel rojo activo, HUD y efectos de sonido |
| Currículum editable | Bloques de datos al inicio de `components/Resume.tsx` |
| Diálogo Persona | `About.tsx` muestra a Makoto con efecto máquina de escribir |
| Enlaces animados | Colores por enlace y partículas de shattered glass |
| Sin dependencias de interfaz | Solo Next.js + framer-motion; el diseño vive en los componentes |

Makoto aparece como homenaje personal dentro del diálogo; el contenido del portafolio corresponde a Jaime Andrés Parra Sánchez.

---

## Tecnologías

- **Next.js 16** (App Router) y **React 19**
- **TypeScript**
- **framer-motion**
- **Tailwind CSS v4**
- Despliegue en **Vercel**: `https://andrxsportfolio.vercel.app`

---

## Ejecutar

```powershell
npm install
npm run dev
```

La aplicación queda en `http://localhost:3000`.

> Comprueba el diseño al 100% de zoom: casi todas las medidas usan `vw`/`vh` para conservar la composición 16:9.

---

## Estructura

```text
app/
  layout.tsx                 metadata, idioma, fuentes y Open Graph
  globals.css                estilos globales y prefers-reduced-motion
  page.tsx                   monta el menú
components/
  Menu.tsx                   composición principal del menú
  About.tsx                  diálogo de Makoto
  Resume.tsx                 experiencia, habilidades, educación y proyectos
  Socials.tsx                enlaces profesionales y de contacto
  Github.tsx                 tarjeta de GitHub
  Sideprojects.tsx           pantalla de próximamente
  Transition.tsx             transiciones entre pantallas
  useIsMobile.ts             detección de móvil
  usePrefersReducedMotion.ts detección de movimiento reducido
public/
  favicon.svg                icono Andrxss
  og-cover.png               portada social 1200x630
  projects/                  capturas y README de proyectos
```

---

## Datos del propietario

- **Nombre:** Jaime Andrés Parra Sánchez
- **Alias:** Andrxss
- **Perfil:** Desarrollador Full-Stack Junior (Web & Mobile)
- **GitHub:** [@AndresAkm](https://github.com/AndresAkm)
- **LinkedIn:** [Jaime Andrés Parra Sánchez](https://www.linkedin.com/in/jaime-andr%C3%A9s-parra-sanchez-365586378/)
- **Instagram:** [@andres_akm_](https://www.instagram.com/andres_akm_)
- **Correo:** jaym3gd2431@gmail.com

---

## Recursos y créditos

Los recursos visuales y sonoros de Persona se usan con fines personales y no comerciales. Si vas a reutilizar este proyecto, reemplázalos por recursos propios o con licencia.

---

## Licencia

El código se distribuye bajo [MIT License](LICENSE). Los recursos de Persona quedan excluidos de esa licencia.
