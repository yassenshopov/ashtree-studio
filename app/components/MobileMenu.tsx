'use client';

import { useState } from 'react';
import { Link } from '@/navigation';
import { Menu } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeToggle from './ThemeToggle';

interface MobileMenuProps {
  homeLabel: string;
  aboutLabel: string;
  shopLabel: string;
}

export default function MobileMenu({ homeLabel, aboutLabel, shopLabel }: MobileMenuProps) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[280px] sm:w-[320px]">
        <SheetHeader>
          <SheetTitle className="text-left">Menu</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-4 mt-8">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="text-base font-medium text-foreground hover:text-primary transition-colors py-2"
          >
            {homeLabel}
          </Link>
          <Link
            href="/about"
            onClick={() => setOpen(false)}
            className="text-base font-medium text-foreground hover:text-primary transition-colors py-2"
          >
            {aboutLabel}
          </Link>
          <Link
            href="/shop"
            onClick={() => setOpen(false)}
            className="text-base font-medium text-foreground hover:text-primary transition-colors py-2"
          >
            {shopLabel}
          </Link>
        </nav>
        <div className="flex flex-col gap-4 mt-8 pt-8 border-t border-border">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Language</span>
            <LanguageSwitcher />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Theme</span>
            <ThemeToggle />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
