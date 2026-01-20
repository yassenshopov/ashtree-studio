import { getTranslations } from 'next-intl/server';
import { Link } from '@/navigation';
import ThemeToggle from './ThemeToggle';
import Logo from './Logo';
import LanguageSwitcher from './LanguageSwitcher';
import CartButton from './CartButton';
import MobileMenu from './MobileMenu';

export default async function Header() {
  const tCommon = await getTranslations('common');

  return (
    <header className="border-b border-border sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          <Link href="/" className="flex items-center gap-2 sm:gap-3 min-w-0 flex-shrink-0">
            <Logo width={140} height={40} className="h-7 w-auto sm:h-8" />
            <span className="hidden sm:inline text-lg sm:text-xl font-heading font-semibold text-foreground whitespace-nowrap">
              Ashtree Studio
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {tCommon('home')}
            </Link>
            <Link
              href="/about"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {tCommon('about')}
            </Link>
            <Link
              href="/shop"
              className="text-sm font-medium text-foreground"
            >
              {tCommon('shop')}
            </Link>
          </nav>
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
            <CartButton />
            <div className="hidden md:block">
              <LanguageSwitcher />
            </div>
            <div className="hidden md:block">
              <ThemeToggle />
            </div>
            <MobileMenu 
              homeLabel={tCommon('home')}
              aboutLabel={tCommon('about')}
              shopLabel={tCommon('shop')}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
