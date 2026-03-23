"use client";
import { useFavorites } from "../context/FavoritesContext";
import { useCart } from "../context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function FavoritesModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { favorites, toggleFavorite } = useFavorites();
  const { addToCart } = useCart() as any;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay (Fundo escuro para fechar ao clicar fora) */}
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200]"
          />
          
          {/* Painel Lateral */}
          <motion.div 
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-[201] shadow-2xl flex flex-col"
          >
            {/* Header do Modal */}
            <div className="p-8 border-b border-zinc-100 flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-black uppercase italic tracking-tighter">
                  Wish<span className="text-orange-500">list</span>
                </h2>
                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Seus itens favoritos</p>
              </div>
              <button 
                onClick={onClose}
                className="group flex items-center gap-2 bg-zinc-100 hover:bg-black hover:text-white transition-all px-4 py-2 rounded-full text-[10px] font-black uppercase italic"
              >
                Voltar
                <span className="text-lg">✕</span>
              </button>
            </div>

            {/* Lista de Produtos */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {favorites.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-16 h-16 bg-zinc-50 rounded-full flex items-center justify-center text-zinc-300 text-2xl">♡</div>
                  <p className="text-zinc-400 font-bold uppercase italic text-xs">Sua lista está vazia</p>
                  <button onClick={onClose} className="text-orange-500 font-black uppercase italic text-[10px] underline underline-offset-4">Explorar o Drop</button>
                </div>
              ) : (
                favorites.map((item: any) => (
                  <div key={item.id} className="flex gap-4 bg-zinc-50 p-4 rounded-[24px] border border-zinc-100 group transition-all hover:bg-white hover:shadow-xl">
                    <div className="w-24 h-24 relative rounded-2xl overflow-hidden bg-white shrink-0 border border-zinc-100">
                      <Image src={item.image} alt={item.name} fill className="object-contain p-2" />
                    </div>
                    
                    <div className="flex flex-col justify-between flex-1 py-1">
                      <div>
                        <h4 className="text-[11px] font-black uppercase italic leading-tight text-zinc-800">{item.name}</h4>
                        <p className="text-sm font-black text-orange-500 mt-1">R$ {item.price.toFixed(2)}</p>
                      </div>
                      
                      <div className="flex gap-2">
                        <button 
                          onClick={() => { addToCart(item); toggleFavorite(item); }}
                          className="bg-black text-white text-[9px] font-black uppercase italic px-4 py-2 rounded-lg hover:bg-orange-500 transition-colors"
                        >
                          Mover p/ Carrinho
                        </button>
                        <button 
                          onClick={() => toggleFavorite(item)}
                          className="text-zinc-300 hover:text-red-500 transition-colors p-2"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256"><path d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm96,168H64V64H192ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z"></path></svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}