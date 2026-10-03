import React, {type CSSProperties} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import {useHistory, useLocation} from '@docusaurus/router';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {copy} from './copy';
import {getCategory} from './config';
import {usePortfolio} from './usePortfolio';
import {FeaturedProject, ProjectCard} from './components';
import {selectProjects, updateFilterSearch} from '../../lib/selection.mjs';
import type {CategoryId} from './types';

export default function CollectionPage({categoryId}: {categoryId: CategoryId}) {
  const category = getCategory(categoryId);
  const projects = usePortfolio();
  const categoryUrl = useBaseUrl(category.path);
  const location = useLocation();
  const history = useHistory();
  const params = new URLSearchParams(location.search);
  const query = params.get('q') || '';
  const requestedGroup = params.get('group') || 'all';
  const group = requestedGroup in category.groups ? requestedGroup : 'all';
  const setFilter = (key: 'q' | 'group', value: string) => {
    history.replace({pathname: location.pathname, search: updateFilterSearch(location.search, key, value)});
  };
  const results = selectProjects(projects, categoryId, group, query);
  const lead = !query.trim() && group === 'all' ? results.find(project => project.id === category.leadProject) : undefined;
  const backdrop = projects.find(project => project.id === category.background.project);
  // A hero can present the lead work itself; don't repeat the same image immediately below.
  const heroIsLead = lead?.id === backdrop?.id;
  const backdropStyle = {'--collection-image-position': category.background.position, '--collection-image-mobile-position': category.background.mobilePosition, '--collection-image-fit': category.background.fit ?? 'cover', '--collection-image-mobile-fit': category.background.mobileFit ?? category.background.fit ?? 'cover'} as CSSProperties;
  const grid = results.filter(project => project.id !== lead?.id);
  const groups = Object.entries(category.groups).filter(([id]) => projects.some(project => project.category === categoryId && project.group === id));
  return <Layout title={category.title} description={category.description}>
    <main className={`collection-page category-${categoryId}`}>
      <header className="collection-hero" style={backdropStyle}>
        {backdrop?.cover && <img className="collection-background" src={backdrop.cover} alt="" fetchPriority="high"/>}
        <div className="page-shell collection-hero-inner">
          <div className="collection-heading"><h1>{category.title}</h1><p>{category.description}</p></div>
          {backdrop && <Link to={backdrop.url} className="collection-hero-link"><span>{backdrop.title}</span><span className="text-link">{copy('portfolio.work.open')}</span></Link>}
        </div>
      </header>
      <div className="page-shell collection-content">
      {lead && !heroIsLead && <FeaturedProject project={lead}/>}
      <section className="collection-works" aria-label={copy('portfolio.collection.label', {category: category.title})}>
        <div className="collection-controls">
          <div className="group-filters" aria-label={copy('portfolio.collection.filters')}>{groups.length > 1 && <>
            <button aria-pressed={group === 'all'} onClick={() => setFilter('group', 'all')}>{copy('portfolio.collection.all')}</button>
            {groups.map(([id, label]) => <button key={id} aria-pressed={group === id} onClick={() => setFilter('group', id)}>{label}</button>)}</>}
          </div>
          <label className="work-search"><span className="sr-only">{copy('portfolio.collection.searchLabel', {category: category.title})}</span><input type="search" placeholder={copy('portfolio.collection.searchPlaceholder')} value={query} onChange={event => setFilter('q', event.target.value)}/></label>
        </div>
        <p className="result-count" aria-live="polite">{copy(results.length === 1 ? 'portfolio.collection.count.one' : 'portfolio.collection.count.other', {count: results.length})}{lead ? copy('portfolio.collection.includesFeatured') : ''}</p>
        {grid.length ? <div className="project-grid">{grid.map(project => <ProjectCard key={project.id} project={project}/>)}</div> : !lead &&
          <div className="empty-results"><h2>{copy('portfolio.collection.emptyTitle')}</h2><p>{copy('portfolio.collection.emptyDescription')}</p><button className="action" onClick={() => history.replace(categoryUrl)}>{copy('portfolio.collection.reset')}</button></div>}
      </section>
    </div></main>
  </Layout>;
}
