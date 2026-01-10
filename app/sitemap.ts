import { MetadataRoute } from 'next';
import { locales } from '@/i18n';

// Define all static routes in your application
const staticRoutes = [
  '', // home page
  '/shop', // shop page
  '/terms', // terms of service page
  '/privacy', // privacy policy page
];

// You can extend this function to fetch dynamic routes (e.g., products, blog posts)
// For example, if you add product detail pages later:
// async function getProductIds() {
//   // Fetch from your database or API
//   return ['github-contribution-graph', 'strava-routes'];
// }

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://ashtreestudio.com';
  const defaultLocale = 'en';

  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Generate sitemap entries for each locale and route
  for (const locale of locales) {
    for (const route of staticRoutes) {
      const path = route === '' ? '' : route;
      const url = locale === defaultLocale && route === ''
        ? baseUrl // Root URL for default locale home
        : `${baseUrl}/${locale}${path}`;
      
      // Generate alternate language URLs
      const alternates: Record<string, string> = {};
      for (const altLocale of locales) {
        const altPath = route === '' ? '' : route;
        alternates[altLocale] = altLocale === defaultLocale && route === ''
          ? baseUrl
          : `${baseUrl}/${altLocale}${altPath}`;
      }

      sitemapEntries.push({
        url,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'weekly' : 'monthly',
        priority: route === '' ? 1 : 0.8,
        alternates: {
          languages: alternates,
        },
      });
    }
  }

  // TODO: Add dynamic routes here when you have product detail pages
  // Example:
  // const productIds = await getProductIds();
  // for (const productId of productIds) {
  //   for (const locale of locales) {
  //     sitemapEntries.push({
  //       url: `${baseUrl}/${locale}/shop/${productId}`,
  //       lastModified: new Date(),
  //       changeFrequency: 'monthly',
  //       priority: 0.7,
  //     });
  //   }
  // }

  return sitemapEntries;
}
