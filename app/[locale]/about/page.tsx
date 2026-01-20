import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Metadata } from 'next';
import DotGrid from '../../components/DotGrid';
import AboutMap from '../../components/AboutMap';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('about');

  return {
    title: t('title'),
    description: t('subtitle'),
  };
}

export default async function AboutPage({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('about');

  return (
    <div className="relative">
      <DotGrid />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-10">
          <div className="text-center space-y-4">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground">
              {t('title')}
            </h1>
            <p className="text-muted-foreground text-lg">
              {t('subtitle')}
            </p>
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-muted-foreground leading-relaxed">
              {t('description')}
            </p>
          </div>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">
              {t('locationTitle')}
            </h2>
            <p className="text-muted-foreground">
              {t('locationDescription')}
            </p>
            <div className="aspect-[4/3] w-full overflow-hidden rounded-xl border border-border bg-muted">
              <AboutMap />
            </div>
            <p className="text-sm text-muted-foreground">
              <a
                href="https://www.openstreetmap.org/?mlat=42.6977&mlon=23.3219#map=13/42.6977/23.3219"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                {t('mapCta')}
              </a>
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
