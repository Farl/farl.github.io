# Portfolio Integration Implementation Plan

> **For agentic workers:** Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox syntax for tracking.

**Goal:** Integrate the recovered personal works and existing browser projects into an inviting, maintainable visual portfolio.

**Architecture:** A Docusaurus content plugin creates typed catalog data from Markdown front matter. Shared React components render the approved home, field collections, and project detail pages. Original project routes remain available while migrated downloads are served locally.

**Tech Stack:** Existing Docusaurus 3.9.2, React 19, TypeScript, CSS, Node tests, gray-matter 4.0.3 already present in the dependency tree.

**Spec:** `docs/superpowers/specs/2026-10-03-portfolio-design.md`

## Global Constraints

- Preserve the large wolf home background and compact category entrances.
- One visible personal wordmark; no Unicode UI icons.
- Markdown is the source of project content and metadata; no duplicate hand-maintained catalog.
- Preserve `/docs/<slug>` routes and source download files.
- No publication or unsolicited external messaging.

## Review Focus

- Local media paths: missing files fail catalog loading with the project ID.
- Incomplete projects: empty Weebly placeholders are excluded.
- Mixed media: projects without a screenshot have a deliberate text or video fallback.
- Narrow screens: text and touch controls reflow without horizontal overflow.
- Project credit: team work lists the supplied role rather than claiming sole authorship.

## Tasks

### Task 1: Catalog and source migration

Files: `lib/catalog.mjs`, `lib/catalog.test.mjs`, `plugins/portfolio/index.cjs`, `docs/*.md`, `static/img/works/`, `static/downloads/paper/`.

- [x] Test the source contract with `node --test lib/catalog.test.mjs`: duplicate IDs, unsupported category, missing local media, first-image fallback, original downloads.
- [x] Implement `readCatalog(root): Promise<Project[]>` and `buildProject(source, filename): Project | null`; the latter skips Markdown without portfolio metadata.
- [x] Migrate substantive Weebly content, optimize display images, preserve original downloadable sheets, add metadata to all existing projects.
- [x] Load catalog data through Docusaurus `setGlobalData`; watch Markdown files for authoring changes.

### Task 2: Shared portfolio presentation

Files: `src/portfolio/{types,config,components}.tsx`, `src/css/custom.css`, `src/theme/{Navbar,Footer,DocRoot/Layout,DocItem/Layout}/index.tsx`, `src/pages/index.tsx`.

- [x] Render the original large home composition with the supplied wolf asset and compact image entrances.
- [x] Replace stock chrome with shared navigation and understated contact footer.
- [x] Render detail covers, role facts, Markdown, gallery dialog, video links, download previews, and related works from catalog data.
- [x] Run `npm run typecheck` and verify home identity appears once.

### Task 3: Visual collections and navigation

Files: `src/portfolio/CollectionPage.tsx`, `src/pages/{games,interaction,art,about}.tsx`.

- [x] Put a curated lead project before the visual collection, with smaller previews encouraging further exploration.
- [x] Filter by real work group and title/summary search; show result count and clear empty state.
- [x] Use real local project links, preserve reader history, and provide related-project paths.
- [x] Verify all catalog entries are reachable and all downloads are served locally.

### Task 4: Verification and handoff

Files: `README.md`, `docs/superpowers/progress.md`.

- [x] Document the front-matter template and image/download maintenance workflow.
- [x] Run catalog tests, `npm run typecheck`, and `npm run build`; inspect generated routes and local assets.
- [x] Review the completed code, address material findings, and verify collection controls and representative detail pages in Chrome at desktop/mobile widths.
- [x] Replace the temporary concept server with the implemented website preview at the same local URL; keep the user's browser tab open.
