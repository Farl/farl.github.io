const {writeFile} = require('node:fs/promises');
const {join} = require('node:path');

/** robots.txt lives at the site root, so only the default-locale build writes it, listing every locale's sitemap. */
module.exports = function robotsTxt(context) {
  return {
    name: 'robots-txt',
    async postBuild({outDir}) {
      const {currentLocale, defaultLocale, locales, localeConfigs} = context.i18n;
      if (currentLocale !== defaultLocale) return;
      const sitemaps = locales.map(locale => `Sitemap: ${localeConfigs[locale].url}${localeConfigs[locale].baseUrl}sitemap.xml`);
      await writeFile(join(outDir, 'robots.txt'), ['User-agent: *', 'Allow: /', '', ...sitemaps, ''].join('\n'));
    },
  };
};
