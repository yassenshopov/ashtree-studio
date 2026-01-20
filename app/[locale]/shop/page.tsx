import { getTranslations, setRequestLocale } from 'next-intl/server';
import DotGrid from '../../components/DotGrid'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Clock, Mail, Sparkles } from 'lucide-react'

export default async function Shop({
  params,
  searchParams
}: {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ category?: string }>
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  
  const t = await getTranslations('shop');
  const tCommon = await getTranslations('common');

  return (
    <div className="min-h-screen relative">
      <DotGrid />
      {/* Hero Section */}
      <section className="relative bg-muted/30 py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <h1 className="text-6xl md:text-8xl font-bold text-foreground/20 tracking-tight">
              {t('title')}
            </h1>
          </div>
        </div>
      </section>

      {/* Coming Soon Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center space-y-8">
          {/* Coming Soon Badge */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <Sparkles className="h-5 w-5 text-primary animate-pulse" />
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">
              {t('comingSoon.badge')}
            </span>
            <Sparkles className="h-5 w-5 text-primary animate-pulse" />
          </div>

          {/* Main Heading */}
          <h2 className="text-4xl md:text-6xl font-bold text-foreground tracking-tight">
            {t('comingSoon.title')}
          </h2>

          {/* Description */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {t('comingSoon.description')}
          </p>

          {/* Icon with Clock */}
          <div className="flex justify-center py-8">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl animate-pulse" />
              <div className="relative bg-muted/50 border border-border rounded-full p-8">
                <Clock className="h-16 w-16 text-primary" />
              </div>
            </div>
          </div>

          {/* Info Card */}
          <Card className="bg-muted/50 border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center justify-center gap-2">
                <Mail className="h-5 w-5" />
                {t('comingSoon.contactTitle')}
              </CardTitle>
              <CardDescription className="text-base">
                {t('comingSoon.contactDescription')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                {t('comingSoon.contactInfo')}
              </p>
              <Button variant="outline" size="lg" asChild className="w-full sm:w-auto">
                <a href="mailto:orders@ashtreestudio.com?subject=Shop Inquiry">
                  {t('comingSoon.contactButton')}
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
