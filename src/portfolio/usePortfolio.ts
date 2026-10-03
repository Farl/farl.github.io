import {usePluginData} from '@docusaurus/useGlobalData';
import type {Project} from './types';
export function usePortfolio(): Project[] {
  return usePluginData('portfolio-content') as Project[];
}
