import React from 'react';
import {useLocation} from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {useAlternatePageUtils} from '@docusaurus/theme-common/internal';
import {copy} from './copy';

/** Each locale is a native Docusaurus app: use normal links, retaining page state. */
export function LanguageSwitch() {
  const {i18n: {currentLocale, locales, localeConfigs}} = useDocusaurusContext();
  const {search, hash} = useLocation();
  const {createUrl} = useAlternatePageUtils();
  return <div className="language-switch" role="group" aria-label={copy('portfolio.nav.languages')}>
    {locales.map(locale => <a key={locale} href={`${createUrl({locale, fullyQualified: false})}${search}${hash}`}
      lang={localeConfigs[locale].htmlLang} hrefLang={localeConfigs[locale].htmlLang}
      aria-current={locale === currentLocale ? 'true' : undefined}>{localeConfigs[locale].label}</a>)}
  </div>;
}
