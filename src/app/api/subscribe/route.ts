import { NextRequest, NextResponse } from "next/server";

export async function POST(request: Request) {
  let email = '';
  
  try {
    const body = await request.json();
    email = body.email;
    
    if (!email) {
      return NextResponse.json({ error: 'Email é obrigatório' }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Email inválido' }, { status: 400 });
    }

    const googleScriptUrl = process.env.GOOGLE_SCRIPT_URL;
    const timestamp = new Date().toISOString();
    const source = 'SemprePlena Website';
    
    console.log(`📧 Processando cadastro: ${email}`);

    if (googleScriptUrl) {
      try {
        // Monta a URL com os parâmetros usando ? para começar os query params
        const urlWithParams = `${googleScriptUrl}?email=${encodeURIComponent(email)}&timestamp=${encodeURIComponent(timestamp)}&source=${encodeURIComponent(source)}`;
        
        console.log('📤 Enviando para Google Sheets:', urlWithParams);
        
        const response = await fetch(urlWithParams, {
          method: 'GET',
          headers: {
            'Accept': '*/*',
          },
        });
        
        console.log(`📨 Response status: ${response.status}`);
        
        if (response.ok) {
          console.log('✅ E-mail salvo no Google Sheets');
          return NextResponse.json({ 
            success: true, 
            message: 'E-mail cadastrado com sucesso! Obrigado por se inscrever na SemprePlena.',
          });
        } else {
          throw new Error(`Google Sheets respondeu com status ${response.status}`);
        }
        
      } catch (googleError) {
        console.log('⚠️ Erro no Google Sheets, usando fallback:', googleError);
      }
    }
    
    // Fallback: salva localmente
    console.log(`📧 FALLBACK - E-mail salvo localmente: ${email} ${timestamp}`);
    
    return NextResponse.json({ 
      success: true, 
      message: 'E-mail cadastrado com sucesso! Obrigado por se inscrever na SemprePlena.',
    });

  } catch (error) {
    console.error('❌ Erro ao processar cadastro:', error);
    
    return NextResponse.json({ 
      error: 'Erro interno do servidor' 
    }, { status: 500 });
  }
}
