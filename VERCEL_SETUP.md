# 🚀 Como Configurar Variáveis de Ambiente no Vercel

## 📝 Configuração Local (Feita!)

✅ O arquivo `.env.local` já foi criado com sua URL do Google Script.

## 🌐 Configuração para Produção no Vercel

### Opção 1: Pelo Dashboard do Vercel (RECOMENDADO)

1. **Acesse o Vercel Dashboard:**

   - Vá para [vercel.com](https://vercel.com)
   - Faça login na sua conta
   - Selecione seu projeto "sempreplena"

2. **Configure a Variável de Ambiente:**

   - Vá para **Settings** (Configurações)
   - Clique em **Environment Variables**
   - Clique em **Add New**
   - Configure:
     - **Name:** `GOOGLE_SCRIPT_URL`
     - **Value:** `https://script.google.com/macros/s/AKfycbwRiuF1A7XejaoJVveRDGLEpvv3oKYpn4zQrc4P9LvdAD8XxE5zl-bV0qko_zhC5mE/exec`
     - **Environment:** Selecione `Production`, `Preview`, e `Development`

3. **Salvar e Redeployer:**
   - Clique em **Save**
   - Vá para **Deployments**
   - Clique nos 3 pontinhos do último deploy
   - Selecione **Redeploy**

### Opção 2: Via Vercel CLI

```bash
# Instalar Vercel CLI (se não tiver)
npm i -g vercel

# Fazer login
vercel login

# Adicionar variável de ambiente
vercel env add GOOGLE_SCRIPT_URL production
# Cole a URL quando solicitado: https://script.google.com/macros/s/AKfycbwRiuF1A7XejaoJVveRDGLEpvv3oKYpn4zQrc4P9LvdAD8XxE5zl-bV0qko_zhC5mE/exec

# Redeployer
vercel --prod
```

### Opção 3: Via Arquivo vercel.json (Automático)

Crie um arquivo `vercel.json` na raiz do projeto:

```json
{
  "env": {
    "GOOGLE_SCRIPT_URL": "https://script.google.com/macros/s/AKfycbwRiuF1A7XejaoJVveRDGLEpvv3oKYpn4zQrc4P9LvdAD8XxE5zl-bV0qko_zhC5mE/exec"
  }
}
```

⚠️ **IMPORTANTE:** A Opção 3 expõe a URL publicamente no código. Use apenas se não houver dados sensíveis.

## ✅ Como Verificar se Funcionou

1. **Deploy o projeto no Vercel**
2. **Teste o formulário** no site em produção
3. **Verifique sua planilha Google Sheets** - os e-mails devem aparecer automaticamente

## 🔧 Testando Localmente Agora

Sua configuração local já está pronta!

- O arquivo `.env.local` foi criado
- Reinicie o servidor Next.js para carregar as variáveis
- Teste o formulário - os e-mails vão direto para sua planilha!

```bash
# Parar o servidor atual (Ctrl+C no terminal)
# Reiniciar:
npm run dev
```

## 🎯 Próximos Passos

1. ✅ **Configuração local** - Feita!
2. 📤 **Deploy no Vercel**
3. 🔧 **Configurar variável no Vercel** (escolha uma opção acima)
4. 🧪 **Testar em produção**
5. 📊 **Monitorar planilha Google Sheets**

Agora você tem um sistema completo de captura de leads! 🚀
