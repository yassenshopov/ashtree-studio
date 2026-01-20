'use client';

import { useCart } from './CartContext';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Clock, Sparkles } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface CartModalProps {
  checkoutLabel: string;
  cartLabel: string;
  emptyCartLabel: string;
  totalLabel: string;
  checkoutButtonLabel: string;
  continueShoppingLabel: string;
  removeLabel: string;
  browseShopLabel: string;
}

export default function CartModal({
  cartLabel,
}: CartModalProps) {
  const { isOpen, setIsOpen } = useCart();
  const t = useTranslations('common');

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-center gap-2">
            <Sparkles className="h-5 w-5 text-primary animate-pulse" />
            {t('cartComingSoon.title')}
            <Sparkles className="h-5 w-5 text-primary animate-pulse" />
          </DialogTitle>
          <DialogDescription className="text-center">
            {t('cartComingSoon.description')}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center justify-center py-8 text-center">
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl animate-pulse" />
            <div className="relative bg-muted/50 border border-border rounded-full p-6">
              <Clock className="h-12 w-12 text-primary" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-6 max-w-sm">
            {t('cartComingSoon.message')}
          </p>
          <Button
            variant="outline"
            onClick={() => setIsOpen(false)}
            className="w-full sm:w-auto"
          >
            {t('cartComingSoon.closeButton')}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
