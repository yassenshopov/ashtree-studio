'use client';

import { ShoppingCart } from 'lucide-react';
import { useCart } from './CartContext';
import { useTranslations } from 'next-intl';
import CartModal from './CartModal';

export default function CartButton() {
  const { getTotalItems, setIsOpen } = useCart();
  const t = useTranslations('common');
  const totalItems = getTotalItems();

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="relative p-2 text-muted-foreground hover:text-foreground transition-colors"
        aria-label={t('cart')}
      >
        <ShoppingCart className="h-5 w-5" />
        {totalItems > 0 && (
          <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-primary text-primary-foreground text-[10px] flex items-center justify-center font-medium">
            {totalItems > 99 ? '99+' : totalItems}
          </span>
        )}
      </button>
      <CartModal
        checkoutLabel={t('checkout')}
        cartLabel={t('cart')}
        emptyCartLabel={t('emptyCart')}
        totalLabel={t('total')}
        checkoutButtonLabel={t('proceedToCheckout')}
        continueShoppingLabel={t('continueShopping')}
        removeLabel={t('remove')}
      />
    </>
  );
}
