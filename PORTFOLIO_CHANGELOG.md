# Portfolio changes and decisions

## Current content order

### Experience — “My journey”

Display the roles in this order:

1. Software Analyst Jr · Softplan — Feb 2026–Present
2. Software Engineer Intern · Norsk Hydro — May 2024–Aug 2025
3. Software Engineer Intern · Equinix — Feb 2022–Apr 2024
4. Co-founder · NATTA
5. Regional Leader · WoHackers — 1 year, Rio de Janeiro
6. Product & Tokenomics · Weeflow

NATTA stays after Equinix in the timeline; WoHackers follows NATTA; Weeflow is the final item. The WoHackers event photo and NATTA website image do not appear in this section.

### Projects — “Things I’ve built”

Display projects in this order:

1. NATTA
2. WoHackers · Rio Hackathon
3. Weeflow

Use the provided NATTA screenshot as a subdued project cover, the WoHackers event photograph as a subdued community project cover, and only the provided logo as Weeflow's artwork.

## Image treatment

- NATTA source image: `public/experience/natta-platform.png` (1766×953). The project uses `public/experience/natta-platform-fhd.webp` (1920×1036, WebP, quality 95).
- WoHackers source photograph: `public/experience/wohackers-host.png` (480×845). The project uses `public/experience/wohackers-host-fhd.webp` (1088×1920, portrait Full HD class, WebP, quality 95).
- The generated WebP assets use Lanczos resampling to increase pixel dimensions while preserving the submitted image content and framing. This interpolation does not create new photographic detail.
- CSS applies a dark, soft treatment to the NATTA and WoHackers covers: approximately 4px blur, reduced brightness and saturation. Keep text and faces low-emphasis in the cards.
- Keep `public/experience/weeflow-logo.png` crisp and unblurred so the gradient mark remains recognizable.

## Visual decisions

- Retain the site's established light editorial visual system, rethemed with the selected “Azul e luar” palette.
- Use “My journey” in place of “The road I’ve travelled” for a shorter, natural English section heading.
- Keep supplied imagery in the project showcase rather than the résumé-like timeline.

## Accent palette — Azul e luar

- Replaced the former violet/indigo/teal accent system with midnight blue `#153B5B`, lake blue `#4D91B8`, and moon gold `#D7C77F`.
- Applied the palette to headline accents (“Full-Stack Software Developer”, “the work”, “built”, “journey”, “AI assistant”, “great”, and “Get in touch”), the scroll progress indicator, page scrollbar, shimmer-button borders, AI assistant accents, focus states, timeline highlights, project tints, and decorative star/3D treatments.
- Gold text on light surfaces uses the deeper ink-gold `#8C733B` for legibility. Over the dark landscape, the hero headline uses a bright moon-gold/sky-blue/moon-gold gradient with a subtle shadow for contrast.
- The provided landscape and the multicolor Weeflow logo retain their original colors.

## 3D effects — documented before implementation

Apply the selected palette to the portfolio's 3D details while retaining their current geometry, lighting behavior, and motion:

- Particle field: lake blue `#4D91B8` as the primary point color, with a sparse, low-opacity ink-gold `#8C733B` layer to echo the moon-gold accent without washing out the light canvas.
- 3D core: midnight blue `#153B5B` for the body, lake blue `#4D91B8` for the emissive response, and moon gold `#D7C77F` for the wireframe/light pulse.
- 3D chip: midnight blue substrate, lake-blue glow and light, moon-gold pins/current pulse, sky-blue environment reflection `#75C5E4`; keep neutral silver metal and white typography.
- Preserve the supplied landscape image's original colors. Reusable shader library defaults are outside this pass unless a shader is actively mounted by the portfolio.

Implementation status: applied after this palette and scope were recorded here and in `AGENTS.md`. The mounted star background now uses lake-blue particles plus a sparse, dim ink-gold layer. The `Hero3D` and `HeroChip` components are palette-aligned for reuse but are not currently mounted by the portfolio page. Reusable shader library defaults remain untouched because those components are not in the active page tree.

## Source assets

The original supplied images remain in `public/experience/`; generated presentation assets are separate `*-fhd.webp` files. If the user supplies a replacement image, update this log with its source, output dimensions, and section placement.

## Cursor

- Refined the custom pointer into a compact studio-style cursor: a small high-contrast point, a thin restrained ring, and a subtle moon-gold hover state. The existing component and CSS handle it; no cursor dependency was added.

## Profile and contact details

- Certifications now list only Yellow Belt · Six Sigma (2026) and Python · Ada (2022), in the existing card format.
- Contact location is Rio de Janeiro, Brazil; the phone number has been removed.
- Removed the inherited Vishwam Shah academic-paper listing because it does not describe Bárbara. Kept the section as Certifications; consider adding only verified publications, technical writing, talks, or community work once the owner chooses what to feature.
- The existing animated background has not been recolored in this update. Background-tone options remain a design discussion until the owner selects one.
- Replaced the purple cursor-following spotlight on interactive cards with a soft lake-blue `#4D91B8` → moon-gold `#D7C77F` radial gradient; the site's animated page background remains unchanged.

## Ajuste do canvas e chuva no hero — 26/11/2026

- Removido OpenAI da lista visual de tecnologias e das categorias da seção Skills; LangChain permanece na lista.
- Escurecido levemente o fundo claro sem interromper suas camadas animadas: gradiente radial `#F8FAFC` → `#E8EDF1` → `#D4DDE4`, spotlight branco em opacidade 0.5 e grade pontilhada reduzida para 0.08.
- Adicionada chuva sutil e em loop sobre a paisagem do hero, com riscos azulados e dourados discretos; as regras de movimento reduzido desativam a animação.
- A imagem original da paisagem e as animações independentes de nuvens, folhagem e água foram preservadas.

## Cursor personalizado — correção de visibilidade — 26/11/2026

- O cursor ficava oculto porque aguardava o evento `preloaderdone`, embora o preloader não esteja montado nesta página.
- Removida essa dependência: o cursor de estúdio agora aparece na posição real após o primeiro movimento do mouse, sem animação partindo do centro. Em dispositivos touch ele continua desativado.

## Refinamento da chuva no hero — 26/11/2026

- Substituído o padrão anterior, denso e regular, por duas camadas diagonais com espaçamentos e velocidades diferentes e baixa opacidade.
- A máscara concentra a chuva no céu e na água, suaviza a linha das árvores e reduz a interferência sobre o texto à esquerda. A camada de chuva permanece abaixo do scrim e do conteúdo.
- Mantida a compatibilidade com a preferência de movimento reduzido.

## Tema escuro e refinamento de legibilidade — 26/11/2026

- Aplicada uma prévia escura em azul-marinho/carvão, mantendo a paisagem, a chuva visual e os acentos Azul e luar.
- Títulos de seção usam o gradiente azul e dourado; textos corridos e o resumo da NATTA na experiência ficam brancos. Os indicadores `5+` e `4+` mantêm o tratamento claro original, com texto escuro.
- Removidos os monogramas “BP” da navegação e do rodapé; o nome Bárbara Peslo permanece.
- Reforçada a visibilidade dos ícones de e-mail, localização e da linha do tempo “My journey” com azul claro e brilho discreto.
- Desativado e removido o controle de áudio ambiente; a animação visual da chuva continua sem som.

## Contato por e-mail e chuva dinâmica — 26/11/2026

- “Send a message” agora abre um rascunho endereçado a `lopes.barbarav@gmail.com`, com assunto e corpo preenchidos pelos campos do formulário. O link de e-mail exibido usa o mesmo endereço.
- A textura de riscos em CSS foi substituída por um canvas leve com gotas diagonais em velocidades e comprimentos variados e pequenos impactos elípticos na água. O efeito fica sob o conteúdo, com máscara sobre céu/lago e sem biblioteca adicional; movimento reduzido mantém a camada desligada.

