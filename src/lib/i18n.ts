export const locales = ['en', 'id'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'en'

const ui: Record<Locale, Record<string, string | string[]>> = {
  en: {
    'nav.essays': 'ESSAYS',
    'nav.fragments': 'FRAGMENTS',
    'home.writeAbout': 'A place to write about',
    'home.words': JSON.stringify(['thought', 'problem', 'idea']),
    'home.latestEssay': 'LATEST ESSAY',
    'home.latestFragment': 'LATEST FRAGMENT',
    'home.mood': 'Mood',
    'home.title': 'gphariyono // home',
    'home.description':
      'A non-linear exploration of thought, problem, and idea. The digital garden of Gharis Primada Hariyono.',
    'essays.title': 'ESSAYS',
    'essays.pageTitle': 'gphariyono // essays',
    'essays.description':
      'Long-form writing on technology, design, and philosophy.',
    'essays.empty': 'No essays yet.',
    'essays.minRead': 'min read',
    'essays.ogLabel': 'ESSAY',
    'fragments.title': 'FRAGMENTS',
    'fragments.pageTitle': 'gphariyono // fragments',
    'fragments.description':
      'Fragments of thought, daily observations, and moods.',
    'fragments.empty': 'No fragments yet.',
    'fragments.ogLabel': 'FRAGMENTS',
    'og.tagline': 'A non-linear exploration of thought, problem, and idea.',
    'og.tags': JSON.stringify(['Thoughts', 'Problems', 'Ideas']),
    'lang.switch': 'ID',
    'lang.switchLabel': 'Bahasa Indonesia'
  },
  id: {
    'nav.essays': 'ESAI',
    'nav.fragments': 'FRAGMEN',
    'home.writeAbout': 'Tempat menulis tentang',
    'home.words': JSON.stringify(['pemikiran', 'permasalahan', 'gagasan']),
    'home.latestEssay': 'ESAI TERBARU',
    'home.latestFragment': 'FRAGMEN TERBARU',
    'home.mood': 'Suasana',
    'home.title': 'gphariyono // beranda',
    'home.description':
      'Eksplorasi non-linear tentang pemikiran, permasalahan, dan gagasan. Taman digital Gharis Primada Hariyono.',
    'essays.title': 'ESAI',
    'essays.pageTitle': 'gphariyono // esai',
    'essays.description':
      'Tulisan panjang tentang teknologi, desain, dan filosofi.',
    'essays.empty': 'Belum ada esai.',
    'essays.minRead': 'mnt baca',
    'essays.ogLabel': 'ESAI',
    'fragments.title': 'FRAGMEN',
    'fragments.pageTitle': 'gphariyono // fragmen',
    'fragments.description':
      'Fragmen pemikiran, observasi harian, dan suasana hati.',
    'fragments.empty': 'Belum ada fragmen.',
    'fragments.ogLabel': 'FRAGMEN',
    'og.tagline':
      'Eksplorasi non-linear tentang pemikiran, permasalahan, dan gagasan.',
    'og.tags': JSON.stringify(['Pemikiran', 'Permasalahan', 'Gagasan']),
    'lang.switch': 'EN',
    'lang.switchLabel': 'English'
  }
}

export function getLangFromUrl(url: URL): Locale {
  const [, lang] = url.pathname.split('/')
  if (locales.includes(lang as Locale)) return lang as Locale
  return defaultLocale
}

export function useTranslations(lang: Locale) {
  return function t(key: string): string {
    return (
      (ui[lang]?.[key] as string) ?? (ui[defaultLocale][key] as string) ?? key
    )
  }
}

export function getLocalizedPath(path: string, lang: Locale): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`
  return `/${lang}${cleanPath}`
}

export function getDateLocale(lang: Locale): string {
  const map: Record<Locale, string> = {
    en: 'en-US',
    id: 'id-ID'
  }
  return map[lang]
}

/**
 * Filters collection entries by locale prefix in their id.
 * Content should be organized as: src/content/collection/{locale}/slug.mdx
 */
export function getLocalizedEntries<T extends { id: string }>(
  entries: T[],
  lang: Locale
): T[] {
  return entries.filter(entry => entry.id.startsWith(`${lang}/`))
}

/**
 * Strips the locale prefix from an entry's slug.
 * e.g. "en/my-post" -> "my-post"
 */
export function stripLocaleFromSlug(slug: string): string {
  const parts = slug.split('/')
  if (locales.includes(parts[0] as Locale)) {
    return parts.slice(1).join('/')
  }
  return slug
}

/**
 * Extracts locale and slug from a content entry's id.
 * e.g. "en/my-post.mdx" -> { lang: "en", slug: "my-post" }
 */
export function parseEntryId(id: string): { lang: Locale; slug: string } {
  const [lang, ...rest] = id.split('/')
  const slug = rest.join('/').replace(/\.(mdx?|md)$/, '')
  return {
    lang: locales.includes(lang as Locale) ? (lang as Locale) : defaultLocale,
    slug
  }
}

export const localeInfo: Record<Locale, { flag: string; label: string }> = {
  en: { flag: '🇬🇧', label: 'English' },
  id: { flag: '🇮🇩', label: 'Bahasa Indonesia' }
}

export function getAlternateLocale(lang: Locale): Locale {
  return lang === 'en' ? 'id' : 'en'
}

export function getAlternatePath(url: URL): string {
  const lang = getLangFromUrl(url)
  const alternate = getAlternateLocale(lang)
  const pathWithoutLocale = url.pathname.replace(new RegExp(`^/${lang}`), '')
  return `/${alternate}${pathWithoutLocale || '/'}`
}

export function getPathForLocale(url: URL, targetLocale: Locale): string {
  const currentLang = getLangFromUrl(url)
  const pathWithoutLocale = url.pathname.replace(
    new RegExp(`^/${currentLang}`),
    ''
  )
  return `/${targetLocale}${pathWithoutLocale || '/'}`
}
