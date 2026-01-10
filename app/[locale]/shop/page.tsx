import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/navigation';
import DotGrid from '../../components/DotGrid'
import { ShopProvider, ShopSearch, ShopProducts } from '../../components/ShopWrapper'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination'

export default async function Shop({
  params,
  searchParams
}: {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ category?: string }>
}) {
  const { locale } = await params;
  const { category } = await searchParams;
  setRequestLocale(locale);
  
  const t = await getTranslations('shop');
  const tCommon = await getTranslations('common');

  const allProducts = [
    {
      id: 'github-contribution-graph',
      name: t('products.github.name'),
      description: t('products.github.description'),
      features: [
        t('products.github.features.0'),
        t('products.github.features.1'),
        t('products.github.features.2'),
        t('products.github.features.3')
      ],
      icon: 'Github',
      badge: t('products.github.badge'),
      price: t('products.github.price'),
      contactLink: 'mailto:orders@ashtreestudio.com?subject=GitHub Contribution Graph Inquiry'
    },
    {
      id: 'strava-routes',
      name: t('products.strava.name'),
      description: t('products.strava.description'),
      features: [
        t('products.strava.features.0'),
        t('products.strava.features.1'),
        t('products.strava.features.2'),
        t('products.strava.features.3')
      ],
      icon: 'MapPin',
      badge: t('products.strava.badge'),
      price: t('products.strava.price'),
      contactLink: 'mailto:orders@ashtreestudio.com?subject=Strava Routes 3D Print Inquiry'
    }
  ]

  // Filter products by category if specified
  const products = category
    ? allProducts.filter((p) => p.id.includes(category))
    : allProducts;

  return (
    <ShopProvider products={products}>
      <div className="min-h-screen relative">
        <DotGrid />
        {/* Hero Section */}
      <section className="relative bg-muted/30 py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <h1 className="text-6xl md:text-8xl font-bold text-foreground/20 tracking-tight">
              {t('title')}
            </h1>
            <div className="space-y-4">
              <ShopSearch products={products} />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar - Categories */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="space-y-8 sticky top-20">
              {/* Categories */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-foreground">Category</h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="/shop"
                      className="flex items-center justify-between text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
                    >
                      <span>All Product</span>
                      <Badge variant="secondary" className="ml-2">{allProducts.length}</Badge>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/shop?category=github"
                      className="flex items-center justify-between text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
                    >
                      <span>GitHub Products</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/shop?category=strava"
                      className="flex items-center justify-between text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
                    >
                      <span>Strava Products</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </aside>

          {/* Right Side - Products Grid */}
          <div className="flex-1">
            <ShopProducts 
              featuresLabel={tCommon('features')}
              orderNowLabel={tCommon('orderNow')}
            />

            {/* Pagination - Only show if there are more than 9 products */}
            {products.length > 9 && (
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" isActive>1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">2</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">3</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href="#" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </div>
        </div>

        {/* Additional Info Section */}
        <section className="mt-12">
          <Card className="bg-muted/50">
            <CardHeader>
              <CardTitle>{t('customOrders.title')}</CardTitle>
              <CardDescription>
                {t('customOrders.description')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                {t('customOrders.info')}
              </p>
              <Button variant="outline" asChild>
                <a href="mailto:orders@ashtreestudio.com?subject=Custom Order Inquiry">
                  {t('customOrders.contactButton')}
                </a>
              </Button>
            </CardContent>
          </Card>
        </section>
      </main>
      </div>
    </ShopProvider>
  )
}
