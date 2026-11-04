# TCM Auto Center

Site institucional responsivo em React e Vite. A pasta `public/images` contém as fotos e a logo fornecidas para este projeto.

## Executar localmente

Requer Node.js 18 ou superior. No PowerShell do Windows, use `npm.cmd` se a política de execução bloquear `npm.ps1`.

```powershell
npm.cmd install
npm.cmd run dev
```

Abra o endereço local exibido pelo Vite. Os links de contato usam o telefone confirmado `(27) 3051-2181`. A integração de avaliações permanece em modo de espaço reservado até que as credenciais sejam configuradas.

## Avaliações do Google

O endpoint Express `server.js` consulta a Places API (New) e mantém a chave no servidor. Para habilitar:

1. O arquivo `.env` local contém a configuração e não deve ser enviado ao repositório.
2. Configure `GOOGLE_MAPS_API_KEY` e `GOOGLE_PLACE_ID` com credenciais próprias. O Place ID atual já está configurado no `.env.example`.
3. Ative Places API (New) e o faturamento/configurações exigidos no projeto Google Cloud.
4. Em um terminal, execute `npm.cmd run server`; em outro, `npm.cmd run dev`.
5. O proxy `/api` do Vite já está configurado para `http://localhost:3001` em desenvolvimento. Em produção, sirva o endpoint `/api/reviews` no mesmo domínio.

A chave fica exclusivamente no processo Node e não deve ser publicada no frontend. Restrinja a chave no Google Cloud para o uso do servidor. A tela mostra nota, total e avaliações retornadas pela API; se não houver textos disponíveis, usa os três comentários transcritos da imagem enviada pela loja. A API possui limites e regras de armazenamento, atribuição e exibição do Google; revise os termos aplicáveis antes de publicar.

## Conteúdo e personalização

- Fotos e logos atuais: `public/images/` (`fachada.png`, `carro-em-revisao.png`, `equipe-em-servico.png`, `fachada-noturna-hq.png`, `motor-detalhe-hq.png`, `logo.png`, `marca-honda.png`, `marca-lubrax.png`, `marca-petronas.png`). O carrossel de serviços usa as quatro fotos em alta resolução enviadas pela loja. Substitua os arquivos mantendo esses nomes ou atualize as referências em `src/main.jsx`.
- Dados da loja, serviços, fotos, Place ID e comentários de contingência: `src/data/site.js`.
- Componentes de interface: `src/components/`; cada seção tem um arquivo próprio e um comentário resumido sobre sua função.
- Composição e ordem das seções: `src/App.jsx`.
- Estilos globais e responsivos: `src/style.css`.
- Marcas parceiras: `PartnersSection.jsx` exibe a faixa contínua com as logos fornecidas.
- Localização: `LocationSection.jsx` incorpora o mapa e oferece um link para abrir a rota.

## Organização do React

```text
src/
├── App.jsx
├── main.jsx
├── components/
│   ├── Header.jsx
│   ├── Hero.jsx
│   ├── ServicesSection.jsx
│   ├── ReviewsSection.jsx
│   ├── LocationSection.jsx
│   ├── PartnersSection.jsx
│   ├── Footer.jsx
│   ├── Icon.jsx
│   └── ScrollReveal.jsx
├── data/
│   └── site.js
└── style.css
```

## Produção

`npm run build` gera os arquivos estáticos em `dist/`. O frontend e o endpoint de avaliações devem ser publicados sob o mesmo domínio (ou com proxy CORS configurado pelo servidor). Não inclua `.env` no repositório.
