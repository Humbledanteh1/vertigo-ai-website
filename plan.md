# Vertigo AI website plan

## Product scope and evidence

Build a source-faithful public-facing homepage for Vertigo AI, based on Sharif Mahmood's connected portfolio source. The portfolio identifies Sharif as owner of Vertigo AI and says he builds websites and practical AI agents. It emphasizes making ideas clear and useful through clear interfaces, helpful workflows, and technology that earns its place. The verified inquiry address is `Vertigogrowth1@gmail.com`; the verified public profiles are X (`@Humbledanteh1`) and GitHub (`Humbledanteh1`). The portfolio source contains no named case studies, customer outcomes, pricing, industry claims, or further package/service details. Do not invent any of these. No backend is needed; the contact action is a mailto link.

## Design direction

- **Design movement:** Quiet-future editorial with restrained liquid-glass surfaces; a human, considered digital-studio identity rather than a generic AI/SaaS dashboard.
- **Core principles:** Lead with one clear idea; communicate practical usefulness; keep visual effects controlled; make every action and section easy to scan.
- **Color philosophy:** Deep ocean blue carries focus and continuity with the portfolio; warm off-white keeps the reading experience approachable; pale lime is a small, ownable signal for links and emphasis; cool glass-blue adds depth without making technology feel cold.
- **Layout paradigm:** Asymmetric split hero with text on the left and a custom visual focal point to the right; follow it with broad editorial bands and varied left/right alignments rather than a centered card grid.
- **Signature elements:** Tinted glass service cards with specular edges and a soft light response; a translucent orbit/sphere motif; the custom V mark.
- **Interaction philosophy:** The page is calm and direct. Navigation uses clear anchors, the primary contact path opens a pre-addressed email, and social links go only to confirmed accounts. Service cards respond subtly to pointer movement without pretending to be links.
- **Animation:** Service cards reveal in a short stagger, lift and tilt slightly on hover, and let a restrained light reflection follow the pointer. Keep easing soft, settle cards smoothly, and honor `prefers-reduced-motion` by removing pointer-follow motion and reducing transitions to static surfaces.
- **Typography system:** DM Serif Display for expressive headlines; Manrope for readable body copy; Space Mono for compact navigation, labels, and metadata. Use fluid sizes and preserve line length on small screens.
- **Brand essence:** Vertigo AI makes ideas useful through websites and practical AI agents, for people looking to turn an idea into a digital tool. This audience phrasing is positioning copy, not a verified niche or customer segment.
- **Brand personality:** Thoughtful, practical, clear.
- **Brand voice:** Crisp, grounded, optimistic; avoid inflated AI claims and generic calls to action. Example lines: “Make the next idea useful.” and “A short note about the idea is enough to start.”
- **Wordmark & logo:** A refined uppercase VERTIGO wordmark paired with a simple custom V made from two curved strokes and a small orbital dot; keep the logo legible at favicon size.
- **Signature brand color:** Deep Tide Blue `#1D5D7C`, a portfolio-established color.

## Page content

1. **Hero:** Vertigo AI; “Websites and AI agents, made useful.” Keep the description concise. The “Talk about an idea” button has a supporting line: “A short note about the idea is enough to start.” Use the custom hero artwork as a decorative visual, not as a claim.
2. **Positioning:** Bridge an idea and a useful digital tool; name Sharif Mahmood as Vertigo AI's owner.
3. **Services:** Only “Websites” and “Practical AI agents,” described at a high level using the source's focus on clear interfaces and helpful workflows; use liquid-glass card treatments and staggered, reduced-motion-aware hover transitions.
4. **Principles:** Clear interface, helpful workflow, thoughtful technology; present as stated working priorities, not measured outcomes.
5. **Selected work:** Do not fabricate project cards or case studies. Explain that project stories will appear here as documented examples become available, or omit the section if it makes the page feel empty.
6. **About/contact:** A short factual creator story, `Vertigogrowth1@gmail.com`, and only confirmed X/GitHub accounts. Use concise, natural contact copy; exclude placeholder Telegram, Facebook, and LinkedIn entries.

## Implementation and structure

A small static Vite site using semantic HTML, CSS, and TypeScript/JavaScript; no server, database, login, or contact-form backend. Keep the layout in `index.html`, behavior and pointer-aware card response in `src/main.ts`, glass materials and responsive/reduced-motion styling in `src/style.css`, custom hero artwork referenced through managed storage, the local standalone brand icon in `public/assets/`, and the route declaration at `public/manus-routes.json`. Build output is `dist/`; serve Preview on the configured port 3000. The first delivery is a Preview, not a public launch.
