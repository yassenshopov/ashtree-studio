import ThemeToggle from '../components/ThemeToggle'
import Logo from '../components/Logo'
import DotGrid from '../components/DotGrid'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Github, MapPin } from 'lucide-react'

export default function Shop() {
  const products = [
    {
      id: 'github-contribution-graph',
      name: 'GitHub Contribution Graph',
      description: 'Transform your coding journey into a stunning 3D printed sculpture. This unique piece visualizes your GitHub contribution history as an elegant 3D model, perfect for your desk or as a conversation starter.',
      features: [
        'Customizable color schemes',
        'Multiple size options',
        'High-quality 3D printing',
        'Includes mounting hardware'
      ],
      icon: Github,
      badge: 'Popular',
      price: 'Starting at $49',
      contactLink: 'mailto:orders@ashtreestudio.com?subject=GitHub Contribution Graph Inquiry'
    },
    {
      id: 'strava-routes',
      name: 'Strava Routes',
      description: 'Preserve your favorite running, cycling, or hiking routes as beautiful 3D topographic prints. Each route is carefully rendered with elevation data, creating a unique piece of art that tells your story.',
      features: [
        'Topographic elevation mapping',
        'Custom route selection',
        'Multiple material options',
        'Personalized with route name'
      ],
      icon: MapPin,
      badge: 'New',
      price: 'Starting at $59',
      contactLink: 'mailto:orders@ashtreestudio.com?subject=Strava Routes 3D Print Inquiry'
    }
  ]

  return (
    <div className="min-h-screen relative">
      <DotGrid />
      {/* Header */}
      <header className="border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <a href="/" className="flex items-center gap-3">
              <Logo width={140} height={40} className="h-8 w-auto" />
              <span className="text-xl font-heading font-semibold text-foreground">
                Ashtree Studio
              </span>
            </a>
            <div className="flex items-center gap-4">
              <a
                href="/"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Home
              </a>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground tracking-tight">
            Shop
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our collection of custom 3D printed products. Each piece is crafted with precision and care.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {products.map((product) => {
            const Icon = product.icon
            return (
              <Card key={product.id} className="flex flex-col">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-2xl">{product.name}</CardTitle>
                    </div>
                    <Badge variant="secondary">{product.badge}</Badge>
                  </div>
                  <CardDescription className="text-base">
                    {product.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="space-y-3">
                    <h3 className="text-sm font-semibold text-foreground">Features:</h3>
                    <ul className="space-y-2">
                      {product.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="text-primary mt-0.5">•</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <p className="text-lg font-semibold text-foreground">{product.price}</p>
                  </div>
                  <Button asChild className="w-full sm:w-auto">
                    <a href={product.contactLink}>
                      Order Now
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            )
          })}
        </div>

        {/* Additional Info Section */}
        <Card className="bg-muted/50">
          <CardHeader>
            <CardTitle>Custom Orders</CardTitle>
            <CardDescription>
              Have a unique idea? We're always open to custom projects and special requests.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              All products are made to order. Contact us to discuss your specific requirements, 
              customization options, and delivery timeline.
            </p>
            <Button variant="outline" asChild>
              <a href="mailto:orders@ashtreestudio.com?subject=Custom Order Inquiry">
                Contact for Custom Orders
              </a>
            </Button>
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-3">
              <Logo width={120} height={35} className="h-7 w-auto" />
              <span className="text-lg font-heading font-semibold text-foreground">
                Ashtree Studio
              </span>
            </div>
            <div className="flex items-center gap-4">
              <a
                href="https://www.instagram.com/ashtree_studio/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Instagram
              </a>
            </div>
            <p className="text-sm text-muted-foreground text-center">
              © {new Date().getFullYear()} Ashtree Studio. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground text-center">
              Created by{' '}
              <a
                href="https://www.linkedin.com/in/yassenshopov"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors"
              >
                Yassen Shopov
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
