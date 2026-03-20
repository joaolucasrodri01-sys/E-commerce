"use client";
import { useState, useMemo } from "react";
import { allProducts } from "./data/products";
import { useCart } from "./context/CartContext"; 
import ProductCard from "./components/ProductCard";
import Cart from "./components/Cart";

export default function Home() {
  const [activeTab, setActiveTab] = useState("todos");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cart } = useCart() as any; 

  const filteredProducts = useMemo(() => {
    // Se for "todos", mostra tudo exceto as ofertas (que ficam na seção de baixo)
    if (activeTab === "todos") {
      return allProducts.filter(p => p.category !== "ofertas");
    }
    // Caso contrário, filtra pela categoria exata (ex: "feminino")
    return allProducts.filter(p => p.category === activeTab);
  }, [activeTab]);

  const promoProducts = useMemo(() => {
    return allProducts.filter(p => p.category === "ofertas");
  }, []);

  // ADICIONADO: Categoria "feminino" na lista de abas
  const categories = [
    { id: "todos", label: "Tudo" },
    { id: "tenis", label: "Tênis" },
    { id: "feminino", label: "Feminino" }, // Nova aba!
    { id: "roupas", label: "Roupas" },
    { id: "calcas", label: "Calças" },
    { id: "acessorios", label: "Acessórios" },
  ];

  return (
    <main className="min-h-screen bg-[#fcfcfc] pb-20">
      {/* NAVBAR */}
      <nav className="fixed top-0 w-full z-[100] bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 py-5">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2 group cursor-pointer" onClick={() => setActiveTab("todos")}>
            <div className="bg-black text-white w-10 h-10 flex items-center justify-center rounded-xl font-black shadow-xl group-hover:scale-110 transition-transform duration-500">
              S
            </div>
            <span className="font-black text-2xl tracking-tighter italic uppercase text-black">
              Original<span className="text-orange-500 font-black">Street</span>
            </span>
          </div>

          <button 
            onClick={() => setIsCartOpen(true)}
            className="relative p-3.5 bg-black text-white rounded-2xl hover:scale-110 active:scale-95 transition-all shadow-2xl shadow-black/20 group"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>

            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-[10px] font-black w-6 h-6 rounded-full flex items-center justify-center border-[3px] border-white shadow-lg animate-in zoom-in duration-300">
                {cart.length}
              </span>
            )}
          </button>
        </div>
      </nav>

      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      <div className="max-w-7xl mx-auto pt-36 px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="animate-in slide-in-from-left duration-700">
            <p className="text-[10px] font-bold text-orange-500 uppercase tracking-[0.4em] mb-2 italic">Coleção 2026</p>
            <h1 className="text-7xl md:text-8xl font-black text-zinc-900 leading-[0.85] uppercase italic tracking-tighter">
              {activeTab === "feminino" ? "For " : "New "} 
              <br /> 
              <span className="text-orange-500">{activeTab === "feminino" ? "Girls" : "Drop"}</span>
            </h1>
          </div>

          {/* FILTROS DE CATEGORIA */}
          <div className="flex flex-wrap gap-2 bg-zinc-100/80 p-1.5 rounded-[24px] backdrop-blur-sm shadow-inner overflow-x-auto no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`px-8 py-3.5 rounded-[20px] text-[10px] font-black uppercase tracking-widest transition-all duration-300 whitespace-nowrap ${
                  activeTab === cat.id
                    ? "bg-white text-black shadow-xl scale-105"
                    : "text-zinc-400 hover:text-zinc-600"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* GRID DE PRODUTOS FILTRADOS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
          {filteredProducts.length === 0 && (
            <p className="col-span-full text-center py-20 text-zinc-400 font-bold uppercase italic text-xs">
              Nenhum produto encontrado nesta categoria.
            </p>
          )}
        </div>

        {/* SEÇÃO DE OFERTAS (Só aparece na aba "Tudo") */}
        {activeTab === "todos" && promoProducts.length > 0 && (
          <div className="mt-32 border-t border-zinc-100 pt-20">
            <div className="mb-12">
              <h2 className="text-4xl font-black italic uppercase tracking-tighter">
                Ofertas <span className="text-orange-500">Imperdíveis</span>
              </h2>
              <div className="h-1.5 w-20 bg-black mt-2"></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {promoProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}