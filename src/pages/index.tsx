import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
            Portfolio
          </Link>
          <Link
            className="button button--secondary button--lg"
            to="/blog"
            style={{marginLeft: '1rem'}}>
            Blog
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title="Home"
      description={siteConfig.tagline}>
      <HomepageHeader />
      <main>
        <section style={{padding: '2rem 0'}}>
          <div className="container">
            <div className="row">
              <div className="col col--8 col--offset-2">
                <Heading as="h2" style={{textAlign: 'center'}}>
                  About Me
                </Heading>
                <p style={{textAlign: 'center', fontSize: '1.2rem'}}>
                  Hi, I'm Farl Lee. Welcome to my personal website.
                  Here you can find my portfolio and blog posts.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
