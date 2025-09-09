import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SemprePlena - Clinica de Estetica e Massoterapia | Em Breve",
  description:
    "Em breve: SemprePlena, sua nova clinica de estetica e massoterapia. Tratamentos de beleza, relaxamento e bem-estar.",
  robots: "index, follow",
  keywords:
    "estética, massoterapia, spa, beleza, bem-estar, relaxamento, SemprePlena",
  authors: [{ name: "SemprePlena" }],
  openGraph: {
    title: "SemprePlena - Em Breve",
    description: "Sua nova clínica de estética e massoterapia está chegando!",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Poppins:wght@300;400;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
