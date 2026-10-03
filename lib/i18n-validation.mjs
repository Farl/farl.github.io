import {readFile} from 'node:fs/promises';
import {join} from 'node:path';

/** Run at build time too: incomplete UI must not silently fall back to source text. */
export async function validateMessages(root, locale, defaultLocale) {
  const read = async language => JSON.parse(await readFile(join(root, 'i18n', language, 'code.json'), 'utf8'));
  const source = await read(defaultLocale);
  const translated = locale === defaultLocale ? source : await read(locale);
  const keys = Object.keys(source).filter(key => key.startsWith('portfolio.'));
  const placeholders = message => [...message.matchAll(/\{(\w+)\}/g)].map(match => match[1]).sort().join(',');
  for (const key of Object.keys(translated).filter(key => key.startsWith('portfolio.'))) {
    if (!Object.hasOwn(source, key)) throw new Error(`${locale}: unknown interface key ${key}`);
  }
  for (const key of keys) {
    const message = translated[key]?.message;
    if (typeof message !== 'string' || !message.trim()) throw new Error(`${locale}: missing interface message ${key}`);
    if (placeholders(message) !== placeholders(source[key].message)) throw new Error(`${locale}: interpolation placeholder mismatch for ${key}`);
  }
}
