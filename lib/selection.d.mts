import type {Project, CategoryId} from '../src/portfolio/types';
export function selectProjects(projects: Project[], category: CategoryId, group?: string, query?: string): Project[];
export function relatedProjects(projects: Project[], current: Project, limit: number): Project[];
export function updateFilterSearch(search: string, key: 'q' | 'group', value: string): string;
