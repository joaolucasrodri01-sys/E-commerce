"use client";
import { createContext, useContext, useState, useEffect } from "react";

const FavoritesContext = createContext<any>(null);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<any[]>([]);

  // Carregar favoritos salvos ao iniciar
  useEffect(() => {
    const saved = localStorage.getItem("@OriginalStreet:favorites");
    if (saved) setFavorites(JSON.parse(saved));
  }, []);

  // Salvar no localStorage sempre que mudar
  useEffect(() => {
    localStorage.setItem("@OriginalStreet:favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (product: any) => {
    setFavorites((prev) => {
      const isFavorite = prev.find((item) => item.id === product.id);
      if (isFavorite) {
        return prev.filter((item) => item.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const isFavorite = (id: number) => favorites.some((item) => item.id === id);

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export const useFavorites = () => useContext(FavoritesContext);