# Adega Tá no Grau 013 — site original com vitrine de fotos reais

Projeto React + TypeScript + Vite criado no Bolt, preservado e preparado para publicar no Render.

## Alterações já feitas

- A seção "Sobre a Adega" permanece com texto, selos e os quatro cartões originais.
- Logo abaixo dela está a vitrine com quatro cards: cervejas e bebidas, refrigerantes e energéticos, tabacaria e gelo, usando fotos reais enviadas pelo proprietário.
- O catálogo antigo de oito cartões e imagens ilustrativas foi removido da página e do código.
- O link "Produtos" no menu aponta para a nova vitrine.
- Layout, WhatsApp, iFood, mapa, avaliações e demais seções originais foram preservados.

## Publicação pelo Render (site estático)

Crie um repositório no GitHub e coloque **o conteúdo desta pasta diretamente na raiz** (não envie o ZIP como um arquivo único). Conecte esse repositório ao Render.

- Tipo de serviço: **Static Site**
- Branch: `main`
- Build Command: `npm ci && npm run build`
- Publish Directory: `dist`
- Auto-deploy: **On Commit**

Você também pode usar `render.yaml` (Blueprint), que contém a mesma configuração.

Após publicar, atualize o GitHub para que o Render publique uma nova versão automaticamente.

## Atenção antes de divulgar o site

Confirme os links e números de contato, o perfil de iFood, dados de avaliações, horários e o conteúdo de privacidade/cookies. Não foi adicionada integração em tempo real com o Google Maps. Algumas informações do site são estáticas.

## Testar localmente

```bash
npm ci
npm run build
npm run dev
```
