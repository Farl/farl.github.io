import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import {categories, site} from '../portfolio/config';
import {copy} from '../portfolio/copy';
export default function About() {
  return <Layout title={copy('portfolio.about.title')} description={site.about}><main className="page-shell about-page">
    <div className="about-portrait"><img src={site.portrait} alt={copy('portfolio.about.portraitAlt', {name: site.name})}/></div>
    <div className="about-copy"><p className="work-meta">{copy('portfolio.about.eyebrow')}</p><h1>{copy('portfolio.about.headline.first')}<br/>{copy('portfolio.about.headline.second')}</h1><p>{site.about}</p><p>{site.introduction}</p>
      <nav className="about-fields" aria-label={copy('portfolio.about.fields')}>{categories.map(category => <Link key={category.id} to={category.path}>{category.title}</Link>)}</nav>
      <div className="contact-links">{site.contacts.map(contact => <a key={contact.label} href={contact.url} target="_blank" rel="noopener noreferrer">{contact.label}</a>)}</div>
    </div>
  </main></Layout>;
}
