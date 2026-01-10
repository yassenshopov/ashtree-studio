import { getTranslations } from 'next-intl/server';
import { Link } from '@/navigation';
import ThemeToggle from './ThemeToggle';
import Logo from './Logo';
import LanguageSwitcher from './LanguageSwitcher';
import CartButton from './CartButton';

export default async function Header() {
  const tCommon = await getTranslations('common');

  return (
    <header className="border-b border-border sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3">
            <Logo width={140} height={40} className="h-8 w-auto" />
            <span className="text-xl font-heading font-semibold text-foreground">
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
              href="/shop"
              className="text-sm font-medium text-foreground"
            >
              {tCommon('shop')}
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <CartButton />
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
