# Portfolio integration

The site is a personal, multidisciplinary portfolio. The approved home composition is the large supplied Little Bad Wolf image, concise introduction, and three compact entrances: games, interactive work, and art. The wolf is the personal home background, never a thumbnail assigned only to games. Category entrances may use restrained images but must not become three oversized page sections.

Visitors move through three layers: home identity and field entrances, curated visual field collections, then individual project stories, playable demos, videos, and printable paper-model downloads. The existing 37 browser projects, substantive Weebly projects, seven team credits, and eight complete paper models must all remain discoverable. Unfinished paper-model placeholders are not published as finished work.

Keep Markdown as the single authoring source. Add portfolio metadata to its front matter; build the catalog automatically. Preserve existing `/docs/<slug>` project URLs. Use a custom Docusaurus theme for project pages with no document sidebar, default template navbar, or repeated branding. Show personal involvement explicitly for company work. Retain source text where evidence does not justify adding claims.

All visual entry points need keyboard access, responsive crops, and meaningful titles. Provide search and collection filters for large collections, real links for navigation, gallery viewing, related projects, and visual download previews. Load offscreen imagery lazily. Do not auto-play videos, invent contact information, or use Unicode UI icons. Keep home identity visible once.

Verification: catalog tests cover invalid categories, duplicate IDs, absent local media, missing cover fallbacks, downloadable originals, and text search. Type-check and production build must pass. Inspect home, all collections, a browser project, a company credit, and a paper model with downloads at desktop and mobile widths. Work locally on `codex/portfolio-integration`; publication is separate from this implementation.
