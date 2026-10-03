# Portfolio bilingual implementation plan

> Execution: implement inline using executing-plans; perform one fresh independent review after verification. User authorization and the developer's autonomy requirements permit completing the requested framework without additional approval gates.

**Goal:** Apply Farl. Lee branding and complete maintainable Traditional Chinese/English support.
**Architecture:** Native Docusaurus locales, typed UI dictionaries, canonical project metadata plus strictly validated translated Markdown label overlays.
**Tech stack:** Existing Docusaurus 3.9.2, React 19, TypeScript 5.6, Node test runner; no new runtime dependency.
**Spec:** ../specs/2026-10-03-portfolio-i18n.md

## Constraints and review focus

- Preserve existing Chinese URLs, media, layout, author facts and downloads.
- No Unicode UI icons; branding and locale definitions have one source.
- Changing one canonical asset must update both locales without editing English metadata.
- Missing or orphan English works and malformed label maps must fail clearly.
- Locale switch retains project route, search parameters and hash; filter reset stays in locale.
- English text must fit compact category entrances and 320px navigation.
- SEO must emit two correct locale alternates, canonical URLs and document languages.

## Tasks

- [x] Add failing catalog tests for translated metadata, invariant assets, missing/orphan translations and structural override rejection; add pure path normalization tests. Implement locale overlay loader, shared settings and native plugin locale integration. Run npm test.
- [x] Add complete native UI dictionaries with typed keys and placeholder parity tests. Localize config, page/components, accessible labels and phrase templates; add a restrained language control and locale-aware active navigation/filter reset. Run typecheck and tests.
- [x] Translate every current work with minimal textual overlays; retain all original long stories, sheet variant names, caption meaning and source attribution. Validate complete coverage and build both locales.
- [x] Document bilingual authoring, validation and preview. Run complete tests/typecheck/build, inspect output SEO and all translated routes, serve the full build at the existing preview URL, test real Chrome desktop/mobile flows, capture proof and obtain independent review.

Independent review: two Important findings fixed and re-reviewed (permanent item IDs and effective native document identity checks); no outstanding important issues. Final verification: 29 tests, typecheck and both locale builds pass. Chrome verifies page/query/hash-preserving switches, English gallery and original downloads, 320px layouts and restored desktop viewport.
