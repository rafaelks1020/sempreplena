"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{ backgroundColor: "#f3d9d1" }}
    >
      {/* Elementos flutuantes decorativos */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="floating-element"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
            }}
          />
        ))}
      </div>

      {/* Conteúdo principal */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        {/* Logo/Imagem principal */}
        <div className="mb-8 animate-fadeInUp">
          <div className="relative w-80 h-80 rounded-full overflow-hidden shadow-2xl animate-pulse-custom">
            <Image
              src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
              alt="Spa e Estética"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20"></div>
          </div>
        </div>

        {/* Título principal */}
        <div
          className="mb-6 animate-fadeInUp"
          style={{ animationDelay: "0.3s" }}
        >
          <h1
            className="text-6xl md:text-8xl font-bold mb-4 shimmer"
            style={{
              color: "#9c7a47",
              fontFamily: "'Playfair Display', serif",
              textShadow: "2px 2px 4px rgba(156, 122, 71, 0.3)",
            }}
          >
            EM BREVE
          </h1>
        </div>

        {/* Subtítulo */}
        <div
          className="mb-8 animate-fadeInUp"
          style={{ animationDelay: "0.6s" }}
        >
          <h2
            className="text-2xl md:text-4xl font-light mb-4"
            style={{ color: "#9c7a47" }}
          >
            SEMPRE PLENA
          </h2>
          <p
            className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
            style={{ color: "#9c7a47", opacity: 0.8 }}
          >
            Sua clínica de estética e massoterapia está chegando para
            transformar sua experiência de bem-estar e beleza.
          </p>
        </div>

        {/* Características/Serviços */}
        <div
          className="mb-8 animate-fadeInUp"
          style={{ animationDelay: "0.9s" }}
        >
          <div className="flex flex-wrap justify-center gap-6 text-sm md:text-base">
            {[
              "? Tratamentos Estéticos",
              "????? Massoterapia",
              "?? Relaxamento",
              "?? Beleza Natural",
            ].map((service, index) => (
              <div
                key={index}
                className="px-4 py-2 rounded-full border-2 hover:scale-105 transition-transform duration-300"
                style={{
                  borderColor: "#9c7a47",
                  color: "#9c7a47",
                  backgroundColor: "rgba(255, 255, 255, 0.3)",
                }}
              >
                {service}
              </div>
            ))}
          </div>
        </div>

        {/* Call to action */}
        <div className="animate-fadeInUp" style={{ animationDelay: "1.2s" }}>
          <p className="text-lg mb-6" style={{ color: "#9c7a47" }}>
            Cadastre-se para receber novidades em primeira mão
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <input
              type="email"
              placeholder="Seu melhor e-mail"
              className="px-6 py-3 rounded-full text-center border-2 bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all duration-300"
              style={{
                borderColor: "#9c7a47",
                color: "#9c7a47",
              }}
            />
            <button
              className="px-8 py-3 rounded-full font-semibold hover:scale-105 transition-all duration-300 shadow-lg"
              style={{
                backgroundColor: "#9c7a47",
                color: "#f3d9d1",
              }}
            >
              Quero ser avisado(a)
            </button>
          </div>
        </div>

        {/* Redes sociais */}
        <div
          className="mt-12 animate-fadeInUp"
          style={{ animationDelay: "1.5s" }}
        >
          <p
            className="mb-4 text-sm"
            style={{ color: "#9c7a47", opacity: 0.7 }}
          >
            Siga-nos nas redes sociais
          </p>
          <div className="flex gap-6 justify-center">
            {["??", "??", "??"].map((icon, index) => (
              <div
                key={index}
                className="w-12 h-12 rounded-full flex items-center justify-center text-xl cursor-pointer hover:scale-110 transition-transform duration-300 shadow-lg"
                style={{
                  backgroundColor: "rgba(156, 122, 71, 0.1)",
                  border: "2px solid #9c7a47",
                }}
              >
                {icon}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Rodapé */}
      <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
        <p className="text-sm" style={{ color: "#9c7a47", opacity: 0.6 }}>
          © 2025 SemprePlena - Em breve, mais beleza e bem-estar para você
        </p>
      </div>
    </div>
  );
}
