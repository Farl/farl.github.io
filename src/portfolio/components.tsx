import React, {useRef, useState, type ReactNode} from 'react';
import Link from '@docusaurus/Link';
import {useLocation} from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {canonicalPath} from '../../lib/localization.mjs';
import {LanguageSwitch} from './LanguageSwitch';
import {copy} from './copy';
import MDXContent from '@theme/MDXContent';
import {categories, getCategory, site} from './config';
import {usePortfolio} from './usePortfolio';
import {relatedProjects} from '../../lib/selection.mjs';
import type {GalleryImage, Project} from './types';

export function SiteHeader() {
  const {pathname} = useLocation();
  const {siteConfig: {baseUrl}} = useDocusaurusContext();
  const activePath = canonicalPath(pathname, baseUrl);
  const home = activePath === '/';
  return <header className={`site-header${home ? ' on-home' : ''}`}>
    <div className="site-header-inner">
      <Link to="/" className="wordmark" aria-label={copy('portfolio.nav.home', {name: site.name})}>{site.name}</Link>
      <div className="header-navigation"><nav aria-label={copy('portfolio.nav.main')}>{categories.map(category =>
        <Link key={category.id} to={category.path} aria-current={activePath === category.path ? 'page' : undefined}>{category.shortTitle}</Link>)}
        <Link to="/about" aria-current={activePath === '/about' ? 'page' : undefined}>{copy('portfolio.about.title')}</Link>
      </nav><LanguageSwitch/></div>
    </div>
  </header>;
}
export function SiteFooter() {
  return <footer className="site-footer"><div className="site-footer-inner">
    <p>{copy('portfolio.footer.message')}</p>
    <div className="contact-links">{site.contacts.map(contact =>
      <a key={contact.label} href={contact.url} target="_blank" rel="noopener noreferrer">{contact.label}</a>)}
    </div>
  </div></footer>;
}

/** Unillustrated team credits stay typographic rather than borrowing unrelated art. */
export function ProjectArtwork({project, eager = false}: {project: Project; eager?: boolean}) {
  return project.cover ? <img src={project.cover} alt="" loading={eager ? 'eager' : 'lazy'}
    style={{objectPosition: project.coverPosition, objectFit: project.coverFit}} /> :
    <div className={`artwork-type ${project.group === 'independent' ? 'independent-art' : ''}`}>
      <span>{project.year || getCategory(project.category).groups[project.group]}</span>
      <strong>{project.title}</strong><small>{project.role || getCategory(project.category).defaultRole}</small>
    </div>;
}
export function ProjectCard({project}: {project: Project}) {
  const category = getCategory(project.category);
  return <Link to={project.url} className={`project-card category-${project.category}`}>
    <div className="card-art"><ProjectArtwork project={project}/></div>
    <div className="card-copy"><p className="work-meta">{category.groups[project.group]}{project.year ? ` / ${project.year}` : ''}</p>
      <h3>{project.title}</h3><p>{project.summary}</p>
      {project.role && <span className="credit">{project.role}</span>}
    </div>
  </Link>;
}
export function ActionLinks({project}: {project: Project}) {
  return <div className="action-links">{project.links.map((link, index) =>
    <a key={link.id} className={index === 0 ? 'action primary' : 'action'} href={link.url} target="_blank" rel="noopener noreferrer">{link.label}</a>)}</div>;
}
export function FeaturedProject({project}: {project: Project}) {
  return <Link to={project.url} className={`featured-work category-${project.category}`}>
    <div className="featured-art"><ProjectArtwork project={project} eager/></div>
    <div className="featured-copy"><p className="work-meta">{getCategory(project.category).groups[project.group]}{project.year ? ` / ${project.year}` : ''}</p>
      <h2>{project.title}</h2><p>{project.summary}</p><span className="text-link">{copy('portfolio.work.open')}</span></div>
  </Link>;
}

export function ImageGallery({images, title = copy('portfolio.gallery.title'), featured = false}: {images: GalleryImage[]; title?: string; featured?: boolean}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [active, setActive] = useState(0);
  if (!images.length) return null;
  const show = (index: number) => {setActive(index); dialog.current?.showModal();};
  const move = (direction: number) => setActive(index => (index + direction + images.length) % images.length);
  return <section className={`media-section${featured ? ' featured-gallery' : ''}`}>{!featured && <div className="section-heading"><h2>{title}</h2><span>{copy('portfolio.gallery.enlargeHint')}</span></div>}
    <div className="image-gallery">{images.map((image, index) =>
      <button key={image.id ?? image.src} className={`gallery-thumb${featured && index === 0 ? ' gallery-cover' : ''}`} onClick={() => show(index)} aria-label={copy('portfolio.gallery.enlarge', {alt: image.alt})}>
        <img src={image.src} alt={image.alt} loading={featured && index === 0 ? 'eager' : 'lazy'}/></button>)}</div>
    <dialog ref={dialog} className="image-dialog" aria-label={title} onClick={event => {if (event.target === event.currentTarget) dialog.current?.close();}}
      onKeyDown={event => {if (event.key === 'ArrowLeft') move(-1); if (event.key === 'ArrowRight') move(1);}}>
      <div className="dialog-controls"><span>{active + 1} / {images.length}</span><button onClick={() => dialog.current?.close()}>{copy('portfolio.gallery.close')}</button></div>
      <img src={images[active].src} alt={images[active].alt}/>
      <div className="dialog-caption"><p>{images[active].alt}</p>{images.length > 1 && <div>
        <button onClick={() => move(-1)}>{copy('portfolio.gallery.previous')}</button><button onClick={() => move(1)}>{copy('portfolio.gallery.next')}</button></div>}</div>
    </dialog>
  </section>;
}
export function ProjectVideo({id, paper}: {id: string; paper: boolean}) {
  const [playing, setPlaying] = useState(false);
  const label = copy(paper ? 'portfolio.video.assembly' : 'portfolio.video.demo');
  return <div className="video-frame">{playing ?
    <iframe src={`https://www.youtube-nocookie.com/embed/${id}`} title={label} allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowFullScreen/> :
    <button className="video-launch" onClick={() => setPlaying(true)}><span>{label}</span><strong>{copy('portfolio.video.watch')}</strong><small>YouTube</small></button>}</div>;
}
export function DownloadSheets({project}: {project: Project}) {
  if (!project.downloads.length) return null;
  return <section className="media-section" id="downloads"><div className="section-heading"><h2>{copy('portfolio.sheets.title')}</h2><span>{copy(project.downloads.length === 1 ? 'portfolio.sheets.count.one' : 'portfolio.sheets.count.other', {count: project.downloads.length})}</span></div>
    <p className="section-description">{copy('portfolio.sheets.description')}</p>
    <div className="download-grid">{project.downloads.map(sheet => <a key={sheet.id} href={sheet.file} download className="download-card">
      {sheet.preview && <img src={sheet.preview} alt={copy('portfolio.sheets.preview', {label: sheet.label})} loading="lazy"/>}
      <div><span className="work-meta">{sheet.version}</span><h3>{sheet.label}</h3><span className="text-link">{copy('portfolio.sheets.download')}</span></div>
    </a>)}</div>
  </section>;
}
export function ProjectDetail({project, children}: {project: Project; children: ReactNode}) {
  const projects = usePortfolio();
  const category = getCategory(project.category);
  const related = relatedProjects(projects, project, site.relatedLimit);
  const media = project.cover ? [{src: project.cover, alt: project.gallery.find(image => image.src === project.cover)?.alt || copy('portfolio.work.coverAlt', {title: project.title})},
    ...project.gallery.filter(image => image.src !== project.cover)] : project.gallery;
  return <article className={`project-detail category-${project.category}`}>
    <div className="page-shell">
      <Link to={category.path} className="back-link">{copy('portfolio.work.back', {category: category.title})}</Link>
      <header className="project-heading"><p className="work-meta">{category.groups[project.group]}</p><h1>{project.title}</h1><p className="project-summary">{project.summary}</p>
        <dl className="project-facts">{project.year && <div><dt>{copy('portfolio.work.year')}</dt><dd>{project.year}</dd></div>}{project.role && <div><dt>{copy('portfolio.work.role')}</dt><dd>{project.role}</dd></div>}
          {!!project.platforms.length && <div><dt>{copy('portfolio.work.platforms')}</dt><dd>{project.platforms.join(' / ')}</dd></div>}</dl>
        <ActionLinks project={project}/>{!!project.downloads.length && <a className="action primary" href="#downloads">{copy('portfolio.work.choosePattern')}</a>}
      </header>
      <ImageGallery images={media} featured={!!project.cover}/>
      {!!project.mediaSources.length && <p className="media-credits">{copy('portfolio.work.sources')}{project.mediaSources.map(source =>
        <a key={source.id} href={source.url} target="_blank" rel="noopener noreferrer">{source.label}</a>)}</p>}
      <div className="project-body markdown"><MDXContent>{children}</MDXContent></div>
      {!!project.videos.length && <section className="media-section"><h2>{copy(project.category === 'art' ? 'portfolio.work.assemblyHeading' : 'portfolio.work.videoHeading')}</h2>
        <div className="video-grid">{project.videos.map(id => <ProjectVideo key={id} id={id} paper={project.category === 'art'}/>)}</div></section>}
      <DownloadSheets project={project}/>
      {!!related.length && <section className="related-section"><div className="section-heading"><h2>{copy('portfolio.work.related')}</h2><Link to={category.path}>{copy('portfolio.work.viewAll', {category: category.title})}</Link></div>
        <div className="project-grid">{related.map(item => <ProjectCard key={item.id} project={item}/>)}</div></section>}
    </div>
  </article>;
}
