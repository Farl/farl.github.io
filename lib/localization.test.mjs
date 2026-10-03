import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import * as localization from './localization.mjs';
import {readCatalog} from './catalog.mjs';

test('active navigation removes only the locale base path, preserving root and nested routes', () => {
  assert.equal(typeof localization.canonicalPath, 'function');
  assert.equal(localization.canonicalPath('/en/', '/en/'), '/');
  assert.equal(localization.canonicalPath('/en/games', '/en/'), '/games');
  assert.equal(localization.canonicalPath('/en/docs/paper-horse', '/en/'), '/docs/paper-horse');
  assert.equal(localization.canonicalPath('/games', '/'), '/games');
  assert.equal(localization.canonicalPath('/english', '/en/'), '/english');
});
test('every real work has English copy with the same identity, media and downloads', async () => {
  const chinese = await readCatalog(process.cwd());
  const english = await readCatalog(process.cwd(), {locale: 'en'});
  assert.equal(english.length, chinese.length);
  for (let index = 0; index < chinese.length; index++) {
    const original = chinese[index];
    const translated = english[index];
    for (const key of ['id', 'url', 'category', 'group', 'cover', 'year', 'platforms', 'order', 'videos']) assert.deepEqual(translated[key], original[key], `${original.id} ${key}`);
    assert.deepEqual(translated.downloads.map(d => [d.file, d.preview]), original.downloads.map(d => [d.file, d.preview]), original.id);
    assert.deepEqual(translated.gallery.map(i => i.src), original.gallery.map(i => i.src), original.id);
    assert.deepEqual(translated.links.map(l => l.url), original.links.map(l => l.url), original.id);
    assert.ok(!/\p{Script=Han}/u.test([translated.title, translated.summary, translated.role, ...translated.gallery.map(i => i.alt), ...translated.downloads.map(d => d.label)].join(' ')), original.id);
  }
});
test('interface dictionaries keep identical keys and interpolation placeholders', async () => {
  const dictionaries = await Promise.all(['zh-Hant', 'en'].map(async locale => JSON.parse(await readFile(new URL(`../i18n/${locale}/code.json`, import.meta.url)))));
  const keys = Object.keys(dictionaries[0]).filter(key => key.startsWith('portfolio.')).sort();
  assert.deepEqual(Object.keys(dictionaries[1]).filter(key => key.startsWith('portfolio.')).sort(), keys);
  const placeholders = text => [...text.matchAll(/\{(\w+)\}/g)].map(match => match[1]).sort();
  for (const key of keys) {
    assert.ok(dictionaries[1][key].message.trim(), key);
    assert.deepEqual(placeholders(dictionaries[1][key].message), placeholders(dictionaries[0][key].message), key);
  }
});

test('real translated sections retain canonical anchors for cross-language deep links', async () => {
  const projects = await readCatalog(process.cwd());
  for (const project of projects) {
    const paths = [`../docs/${project.id}.md`, `../i18n/en/docusaurus-plugin-content-docs/current/${project.id}.md`];
    const documents = await Promise.all(paths.map(path => readFile(new URL(path, import.meta.url), 'utf8')));
    const anchors = source => [...source.matchAll(/^#{1,6} .+ \{#([^}]+)\}$/gm)].map(match => match[1]);
    assert.deepEqual(anchors(documents[1]), anchors(documents[0]), project.id);
  }
});
