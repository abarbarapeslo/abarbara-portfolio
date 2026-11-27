<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Portfolio memory

- This project is Bárbara Peslo's portfolio on branch `codex/portfolio-personalizacao`.
- Keep the saved visual references as inspiration for hierarchy and storytelling; do not copy their exact layouts.
- Keep user-provided experience details in the `Experience` section. Its display order is **Softplan → Norsk Hydro → Equinix → NATTA → WoHackers → Weeflow**, with the heading **“My journey”**.
- Keep the NATTA screenshot and WoHackers event photo in **“Things I've built”**, not in the experience timeline. The project card order is **NATTA → WoHackers · Rio Hackathon → Weeflow**.
- Weeflow's project artwork is its logo only; preserve the logo's color and crisp edges.
- Current profile details: list only **Yellow Belt · Six Sigma (2026)** and **Python · Ada (2022)** under Certifications; contact location is **Rio de Janeiro, Brazil**; do not show a phone number. Do not restore inherited academic-paper content from the Vishwam Shah template. Add future publication, writing, or speaking material only when Bárbara confirms verified details.
- NATTA and WoHackers covers use Full HD class WebP assets with a dark, soft blur treatment. Preserve the supplied image content and aspect ratio; use them as subdued backgrounds. Do not make these images prominent or add photos to the experience timeline.
- Current accent direction is **Azul e luar**: midnight blue `#153B5B`, lake blue `#4D91B8`, moon gold `#D7C77F`, and legibility-safe ink gold `#8C733B` for gradient text on light backgrounds. Over the dark landscape, the hero headline uses a bright moon-gold/sky-blue/moon-gold variant for contrast. Keep these accents consistent across headings, scroll progress, shimmer buttons, AI UI, focus states, and decorative effects.
- The cursor-following card spotlight uses a soft lake-blue `#4D91B8` to moon-gold `#D7C77F` radial gradient; avoid reintroducing violet in this mouse-following effect.
- The studio cursor must not depend on a preloader event: this portfolio currently has no mounted preloader. Show it after the first pointer movement, and keep it hidden on touch devices.
- Keep OpenAI out of the visible technology stack and skill categories. LangChain remains listed; historical experience text may still describe tools used in a role.
- The light page canvas is now a slightly darker cool paper gradient (`#F8FAFC` center, `#E8EDF1` midtone, `#D4DDE4` edges) with a reduced white spotlight and softer dot grid. Preserve its animated ambient layers.
- The hero landscape uses a sparse, layered rainfall overlay, softly masked over open sky and lake and dissolved over the tree line and left-side copy. Keep the streaks diagonal, low-contrast and varied in spacing/speed; avoid dense, uniform vertical stripes. Respect `prefers-reduced-motion`.
- Implement hero rain with the small canvas `Rainfall` component: varied moving drops and faint impact rings on the lake. Avoid replacing this with tiled CSS stripe textures. Keep it low-cost, clipped/masked, and disabled for reduced motion.
- The contact form's “Send a message” action opens a prefilled email draft addressed to `lopes.barbarav@gmail.com`; keep sender name, email, and message in the draft body.
- For 3D effects, use lake blue for the active particle field, a sparse low-opacity ink-gold layer for warm balance, midnight blue for 3D bodies, lake-blue emissive light, and moon gold for wires, pins, or pulses. Preserve neutral silver/white and the supplied landscape's original colors. `Hero3D` and `HeroChip` are palette-aligned but currently unmounted; do not recolor reusable shader-library defaults unless the portfolio starts mounting them.
- The project decision log and asset dimensions are in `PORTFOLIO_CHANGELOG.md`.
