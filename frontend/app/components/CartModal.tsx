"use client";
import { useCart } from "../context/CartContext";
import { motion, AnimatePresence } from "framer-motion";

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Cart({ isOpen, onClose }: CartProps) {
  const { cart, removeFromCart, cartTotal } = useCart() as any;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-md z-[9998]"
          />

          <motion.div 
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-screen w-full max-w-[450px] bg-white z-[9999] shadow-[-20px_0_50px_rgba(0,0,0,0.1)] flex flex-col"
          >
            {/* Header Chique */}
            <div className="p-8 border-b border-zinc-100 flex justify-between items-center bg-white">
              <div>
                <h2 className="text-3xl font-black italic uppercase tracking-tighter leading-none">
                  Seu <span className="text-orange-500">Carrinho</span>
                </h2>
                <p className="text-[10px] text-zinc-400 uppercase font-bold tracking-[0.2em] mt-1">
                  {cart.length} ITENS ADICIONADOS
                </p>
              </div>
              <button onClick={onClose} className="group p-2">
                <div className="text-zinc-300 group-hover:text-black transition-colors font-bold text-xs uppercase tracking-widest">Fechar</div>
              </button>
            </div>

            
            <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center opacity-20">
                  <span className="text-6xl mb-4 text-black italic font-black uppercase tracking-tighter">Vazio</span>
                </div>
              ) : (
                cart.map((item: any) => (
                  <div key={item.id} className="group flex gap-6 items-center">
                    <div className="w-24 h-24 bg-zinc-50 rounded-3xl p-4 flex-shrink-0 group-hover:scale-105 transition-transform duration-500">
                      <img src={item.image} alt={item.name} className="w-full h-full object-contain mix-blend-multiply" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-black text-xs uppercase italic leading-tight tracking-tight mb-1">{item.name}</h4>
                      <p className="text-orange-500 font-black text-sm italic">R$ {Number(item.price).toFixed(2)}</p>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-[9px] font-bold text-zinc-300 hover:text-red-500 uppercase tracking-widest mt-3 transition-colors"
                      >
                        [ Remover ]
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

           
            {cart.length > 0 && (
              <div className="p-8 bg-zinc-50/50 border-t border-zinc-100">
                <div className="flex justify-between items-end mb-8">
                  <span className="font-bold text-zinc-400 uppercase text-[10px] tracking-[0.3em] italic">Subtotal</span>
                  <div className="text-right">
                    <span className="text-4xl font-black italic tracking-tighter text-black">
                      R$ {Number(cartTotal).toFixed(2)}
                    </span>
                  </div>
                </div>
                
                <button className="w-full bg-black text-white py-6 rounded-3xl font-black uppercase italic tracking-[0.2em] hover:bg-orange-500 hover:scale-[1.02] active:scale-95 transition-all shadow-2xl shadow-black/20">
                  Finalizar Pedido
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}