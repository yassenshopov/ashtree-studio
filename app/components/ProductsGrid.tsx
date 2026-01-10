'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Plus, Github, MapPin, ImageIcon } from 'lucide-react'
import { useCart } from './CartContext'
import { toast } from 'sonner'
import { useTranslations } from 'next-intl'

interface Product {
  id: string;
  name: string;
  description: string;
  features: string[];
  icon: string;
  badge: string;
  price: string;
  contactLink: string;
  image?: string;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Github,
  MapPin,
};

interface ProductCardProps {
  product: Product;
  featuresLabel: string;
  onAddToCart: (product: Product) => void;
}

function ProductCard({ product, featuresLabel, onAddToCart }: ProductCardProps) {
  const [imageError, setImageError] = useState(false);
  const showImage = product.image && !imageError;

  return (
    <Card className="flex flex-col hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between mb-3">
          <Badge variant="secondary" className="text-xs">{product.badge}</Badge>
        </div>
        {/* Thumbnail Image */}
        <div className="relative w-full h-48 mb-3 rounded-lg overflow-hidden bg-muted flex items-center justify-center">
          {showImage ? (
            <Image
              src={product.image!}
              alt={product.name}
              fill
              className="object-cover"
              onError={() => setImageError(true)}
            />
          ) : (
            <ImageIcon className="h-12 w-12 text-muted-foreground" />
          )}
        </div>
        <CardTitle className="text-lg mb-2">{product.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow pb-3">
        <CardDescription className="text-sm mb-4 line-clamp-2">
          {product.description}
        </CardDescription>
        <div className="space-y-2 mb-4">
          <h4 className="text-xs font-semibold text-foreground">{featuresLabel}:</h4>
          <ul className="space-y-1">
            {product.features.slice(0, 2).map((feature, index) => (
              <li key={index} className="flex items-start gap-2 text-xs text-muted-foreground">
                <span className="text-primary mt-0.5">•</span>
                <span className="line-clamp-1">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-3 pt-3">
        <div className="w-full">
          <p className="text-lg font-semibold text-foreground">{product.price}</p>
        </div>
        <Button
          variant="outline"
          className="w-full transition-transform active:scale-95"
          onClick={() => onAddToCart(product)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}

interface ProductsGridProps {
  products: Product[];
  featuresLabel: string;
  orderNowLabel: string;
}

export default function ProductsGrid({ products, featuresLabel, orderNowLabel }: ProductsGridProps) {
  const [displayedProducts, setDisplayedProducts] = useState(products);
  const { addToCart } = useCart();
  const t = useTranslations('common');

  useEffect(() => {
    setDisplayedProducts(products);
  }, [products]);

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    const Icon = iconMap[product.icon] || Github;
    
    toast.success(
      <div className="flex items-center w-full relative -mr-6 pr-6">
        <div className="flex-1 pr-4">
          <div className="font-medium">{t('itemAddedToCart') || 'Item added to cart!'}</div>
          <div className="text-sm text-foreground/80 mt-0.5">{product.name}</div>
        </div>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10">
          {product.image ? (
            <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-muted flex-shrink-0">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Icon className="h-6 w-6 text-primary" />
            </div>
          )}
        </div>
      </div>,
      {
        duration: 2000,
        style: {
          overflow: 'visible',
        },
        className: 'overflow-visible',
      }
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
      {displayedProducts.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          featuresLabel={featuresLabel}
          onAddToCart={handleAddToCart}
        />
      ))}
      {displayedProducts.length === 0 && (
        <div className="col-span-full text-center py-12">
          <p className="text-muted-foreground">No products found matching your search.</p>
        </div>
      )}
    </div>
  );
}
