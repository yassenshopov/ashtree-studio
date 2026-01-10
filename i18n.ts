import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

export const locales = ['en', 'bg'] as const;
export type Locale = (typeof locales)[number];

export default getRequestConfig(async ({ locale, requestLocale }) => {
  // requestLocale is a Promise that resolves to the locale from the route segment
  let resolvedLocale = locale;
  
  if (!resolvedLocale && requestLocale) {
    resolvedLocale = await requestLocale;
  }
  
  // If no locale is provided, fallback to default
  if (!resolvedLocale) {
    resolvedLocale = 'en';
  }
  
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(resolvedLocale as Locale)) {
    notFound();
  }

  return {
    locale: resolvedLocale,
    messages: (await import(`./messages/${resolvedLocale}.json`)).default
  };
});
