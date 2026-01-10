'use client';

import { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';

export interface Product {
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

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  lastAddedProduct: Product | null;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}

interface CartProviderProps {
  children: ReactNode;
}

const CART_STORAGE_KEY = 'ashtree-studio-cart';

function loadCartFromStorage(): CartItem[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Failed to load cart from localStorage:', error);
  }
  return [];
}

function saveCartToStorage(items: CartItem[]): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  } catch (error) {
    console.error('Failed to save cart to localStorage:', error);
  }
}

export function CartProvider({ children }: CartProviderProps) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [lastAddedProduct, setLastAddedProduct] = useState<Product | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = loadCartFromStorage();
    setItems(savedCart);
    setIsHydrated(true);
  }, []);

  // Save cart to localStorage whenever items change (after hydration)
  useEffect(() => {
    if (isHydrated) {
      saveCartToStorage(items);
    }
  }, [items, isHydrated]);

  const addToCart = useCallback((product: Product) => {
    setLastAddedProduct(product);
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.product.id === product.id);
      const newItems = existingItem
        ? prevItems.map((item) =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [...prevItems, { product, quantity: 1 }];
      return newItems;
    });
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.product.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    setItems([]);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(CART_STORAGE_KEY);
    }
  }, []);

  const getTotalItems = useCallback(() => {
    return items.reduce((total, item) => total + item.quantity, 0);
  }, [items]);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalItems,
        isOpen,
        setIsOpen,
        lastAddedProduct,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
