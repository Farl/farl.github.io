import {translate} from '@docusaurus/Translate';
import messages from '../../i18n/zh-Hant/code.json';

/** Typed message IDs; Docusaurus supplies the active locale's code.json. */
export function copy(key: keyof typeof messages, values?: Record<string, string | number>): string {
  return translate({id: key, message: messages[key].message}, values);
}
