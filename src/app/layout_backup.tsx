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
  title: "SemprePlena - Cl�nica de Est�tica e Massoterapia | Em Breve",
  description: "Em breve: SemprePlena, sua nova cl�nica de est�tica e massoterapia. Tratamentos de beleza, relaxamento e bem-estar. Cadastre-se para receber novidades em primeira m�o.",
  keywords: "est�tica, massoterapia, spa, beleza, bem-estar, relaxamento, tratamentos est�ticos",
  authors: [{ name: "SemprePlena" }],
  openGraph: {
    title: "SemprePlena - Em Breve",
    description: "Sua cl�nica de est�tica e massoterapia est� chegando!",
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
