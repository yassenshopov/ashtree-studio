import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Metadata } from 'next';
import DotGrid from '../../components/DotGrid';
import ContactForm from '../../components/ContactForm';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  
  return {
    title: 'Contact Us - Ashtree Studio',
    description: 'Get in touch with Ashtree Studio. Send us a message and we\'ll respond as soon as possible.',
  };
}

export default async function ContactPage({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="relative">
      <DotGrid />
      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          <div className="text-center space-y-4 mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground">
              Contact us
            </h1>
            <p className="text-muted-foreground">
              Questions about the GitHub Contribution Chart Print? It&apos;s the only available product right now, so feel free to reach out here.
            </p>
          </div>

          <ContactForm />

          <div className="border-t border-border pt-8 mt-12">
            <div className="space-y-4 text-center">
              <p className="text-sm text-muted-foreground">
                You can also reach us directly at:
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm">
                <a
                  href="mailto:orders@ashtreestudio.com"
                  className="text-primary hover:underline"
                >
                  orders@ashtreestudio.com
                </a>
                <span className="hidden sm:inline text-muted-foreground">•</span>
                <a
                  href="tel:+359882764788"
                  className="text-primary hover:underline"
                >
                  +359 88 276 4788
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
