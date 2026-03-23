"use client";
import { useCart } from "../context/CartContext";
import { useFavorites } from "../context/FavoritesContext";

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  setIsCartOpen, 
  setIsFavOpen, 
  searchQuery, 
  setSearchQuery 
}: any) {
  const { cart } = useCart() as any;
  const { favorites } = useFavorites();

  return (
    <nav className="fixed top-0 left-0 w-full z-[100] bg-white border-b border-zinc-100">
      <div className="max-w-[1400px] mx-auto px-6 h-20 flex items-center justify-between gap-4">
        
        {/* LADO ESQUERDO: LOGO + BUSCA */}
        <div className="flex items-center gap-6 flex-1">
          {/* LOGO */}
          <div 
            onClick={() => setActiveTab("todos")} 
            className="flex items-center gap-2 cursor-pointer shrink-0 group"
          >
            <div className="bg-black text-white w-8 h-8 flex items-center justify-center font-black rounded-lg italic text-sm group-hover:bg-orange-500 transition-colors">S</div>
            <span className="font-black uppercase italic tracking-tighter text-lg hidden xl:block">
              Original<span className="text-orange-500">Street</span>
            </span>
          </div>

          {/* BARRA DE BUSCA */}
          <div className="relative max-w-[240px] w-full hidden md:block">
            <div className="flex items-center bg-zinc-100 rounded-2xl px-4 py-2.5 border border-transparent focus-within:border-zinc-200 focus-within:bg-white transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-zinc-400 shrink-0">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
              </svg>
              <input 
                type="text" 
                value={searchQuery} 
                onChange={(e) => setSearchQuery(e.target.value)} 
                placeholder="BUSCAR..." 
                className="bg-transparent border-none focus:ring-0 text-[10px] font-bold uppercase italic ml-2 w-full outline-none text-zinc-800 placeholder:text-zinc-400"
              />
            </div>
          </div>
        </div>

        {/* CENTRO: CATEGORIAS EXPANDIDO */}
        <div className="hidden lg:flex items-center bg-zinc-100/80 p-1 rounded-2xl border border-zinc-200 shadow-inner overflow-x-auto">
          {[
            { label: "TODOS", value: "todos" },
            { label: "TÊNIS", value: "tenis" },
            { label: "CALÇA", value: "calca" },
            { label: "MOLETOM", value: "moletom" },
            { label: "PROMOÇÃO", value: "ofertas" }
          ].map((cat) => {
            const isActive = activeTab === cat.value;

            return (
              <button 
                key={cat.value} 
                onClick={() => setActiveTab(cat.value)}
                className={`px-5 py-2.5 text-[10px] font-black uppercase italic rounded-xl transition-all whitespace-nowrap ${
                  isActive 
                  ? "bg-white text-black shadow-sm scale-105" 
                  : "text-zinc-400 hover:text-black"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* LADO DIREITO: FAVORITOS + CARRINHO */}
        <div className="flex items-center gap-2 flex-1 justify-end">
          
          {/* BOTÃO DE FAVORITOS */}
          <button 
            onClick={setIsFavOpen}
            className="p-3 text-zinc-400 hover:text-red-500 transition-colors relative group"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
            </svg>
            {favorites?.length > 0 && (
              <span className="absolute top-2 right-2 bg-red-500 text-white text-[8px] font-black w-4 h-4 rounded-full flex items-center justify-center border-2 border-white animate-in zoom-in duration-300">
                {favorites.length}
              </span>
            )}
          </button>

          {/* CARRINHO */}
          <button 
            onClick={setIsCartOpen} 
            className="relative bg-black text-white w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg hover:bg-orange-500 transition-all active:scale-95 shrink-0"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-[9px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white animate-in zoom-in duration-300">
                {cart.length}
              </span>
            )}
          </button>
        </div>

      </div>
    </nav>
  );
}