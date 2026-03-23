"use client";
import { useCart } from "../context/CartContext";
import { useFavorites } from "../context/FavoritesContext"; // Importando o contexto de favoritos
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Link from "next/link";

export default function ProductCard({ product }: { product: any }) {
  const { addToCart } = useCart() as any;
  const { toggleFavorite, isFavorite } = useFavorites(); // Pegando as funções de favoritos
  const [isAnimating, setIsAnimating] = useState(false);

  if (!product) return null;

  const isOutOfStock = product.stock === 0;
  const favorited = isFavorite(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isOutOfStock) return;
    
    setIsAnimating(true);
    addToCart(product);
    
    setTimeout(() => setIsAnimating(false), 800);
  };

  return (
    <div className={`group relative bg-white rounded-[32px] p-4 transition-all duration-500 border border-gray-100 ${isOutOfStock ? "opacity-70" : "hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)]"}`}>
      
      {/* ANIMAÇÃO DE ADICIONAR AO CARRINHO (PLUS VOADOR) */}
      <AnimatePresence>
        {isAnimating && (
          <motion.div
            initial={{ opacity: 1, scale: 1, x: 0, y: 0 }}
            animate={{ 
              opacity: 0, 
              scale: 0.3, 
              x: 200, 
              y: -700 
            }}
            transition={{ duration: 0.8, ease: "backIn" }}
            className="fixed z-[9999] pointer-events-none w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white shadow-2xl"
            style={{ top: "40%", left: "45%" }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6">
              <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>

      {/* BOTÃO DE FAVORITOS (CORAÇÃO) - ESTILO MARCA PREMIUM */}
      <button 
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggleFavorite(product);
        }}
        className="absolute top-6 right-6 z-30 p-3 bg-white/40 backdrop-blur-xl rounded-full border border-white/20 shadow-sm transition-all duration-300 hover:scale-110 active:scale-90 group/heart"
      >
        <motion.svg 
          animate={{ scale: favorited ? [1, 1.3, 1] : 1 }}
          transition={{ duration: 0.3 }}
          xmlns="http://www.w3.org/2000/svg" 
          width="18" 
          height="18" 
          viewBox="0 0 24 24" 
          fill={favorited ? "#ef4444" : "none"} 
          stroke={favorited ? "#ef4444" : "currentColor"} 
          strokeWidth="2.5" 
          className="transition-colors duration-300"
        >
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
        </motion.svg>
      </button>

      {/* BADGES (ENVIO, ESGOTADO, OFERTA) */}
      <div className="absolute top-6 left-6 z-20 flex flex-col gap-2">
        {isOutOfStock ? (
          <span className="bg-zinc-900 text-white text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-full">Esgotado</span>
        ) : product.isPreOrder ? (
          <span className="bg-black text-white text-[8px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1">
            📦 Envio em 5 dias
          </span>
        ) : product.oldPrice ? (
          <span className="bg-orange-500 text-white text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-full">Oferta</span>
        ) : null}
      </div>

      <Link href={`/product/${product.id}`} target="_blank" rel="noopener noreferrer">
        <div className="relative aspect-square overflow-hidden rounded-[24px] bg-[#f7f7f7] mb-4">
          <img
            src={product?.image}
            alt={product?.name}
            className={`w-full h-full object-contain p-6 mix-blend-multiply transition-transform duration-500 ${isOutOfStock ? "grayscale" : "group-hover:scale-110"}`}
          />
          {isOutOfStock && (
            <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px] flex items-center justify-center text-center">
              <span className="text-zinc-900 font-black uppercase text-[10px] tracking-widest border-2 border-zinc-900 px-3 py-1 rotate-[-10deg]">Sold Out</span>
            </div>
          )}
        </div>

        <div className="space-y-1 px-1">
          <span className="text-[9px] font-bold text-gray-400 uppercase tracking-[0.2em]">Original Street</span>
          <h3 className="font-bold text-zinc-800 text-sm md:text-base leading-tight truncate uppercase italic tracking-tighter hover:text-orange-500 transition-colors">
            {product?.name}
          </h3>
        </div>
      </Link>

      {/* ÁREA DE PREÇO E BOTÃO COMPRAR */}
      <div className="px-1">
        <div className="flex items-center justify-between pt-3">
          <div className="flex flex-col">
            {product.oldPrice && (
              <span className="text-zinc-400 line-through text-[10px] font-bold italic">R$ {product.oldPrice.toFixed(2)}</span>
            )}
            <span className="text-lg font-black text-zinc-900 tracking-tighter italic">
              R$ {product?.price?.toFixed(2)}
            </span>
          </div>
          
          <button
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className={`p-3.5 rounded-2xl transition-all duration-300 shadow-md ${
              isOutOfStock 
                ? "bg-zinc-100 text-zinc-300 cursor-not-allowed" 
                : "bg-zinc-900 text-white hover:bg-orange-500 active:scale-90"
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}