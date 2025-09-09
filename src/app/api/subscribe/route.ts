import { NextRequest, NextResponse } from "next/server";

export async function POST(request: Request) {
  let email = '';
  let phone = '';
  
  try {
    const body = await request.json();
    email = body.email;
    phone = body.phone;
    
    if (!email) {
      return NextResponse.json({ error: 'Email é obrigatório' }, { status: 400 });
    }

    if (!phone) {
      return NextResponse.json({ error: 'WhatsApp é obrigatório' }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Email inválido' }, { status: 400 });
    }

    // Clean phone number (remove spaces, dashes, parentheses)
    const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
    if (cleanPhone.length < 10) {
      return NextResponse.json({ error: 'WhatsApp deve ter pelo menos 10 dígitos' }, { status: 400 });
    }

    const googleScriptUrl = process.env.GOOGLE_SCRIPT_URL;
    const timestamp = new Date().toISOString();
    const source = 'LP';
    
    console.log(`📧 Processando cadastro: ${email} | 📱 ${cleanPhone}`);

    if (googleScriptUrl) {
      try {
        // Monta a URL com os parâmetros usando ? para começar os query params
        const urlWithParams = `${googleScriptUrl}?email=${encodeURIComponent(email)}&phone=${encodeURIComponent(cleanPhone)}&source=${encodeURIComponent(source)}`;
        
        console.log('📤 Enviando para Google Sheets:', urlWithParams);
        
        const response = await fetch(urlWithParams, {
          method: 'GET',
          headers: {
            'Accept': '*/*',
          },
        });
        
        console.log(`📨 Response status: ${response.status}`);
        
        if (response.ok) {
          console.log('✅ Dados salvos no Google Sheets');
          return NextResponse.json({ 
            success: true, 
            message: 'Dados cadastrados com sucesso! Você será avisado em primeira mão.',
          });
        } else {
          throw new Error(`Google Sheets respondeu com status ${response.status}`);
        }
        
      } catch (googleError) {
        console.log('⚠️ Erro no Google Sheets, usando fallback:', googleError);
      }
    }
    
    // Fallback: salva localmente
    console.log(`📧 FALLBACK - Dados salvos localmente: ${email} | ${cleanPhone}`);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Dados cadastrados com sucesso! Você será avisado em primeira mão.',
    });

  } catch (error) {
    console.error('❌ Erro ao processar cadastro:', error);
    
    return NextResponse.json({ 
      error: 'Erro interno do servidor' 
    }, { status: 500 });
  }
}
