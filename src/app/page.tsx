"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  // Função para aplicar máscara de telefone brasileiro
  const formatPhone = (value: string) => {
    // Remove tudo que não é número
    const numbers = value.replace(/\D/g, "");

    // Aplica a máscara baseado no tamanho
    if (numbers.length <= 2) {
      return `(${numbers}`;
    } else if (numbers.length <= 7) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    } else if (numbers.length <= 11) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(
        7
      )}`;
    } else {
      // Limita a 11 dígitos
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(
        7,
        11
      )}`;
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedPhone = formatPhone(e.target.value);
    setPhone(formattedPhone);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      setMessage("Por favor, digite um e-mail válido");
      setIsSuccess(false);
      return;
    }

    if (!phone || phone.replace(/\D/g, "").length < 10) {
      setMessage("Por favor, digite um WhatsApp válido com DDD");
      setIsSuccess(false);
      return;
    }

    setIsLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, phone }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(
          "✨ Dados cadastrados com sucesso! Você será avisado(a) em primeira mão!"
        );
        setIsSuccess(true);
        setEmail("");
        setPhone("");
      } else {
        setMessage(data.error || "Erro ao cadastrar e-mail");
        setIsSuccess(false);
      }
    } catch (error) {
      setMessage("Erro de conexão. Tente novamente.");
      setIsSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f3d9d1",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "#9c7a47",
        textAlign: "center",
        padding: "clamp(10px, 3vw, 20px)",
        position: "relative",
        overflow: "hidden",
        backgroundImage: `
        linear-gradient(rgba(243, 217, 209, 0.85), rgba(243, 217, 209, 0.85)),
        url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80')
      `,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: isMobile ? "scroll" : "fixed",
      }}
    >
      {/* Overlay adicional com gradientes para melhor legibilidade */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
          radial-gradient(circle at 20% 80%, rgba(156, 122, 71, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(243, 217, 209, 0.2) 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, rgba(156, 122, 71, 0.05) 0%, transparent 50%)
        `,
          pointerEvents: "none",
        }}
      />
      {/* Partículas flutuantes elegantes */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: "none",
        }}
      >
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="floating-element"
            style={{
              position: "absolute",
              top: `${10 + i * 15}%`,
              left: `${5 + i * 12}%`,
              width: `${3 + (i % 3)}px`,
              height: `${3 + (i % 3)}px`,
              borderRadius: "50%",
              backgroundColor: `rgba(156, 122, 71, ${0.2 + (i % 3) * 0.1})`,
              boxShadow: `0 0 ${8 + (i % 3) * 4}px rgba(156, 122, 71, 0.3)`,
              animation: `subtleFloat ${5 + i}s ease-in-out infinite`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </div>

      {/* Logo principal */}
      <div
        style={{
          marginBottom: "20px",
          borderRadius: "12px",
          width: "min(180px, 45vw)",
          height: "min(180px, 45vw)",
          maxWidth: "180px",
          maxHeight: "180px",
          position: "relative",
          zIndex: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src="/logo.png"
          alt="SemprePlena - Logo"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            filter: "drop-shadow(0 6px 12px rgba(156, 122, 71, 0.2))",
          }}
        />
      </div>

      <h1
        className="shimmer"
        style={{
          fontSize: "clamp(2.5rem, 8vw, 4rem)",
          fontWeight: "bold",
          marginBottom: "20px",
          textShadow: "2px 2px 4px rgba(156, 122, 71, 0.3)",
          position: "relative",
          zIndex: 10,
        }}
      >
        EM BREVE
      </h1>

      <h2
        style={{
          fontSize: "clamp(1.5rem, 6vw, 2rem)",
          marginBottom: "20px",
          position: "relative",
          zIndex: 10,
        }}
      >
        SEMPRE PLENA
      </h2>

      <p
        style={{
          fontSize: "clamp(1rem, 4vw, 1.2rem)",
          maxWidth: "90%",
          lineHeight: "1.6",
          opacity: 0.8,
          position: "relative",
          zIndex: 10,
          margin: "0 auto 30px auto",
        }}
      >
        Sua clínica de estética e massoterapia está chegando para transformar
        sua experiência de bem-estar e beleza.
      </p>

      {/* CTA PRINCIPAL - MOVED TO TOP */}
      <div
        style={{
          marginTop: "clamp(20px, 5vw, 30px)",
          marginBottom: "clamp(30px, 6vw, 50px)",
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          alignItems: "center",
          position: "relative",
          zIndex: 10,
          padding: "0 20px",
          width: "100%",
          maxWidth: "450px",
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: "10px",
            padding: "20px",
            backgroundColor: "rgba(255, 255, 255, 0.15)",
            borderRadius: "20px",
            border: "2px solid rgba(156, 122, 71, 0.3)",
            backdropFilter: "blur(10px)",
            boxShadow: "0 8px 25px rgba(156, 122, 71, 0.15)",
          }}
        >
          <p
            style={{
              fontSize: "clamp(1.1rem, 4vw, 1.3rem)",
              fontWeight: "600",
              color: "#9c7a47",
              margin: "0 0 10px 0",
              lineHeight: "1.3",
            }}
          >
            🎁 <strong>Seja a primeira a saber!</strong>
          </p>
          <p
            style={{
              fontSize: "clamp(0.9rem, 3.5vw, 1rem)",
              color: "#9c7a47",
              margin: "0",
              opacity: 0.9,
              lineHeight: "1.4",
            }}
          >
            Receba em <strong>primeira mão</strong> nossos tratamentos
            exclusivos, promoções especiais e dicas de beleza! ✨
          </p>
        </div>

        {message && (
          <div
            style={{
              padding: "15px 25px",
              borderRadius: "20px",
              backgroundColor: isSuccess
                ? "linear-gradient(135deg, rgba(76, 175, 80, 0.15) 0%, rgba(129, 199, 132, 0.15) 100%)"
                : "linear-gradient(135deg, rgba(244, 67, 54, 0.15) 0%, rgba(239, 83, 80, 0.15) 100%)",
              border: `2px solid ${isSuccess ? "#4CAF50" : "#F44336"}`,
              color: isSuccess ? "#2E7D32" : "#C62828",
              fontSize: "clamp(0.9rem, 3.5vw, 1rem)",
              textAlign: "center",
              maxWidth: "100%",
              boxShadow: `0 8px 25px ${
                isSuccess ? "rgba(76, 175, 80, 0.2)" : "rgba(244, 67, 54, 0.2)"
              }`,
              fontWeight: "600",
              animation: "fadeInUp 0.5s ease-out",
            }}
          >
            {isSuccess ? (
              <div>
                <div style={{ fontSize: "1.5em", marginBottom: "5px" }}>🎉</div>
                <div>
                  <strong>Perfeito!</strong> Você foi cadastrada com sucesso!
                </div>
                <div
                  style={{ fontSize: "0.9em", marginTop: "5px", opacity: 0.8 }}
                >
                  Em breve você receberá nossas novidades exclusivas! 💌
                </div>
              </div>
            ) : (
              message
            )}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            gap: "10px",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="💌 Seu melhor e-mail"
            disabled={isLoading}
            style={{
              padding: "clamp(12px, 4vw, 16px) clamp(20px, 5vw, 24px)",
              borderRadius: "30px",
              border: "2px solid rgba(156, 122, 71, 0.3)",
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              color: "#9c7a47",
              textAlign: "center",
              outline: "none",
              width: "100%",
              maxWidth: "350px",
              fontSize: "clamp(1rem, 4vw, 1.1rem)",
              opacity: isLoading ? 0.7 : 1,
              cursor: isLoading ? "not-allowed" : "text",
              transition: "all 0.3s ease",
              boxShadow: "0 4px 15px rgba(156, 122, 71, 0.1)",
              backdropFilter: "blur(10px)",
            }}
            onFocus={(e) => {
              const target = e.target as HTMLInputElement;
              target.style.border = "2px solid #FF6B6B";
              target.style.boxShadow = "0 8px 25px rgba(255, 107, 107, 0.2)";
              target.style.transform = "translateY(-2px)";
            }}
            onBlur={(e) => {
              const target = e.target as HTMLInputElement;
              target.style.border = "2px solid rgba(156, 122, 71, 0.3)";
              target.style.boxShadow = "0 4px 15px rgba(156, 122, 71, 0.1)";
              target.style.transform = "translateY(0)";
            }}
          />
          <input
            type="tel"
            value={phone}
            onChange={handlePhoneChange}
            placeholder="📱 Seu WhatsApp (61) 98888-7777"
            disabled={isLoading}
            style={{
              padding: "clamp(12px, 4vw, 16px) clamp(20px, 5vw, 24px)",
              borderRadius: "30px",
              border: "2px solid rgba(156, 122, 71, 0.3)",
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              color: "#9c7a47",
              textAlign: "center",
              outline: "none",
              width: "100%",
              maxWidth: "350px",
              fontSize: "clamp(1rem, 4vw, 1.1rem)",
              opacity: isLoading ? 0.7 : 1,
              cursor: isLoading ? "not-allowed" : "text",
              transition: "all 0.3s ease",
              boxShadow: "0 4px 15px rgba(156, 122, 71, 0.1)",
              backdropFilter: "blur(10px)",
            }}
            onFocus={(e) => {
              const target = e.target as HTMLInputElement;
              target.style.border = "2px solid #FF6B6B";
              target.style.boxShadow = "0 8px 25px rgba(255, 107, 107, 0.2)";
              target.style.transform = "translateY(-2px)";
            }}
            onBlur={(e) => {
              const target = e.target as HTMLInputElement;
              target.style.border = "2px solid rgba(156, 122, 71, 0.3)";
              target.style.boxShadow = "0 4px 15px rgba(156, 122, 71, 0.1)";
              target.style.transform = "translateY(0)";
            }}
          />
          <button
            type="submit"
            disabled={isLoading}
            style={{
              padding: "clamp(16px, 5vw, 24px) clamp(32px, 8vw, 48px)",
              borderRadius: "50px",
              border: "none",
              background: isLoading
                ? "linear-gradient(135deg, #ccc 0%, #999 100%)"
                : "linear-gradient(135deg, #FF6B6B 0%, #FF8E8E 25%, #FFB6B6 50%, #FF8E8E 75%, #FF6B6B 100%)",
              backgroundSize: isLoading ? "100% 100%" : "200% 100%",
              color: "#fff",
              fontWeight: "800",
              cursor: isLoading ? "not-allowed" : "pointer",
              fontSize: "clamp(1.1rem, 4.5vw, 1.4rem)",
              transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
              opacity: isLoading ? 0.6 : 1,
              letterSpacing: "0.5px",
              position: "relative",
              overflow: "hidden",
              boxShadow: isLoading
                ? "0 4px 15px rgba(0,0,0,0.1)"
                : "0 15px 35px rgba(255, 107, 107, 0.4), 0 5px 15px rgba(255, 107, 107, 0.2)",
              transform: isLoading ? "none" : "translateY(-3px)",
              textShadow: "0 2px 4px rgba(0,0,0,0.3)",
              animation: isLoading
                ? "none"
                : "shimmer-bg 3s ease-in-out infinite",
              width: "100%",
              maxWidth: "350px",
            }}
            onMouseEnter={(e) => {
              if (!isLoading) {
                const target = e.target as HTMLButtonElement;
                target.style.transform = "translateY(-6px) scale(1.02)";
                target.style.boxShadow =
                  "0 25px 50px rgba(255, 107, 107, 0.5), 0 10px 25px rgba(255, 107, 107, 0.3)";
                target.style.backgroundPosition = "100% 0";
              }
            }}
            onMouseLeave={(e) => {
              if (!isLoading) {
                const target = e.target as HTMLButtonElement;
                target.style.transform = "translateY(-3px) scale(1)";
                target.style.boxShadow =
                  "0 15px 35px rgba(255, 107, 107, 0.4), 0 5px 15px rgba(255, 107, 107, 0.2)";
                target.style.backgroundPosition = "0% 0";
              }
            }}
          >
            <span
              style={{
                position: "relative",
                zIndex: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
              }}
            >
              {isLoading ? (
                <>
                  <span
                    style={{
                      animation: "spin 1s linear infinite",
                      display: "inline-block",
                    }}
                  >
                    ⏳
                  </span>
                  Cadastrando...
                </>
              ) : (
                <>
                  <span style={{ fontSize: "1.2em" }}>🎯</span>
                  SIM! Quero ser avisada
                  <span style={{ fontSize: "1.2em" }}>✨</span>
                </>
              )}
            </span>

            {!isLoading && (
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: "-100%",
                  width: "100%",
                  height: "100%",
                  background:
                    "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
                  animation: "shine 2.5s ease-in-out infinite",
                  zIndex: 1,
                }}
              />
            )}
          </button>
        </form>
      </div>

      <div
        style={{
          marginTop: "clamp(20px, 5vw, 40px)",
          display: "flex",
          gap: "clamp(10px, 3vw, 20px)",
          flexWrap: "wrap",
          justifyContent: "center",
          position: "relative",
          zIndex: 10,
          padding: "0 10px",
        }}
      >
        {[
          "✨ Tratamentos Estéticos",
          "💆‍♀️ Massoterapia",
          "🌸 Relaxamento",
          "💎 Beleza Natural",
        ].map((service, index) => (
          <div
            key={index}
            style={{
              padding: "clamp(8px, 2vw, 10px) clamp(15px, 4vw, 20px)",
              border: "2px solid #9c7a47",
              borderRadius: "25px",
              backgroundColor: "rgba(255, 255, 255, 0.3)",
              transition: "transform 0.3s ease",
              cursor: "pointer",
              fontSize: "clamp(0.8rem, 3vw, 1rem)",
            }}
          >
            {service}
          </div>
        ))}
      </div>

      {/* Seção de Contatos */}
      <div
        style={{
          marginTop: "60px",
          width: "100%",
          textAlign: "center",
          position: "relative",
          zIndex: 10,
        }}
      >
        <h2
          style={{
            fontSize: "clamp(1.5rem, 5vw, 2rem)",
            fontWeight: "300",
            color: "#9c7a47",
            marginBottom: "30px",
            textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
          }}
        >
          Entre em Contato
        </h2>

        <div
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            gap: "30px",
            alignItems: "stretch",
            justifyContent: "center",
            maxWidth: "1000px",
            margin: "0 auto",
            padding: "0 20px",
          }}
        >
          {/* Informações de Contato */}
          <div
            style={{
              flex: 1,
              backgroundColor: "rgba(255, 255, 255, 0.15)",
              borderRadius: "20px",
              padding: "40px 30px",
              border: "2px solid rgba(156, 122, 71, 0.3)",
              boxShadow: "0 8px 25px rgba(156, 122, 71, 0.15)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              minHeight: "300px",
              backdropFilter: "blur(10px)",
            }}
          >
            <h3
              style={{
                fontSize: "clamp(1.3rem, 4vw, 1.5rem)",
                color: "#9c7a47",
                marginBottom: "25px",
                fontWeight: "600",
                textAlign: "center",
              }}
            >
              Débora Massoterapeuta
            </h3>

            <div style={{ marginBottom: "20px", textAlign: "center" }}>
              <p
                style={{
                  margin: "8px 0",
                  fontSize: "clamp(0.95rem, 3.5vw, 1.1rem)",
                  color: "#9c7a47",
                }}
              >
                📱 <strong>WhatsApp:</strong>
              </p>
              <a
                href="https://wa.me/5561998044594"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "#25D366",
                  textDecoration: "none",
                  fontWeight: "bold",
                  fontSize: "clamp(1rem, 3.5vw, 1.2rem)",
                  display: "inline-block",
                  padding: "8px 15px",
                  backgroundColor: "rgba(37, 211, 102, 0.1)",
                  borderRadius: "15px",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  const target = e.target as HTMLAnchorElement;
                  target.style.backgroundColor = "rgba(37, 211, 102, 0.2)";
                  target.style.transform = "scale(1.05)";
                }}
                onMouseLeave={(e) => {
                  const target = e.target as HTMLAnchorElement;
                  target.style.backgroundColor = "rgba(37, 211, 102, 0.1)";
                  target.style.transform = "scale(1)";
                }}
              >
                (61) 99804-4594
              </a>
            </div>

            <div style={{ marginBottom: "20px", textAlign: "center" }}>
              <p
                style={{
                  margin: "8px 0",
                  fontSize: "clamp(0.95rem, 3.5vw, 1.1rem)",
                  color: "#9c7a47",
                }}
              >
                📷 <strong>Instagram:</strong>
              </p>
              <a
                href="https://instagram.com/_deboramassoterapeuta"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "#E4405F",
                  textDecoration: "none",
                  fontWeight: "bold",
                  fontSize: "clamp(1rem, 3.5vw, 1.2rem)",
                  display: "inline-block",
                  padding: "8px 15px",
                  backgroundColor: "rgba(228, 64, 95, 0.1)",
                  borderRadius: "15px",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  const target = e.target as HTMLAnchorElement;
                  target.style.backgroundColor = "rgba(228, 64, 95, 0.2)";
                  target.style.transform = "scale(1.05)";
                }}
                onMouseLeave={(e) => {
                  const target = e.target as HTMLAnchorElement;
                  target.style.backgroundColor = "rgba(228, 64, 95, 0.1)";
                  target.style.transform = "scale(1)";
                }}
              >
                @_deboramassoterapeuta
              </a>
            </div>

            <div style={{ textAlign: "center" }}>
              <p
                style={{
                  margin: "8px 0",
                  fontSize: "clamp(0.95rem, 3.5vw, 1.1rem)",
                  color: "#9c7a47",
                  fontWeight: "bold",
                }}
              >
                📍 <strong>Endereço:</strong>
              </p>
              <p
                style={{
                  margin: "8px 0",
                  fontSize: "clamp(0.9rem, 3vw, 1rem)",
                  color: "#9c7a47",
                  opacity: 0.9,
                  lineHeight: "1.4",
                }}
              >
                Linea Vitta Centro Clínico
                <br />
                Asa Sul, Brasília - DF
              </p>
            </div>
          </div>

          {/* Mapa */}
          <div
            style={{
              flex: 1,
              borderRadius: "20px",
              overflow: "hidden",
              border: "2px solid rgba(156, 122, 71, 0.3)",
              minHeight: "300px",
              boxShadow: "0 8px 25px rgba(156, 122, 71, 0.15)",
            }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d959.5785128412124!2d-47.92046711307146!3d-15.8400829900102!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x935a255f35d1d99b%3A0x7d563ecd6199802e!2sLinea%20Vitta!5e0!3m2!1spt-BR!2sbr!4v1757360988065!5m2!1spt-BR!2sbr"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "300px" }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localização Linea Vitta Centro Clínico"
            ></iframe>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          marginTop: "60px",
          paddingTop: "20px",
          borderTop: "1px solid rgba(156, 122, 71, 0.2)",
          width: "100%",
          textAlign: "center",
          position: "relative",
          zIndex: 10,
        }}
      >
        <p
          style={{
            fontSize: "0.9rem",
            opacity: 0.6,
            margin: "0",
          }}
        >
          © 2025 SemprePlena - Em breve, mais beleza e bem-estar para você
        </p>
      </div>
    </div>
  );
}
