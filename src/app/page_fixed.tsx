"use client";

export default function Home() {
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
      padding: '20px',
      position: 'relative',
      overflow: 'hidden',
      background: `
        radial-gradient(circle at 20% 80%, rgba(156, 122, 71, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, rgba(243, 217, 209, 0.3) 0%, transparent 50%),
        radial-gradient(circle at 40% 40%, rgba(156, 122, 71, 0.05) 0%, transparent 50%),
        #f3d9d1
      `
    }}>
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
        width: '300px',
        height: '300px',
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
        fontSize: '4rem', 
        fontWeight: 'bold',
        marginBottom: '20px',
        textShadow: '2px 2px 4px rgba(156, 122, 71, 0.3)',
        position: 'relative',
        zIndex: 10
      }}>
        EM BREVE
      </h1>
      
      <h2 style={{ 
        fontSize: '2rem',
        marginBottom: '20px',
        position: 'relative',
        zIndex: 10
      }}>
        SEMPREPLENA
      </h2>
      
      <p style={{ 
        fontSize: '1.2rem',
        maxWidth: '600px',
        lineHeight: '1.6',
        opacity: 0.8,
        position: 'relative',
        zIndex: 10
      }}>
        Sua clínica de estética e massoterapia está chegando para transformar 
        sua experiência de bem-estar e beleza.
      </p>
      
      <div style={{ 
        marginTop: '40px',
        display: 'flex',
        gap: '20px',
        flexWrap: 'wrap',
        justifyContent: 'center',
        position: 'relative',
        zIndex: 10
      }}>
        {['✨ Tratamentos Estéticos', '💆‍♀️ Massoterapia', '🌸 Relaxamento', '💎 Beleza Natural'].map((service, index) => (
          <div key={index} style={{ 
            padding: '10px 20px',
            border: '2px solid #9c7a47',
            borderRadius: '25px',
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
            transition: 'transform 0.3s ease',
            cursor: 'pointer'
          }}>
            {service}
          </div>
        ))}
      </div>
      
      <div style={{ 
        marginTop: '40px',
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
        alignItems: 'center',
        position: 'relative',
        zIndex: 10
      }}>
        <p>Cadastre-se para receber novidades em primeira mão</p>
        <div style={{ 
          display: 'flex',
          gap: '10px',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          <input 
            type="email"
            placeholder="Seu melhor e-mail"
            style={{ 
              padding: '12px 20px',
              borderRadius: '25px',
              border: '2px solid #9c7a47',
              backgroundColor: 'rgba(255, 255, 255, 0.5)',
              color: '#9c7a47',
              textAlign: 'center',
              outline: 'none'
            }}
          />
          <button 
            style={{ 
              padding: '12px 30px',
              borderRadius: '25px',
              border: 'none',
              backgroundColor: '#9c7a47',
              color: '#f3d9d1',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            Quero ser avisado(a)
          </button>
        </div>
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
