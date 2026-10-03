/** Translations own words, never project identity, targets, media or ordering. */
const fields = new Set(['role', 'links', 'gallery', 'downloads', 'media_sources']);
/** Match navigation against canonical paths without mistaking /english for /en/. */
export function canonicalPath(pathname, baseUrl) {
  const base = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
  return pathname.startsWith(base) ? `/${pathname.slice(base.length)}` : pathname;
}
function text(value, context) {
  if (typeof value !== 'string' || !value.trim()) throw new Error(`${context}: missing translated text`);
  return value;
}
function labelMap(items, map = {}, translateItem, context) {
  if (!map || typeof map !== 'object' || Array.isArray(map)) throw new Error(`${context}: expected a translation map`);
  const known = new Set(items.map(item => item.id));
  for (const key of Object.keys(map)) if (!known.has(key)) throw new Error(`${context}: unknown identity ${key}`);
  return items.map(item => translateItem(item, map[item.id], `${context} ${item.id}`));
}
export function localizeProject(project, {data, content}) {
  const context = project.id;
  const copy = data.portfolio ?? {};
  if (!copy || typeof copy !== 'object' || Array.isArray(copy)) throw new Error(`${context}: expected portfolio translation map`);
  for (const key of Object.keys(copy)) if (!fields.has(key)) throw new Error(`${context}: translations cannot override ${key}`);
  text(content, `${context} body`);
  return {...project, title: text(data.title, `${context} title`), summary: text(data.description, `${context} description`),
    role: project.role ? text(copy.role, `${context} role`) : null,
    links: labelMap(project.links, copy.links, (item, value, ctx) => ({...item, label: text(value, ctx)}), `${context} links`),
    gallery: labelMap(project.gallery, copy.gallery, (item, value, ctx) => ({...item, alt: text(value, ctx)}), `${context} gallery`),
    mediaSources: labelMap(project.mediaSources, copy.media_sources, (item, value, ctx) => ({...item, label: text(value, ctx)}), `${context} media_sources`),
    downloads: labelMap(project.downloads, copy.downloads, (item, value, ctx) => {
      if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error(`${ctx}: missing download label map`);
      for (const key of Object.keys(value)) if (!['label', 'version'].includes(key)) throw new Error(`${ctx}: cannot override ${key}`);
      return {...item, label: text(value.label, `${ctx} label`), ...(item.version ? {version: text(value.version, `${ctx} version`)} : {})};
    }, `${context} downloads`),
  };
}
