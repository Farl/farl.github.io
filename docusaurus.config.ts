import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import settings from './portfolio.settings.json';

const config: Config = {
  title: settings.name,
  tagline: '設計、開發，也動手創作。',
  favicon: 'img/favicon.svg',

  future: {
    v4: true,
  },

  url: 'https://farl.github.io',
  baseUrl: '/',

  organizationName: 'Farl',
  projectName: 'farl.github.io',
  trailingSlash: false,

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: settings.defaultLocale,
    locales: Object.keys(settings.locales),
    localeConfigs: settings.locales as NonNullable<Config['i18n']>['localeConfigs'],
  },

  plugins: ['./plugins/portfolio/index.cjs'],

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
