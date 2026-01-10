'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

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

interface ProductSearchProps {
  products: Product[];
  onSearch: (filteredProducts: Product[]) => void;
}

export default function ProductSearch({ products, onSearch }: ProductSearchProps) {
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Filter products in real-time as user types
    if (!searchQuery.trim()) {
      onSearch(products);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = products.filter((product) => {
      return (
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.features.some((feature) => feature.toLowerCase().includes(query))
      );
    });
    onSearch(filtered);
  }, [searchQuery, products, onSearch]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is already handled by useEffect
  };

  return (
    <form onSubmit={handleSearch} className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-2xl mx-auto">
      <div className="flex-1 w-full sm:w-auto">
        <Input
          type="search"
          placeholder="Search on Ashtree Studio"
          className="w-full"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <Button type="submit" className="w-full sm:w-auto">
        <Search className="h-4 w-4 mr-2" />
        Search
      </Button>
    </form>
  );
}
