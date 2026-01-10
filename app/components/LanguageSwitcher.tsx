'use client'

import { useLocale } from 'next-intl';
import { usePathname } from '@/navigation';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Check, ChevronDown } from 'lucide-react';
import { locales, type Locale } from '@/i18n';
import { cn } from '@/lib/utils';
import GB from 'country-flag-icons/react/3x2/GB';
import BG from 'country-flag-icons/react/3x2/BG';

const localeConfig: Record<Locale, { name: string; Flag: React.ComponentType<{ className?: string }> }> = {
  en: { name: 'English', Flag: GB },
  bg: { name: 'Български', Flag: BG },
};

export default function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const pathname = usePathname();

  const switchLocale = (newLocale: Locale) => {
    // Get current pathname (which already excludes locale from next-intl's usePathname)
    // Construct the new path with the new locale
    const newPath = `/${newLocale}${pathname === '/' ? '' : pathname}`;
    // Use window.location for a full page reload to ensure locale change
    window.location.href = newPath;
  };

  const currentLocale = localeConfig[locale];
  const CurrentFlag = currentLocale.Flag;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="gap-2 justify-between px-2"
        >
          <CurrentFlag className="h-4 w-6 rounded-sm" />
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[150px]">
        {locales.map((loc) => {
          const config = localeConfig[loc];
          const isSelected = locale === loc;
          const Flag = config.Flag;
          
          return (
            <DropdownMenuItem
              key={loc}
              onClick={() => switchLocale(loc)}
              className={cn(
                "flex items-center gap-2 cursor-pointer",
                isSelected && "bg-accent"
              )}
            >
              <Flag className="h-4 w-6 rounded-sm" />
              <span className="flex-1">{config.name}</span>
              {isSelected && <Check className="h-4 w-4 text-primary" />}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
