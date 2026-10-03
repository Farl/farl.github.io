import test from 'node:test';
import assert from 'node:assert/strict';
import {selectProjects, relatedProjects, updateFilterSearch} from './selection.mjs';
const works = [
  {id: 'a', category: 'games', group: 'team', title: 'DEEMO', summary: '音樂', order: 1},
  {id: 'b', category: 'games', group: 'independent', title: 'Puzzle', summary: '滑塊', order: 2},
  {id: 'c', category: 'art', group: 'paper', title: '紙馬', summary: '手作', order: 3},
  {id: 'd', category: 'games', group: 'independent', title: 'Another', summary: '滑塊拼圖', order: 4},
];
test('domain, group and search narrow the same collection', () => {
  assert.deepEqual(selectProjects(works, 'games', 'independent', '滑塊').map(p => p.id), ['b', 'd']);
  assert.equal(selectProjects(works, 'games', 'all', '  deemo ').length, 1);
  assert.equal(selectProjects(works, 'art', 'all', 'DEEMO').length, 0);
});
test('related projects favor the same practice and exclude the current work', () => {
  assert.deepEqual(relatedProjects(works, works[1], 2).map(p => p.id), ['d', 'a']);
});

test('searching all retains the query and current group; only group all resets the group', () => {
  assert.equal(updateFilterSearch('?q=al&group=team', 'q', 'all'), '?q=all&group=team');
  assert.equal(updateFilterSearch('?q=all&group=team', 'group', 'all'), '?q=all');
  assert.equal(updateFilterSearch('?q=all&group=team', 'q', ''), '?group=team');
});
