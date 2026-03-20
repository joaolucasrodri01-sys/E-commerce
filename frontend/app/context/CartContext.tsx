"use client";
import React, { createContext, useContext, useState, useEffect, useMemo } from "react";

interface Product {
  id: string;
  name: string;
  price: number; // Certifique-se que no seu data/products.ts o preço é NÚMERO
  image: string;
}

interface CartContextData {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  cartTotal: number;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<Product[]>([]);

  // Carrega o carrinho do navegador ao iniciar
  useEffect(() => {
    const saved = localStorage.getItem("@OriginalStreet:cart");
    if (saved) setCart(JSON.parse(saved));
  }, []);

  // Salva no navegador sempre que mudar
  useEffect(() => {
    localStorage.setItem("@OriginalStreet:cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product) => {
    setCart((prev) => [...prev, product]);
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => setCart([]);

  // CÁLCULO DO TOTAL CORRIGIDO
  const cartTotal = useMemo(() => {
    return cart.reduce((acc, item) => {
      // Força a conversão para número para evitar o R$ 0,00 ou NaN
      const price = typeof item.price === 'string' 
        ? parseFloat(item.price) 
        : item.price;
      return acc + (price || 0);
    }, 0);
  }, [cart]); 

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, cartTotal }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);