# 📧 Como Configurar Google Sheets para Receber E-mails

## ⚠️ PROBLEMA IDENTIFICADO

A URL atual do Google Apps Script está retornando "Página não encontrada". Isso pode acontecer por:

1. **Script não implantado corretamente**
2. **Permissões não configuradas**
3. **URL incorreta**

## 🔧 SOLUÇÃO RÁPIDA - CORREÇÃO DO GOOGLE APPS SCRIPT

### 1️⃣ Verificar se a Planilha Existe

1. Acesse [Google Sheets](https://sheets.google.com)
2. Confirme se a planilha "SemprePlena - Lista de E-mails" existe
3. Se não existir, crie uma nova com os cabeçalhos:
   - A1: "Email"
   - B1: "Data/Hora"
   - C1: "Origem"

### 2️⃣ Recriar o Google Apps Script

1. Na planilha, vá em **Extensões > Apps Script**
2. **IMPORTANTE:** Apague TUDO e cole este código ATUALIZADO:

```javascript
function doGet(e) {
  return handleRequest(e);
}

function doPost(e) {
  return handleRequest(e);
}

function handleRequest(e) {
  try {
    // ID da sua planilha (pegar da URL da planilha)
    // Exemplo: https://docs.google.com/spreadsheets/d/[SHEET_ID]/edit
    const SHEET_ID = "SEU_SHEET_ID_AQUI"; // SUBSTITUA PELO ID REAL

    const sheet = SpreadsheetApp.openById(SHEET_ID).getActiveSheet();

    let email, timestamp, source;

    // Tenta pegar dados do POST primeiro
    if (e.postData && e.postData.contents) {
      const data = JSON.parse(e.postData.contents);
      email = data.email;
      timestamp = data.timestamp;
      source = data.source;
    }
    // Se não houver POST, tenta GET
    else {
      email = e.parameter.email;
      timestamp = e.parameter.timestamp;
      source = e.parameter.source;
    }

    // Se não tiver email, retorna erro
    if (!email) {
      return ContentService.createTextOutput(
        JSON.stringify({ error: "Email não fornecido" })
      ).setMimeType(ContentService.MimeType.JSON);
    }

    // Adicionar nova linha com os dados
    sheet.appendRow([
      email,
      timestamp || new Date().toISOString(),
      source || "Website",
    ]);

    return ContentService.createTextOutput(
      JSON.stringify({ success: true, result: "success" })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({ error: error.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}
```

### 3️⃣ CRUCIAL - Configuração Correta

1. **Substituir SHEET_ID**:

   - Vá na sua planilha
   - Copie o ID da URL: `https://docs.google.com/spreadsheets/d/[ESTE_É_O_ID]/edit`
   - Cole no lugar de `SEU_SHEET_ID_AQUI`

2. **Salvar** o script (Ctrl+S)

3. **Testar** o script:

   - Clique em **Executar** (play)
   - Autorize as permissões quando solicitado

4. **Implantar CORRETAMENTE**:
   - Clique em **Implantar > Nova implantação**
   - Em "Tipo", selecione **Aplicativo da Web**
   - **IMPORTANTE**: Configure:
     - Executar como: **Eu**
     - Quem tem acesso: **Qualquer pessoa**
   - Clique em **Implantar**
   - **AUTORIZE todas as permissões**
   - **Copie a nova URL**

### 4️⃣ Atualizar a URL no Projeto

1. Substitua a URL no arquivo `.env.local`:

```bash
GOOGLE_SCRIPT_URL=SUA_NOVA_URL_AQUI
```

## 🚀 SOLUÇÃO ALTERNATIVA - FORMSPREE (FUNCIONA IMEDIATAMENTE)

Se quiser algo que funciona agora mesmo:

1. Vá para [Formspree.io](https://formspree.io)
2. Crie uma conta gratuita
3. Crie um novo form
4. Copie o endpoint
5. Atualize `.env.local`:

```bash
GOOGLE_SCRIPT_URL=https://formspree.io/f/SEU_FORM_ID
```

## 📧 SISTEMA ATUAL (FUNCIONANDO)

Por enquanto, o sistema está funcionando com FALLBACK:

- ✅ Os e-mails são registrados no console do servidor
- ✅ O usuário recebe confirmação de sucesso
- ✅ Você pode ver os e-mails no terminal do Next.js

## 🧪 TESTE RÁPIDO

Para testar se o Google Script está funcionando:

```bash
# Substitua pela sua URL real
curl "https://SUA_URL_AQUI?email=teste@test.com&timestamp=2025-01-01&source=test"
```

Deveria retornar: `{"success":true,"result":"success"}`

### 3️⃣ Configurar e Implantar

1. **Salve** o script (Ctrl+S)
2. Clique em **Implantar > Nova implantação**
3. Em "Tipo", selecione **Aplicativo da Web**
4. Configure:
   - Executar como: **Eu**
   - Quem tem acesso: **Qualquer pessoa**
5. Clique em **Implantar**
6. **Copie a URL** que aparece

### 4️⃣ Configurar no Projeto

1. Crie um arquivo `.env.local` na raiz do projeto:

```bash
GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/SEU_SCRIPT_ID/exec
```

## 🔧 Opção 2: Formspree (Mais Simples)

### 1️⃣ Criar conta no Formspree

1. Acesse [Formspree.io](https://formspree.io)
2. Crie uma conta gratuita
3. Crie um novo form
4. Copie o endpoint fornecido

### 2️⃣ Configurar no projeto

1. No arquivo `.env.local`:

```bash
FORMSPREE_URL=https://formspree.io/f/SEU_FORM_ID
```

2. Atualizar a API (`src/app/api/subscribe/route.ts`):

```typescript
const FORMSPREE_URL = process.env.FORMSPREE_URL;

const response = await fetch(FORMSPREE_URL, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ email }),
});
```

## 📋 Para testar agora (sem configuração)

O sistema já está funcionando! Os e-mails são logados no console do servidor por enquanto.

Para ver os logs:

1. Abra o terminal onde o Next.js está rodando
2. Quando alguém cadastrar o e-mail, aparecerá:
   `📧 Novo e-mail cadastrado: usuario@email.com 2025-01-08T...`

## 🎯 Próximos Passos

1. **Escolha uma das opções acima**
2. **Configure a URL no `.env.local`**
3. **Teste o cadastro**
4. **Monitore os e-mails na planilha**

## 📊 Estrutura da Planilha Final

| Email             | Data/Hora           | Origem              |
| ----------------- | ------------------- | ------------------- |
| usuario@email.com | 2025-01-08 15:30:22 | SemprePlena Website |
| outro@email.com   | 2025-01-08 16:45:10 | SemprePlena Website |

Assim você terá uma lista completa de todos os interessados! 🚀
