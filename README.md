# Gerador de Stories da Seleção Brasileira 🇧🇷

Este é um aplicativo modernizado e altamente otimizado para a geração instantânea de Stories do Instagram ou Status do WhatsApp usando a moldura oficial da Seleção Brasileira.

O aplicativo funciona **totalmente no navegador** (sem backend), garantindo privacidade total para as fotos dos torcedores e processamento em milissegundos.

## 🚀 Tecnologias

* **React 19** com **TypeScript**
* **Vite** para desenvolvimento ultrarrápido
* **HTML5 Canvas** de alto desempenho (saída real de **1080 x 1920 pixels** em alta definição)
* **Tailwind CSS** com o tema estético *Clean Minimalism*
* **Motion** para micro-animações suaves de interface

---

## 🛠️ Instruções de Instalação e Execução Local

Siga os passos abaixo em sua máquina local:

1. **Instale as dependências:**
   ```bash
   npm install
   ```

2. **Execute o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

3. **Crie a build de produção:**
   ```bash
   npm run build
   ```

4. **Inicie o servidor local em modo de produção:**
   ```bash
   npm run preview
   ```

---

## ☁️ Instruções de Deploy no Vercel

O projeto está totalmente configurado e pronto para deploy de forma extremamente simples no **Vercel**:

### Opção 1: Via Vercel CLI (Método Rápido)

1. Instale a ferramenta CLI se ainda não a possuir:
   ```bash
   npm install -g vercel
   ```

2. Execute o assistente de deploy na raiz do projeto:
   ```bash
   vercel
   ```

3. Siga o passo a passo selecionando as opções padrões recomendadas.

### Opção 2: Via Integração do GitHub (Método Recomendado)

1. Crie um repositório no seu painel do GitHub.
2. Faça o push dos arquivos locais:
   ```bash
   git init
   git add .
   git commit -m "feat: setup gerador de stories brasil"
   git branch -M main
   git remote add origin https://github.com/SEU_USUARIO/NOME_DO_REPOSITORIO.git
   git push -u origin main
   ```
3. Acesse o painel da [Vercel](https://vercel.com/) e clique em **Add New > Project**.
4. Importe o repositório criado.
5. Em **Framework Preset**, a Vercel detectará automaticamente **Vite**.
6. Clique em **Deploy** e o seu app estará online em menos de 1 minuto!
