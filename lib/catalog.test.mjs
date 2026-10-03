import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp, mkdir, writeFile, rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {buildProject, readCatalog} from './catalog.mjs';

const source = (metadata = '') => `---\ntitle: Example\ndescription: A real project\nportfolio:\n  category: interaction\n  group: visual\n${metadata}---\n\n## Story\n\n![Screen](/img/screen.webp)\n`;

test('ordinary documentation stays outside the portfolio', () => {
  assert.equal(buildProject('# Authoring guide', 'guide'), null);
});
test('a Markdown image can supply the cover without duplicate metadata', () => {
  const project = buildProject(source(), 'example');
  assert.equal(project.cover, '/img/screen.webp');
  assert.equal(project.url, '/docs/example');
});
test('unknown categories fail instead of hiding an authored project', () => {
  assert.throws(() => buildProject(source().replace('interaction', 'unknown'), 'example'), /category/);
});
test('download originals and their visual previews remain separate', () => {
  const project = buildProject(source('  downloads:\n    - id: action\n      label: Printable sheet\n      file: /downloads/original.jpg\n      preview: /img/preview.webp\n'), 'example');
  assert.equal(project.downloads[0].file, '/downloads/original.jpg');
  assert.equal(project.downloads[0].preview, '/img/preview.webp');
});
test('unsafe external action URLs are rejected', () => {
  assert.throws(() => buildProject(source('  links:\n    - id: action\n      label: Demo\n      url: javascript:alert(1)\n'), 'example'), /URL/);
});
test('media attribution rejects unsafe URLs just like project actions', () => {
  assert.throws(() => buildProject(source('  media_sources:\n    - id: action\n      label: Publisher\n      url: javascript:alert(1)\n'), 'example'), /URL/);
  assert.equal(buildProject(source('  media_sources:\n    - id: action\n      label: Publisher\n      url: https://example.com/game\n'), 'example').mediaSources[0].label, 'Publisher');
});
async function fixture(run) {
  const root = await mkdtemp(join(tmpdir(), 'portfolio-catalog-'));
  try {
    await mkdir(join(root, 'docs'), {recursive: true});
    await mkdir(join(root, 'static/img'), {recursive: true});
    await writeFile(join(root, 'static/img/screen.webp'), 'fixture');
    return await run(root);
  } finally { await rm(root, {recursive: true, force: true}); }
}
async function bilingualFixture(root, translation) {
  await writeFile(join(root, 'docs/example.md'), source('  role: 獨立開發\n  links:\n    - id: action\n      label: 體驗作品\n      url: https://example.com/demo\n  gallery:\n    - id: scene\n      src: /img/screen.webp\n      alt: 作品畫面\n'));
  const directory = join(root, 'i18n/en/docusaurus-plugin-content-docs/current');
  await mkdir(directory, {recursive: true});
  if (translation) await writeFile(join(directory, 'example.md'), translation);
  return directory;
}
const translatedSource = `---\ntitle: English work\ndescription: English summary\nportfolio:\n  role: Independent creator\n  links:\n    action: Try it\n  gallery:\n    scene: Actual project view\n---\n\n## Story\n\nTranslated body.\n`;
test('localized catalogs translate copy while retaining routes, assets and external targets', () => fixture(async root => {
  await bilingualFixture(root, translatedSource);
  const [english] = await readCatalog(root, {locale: 'en'});
  assert.equal(english.title, 'English work');
  assert.equal(english.summary, 'English summary');
  assert.equal(english.role, 'Independent creator');
  assert.equal(english.links[0].label, 'Try it');
  assert.equal(english.links[0].url, 'https://example.com/demo');
  assert.equal(english.gallery[0].alt, 'Actual project view');
  assert.equal(english.cover, '/img/screen.webp');
  assert.equal(english.url, '/docs/example');
}));
test('missing translated works fail rather than silently mixing languages', () => fixture(async root => {
  await bilingualFixture(root);
  await assert.rejects(readCatalog(root, {locale: 'en'}), /example.*missing translation/);
}));
test('translated files cannot change canonical project structure', () => fixture(async root => {
  await bilingualFixture(root, translatedSource.replace('  role:', '  cover: /img/other.webp\n  role:'));
  await assert.rejects(readCatalog(root, {locale: 'en'}), /example.*cover/);
}));
test('translation identities must match canonical media and links', () => fixture(async root => {
  await bilingualFixture(root, translatedSource.replace('scene:', 'unknown:'));
  await assert.rejects(readCatalog(root, {locale: 'en'}), /example.*unknown/);
}));
test('each translated media caption must be present', () => fixture(async root => {
  await bilingualFixture(root, translatedSource.replace('  gallery:\n    scene: Actual project view\n', ''));
  await assert.rejects(readCatalog(root, {locale: 'en'}), /example.*gallery/);
}));
test('orphan translated documents fail with an actionable filename', () => fixture(async root => {
  const dir = await bilingualFixture(root, translatedSource);
  await writeFile(join(dir, 'removed.md'), translatedSource);
  await assert.rejects(readCatalog(root, {locale: 'en'}), /orphan.*removed/);
}));
test('missing local imagery names the project rather than shipping a broken image', () => fixture(async root => {
  await writeFile(join(root, 'docs/example.md'), source('  cover: /img/missing.webp\n'));
  await assert.rejects(readCatalog(root), /example.*missing/);
}));
test('duplicate project routes fail before a build can overwrite them', () => fixture(async root => {
  await writeFile(join(root, 'docs/one.md'), source().replace('title: Example', 'slug: duplicate\ntitle: Example'));
  await writeFile(join(root, 'docs/two.md'), source().replace('title: Example', 'slug: duplicate\ntitle: Example'));
  await assert.rejects(readCatalog(root), /Duplicate/);
}));
test('the real portfolio includes every migrated paper model and browser project', async () => {
  const projects = await readCatalog(process.cwd());
  assert.ok(projects.length >= 53, `Only ${projects.length} projects were found`);
  assert.equal(projects.filter(item => item.category === 'art').length, 8);
  assert.ok(projects.some(item => item.id === 'web-portal-game'));
  assert.ok(projects.some(item => item.id === 'deemo-reborn' && item.role === 'Producer'));
});
test('explicit authored IDs preserve the catalog and document layout match', () => {
  const project = buildProject(source().replace('title: Example', 'id: custom-id\ntitle: Example'), 'example');
  assert.equal(project.id, 'custom-id');
  assert.equal(project.url, '/docs/custom-id');
});
test('explicit null cover keeps body imagery out of the collection cover', () => {
  assert.equal(buildProject(source('  cover: null\n'), 'example').cover, null);
});

test('canonical media replacements inherit stable translated labels without editing English', () => fixture(async root => {
  await bilingualFixture(root, translatedSource);
  await writeFile(join(root, 'static/img/replacement.webp'), 'replacement');
  const canonical = source('  role: 獨立開發\n  links:\n    - id: action\n      label: 體驗作品\n      url: https://example.com/new-demo\n  gallery:\n    - id: scene\n      src: /img/replacement.webp\n      alt: 新畫面\n');
  await writeFile(join(root, 'docs/example.md'), canonical);
  const [project] = await readCatalog(root, {locale: 'en'});
  assert.equal(project.gallery[0].src, '/img/replacement.webp');
  assert.equal(project.gallery[0].alt, 'Actual project view');
  assert.equal(project.links[0].url, 'https://example.com/new-demo');
  assert.equal(project.links[0].label, 'Try it');
}));
for (const field of ['id', 'slug']) {
  test(`omitted translated ${field} cannot desynchronize a custom document route`, () => fixture(async root => {
    const dir = await bilingualFixture(root, translatedSource);
    const canonical = source().replace('title: Example', `${field}: custom\ntitle: Example`);
    await writeFile(join(root, 'docs/example.md'), canonical);
    await assert.rejects(readCatalog(root, {locale: 'en'}), /translation.*identity/);
    await writeFile(join(dir, 'example.md'), `---\n${field}: custom\ntitle: English\ndescription: Summary\n---\nEnglish body.`);
    const [project] = await readCatalog(root, {locale: 'en'});
    assert.equal(project.url, '/docs/custom');
  }));
}
test('duplicate stable media IDs fail with an actionable field name', () => {
  assert.throws(() => buildProject(source('  gallery:\n    - id: scene\n      src: /img/one.webp\n      alt: One\n    - id: scene\n      src: /img/two.webp\n      alt: Two\n'), 'example'), /gallery.*duplicate.*scene/);
});
