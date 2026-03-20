"use client";
import { allProducts } from "@/app/data/products";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useCart } from "@/app/context/CartContext";
import { motion, AnimatePresence } from "framer-motion";

export default function ProductDetails() {
  const params = useParams();
  const { addToCart } = useCart() as any;
  const product = allProducts.find((p) => p.id === params.id);

  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0]?.name || "");
  const [currentImage, setCurrentImage] = useState(product?.image);
  const [isAnimating, setIsAnimating] = useState(false);

  // Troca a imagem principal quando o usuário clica em uma cor
  useEffect(() => {
    const colorData = product?.colors?.find(c => c.name === selectedColor);
    if (colorData?.image) {
      setCurrentImage(colorData.image);
    }
  }, [selectedColor, product]);

  if (!product) return <div className="p-20 text-center font-black">Produto não encontrado</div>;

  const handleAdd = () => {
    if (product.sizes && !selectedSize) {
      alert("Selecione o tamanho!");
      return;
    }

    setIsAnimating(true);
    addToCart({
      ...product,
      image: currentImage, // Envia a cor certa para o carrinho
      tempId: `${product.id}-${selectedColor}-${selectedSize}`,
      selectedSize,
      selectedColor
    });

    // Remove a animação após 1 segundo
    setTimeout(() => setIsAnimating(false), 1000);
  };

  return (
    <main className="min-h-screen bg-white pt-24 pb-20 overflow-hidden">
      
      {/* ANIMAÇÃO VOADORA (FLY-TO-CART) */}
      <AnimatePresence>
        {isAnimating && (
          <motion.div
            initial={{ opacity: 1, scale: 1, x: "50vw", y: "50vh" }}
            animate={{ opacity: 0, scale: 0.2, x: "90vw", y: "20px" }}
            transition={{ duration: 0.8, ease: "backIn" }}
            className="fixed z-[9999] w-20 h-20 bg-orange-500 rounded-3xl flex items-center justify-center text-white shadow-2xl"
          >
            <img src={currentImage} className="w-12 h-12 object-contain brightness-110" />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        {/* LADO ESQUERDO: IMAGEM DINÂMICA */}
        <div className="relative group bg-[#f7f7f7] rounded-[48px] p-12 aspect-square flex items-center justify-center">
          <motion.img 
            key={currentImage} // Faz um efeito de fade quando a imagem muda
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            src={currentImage} 
            className="w-full h-full object-contain mix-blend-multiply" 
          />
        </div>

        {/* LADO DIREITO: INFOS */}
        <div className="flex flex-col justify-center space-y-10">
          <div className="space-y-2">
            <span className="text-orange-500 font-black uppercase tracking-[0.4em] text-[10px] italic">Original Street Drop</span>
            <h1 className="text-6xl font-black uppercase italic tracking-tighter leading-[0.9]">
              {product.name}
            </h1>
          </div>

          <div className="text-4xl font-black italic text-zinc-900">
            R$ {product.price.toFixed(2)}
          </div>

          {/* CORES COM TROCA DE IMAGEM */}
          <div className="space-y-4">
            <p className="font-black uppercase text-[10px] text-zinc-400 italic tracking-widest">
              Cores Disponíveis: <span className="text-black">{selectedColor}</span>
            </p>
            <div className="flex gap-4">
              {product.colors?.map((c: any) => (
                <button 
                  key={c.name}
                  onClick={() => setSelectedColor(c.name)}
                  className={`w-12 h-12 rounded-full border-[3px] transition-all duration-300 ${
                    selectedColor === c.name ? 'border-orange-500 scale-110 shadow-lg' : 'border-zinc-100 hover:border-zinc-300'
                  }`}
                  style={{ backgroundColor: c.hex }}
                />
              ))}
            </div>
          </div>

          {/* TAMANHOS */}
          <div className="space-y-4">
            <p className="font-black uppercase text-[10px] text-zinc-400 italic tracking-widest">Selecione o tamanho</p>
            <div className="flex flex-wrap gap-3">
              {product.sizes?.map((s: string) => (
                <button 
                  key={s}
                  onClick={() => setSelectedSize(s)}
                  className={`h-14 px-8 rounded-2xl font-black text-sm transition-all border-2 ${
                    selectedSize === s 
                    ? 'bg-black text-white border-black shadow-xl scale-105' 
                    : 'border-zinc-100 text-zinc-400 hover:border-zinc-200'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* BOTÃO DE ADICIONAR */}
          <button 
            onClick={handleAdd}
            className="group relative w-full bg-zinc-900 text-white py-8 rounded-[32px] font-black uppercase italic tracking-widest text-sm overflow-hidden hover:bg-orange-600 transition-all active:scale-95"
          >
            <span className="relative z-10 flex items-center justify-center gap-3">
              Adicionar ao Drop
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </main>
  );
}