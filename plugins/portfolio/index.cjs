module.exports = function portfolioContent(context) {
  return {
    name: 'portfolio-content',
    getPathsToWatch() { return [`${context.siteDir}/docs/**/*.{md,mdx}`, `${context.siteDir}/i18n/**/*.{md,mdx,json}`]; },
    async loadContent() {
      const {readCatalog} = await import('../../lib/catalog.mjs');
      const {validateMessages} = await import('../../lib/i18n-validation.mjs');
      await validateMessages(context.siteDir, context.i18n.currentLocale, context.i18n.defaultLocale);
      return readCatalog(context.siteDir, {locale: context.i18n.currentLocale, defaultLocale: context.i18n.defaultLocale});
    },
    async contentLoaded({content, actions}) { actions.setGlobalData(content); },
  };
};
