import { getTranslations } from 'next-intl/server';
import { Link } from '@/navigation';
import Logo from './Logo';

export default async function Footer() {
  const tCommon = await getTranslations('common');

  return (
    <footer className="border-t border-border mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Logo width={120} height={35} className="h-7 w-auto" />
              <span className="text-lg font-heading font-semibold text-foreground">
                Ashtree Studio
              </span>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-foreground">About</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/contact" className="hover:text-foreground transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Social Media</h4>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/ashtree_studio/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Instagram
              </a>
              <a
                href="https://www.linkedin.com/in/yassenshopov"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground text-center">
              Copyright © {new Date().getFullYear()} Ashtree Studio. {tCommon('allRightsReserved')}.
            </p>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <Link href="/terms" className="hover:text-foreground transition-colors">
                Terms of Service
              </Link>
              <Link href="/privacy" className="hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
            </div>
          </div>
          <p className="text-sm text-muted-foreground text-center mt-4">
            {tCommon('createdBy')}{' '}
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
  );
}
