import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Metadata } from 'next';
import DotGrid from '../../components/DotGrid';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('privacy');
  
  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function PrivacyPolicy({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  
  const t = await getTranslations('privacy');

  return (
    <div className="min-h-screen relative">
      <DotGrid />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          <div className="text-center space-y-4 mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground">
              {t('title')}
            </h1>
            <p className="text-muted-foreground">
              {t('lastUpdated')}: {t('lastUpdatedDate')}
            </p>
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">{t('sections.1.title')}</h2>
              <p className="text-muted-foreground leading-relaxed">{t('sections.1.content')}</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">{t('sections.2.title')}</h2>
              <p className="text-muted-foreground leading-relaxed">{t('sections.2.content')}</p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>{t('sections.2.items.0')}</li>
                <li>{t('sections.2.items.1')}</li>
                <li>{t('sections.2.items.2')}</li>
                <li>{t('sections.2.items.3')}</li>
                <li>{t('sections.2.items.4')}</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">{t('sections.3.title')}</h2>
              <p className="text-muted-foreground leading-relaxed">{t('sections.3.content')}</p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>{t('sections.3.items.0')}</li>
                <li>{t('sections.3.items.1')}</li>
                <li>{t('sections.3.items.2')}</li>
                <li>{t('sections.3.items.3')}</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">{t('sections.4.title')}</h2>
              <p className="text-muted-foreground leading-relaxed">{t('sections.4.content')}</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">{t('sections.5.title')}</h2>
              <p className="text-muted-foreground leading-relaxed">{t('sections.5.content')}</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">{t('sections.6.title')}</h2>
              <p className="text-muted-foreground leading-relaxed">{t('sections.6.content')}</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">{t('sections.7.title')}</h2>
              <p className="text-muted-foreground leading-relaxed">{t('sections.7.content')}</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">{t('sections.8.title')}</h2>
              <p className="text-muted-foreground leading-relaxed">{t('sections.8.content')}</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">{t('sections.9.title')}</h2>
              <p className="text-muted-foreground leading-relaxed">{t('sections.9.content')}</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">{t('sections.10.title')}</h2>
              <p className="text-muted-foreground leading-relaxed">{t('sections.10.content')}</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">{t('sections.11.title')}</h2>
              <p className="text-muted-foreground leading-relaxed">{t('sections.11.content')}</p>
            </section>
          </div>

          <div className="border-t border-border pt-8 mt-12">
            <p className="text-sm text-muted-foreground">
              {t('contact')}{' '}
              <a 
                href="mailto:orders@ashtreestudio.com" 
                className="text-primary hover:underline"
              >
                orders@ashtreestudio.com
              </a>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
