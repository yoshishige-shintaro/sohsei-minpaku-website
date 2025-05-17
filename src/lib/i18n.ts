export type Locale = 'ja' | 'en';

export const defaultLocale: Locale = 'ja';
export const locales: Locale[] = ['ja', 'en'];

export const getLocaleFromPathname = (pathname: string): Locale => {
  const segments = pathname.split('/');
  const localeSegment = segments[1];
  return locales.includes(localeSegment as Locale) ? localeSegment as Locale : defaultLocale;
};