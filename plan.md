# Vertigo AI website plan

## Product scope and evidence

Build a source-faithful public-facing homepage for Vertigo AI, based on Sharif Mahmood's connected portfolio source. The portfolio identifies Sharif as owner of Vertigo AI and says he builds websites and practical AI agents. It emphasizes making ideas clear and useful through clear interfaces, helpful workflows, and technology that earns its place. The verified inquiry address is `Vertigogrowth1@gmail.com`; the verified public profiles are X (`@Humbledanteh1`) and GitHub (`Humbledanteh1`). The portfolio source contains no named case studies, customer outcomes, pricing, industry claims, or further package/service details. Do not invent any of these. No backend is needed; the contact action is a mailto link.

## Design direction

- **Design movement:** Quiet-future editorial; a human, considered digital-studio identity rather than a generic AI/SaaS dashboard.
- **Core principles:** Lead with one clear idea; communicate practical usefulness; keep visual effects restrained; make every action and section easy to scan.
- **Color philosophy:** Deep ocean blue carries focus and continuity with the portfolio; warm off-white keeps the reading experience approachable; pale lime is a small, ownable signal for links and emphasis; cool glass-blue adds depth without making technology feel cold.
- **Layout paradigm:** Asymmetric split hero with text and a custom visual anchored to opposite sides; follow it with broad editorial bands and varied left/right alignments rather than a centered card grid.
- **Signature elements:** A translucent orbit/sphere motif; a custom V mark with a subtle orbital accent; thin monospaced section labels and hairline separators.
- **Interaction philosophy:** The page is calm and direct. Navigation uses clear anchors, the primary contact path opens a pre-addressed email, and social links go only to confirmed accounts.
- **Animation:** Gentle reveal on scroll and a slow orbit/glint on the hero art, with restrained hover transitions. Honor `prefers-reduced-motion` and avoid motion that delays reading or contact.
- **Typography system:** DM Serif Display for expressive headlines; Manrope for readable body copy; Space Mono for compact navigation, labels, and metadata. Use fluid sizes and preserve line length on small screens.
- **Brand essence:** Vertigo AI makes ideas useful through websites and practical AI agents, for people looking to turn an idea into a digital tool. This audience phrasing is positioning copy, not a verified niche or customer segment.
- **Brand personality:** Thoughtful, practical, clear.
- **Brand voice:** Crisp, grounded, optimistic; avoid inflated AI claims and generic calls to action. Example lines: “Make the next idea useful.” and “A clearer path from idea to digital tool.”
- **Wordmark & logo:** A refined uppercase VERTIGO wordmark paired with a simple custom V made from two curved strokes and a small orbital dot; keep the logo legible at favicon size.
- **Signature brand color:** Deep Tide Blue `#1D5D7C`, a portfolio-established color.

## Page content

1. **Hero:** Vertigo AI; “Websites and AI agents, made useful.” Short source-backed description and a direct “Talk about an idea” email CTA. Use the custom hero artwork as a decorative visual, not as a claim.
2. **Positioning:** Bridge an idea and a useful digital tool; name Sharif Mahmood as Vertigo AI's owner.
3. **Services:** Only “Websites” and “Practical AI agents,” described at a high level using the source's focus on clear interfaces and helpful workflows.
4. **Principles:** Clear interface, helpful workflow, thoughtful technology; present as stated working priorities, not measured outcomes.
5. **Selected work:** Do not fabricate project cards or case studies. Explain that project stories will appear here as documented examples become available, or omit the section if it makes the page feel empty.
6. **About/contact:** A short factual creator story, `Vertigogrowth1@gmail.com`, and only confirmed X/GitHub accounts. Exclude placeholder Telegram, Facebook, and LinkedIn entries.

## Implementation and structure

A small static Vite site using semantic HTML, CSS, and TypeScript/JavaScript; no server, database, login, or contact-form backend. Keep the layout in `index.html`, behavior in `src/main.ts`, visual tokens and responsive design in `src/style.css`, generated artwork in `public/assets/`, and the route declaration at `public/manus-routes.json`. Build output is `dist/`; serve Preview on the configured port 3000. The first delivery is a Preview, not a public launch.
