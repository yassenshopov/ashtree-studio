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
import { Separator } from '@/components/ui/separator';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Github, MapPin } from 'lucide-react';
import { Link } from '@/navigation';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Github,
  MapPin,
};

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
  checkoutLabel,
  cartLabel,
  emptyCartLabel,
  totalLabel,
  checkoutButtonLabel,
  continueShoppingLabel,
  removeLabel,
  browseShopLabel,
}: CartModalProps) {
  const { items, isOpen, setIsOpen, updateQuantity, removeFromCart, getTotalItems } = useCart();

  const totalItems = getTotalItems();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-2xl max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>{cartLabel}</DialogTitle>
          <DialogDescription>
            {totalItems === 0
              ? emptyCartLabel
              : `${totalItems} ${totalItems === 1 ? 'item' : 'items'} in your cart`}
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
              <p className="text-lg font-medium text-foreground mb-2">{emptyCartLabel}</p>
              <p className="text-sm text-muted-foreground mb-6">
                Add some products to get started!
              </p>
              <Button asChild onClick={() => setIsOpen(false)}>
                <Link href="/shop">{browseShopLabel}</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => {
                const Icon = iconMap[item.product.icon] || Github;
                return (
                  <div
                    key={item.product.id}
                    className="flex gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="p-3 rounded-lg bg-primary/10 flex-shrink-0">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-foreground truncate">
                            {item.product.name}
                          </h4>
                          <Badge variant="secondary" className="text-xs mt-1">
                            {item.product.badge}
                          </Badge>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 flex-shrink-0"
                          onClick={() => removeFromCart(item.product.id)}
                          aria-label={removeLabel}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {item.product.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-8 text-center font-medium">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <p className="font-semibold text-foreground">{item.product.price}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <>
            <Separator />
            <div className="space-y-4">
              <div className="flex items-center justify-between text-lg font-semibold">
                <span>{totalLabel}</span>
                <span className="text-foreground">
                  {items.length} {items.length === 1 ? 'item' : 'items'}
                </span>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setIsOpen(false)}
                >
                  {continueShoppingLabel}
                </Button>
                <Button
                  className="flex-1"
                  onClick={() => {
                    // TODO: Implement checkout functionality
                    console.log('Checkout clicked', items);
                    alert('Checkout functionality coming soon!');
                  }}
                >
                  {checkoutButtonLabel}
                </Button>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
