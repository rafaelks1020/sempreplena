"use client";

import { useEffect, useState } from 'react';

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      setMessage('Por favor, digite um e-mail válido');
      setIsSuccess(false);
      return;
    }

    setIsLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('✨ E-mail cadastrado com sucesso! Você será avisado(a) em primeira mão!');
        setIsSuccess(true);
        setEmail('');
      } else {
        setMessage(data.error || 'Erro ao cadastrar e-mail');
        setIsSuccess(false);
      }
    } catch (error) {
      setMessage('Erro de conexão. Tente novamente.');
      setIsSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#f3d9d1',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#9c7a47',
      textAlign: 'center',
      padding: 'clamp(10px, 3vw, 20px)',
      position: 'relative',
      overflow: 'hidden',
      backgroundImage: `
        linear-gradient(rgba(243, 217, 209, 0.85), rgba(243, 217, 209, 0.85)),
        url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80')
      `,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: isMobile ? 'scroll' : 'fixed'
    }}>
      {/* Overlay adicional com gradientes para melhor legibilidade */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `
          radial-gradient(circle at 20% 80%, rgba(156, 122, 71, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(243, 217, 209, 0.2) 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, rgba(156, 122, 71, 0.05) 0%, transparent 50%)
        `,
        pointerEvents: 'none'
      }} />
      {/* Partículas flutuantes elegantes */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: 'none'
      }}>
        {[...Array(6)].map((_, i) => (
          <div 
            key={i}
            className="floating-element"
            style={{
              position: 'absolute',
              top: `${10 + (i * 15)}%`,
              left: `${5 + (i * 12)}%`,
              width: `${3 + (i % 3)}px`,
              height: `${3 + (i % 3)}px`,
              borderRadius: '50%',
              backgroundColor: `rgba(156, 122, 71, ${0.2 + (i % 3) * 0.1})`,
              boxShadow: `0 0 ${8 + (i % 3) * 4}px rgba(156, 122, 71, 0.3)`,
              animation: `subtleFloat ${5 + i}s ease-in-out infinite`,
              animationDelay: `${i * 0.5}s`
            }} 
          />
        ))}
      </div>

      {/* Imagem principal do spa */}
      <div style={{
        marginBottom: '30px',
        borderRadius: '50%',
        overflow: 'hidden',
        width: 'min(300px, 70vw)',
        height: 'min(300px, 70vw)',
        maxWidth: '300px',
        maxHeight: '300px',
        boxShadow: '0 20px 40px rgba(156, 122, 71, 0.3)',
        border: '5px solid rgba(156, 122, 71, 0.2)',
        position: 'relative',
        zIndex: 10
      }}>
        <img 
          src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
          alt="Spa e Estética - SemprePlena"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
      </div>

      <h1 className="shimmer" style={{ 
        fontSize: 'clamp(2.5rem, 8vw, 4rem)', 
        fontWeight: 'bold',
        marginBottom: '20px',
        textShadow: '2px 2px 4px rgba(156, 122, 71, 0.3)',
        position: 'relative',
        zIndex: 10
      }}>
        EM BREVE
      </h1>
      
      <h2 style={{ 
        fontSize: 'clamp(1.5rem, 6vw, 2rem)',
        marginBottom: '20px',
        position: 'relative',
        zIndex: 10
      }}>
        SEMPREPLENA
      </h2>
      
      <p style={{ 
        fontSize: 'clamp(1rem, 4vw, 1.2rem)',
        maxWidth: '90%',
        lineHeight: '1.6',
        opacity: 0.8,
        position: 'relative',
        zIndex: 10,
        margin: '0 auto'
      }}>
        Sua clínica de estética e massoterapia está chegando para transformar 
        sua experiência de bem-estar e beleza.
      </p>
      
      <div style={{ 
        marginTop: 'clamp(20px, 5vw, 40px)',
        display: 'flex',
        gap: 'clamp(10px, 3vw, 20px)',
        flexWrap: 'wrap',
        justifyContent: 'center',
        position: 'relative',
        zIndex: 10,
        padding: '0 10px'
      }}>
        {['✨ Tratamentos Estéticos', '💆‍♀️ Massoterapia', '🌸 Relaxamento', '💎 Beleza Natural'].map((service, index) => (
          <div key={index} style={{ 
            padding: 'clamp(8px, 2vw, 10px) clamp(15px, 4vw, 20px)',
            border: '2px solid #9c7a47',
            borderRadius: '25px',
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
            transition: 'transform 0.3s ease',
            cursor: 'pointer',
            fontSize: 'clamp(0.8rem, 3vw, 1rem)'
          }}>
            {service}
          </div>
        ))}
      </div>
      
      <div style={{ 
        marginTop: 'clamp(20px, 5vw, 40px)',
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
        alignItems: 'center',
        position: 'relative',
        zIndex: 10,
        padding: '0 20px',
        width: '100%',
        maxWidth: '400px'
      }}>
        <p style={{ fontSize: 'clamp(0.9rem, 3.5vw, 1rem)' }}>Cadastre-se para receber novidades em primeira mão</p>
        
        {message && (
          <div style={{
            padding: '10px 20px',
            borderRadius: '15px',
            backgroundColor: isSuccess ? 'rgba(76, 175, 80, 0.1)' : 'rgba(244, 67, 54, 0.1)',
            border: `2px solid ${isSuccess ? '#4CAF50' : '#F44336'}`,
            color: isSuccess ? '#2E7D32' : '#C62828',
            fontSize: 'clamp(0.8rem, 3vw, 0.9rem)',
            textAlign: 'center',
            maxWidth: '100%'
          }}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ 
          display: 'flex',
          gap: '10px',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%'
        }}>
          <input 
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Seu melhor e-mail"
            disabled={isLoading}
            style={{ 
              padding: 'clamp(8px, 3vw, 12px) clamp(15px, 4vw, 20px)',
              borderRadius: '25px',
              border: '2px solid #9c7a47',
              backgroundColor: 'rgba(255, 255, 255, 0.5)',
              color: '#9c7a47',
              textAlign: 'center',
              outline: 'none',
              width: '100%',
              maxWidth: '300px',
              fontSize: 'clamp(0.9rem, 3.5vw, 1rem)',
              opacity: isLoading ? 0.7 : 1,
              cursor: isLoading ? 'not-allowed' : 'text'
            }}
          />
          <button 
            type="submit"
            disabled={isLoading}
            style={{ 
              padding: 'clamp(8px, 3vw, 12px) clamp(20px, 5vw, 30px)',
              borderRadius: '25px',
              border: 'none',
              backgroundColor: isLoading ? '#ccc' : '#9c7a47',
              color: '#f3d9d1',
              fontWeight: 'bold',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              fontSize: 'clamp(0.9rem, 3.5vw, 1rem)',
              transition: 'all 0.3s ease',
              opacity: isLoading ? 0.7 : 1
            }}
          >
            {isLoading ? '📧 Cadastrando...' : 'Quero ser avisado(a)'}
          </button>
        </form>
      </div>
      
      {/* Footer */}
      <div style={{ 
        marginTop: '60px',
        paddingTop: '20px',
        borderTop: '1px solid rgba(156, 122, 71, 0.2)',
        width: '100%',
        textAlign: 'center',
        position: 'relative',
        zIndex: 10
      }}>
        <p style={{ 
          fontSize: '0.9rem',
          opacity: 0.6,
          margin: '0'
        }}>
          © 2025 SemprePlena - Em breve, mais beleza e bem-estar para você
        </p>
      </div>
    </div>
  );
}
