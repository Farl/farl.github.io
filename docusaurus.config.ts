import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import settings from './portfolio.settings.json';

const siteUrl = 'https://farl.github.io';
const baseUrl = '/';
const homeUrl = `${siteUrl}${baseUrl}`;

/** Schema.org data so search engines tie the site, its plain-text name and the owner's profiles together. */
const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {'@type': 'WebSite', '@id': `${homeUrl}#website`, url: homeUrl, name: settings.name, alternateName: settings.personName,
      author: {'@id': `${homeUrl}#person`}},
    {'@type': 'Person', '@id': `${homeUrl}#person`, name: settings.personName, url: homeUrl,
      sameAs: settings.contacts.map(contact => contact.url)},
  ],
};

const config: Config = {
  title: settings.name,
  tagline: '設計、開發，也動手創作。',
  favicon: 'img/favicon.svg',

  future: {
    v4: true,
  },

  url: siteUrl,
  baseUrl,

  headTags: [{tagName: 'script', attributes: {type: 'application/ld+json'}, innerHTML: JSON.stringify(structuredData)}],

  organizationName: 'Farl',
  projectName: 'farl.github.io',
  trailingSlash: false,

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: settings.defaultLocale,
    locales: Object.keys(settings.locales),
    localeConfigs: settings.locales as NonNullable<Config['i18n']>['localeConfigs'],
  },

  plugins: ['./plugins/portfolio/index.cjs', './plugins/robots/index.cjs'],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          exclude: ['superpowers/**'],
          editUrl: 'https://github.com/Farl/farl.github.io/tree/main/',
        },
        pages: {exclude: ['**/markdown-page.md']},
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: settings.socialImage,
    colorMode: {defaultMode: 'dark', disableSwitch: true, respectPrefersColorScheme: false},
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
