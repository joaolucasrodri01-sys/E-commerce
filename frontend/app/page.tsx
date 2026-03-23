"use client";
import { useState, useMemo } from "react";
import { allProducts } from "./data/products";
import { useCart } from "./context/CartContext"; 
import ProductCard from "./components/ProductCard";
import Cart from "./components/Cart";
import Navbar from "./components/Navbar";
import FavoritesModal from "./components/FavoritesModal";
import Footer from "./components/Footer";

export default function Home() {
  const [activeTab, setActiveTab] = useState("todos");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFavOpen, setIsFavOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); 
  
  const { cart } = useCart() as any; 

  // Função de limpeza total
  const superNormalize = (text: string) => {
    return text?.toString()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // Tira acentos
      .replace(/\s+/g, '')             // Tira espaços
      .trim() || "";
  };

  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      const prodCat = superNormalize(product.category);
      const prodName = superNormalize(product.name);
      const tabActive = superNormalize(activeTab);
      const search = superNormalize(searchQuery);

      // 1. Filtro de Busca (Input da Navbar)
      const matchesSearch = prodName.includes(search);

      // 2. Lógica de Categoria (CORRIGIDA)
      let matchesCategory = false;

      // Se a aba for "todos", matchesCategory é sempre true
      if (tabActive === "todos" || tabActive === "todo") {
        matchesCategory = true;
      } else {
        // Verifica se a categoria do produto bate com a aba
        const categoryMatch = prodCat.includes(tabActive) || tabActive.includes(prodCat);
        
        // Regra especial para Moletom (Caso o cadastro esteja como Hoodie, Blusa, etc)
        const isMoletomSpecial = tabActive === "moletom" && (
          prodName.includes("moletom") || 
          prodName.includes("hoodie") || 
          prodName.includes("blusa") ||
          prodCat.includes("moletom")
        );

        matchesCategory = categoryMatch || isMoletomSpecial;
      }

      // 3. Regra de Promoção: 
      // Na aba 'todos', não mostramos o que é estritamente 'ofertas' para não duplicar com a seção de baixo
      // Mas se o usuário estiver na aba 'ofertas', aí sim mostramos.
      const isNotPromoOnHome = product.category !== "ofertas" || tabActive === "ofertas" || tabActive === "oferta";

      return matchesCategory && matchesSearch && isNotPromoOnHome;
    });
  }, [activeTab, searchQuery]);

  // Produtos que vão para a seção de Ofertas no fim da página
  const promoProducts = useMemo(() => {
    return allProducts.filter(p => p.category === "ofertas");
  }, []);

  return (
    <main className="min-h-screen bg-[#fcfcfc] flex flex-col">
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        setIsCartOpen={() => setIsCartOpen(true)}
        setIsFavOpen={() => setIsFavOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <FavoritesModal isOpen={isFavOpen} onClose={() => setIsFavOpen(false)} />

      <div className="max-w-7xl mx-auto pt-44 px-6 flex-grow w-full"> 
        
        {/* HEADER DINÂMICO */}
        <div className="mb-16 animate-in slide-in-from-left duration-700">
          <p className="text-[10px] font-bold text-orange-500 uppercase tracking-[0.4em] mb-2 italic">Coleção 2026</p>
          <h1 className="text-7xl md:text-8xl font-black text-zinc-900 leading-[0.85] uppercase italic tracking-tighter">
            {searchQuery ? "Search" : (activeTab === "feminino" ? "For " : "New ")} 
            <br /> 
            <span className="text-orange-500">
              {searchQuery ? "Result" : 
               activeTab === "todos" ? "Drop" : activeTab}
            </span>
          </h1>
        </div>

        {/* GRADE DE PRODUTOS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12 mb-20">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
          
          {filteredProducts.length === 0 && (
            <div className="col-span-full text-center py-32 bg-zinc-50 rounded-[40px] border-2 border-dashed border-zinc-100">
              <p className="text-zinc-400 font-black uppercase italic text-[10px] tracking-widest">
                Nenhum drop encontrado.
              </p>
            </div>
          )}
        </div>

        {/* SEÇÃO DE OFERTAS (SÓ APARECE NA HOME 'TODOS') */}
        {activeTab === "todos" && !searchQuery && promoProducts.length > 0 && (
          <div className="mt-10 mb-32 border-t border-zinc-100 pt-20">
            <h2 className="text-4xl font-black italic uppercase tracking-tighter mb-12">
              Ofertas <span className="text-orange-500">Imperdíveis</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {promoProducts.slice(0, 3).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}