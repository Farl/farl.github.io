import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import {categories, site} from '../portfolio/config';
import {usePortfolio} from '../portfolio/usePortfolio';
import {copy} from '../portfolio/copy';

export default function Home() {
  const projects = usePortfolio();
  return <Layout title={copy('portfolio.home.title')} description={site.introduction}>
    <main className="home-page">
      <section className="home-hero">
        <picture><source media="(max-width: 650px)" srcSet={site.heroMobile}/>
          <img className="wolf-background" src={site.hero} alt={copy('portfolio.home.wolfAlt')} fetchPriority="high"/>
        </picture>
        <div className="home-inner"><div className="home-copy"><h1>{site.headline.map(line => <span key={line}>{line}</span>)}</h1><p>{site.introduction}</p></div>
          <nav className="domain-entrances" aria-label={copy('portfolio.home.domains')}>{categories.map(category => {
            const cover = projects.find(project => project.id === category.entranceProject)?.cover;
            return <Link key={category.id} className={`domain-entrance entrance-${category.id}`} to={category.path}>
              {cover && <img src={cover} alt=""/>}<div><h2>{category.shortTitle}</h2><p>{category.entranceSummary}</p><span>{copy('portfolio.work.explore')}</span></div>
            </Link>;
          })}</nav>
        </div>
      </section>
      <section className="home-about page-shell"><p>{site.about}</p><Link className="text-link" to="/about">{copy('portfolio.home.meet')}</Link></section>
    </main>
  </Layout>;
}
