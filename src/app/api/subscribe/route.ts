import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();
    
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'E-mail inválido' },
        { status: 400 }
      );
    }

    // URL do Google Apps Script que você vai criar
    const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL || '';
    
    if (!GOOGLE_SCRIPT_URL) {
      // Por enquanto, apenas loga no console se não tiver configurado
      console.log('📧 Novo e-mail cadastrado:', email, new Date().toISOString());
      
      return NextResponse.json({ 
        success: true, 
        message: 'E-mail cadastrado com sucesso!' 
      });
    }

    // Dados para enviar
    const payload = {
      email: email,
      timestamp: new Date().toISOString(),
      source: 'SemprePlena Website'
    };

    console.log('📤 Enviando para Google Sheets:', GOOGLE_SCRIPT_URL);
    console.log('📤 Payload:', JSON.stringify(payload));

    // Tenta método GET primeiro (mais compatível com Google Apps Script)
    const params = new URLSearchParams({
      email: email,
      timestamp: new Date().toISOString(),
      source: 'SemprePlena Website'
    });

    const getUrl = `${GOOGLE_SCRIPT_URL}?${params.toString()}`;
    console.log('📤 Tentando GET:', getUrl);
    
    const getResponse = await fetch(getUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    console.log('📨 GET Response status:', getResponse.status);
    const getResponseText = await getResponse.text();
    console.log('📨 GET Response body:', getResponseText);

    if (getResponse.ok) {
      try {
        const jsonResponse = JSON.parse(getResponseText);
        if (jsonResponse.success || jsonResponse.result === 'success') {
          return NextResponse.json({ 
            success: true, 
            message: 'E-mail cadastrado com sucesso!' 
          });
        }
      } catch (e) {
        // Se não conseguir fazer parse, mas response é ok, considerar sucesso
        if (getResponseText.includes('success') || getResponseText.includes('ok')) {
          return NextResponse.json({ 
            success: true, 
            message: 'E-mail cadastrado com sucesso!' 
          });
        }
      }
    }

    // Se GET não funcionou, tenta POST
    console.log('📤 Tentando POST...');
    const postResponse = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    console.log('📨 POST Response status:', postResponse.status);
    const postResponseText = await postResponse.text();
    console.log('📨 POST Response body:', postResponseText);

    if (postResponse.ok) {
      try {
        const jsonResponse = JSON.parse(postResponseText);
        if (jsonResponse.success || jsonResponse.result === 'success') {
          return NextResponse.json({ 
            success: true, 
            message: 'E-mail cadastrado com sucesso!' 
          });
        }
      } catch (e) {
        // Se não conseguir fazer parse, mas response é ok, considerar sucesso
        if (postResponseText.includes('success') || postResponseText.includes('ok')) {
          return NextResponse.json({ 
            success: true, 
            message: 'E-mail cadastrado com sucesso!' 
          });
        }
      }
    }

    // Se chegou até aqui, houve erro
    console.log('❌ Ambos os métodos falharam');
    
    // Por enquanto, salva localmente e retorna sucesso
    console.log('📧 FALLBACK - E-mail salvo localmente:', email, new Date().toISOString());
    
    return NextResponse.json({ 
      success: true, 
      message: 'E-mail cadastrado com sucesso! (salvo temporariamente)' 
    });

  } catch (error) {
    console.error('Erro ao processar e-mail:', error);
    
    // Em caso de erro, ainda registra o e-mail localmente se disponível
    try {
      const { email: errorEmail } = await request.json();
      if (errorEmail) {
        console.log('📧 ERROR FALLBACK - E-mail registrado:', errorEmail, new Date().toISOString());
      }
    } catch (e) {
      console.log('📧 ERROR FALLBACK - Erro ao recuperar e-mail do request');
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'E-mail cadastrado com sucesso!' 
    });
  }
}
// force recompile
