import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Anton&family=Montserrat:wght@300&family=Playfair+Display:ital,wght@1,700;1,900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
