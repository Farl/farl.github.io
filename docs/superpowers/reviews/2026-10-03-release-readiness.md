# Release readiness review — 2026-10-03

Decision: ready for a production merge, subject to GitHub PR checks passing and the owner's final release approval. The public site has not been replaced during this review.

## Scope and resolved findings

- Independently reviewed catalog generation, localization, native routes, SEO, downloads, accessible interactions and deployment permissions. No Critical or Important findings remain.
- Fixed the search query `all` being mistaken for the group-reset sentinel; added a regression test.
- Excluded the unused Markdown example page from both locale builds. Internal `superpowers/**` documents remain excluded.
- Added tests and type checking to the Pages workflow. Pull requests build with read-only permissions; only main can deploy. Deployment jobs alone receive Pages write and OIDC permissions.
- Pinned the CI runtime through `.nvmrc` to Node 24 LTS; verified a clean install with Node 24.21.0.
- Updated compatible dependency patches, with documented `serialize-javascript` and `qs` overrides, while retaining Docusaurus 3.9.2.
- Added a configured PNG social-sharing image and corrected tablet hero cropping.

## Verification evidence

- Clean `npm ci`, `npm test` (30/30), `npm run typecheck`, and production builds for both languages succeed under Node 24.
- All 54 projects have both language routes (108 project pages). An independent review checked native identities, language tags, canonicals and alternate-language metadata.
- Final output contains 122 HTML files; all local HTML href/src/fragment targets resolve. Template pages and internal review/planning documents are absent from the public sitemap.
- Both home sharing-image URLs point to existing emitted PNG files.
- All 36 recovered downloadable sheets preserve their original SHA256 bytes; independent review checked their sources against output.
- 79 unique experience/store/action URLs returned 2xx/3xx in a HEAD check. This is reachability evidence, not a full interaction test of every external application.
- Real Chrome verifies the home composition at desktop, 768px and 320px; English mobile collection has no horizontal overflow. Search `all` persists and returns matches. Earlier browser checks also cover language/query/hash retention, filtering/back navigation, galleries, click-to-load video and original-sheet downloads. Temporary viewport override was reset.
- `git diff --check` passes. No detected secret-key patterns in staged product sources.
- GitHub Pages uses workflow deployment, HTTPS is enforced, and main is the production branch. Publishing requires a main merge; the feature branch and PR do not publish.

## Remaining dependency advisories

The final audit is **not clean**: 36 affected-package entries (0 critical, 34 high, 2 moderate). Most entries are downstream propagation of three underlying dependencies:

| Dependency | Advisory and available fix | Assessed exposure in this repository |
| --- | --- | --- |
| braces 3.0.3 | [GHSA-vfj7-8cjw-p6xm](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm), deeply nested glob stack exhaustion; no patched release at review time | Build-time file matching uses repository-controlled patterns. The deployed static site accepts no glob input. |
| http-cache-semantics 4.2.0 | [GHSA-ch52-4w7c-c8xp](https://github.com/advisories/GHSA-ch52-4w7c-c8xp), shared-cache response reuse; no patched release at review time | Tooling HTTP-cache dependency. GitHub Pages runs no project Node service or authenticated shared application cache. |
| uuid 8.3.2 | [GHSA-w5hq-g745-h8pq](https://github.com/advisories/GHSA-w5hq-g745-h8pq), optional output-buffer bounds | Transitive development-server/SockJS dependency. That Node service is not deployed. Avoid an untested cross-major override solely to hide the warning. |

Exposure assessment is an inference from dependency paths and the static deployment model. No public-site trigger was identified; this is not proof that every dependency is vulnerability-free. Monitor upstream patches, and rerun audit/tests/typecheck/build when changing the lockfile. Do not expose the development server as production hosting.

## Release and rollback

Merge the reviewed PR to main to trigger the tested Pages workflow. Confirm the workflow's deployment success and directly check `/`, `/en/`, a category, a bilingual project and an original download on HTTPS before calling the release complete. Reverting the release commit/merge through a new main commit rebuilds the previous site; the original sources remain in Git history.
