import type { Metadata } from "next";
import { Anton, Bebas_Neue, Montserrat } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  variable: "--font-bebas",
  subsets: ["latin"],
  display: "swap",
});

const anton = Anton({
  weight: "400",
  variable: "--font-anton",
  subsets: ["latin"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

const persona = localFont({
  src: "../public/fonts/persona.woff2",
  variable: "--font-persona",
  display: "swap",
});

const siteUrl = "https://andrxsportfolio.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Andrxss | Desarrollador Full-Stack",
  description: "Portafolio de Jaime Andrés Parra Sánchez (Andrxss), desarrollador de software enfocado en aplicaciones web y móviles con Python, Django, JavaScript, Flutter y bases de datos SQL/NoSQL.",
  applicationName: "Portafolio de Andrxss",
  authors: [{ name: "Jaime Andrés Parra Sánchez" }],
  creator: "Jaime Andrés Parra Sánchez",
  keywords: ["Andrxss", "Jaime Andrés Parra Sánchez", "desarrollador full-stack", "Python", "Django", "JavaScript", "Flutter", "SQL", "NoSQL"],
  alternates: { canonical: siteUrl },
  openGraph: {
    title: "Andrxss | Desarrollador Full-Stack",
    description: "Portafolio de Jaime Andrés Parra Sánchez (Andrxss), desarrollador de software enfocado en aplicaciones web y móviles.",
    url: siteUrl,
    siteName: "Portafolio de Andrxss",
    locale: "es_CO",
    type: "website",
    images: [
      {
        url: "/og-cover.png",
        width: 1200,
        height: 630,
        alt: "Pantalla principal del portafolio de Andrxss",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Andrxss | Desarrollador Full-Stack",
    description: "Portafolio de Jaime Andrés Parra Sánchez (Andrxss), desarrollador de software enfocado en aplicaciones web y móviles.",
    images: [`${siteUrl}/og-cover.png`],
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${bebasNeue.variable} ${anton.variable} ${montserrat.variable} ${persona.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
