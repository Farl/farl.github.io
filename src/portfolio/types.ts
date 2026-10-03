export type CategoryId = 'games' | 'interaction' | 'art';
export type GalleryImage = {id?: string; src: string; alt: string};
export type Download = {id: string; label: string; file: string; preview?: string; version?: string};
export type Project = {
  id: string; url: string; title: string; summary: string; category: CategoryId; group: string;
  cover: string | null; coverFit: 'cover' | 'contain'; coverPosition: string; year: number | null; role: string | null;
  platforms: string[]; featured: boolean; order: number;
  links: {id: string; label: string; url: string}[]; mediaSources: {id: string; label: string; url: string}[];
  gallery: GalleryImage[]; videos: string[]; downloads: Download[];
};
export type Category = {
  id: CategoryId; title: string; shortTitle: string; path: string; description: string; defaultRole: string; entranceSummary: string;
  background: {project: string; position: string; mobilePosition: string; fit?: 'cover' | 'contain'; mobileFit?: 'cover' | 'contain'};
  entranceProject: string; leadProject: string; groups: Record<string, string>;
};
