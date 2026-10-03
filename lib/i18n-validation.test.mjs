import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp, mkdir, writeFile, rm} from 'node:fs/promises';
import {join} from 'node:path';
import {tmpdir} from 'node:os';

async function dictionaries(translated, run) {
  const root = await mkdtemp(join(tmpdir(), 'portfolio-messages-'));
  try {
    for (const [locale, data] of Object.entries({'zh-Hant': {'portfolio.greeting': {message: '你好 {name}'}}, en: translated})) {
      await mkdir(join(root, 'i18n', locale), {recursive: true});
      await writeFile(join(root, 'i18n', locale, 'code.json'), JSON.stringify(data));
    }
    await run(root);
  } finally {await rm(root, {recursive: true, force: true});}
}
test('locale builds reject missing interface messages before falling back to Chinese', async () => {
  const module = await import('./i18n-validation.mjs').catch(() => ({}));
  assert.equal(typeof module.validateMessages, 'function');
  await dictionaries({}, root => assert.rejects(module.validateMessages(root, 'en', 'zh-Hant'), /en.*greeting/));
});
test('translated placeholders cannot disappear or change identity', async () => {
  const module = await import('./i18n-validation.mjs').catch(() => ({}));
  assert.equal(typeof module.validateMessages, 'function');
  await dictionaries({'portfolio.greeting': {message: 'Hello {person}'}}, root => assert.rejects(module.validateMessages(root, 'en', 'zh-Hant'), /placeholder/));
});
