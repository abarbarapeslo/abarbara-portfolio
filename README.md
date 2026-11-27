This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## Direção visual do portfólio

Esta vertente parte do clone do portfólio de Vishwam Shah. O conteúdo e os dados pessoais serão substituídos pelos dados reais do proprietário do projeto quando forem enviados.

### Hero com paisagem ilustrada

- A ilustração enviada pelo proprietário substitui a cena de praia no fundo do hero.
- O arquivo original, sem reexportação ou recompressão, está em `public/hero/portfolio-scene.avif`.
- Camadas CSS criam movimentos lentos e sutis nas nuvens, na vegetação e na água, em ciclos contínuos.
- `prefers-reduced-motion` desativa as animações para respeitar a preferência do visitante.
- A implementação do hero está em `components/main/Hero.tsx`; os estilos e animações estão em `app/globals.css`.
- Decisões atuais de conteúdo, ordem da trajetória e tratamento das imagens estão registradas em [`PORTFOLIO_CHANGELOG.md`](./PORTFOLIO_CHANGELOG.md) e na memória do projeto (`AGENTS.md`).

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
