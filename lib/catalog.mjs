import {readFile, readdir, access} from 'node:fs/promises';
import {join, relative, posix} from 'node:path';
import matter from 'gray-matter';
import {createRequire} from 'node:module';
import {localizeProject} from './localization.mjs';
const require = createRequire(import.meta.url);
const settings = require('../portfolio.settings.json');
const getSlug = require('@docusaurus/plugin-content-docs/lib/slug.js').default;
const {DefaultNumberPrefixParser, stripPathNumberPrefixes} = require('@docusaurus/plugin-content-docs/lib/numberPrefix.js');

const categories = new Set(['games', 'interaction', 'art']);

/** Use the pinned docs plugin's path rules so catalog links match native Markdown routes. */
function documentIdentity(data, fileId) {
  const source = `${fileId}.md`;
  const sourceDirName = posix.dirname(fileId);
  const parsePrefixes = data.parse_number_prefixes ?? true;
  const baseID = data.id ?? (parsePrefixes ? DefaultNumberPrefixParser(posix.basename(fileId)).filename : posix.basename(fileId));
  if (typeof baseID !== 'string' || !baseID || baseID.includes('/')) throw new Error(`${fileId}: invalid document id`);
  const directory = parsePrefixes ? stripPathNumberPrefixes(sourceDirName, DefaultNumberPrefixParser) : sourceDirName;
  const id = [directory === '.' ? '' : directory, baseID].filter(Boolean).join('/');
  const slug = getSlug({baseID, source, sourceDirName, frontMatterSlug: data.slug, stripDirNumberPrefixes: parsePrefixes});
  return {id, url: `/docs${slug === '/' ? '' : slug}`};
}
/** IDs remain stable when editors replace media, change URLs, or reorder items. */
function validateItemIds(items, context) {
  const ids = new Set();
  for (const item of items) {
    if (typeof item.id !== 'string' || !item.id.trim()) throw new Error(`${context}: missing stable item id`);
    if (ids.has(item.id)) throw new Error(`${context}: duplicate item id ${item.id}`);
    ids.add(item.id);
  }
}

/** Markdown is the authoring source; catalog data is derived at build time. */
export function buildProject(source, id) {
  const {data, content} = matter(source);
  const meta = data.portfolio;
  if (!meta) return null;
  if (!categories.has(meta.category)) throw new Error(`${id}: unknown portfolio category ${meta.category}`);
  const links = meta.links ?? [];
  const mediaSources = meta.media_sources ?? [];
  for (const link of [...links, ...mediaSources]) {
    if (!/^https?:\/\//.test(link.url)) throw new Error(`${id}: invalid action URL ${link.url}`);
  }
  // An explicit null is an editorial decision, not a request for an image fallback.
  const cover = Object.hasOwn(meta, 'cover') ? meta.cover : content.match(/!\[[^\]]*\]\(([^)]+)\)/)?.[1] ?? null;
  for (const field of ['links', 'media_sources', 'gallery', 'downloads']) validateItemIds(meta[field] ?? [], `${id} ${field}`);
  const identity = documentIdentity(data, id);
  return {
    ...identity, title: data.title ?? content.match(/^# (.+)$/m)?.[1] ?? id,
    summary: data.description ?? meta.summary ?? '', category: meta.category,
    group: meta.group ?? 'exploration', cover, coverFit: meta.cover_fit ?? 'cover', coverPosition: meta.cover_position ?? '50% 50%',
    year: meta.year ?? null, role: meta.role ?? null, platforms: meta.platforms ?? [],
    featured: meta.featured ?? false, order: meta.order ?? 100,
    links, mediaSources, gallery: meta.gallery ?? [], videos: meta.videos ?? [], downloads: meta.downloads ?? [],
  };
}

async function markdownFiles(dir) {
  const entries = await readdir(dir, {withFileTypes: true});
  const files = await Promise.all(entries.map(entry => entry.isDirectory()
    ? markdownFiles(join(dir, entry.name))
    : /\.mdx?$/.test(entry.name) ? [join(dir, entry.name)] : []));
  return files.flat();
}

export async function readCatalog(root, {locale = settings.defaultLocale, defaultLocale = settings.defaultLocale} = {}) {
  const docs = join(root, 'docs');
  const files = await markdownFiles(docs);
  const translated = locale !== defaultLocale;
  const translatedRoot = join(root, 'i18n', locale, 'docusaurus-plugin-content-docs/current');
  const canonicalTitles = new Map();
  if (translated) {
    const known = new Set(files.map(file => relative(docs, file)));
    let translations = [];
    try { translations = await markdownFiles(translatedRoot); } catch (error) { if (error.code !== 'ENOENT') throw error; }
    for (const file of translations) if (!known.has(relative(translatedRoot, file))) throw new Error(`orphan translation: ${relative(translatedRoot, file)}`);
  }
  const projects = (await Promise.all(files.map(async file => {
    const fileId = relative(docs, file).replace(/\.mdx?$/, '');
    const project = buildProject(await readFile(file, 'utf8'), fileId);
    if (project) canonicalTitles.set(project.id, project.title);
    if (!project || !translated) return project;
    let translation;
    try { translation = await readFile(join(translatedRoot, relative(docs, file)), 'utf8'); }
    catch (error) { if (error.code !== 'ENOENT') throw error; throw new Error(`${project.id}: missing translation for ${locale}`); }
    const translatedDocument = matter(translation);
    const identity = documentIdentity(translatedDocument.data, fileId);
    if (identity.id !== project.id || identity.url !== project.url) throw new Error(`${project.id}: translation document identity does not match canonical id/slug (${locale})`);
    return localizeProject(project, translatedDocument);
  }))).filter(Boolean);
  const routes = new Set();
  for (const project of projects) {
    if (routes.has(project.url)) throw new Error(`Duplicate portfolio route: ${project.url}`);
    routes.add(project.url);
    const assets = [project.cover, ...project.gallery.map(image => image.src),
      ...project.downloads.flatMap(download => [download.file, download.preview])].filter(Boolean);
    for (const asset of assets) {
      if (!asset.startsWith('/') || asset.includes('..')) throw new Error(`${project.id}: invalid local media ${asset}`);
      try { await access(join(root, 'static', asset)); }
      catch { throw new Error(`${project.id}: missing local media ${asset}`); }
    }
  }
  // Tie-breaking uses the authored source order, so language changes never reshuffle a collection.
  return projects.sort((a, b) => a.order - b.order || canonicalTitles.get(a.id).localeCompare(canonicalTitles.get(b.id)));
}
