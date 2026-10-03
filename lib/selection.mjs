/** Collection and related-work selection share the same authored catalog. */
export function selectProjects(projects, category, group = 'all', query = '') {
  const search = query.trim().toLocaleLowerCase();
  return projects.filter(project => project.category === category
    && (group === 'all' || project.group === group)
    && (!search || `${project.title} ${project.summary}`.toLocaleLowerCase().includes(search)));
}
export function relatedProjects(projects, current, limit) {
  return projects.filter(project => project.category === current.category && project.id !== current.id)
    .sort((a, b) => Number(b.group === current.group) - Number(a.group === current.group) || a.order - b.order)
    .slice(0, limit);
}

/** 'all' is a group sentinel, and remains a valid literal search query. */
export function updateFilterSearch(search, key, value) {
  const next = new URLSearchParams(search);
  if (value && !(key === 'group' && value === 'all')) next.set(key, value);
  else next.delete(key);
  return next.size ? `?${next}` : '';
}
