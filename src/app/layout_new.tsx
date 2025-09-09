import type { Metadata } from "next";
import { Playfair_Display, Poppins } from "next/font/google";
import "./globals.css";

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "600"],
});

export const metadata: Metadata = {
  title: "SemprePlena - Clinica de Estetica e Massoterapia | Em Breve",
  description:
    "Em breve: SemprePlena, sua nova clinica de estetica e massoterapia. Tratamentos de beleza, relaxamento e bem-estar. Cadastre-se para receber novidades em primeira mao.",
  keywords:
    "estetica, massoterapia, spa, beleza, bem-estar, relaxamento, tratamentos esteticos",
  authors: [{ name: "SemprePlena" }],
  openGraph: {
    title: "SemprePlena - Em Breve",
    description: "Sua clinica de estetica e massoterapia esta chegando!",
    type: "website",
    locale: "pt_BR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${playfairDisplay.variable} ${poppins.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
