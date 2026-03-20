"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";
import { useState, useEffect } from "react";

interface Props {
  isVisible: boolean;
  onComplete: () => void;
}

export default function OrderConfirmedAnimation({ isVisible, onComplete }: Props) {
  const { cart, cartTotal, clearCart } = useCart() as any;
  const [step, setStep] = useState(1);

  // Efeito para mudar do "Caminhão" para a "Confirmação"
  useEffect(() => {
    if (isVisible) {
      setStep(1);
      const timer = setTimeout(() => {
        setStep(2);
      }, 4800); 
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  const handleWhatsAppClick = () => {
    const numeroWhats = "5511999999999"; // Substitua pelo seu número real
    
    // FORMATANDO A LISTA COM COR E TAMANHO
    const listaProdutos = cart.map((i: any) => 
      `• *${i.name}*\n  🎨 Cor: ${i.selectedColor || "Padrão"}\n  📏 Tam: ${i.selectedSize || "N/A"}`
    ).join('\n\n');
    
    const textoMensagem = 
      `🚀 *NOVO PEDIDO - ORIGINAL STREET*\n\n` +
      `*Itens do Drop:*\n${listaProdutos}\n\n` +
      `💰 *Total:* R$ ${cartTotal.toFixed(2)}\n\n` +
      `_✅ Ciente do prazo de envio de 5 dias úteis._`;

    window.open(`https://wa.me/${numeroWhats}?text=${encodeURIComponent(textoMensagem)}`, "_blank");
    
    // Limpa o carrinho e fecha a animação
    clearCart();
    onComplete();
  };

  const colors = ["#f97316", "#000000", "#ffffff"];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-white z-[10001] flex flex-col items-center justify-center overflow-hidden"
        >
          {step === 1 ? (
            <div className="flex flex-col items-center justify-center w-full">
              <motion.h2 
                initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                className="text-4xl md:text-6xl font-black uppercase italic mb-10 text-zinc-900 text-center px-4"
              >
                PREPARANDO SEU <span className="text-orange-500">DROP!</span>
              </motion.h2>

              <div className="relative w-full max-w-2xl h-64 flex items-end justify-center">
                <motion.div
                  initial={{ x: -1200 }}
                  animate={{ x: [-1200, 0, 0, 1500] }}
                  transition={{ duration: 4.5, times: [0, 0.2, 0.8, 1], ease: "easeInOut" }}
                  className="text-[120px] z-20"
                >
                  🚚💨
                </motion.div>
                <div className="absolute bottom-10 w-full h-1 bg-zinc-100"></div>
              </div>
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} 
              animate={{ opacity: 1, scale: 1 }}
              className="relative flex flex-col items-center p-6 text-center max-w-md"
            >
              {/* Confetes */}
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ top: "-10%", left: `${Math.random() * 100}%` }}
                  animate={{ top: "110%", rotate: 360, x: Math.random() * 100 - 50 }}
                  transition={{ duration: 3, repeat: Infinity, delay: Math.random() }}
                  className="absolute w-2 h-4 rounded-sm"
                  style={{ backgroundColor: colors[i % colors.length] }}
                />
              ))}

              <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mb-8 shadow-2xl z-10">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={4} stroke="white" className="w-12 h-12">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
              </div>

              <motion.h2 className="text-4xl font-black text-zinc-900 uppercase italic tracking-tighter mb-4 z-10 leading-none">
                Pronto, <br/><span className="text-orange-500 italic">Drop Garantido!</span>
              </motion.h2>
              
              <p className="text-zinc-500 font-bold uppercase text-[10px] tracking-[0.3em] mb-10 z-10 italic">
                Agora, finalize seu pedido no WhatsApp
              </p>

              <div className="flex flex-col gap-4 w-full z-10 px-4">
                <button 
                  onClick={handleWhatsAppClick}
                  className="bg-[#25D366] text-white py-6 rounded-3xl font-black uppercase italic tracking-widest flex items-center justify-center gap-3 shadow-xl hover:scale-105 active:scale-95 transition-all w-full"
                >
                  <span>Enviar no WhatsApp</span>
                </button>
                
                <button 
                  onClick={() => { clearCart(); onComplete(); }}
                  className="text-zinc-400 font-black uppercase text-[9px] tracking-[0.4em] hover:text-black transition-colors"
                >
                  Voltar para a Loja
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}