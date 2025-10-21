import { cs } from './cs';
import { pl } from './pl';
import type { Translations } from './types';

export interface LanguageConfig {
  translations: Translations;
  url: string;
  path: string;
}

export const languages: Record<string, LanguageConfig> = {
  cs: {
    translations: cs,
    url: 'https://fajny3dtisk.cz/',
    path: '',
  },
  pl: {
    translations: pl,
    url: 'https://fajny3dtisk.cz/pl/',
    path: 'pl',
  },
} as const;

export const defaultLang = 'cs';

// Helper to get language config
export function getLanguageConfig(langCode: string): LanguageConfig {
  return languages[langCode] || languages[defaultLang];
}
