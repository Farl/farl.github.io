import type {Category, CategoryId} from './types';
import settings from '../../portfolio.settings.json';
import {copy} from './copy';

/** Site-wide editorial choices belong here; individual works belong in Markdown. */
export const site = {
  name: settings.name, hero: '/img/works/little-bad-wolf-wide.webp', heroMobile: '/img/works/little-bad-wolf.webp', portrait: '/img/works/portrait.webp',
  headline: [copy('portfolio.home.headline.first'), copy('portfolio.home.headline.second')],
  introduction: copy('portfolio.home.introduction'),
  about: copy('portfolio.home.about'),
  contacts: [
    {label: 'LinkedIn', url: 'https://www.linkedin.com/in/farl-lee-b0620b55/'},
    {label: 'GitHub', url: 'https://github.com/Farl'},
  ],
  relatedLimit: 3,
};
export const categories: Category[] = [
  {id: 'games', title: copy('portfolio.category.games.title'), shortTitle: copy('portfolio.category.games.short'), path: '/games',
    description: copy('portfolio.category.games.description'),
    defaultRole: copy('portfolio.category.games.role'), entranceSummary: copy('portfolio.category.games.summary'), background: {project: 'deemo-reborn', position: '75% 48%', mobilePosition: '65% 50%'}, entranceProject: 'deemo-reborn', leadProject: 'more-sliding-puzzle',
    groups: {independent: copy('portfolio.group.independent'), team: copy('portfolio.group.team'), browser: copy('portfolio.group.browser')}},
  {id: 'interaction', title: copy('portfolio.category.interaction.title'), shortTitle: copy('portfolio.category.interaction.short'), path: '/interaction',
    description: copy('portfolio.category.interaction.description'),
    defaultRole: copy('portfolio.category.interaction.role'), entranceSummary: copy('portfolio.category.interaction.summary'), background: {project: 'the-chilled-lake', position: '50% 0%', mobilePosition: '55% 0%'}, entranceProject: 'the-chilled-lake', leadProject: 'the-chilled-lake',
    groups: {visual: copy('portfolio.group.visual'), audio: copy('portfolio.group.audio'), generated: copy('portfolio.group.generated'), tools: copy('portfolio.group.tools')}},
  {id: 'art', title: copy('portfolio.category.art.title'), shortTitle: copy('portfolio.category.art.short'), path: '/art',
    description: copy('portfolio.category.art.description'),
    defaultRole: copy('portfolio.category.art.role'), entranceSummary: copy('portfolio.category.art.summary'), background: {project: 'paper-horse', position: 'right center', mobilePosition: '65% 65%', fit: 'contain', mobileFit: 'cover'}, entranceProject: 'paper-horse', leadProject: 'paper-horse', groups: {paper: copy('portfolio.group.paper')}},
];
export function getCategory(id: CategoryId): Category {
  return categories.find(category => category.id === id)!;
}
