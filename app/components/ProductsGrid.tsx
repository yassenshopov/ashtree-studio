'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Star, Github, MapPin } from 'lucide-react'
import { useCart } from './CartContext'

interface Product {
  id: string;
  name: string;
  description: string;
  features: string[];
  icon: string;
  badge: string;
  price: string;
  contactLink: string;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Github,
  MapPin,
};

interface ProductsGridProps {
  products: Product[];
  featuresLabel: string;
  orderNowLabel: string;
}

export default function ProductsGrid({ products, featuresLabel, orderNowLabel }: ProductsGridProps) {
  const [displayedProducts, setDisplayedProducts] = useState(products);
  const { addToCart } = useCart();

  useEffect(() => {
    setDisplayedProducts(products);
  }, [products]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
      {displayedProducts.map((product) => {
        const Icon = iconMap[product.icon] || Github
        return (
          <Card key={product.id} className="flex flex-col hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between mb-2">
                <Badge variant="secondary" className="text-xs">{product.badge}</Badge>
              </div>
              <div className="flex items-center gap-3 mb-3">
                <div className="p-3 rounded-lg bg-primary/10">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-lg">{product.name}</CardTitle>
              </div>
              <div className="flex items-center gap-1 text-sm">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">5.0</span>
                <span className="text-muted-foreground">(Reviews)</span>
              </div>
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
              <div className="flex gap-2 w-full">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </Button>
                <Button className="flex-1" asChild>
                  <a href={product.contactLink}>
                    {orderNowLabel}
                  </a>
                </Button>
              </div>
            </CardFooter>
          </Card>
        )
      })}
      {displayedProducts.length === 0 && (
        <div className="col-span-full text-center py-12">
          <p className="text-muted-foreground">No products found matching your search.</p>
        </div>
      )}
    </div>
  );
}
