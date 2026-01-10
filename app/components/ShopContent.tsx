'use client';

import { useState } from 'react';
import ProductSearch from './ProductSearch';
import ProductsGrid from './ProductsGrid';

interface Product {
  id: string;
  name: string;
  description: string;
  features: string[];
  icon: any;
  badge: string;
  price: string;
  contactLink: string;
}

interface ShopContentProps {
  products: Product[];
  featuresLabel: string;
  orderNowLabel: string;
}

export default function ShopContent({ products, featuresLabel, orderNowLabel }: ShopContentProps) {
  const [filteredProducts, setFilteredProducts] = useState(products);

  return (
    <>
      <ProductSearch products={products} onSearch={setFilteredProducts} />
      <ProductsGrid 
        products={filteredProducts} 
        featuresLabel={featuresLabel}
        orderNowLabel={orderNowLabel}
      />
    </>
  );
}
