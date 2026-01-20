import ThemeToggle from './components/ThemeToggle'
import Logo from './components/Logo'
import DotGrid from './components/DotGrid'

export default function Home() {
  return (
    <div className="relative">
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
                href="/shop"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Shop
              </a>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Hero Section */}
        <div className="text-center space-y-8 mb-20">
          <h1 className="text-5xl sm:text-6xl font-bold text-foreground tracking-tight">
            Custom 3D Prints
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Bring your ideas to life with precision 3D printing. 
            Order custom prints tailored to your needs.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/shop"
              className="inline-flex items-center px-8 py-3 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium"
            >
              Browse Shop
            </a>
            <a
              href="#order"
              className="inline-flex items-center px-8 py-3 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors font-medium"
            >
              Place an Order
            </a>
          </div>
        </div>

        {/* Order Section */}
        <section id="order" className="mt-32">
          <div className="border border-border rounded-lg p-8 sm:p-12 bg-card">
            <h2 className="text-2xl font-semibold mb-6 text-foreground">
              Get Started
            </h2>
            <p className="text-muted-foreground mb-8">
              Please include your github username in the message (e.g. @yassenshopov) and we will email you back soon with a link to the preview and the payment page.              </p>
            <a
              href="mailto:orders@ashtreestudio.com"
              className="inline-flex items-center px-6 py-3 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium"
            >
              Contact Us
            </a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-3">
              <Logo width={120} height={35} className="h-7 w-auto" />
              <span className="text-lg font-heading font-semibold text-foreground">
                Ashtree Studio
              </span>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <a
                href="https://www.instagram.com/ashtree_studio/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Instagram
              </a>
              <a
                href="tel:+359882764788"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                +359 88 276 4788
              </a>
              <a
                href="mailto:yassenshopov00@gmail.com"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                yassenshopov00@gmail.com
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
  );
}








