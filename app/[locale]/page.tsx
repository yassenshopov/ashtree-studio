import { getTranslations, setRequestLocale } from 'next-intl/server';
import DotGrid from '../components/DotGrid'
import STLViewer from '../components/STLViewer'
import ContactForm from '../components/ContactForm'
import BentoGallery from '../components/BentoGallery'

export default async function Home({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  
  const t = await getTranslations('home');
  const tCommon = await getTranslations('common');

  return (
    <div className="relative">
      <DotGrid />
      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center space-y-6 mb-16 relative min-h-[350px] flex flex-col items-center justify-center overflow-visible">
          {/* 3D STL Viewer Background */}
          <STLViewer stlPath="/models/hero-model.stl" className="opacity-30 dark:opacity-20" />
          
          {/* Hero Content */}
          <div className="relative z-10">
            <h1 className="text-5xl sm:text-6xl font-bold text-foreground tracking-tight">
              {t('title')}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mt-4">
              {t('subtitle')}
            </p>
            <div className="pt-4 flex items-center justify-center">
              <a
                href="#order"
                className="inline-flex items-center px-8 py-3 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium"
              >
                {tCommon('placeOrder')}
              </a>
            </div>
          </div>
        </div>

        {/* Bento Image Grid */}
        <section className="mt-16">
          <BentoGallery />
        </section>

        {/* Contact Form Section */}
        <section id="order" className="mt-32">
          <div className="border border-border rounded-lg p-8 sm:p-12 bg-card">
            <h2 className="text-2xl font-semibold mb-6 text-foreground">
              {t('getStartedTitle')}
            </h2>
            <p className="text-muted-foreground mb-8">
              {t('getStartedDescription')}
            </p>
            <ContactForm />
          </div>
        </section>
      </main>
    </div>
  );
}
