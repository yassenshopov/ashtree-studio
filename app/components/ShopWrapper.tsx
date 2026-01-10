'use client';

import { useState, createContext, useContext, useCallback } from 'react';
import ProductSearch from './ProductSearch';
import ProductsGrid from './ProductsGrid';

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

interface ShopContextType {
  filteredProducts: Product[];
  setFilteredProducts: (products: Product[]) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export function useShopContext() {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShopContext must be used within ShopProvider');
  }
  return context;
}

interface ShopProviderProps {
  products: Product[];
  children: React.ReactNode;
}

export function ShopProvider({ products, children }: ShopProviderProps) {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const handleSearch = useCallback((filtered: Product[]) => {
    setFilteredProducts(filtered);
  }, []);
  return (
    <ShopContext.Provider value={{ filteredProducts, setFilteredProducts: handleSearch }}>
      {children}
    </ShopContext.Provider>
  );
}

interface ShopSearchProps {
  products: Product[];
}

export function ShopSearch({ products }: ShopSearchProps) {
  const { setFilteredProducts } = useShopContext();
  return <ProductSearch products={products} onSearch={setFilteredProducts} />;
}

interface ShopProductsProps {
  featuresLabel: string;
  orderNowLabel: string;
}

export function ShopProducts({ featuresLabel, orderNowLabel }: ShopProductsProps) {
  const { filteredProducts } = useShopContext();
  return (
    <ProductsGrid 
      products={filteredProducts} 
      featuresLabel={featuresLabel}
      orderNowLabel={orderNowLabel}
    />
  );
}
