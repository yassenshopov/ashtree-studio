'use client';

import { ShoppingCart } from 'lucide-react';
import { useCart } from './CartContext';
import { useTranslations } from 'next-intl';
import CartModal from './CartModal';

export default function CartButton() {
  const { setIsOpen } = useCart();
  const t = useTranslations('common');

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="relative p-2 text-muted-foreground hover:text-foreground transition-colors"
        aria-label={t('cart')}
      >
        <ShoppingCart className="h-5 w-5" />
      </button>
      <CartModal
        checkoutLabel={t('checkout')}
        cartLabel={t('cart')}
        emptyCartLabel={t('emptyCart')}
        totalLabel={t('total')}
        checkoutButtonLabel={t('proceedToCheckout')}
        continueShoppingLabel={t('continueShopping')}
        removeLabel={t('remove')}
        browseShopLabel={t('browseShop')}
      />
    </>
  );
}
