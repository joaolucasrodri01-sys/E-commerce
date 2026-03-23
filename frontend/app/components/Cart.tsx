"use client";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import OrderConfirmedAnimation from "./OrderConfirmedAnimation";

export default function Cart({ isOpen, onClose }: any) {
  const { cart, cartTotal, removeFromCart } = useCart() as any;
  
  const [checkoutStep, setCheckoutStep] = useState<"cart" | "payment" | "details">("cart");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [showAnimation, setShowAnimation] = useState(false);
  const [needsChange, setNeedsChange] = useState<string>(""); 
  const [changeAmount, setChangeAmount] = useState("");

  const handleFinalizar = () => {
    setShowAnimation(true);
  };

  const renderStepContent = () => {
    switch (checkoutStep) {
      case "cart":
        return (
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 opacity-20 text-center">
                <span className="text-6xl mb-4">🛒</span>
                <p className="font-black uppercase italic text-xs">O teu carrinho está vazio</p>
              </div>
            ) : (
              
              cart.map((item: any, index: number) => {
                const itemKey = item.tempId || `${item.id}-${item.selectedColor}-${item.selectedSize}-${index}`;
                
                return (
                  <div 
                    key={itemKey} 
                    className="flex gap-4 bg-zinc-50 p-4 rounded-[32px] relative group transition-all hover:bg-zinc-100/50"
                  >
                    <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center p-2 shadow-sm shrink-0">
                      <img src={item.image} className="w-full h-full object-contain mix-blend-multiply" alt={item.name} />
                    </div>

                    <div className="flex-1 flex flex-col justify-center">
                      <h4 className="font-black text-[11px] uppercase italic leading-none mb-1 tracking-tight text-zinc-900">
                        {item.name}
                      </h4>
                      <div className="flex gap-2 mt-1">
                        <span className="text-[8px] font-black bg-zinc-900 text-white px-2 py-0.5 rounded-full uppercase italic">
                          {item.selectedColor}
                        </span>
                        <span className="text-[8px] font-black bg-orange-500 text-white px-2 py-0.5 rounded-full uppercase italic">
                          TAM: {item.selectedSize}
                        </span>
                      </div>
                      <div className="flex justify-between items-center mt-3">
                        <span className="font-black text-sm italic tracking-tighter text-zinc-900">
                          R$ {item.price.toFixed(2)}
                        </span>
                        <span className="text-[9px] font-bold text-zinc-400">QTD: {item.quantity || 1}</span>
                      </div>
                    </div>
                    
                  
                    <button 
                      onClick={() => removeFromCart(item.tempId || item.id)}
                      className="absolute -top-1 -right-1 w-8 h-8 bg-white border border-zinc-100 rounded-full flex items-center justify-center text-zinc-300 shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300 hover:text-red-500 hover:scale-110 active:scale-90 z-10"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 6h18m-2 0v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6m3 0V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                      </svg>
                    </button>
                  </div>
                );
              })
            )}
          </div>
        );

      case "payment":
        return (
          <div className="p-6 space-y-6">
            <button onClick={() => setCheckoutStep("cart")} className="text-[10px] font-black uppercase text-zinc-400 hover:text-black transition-colors">← Voltar para o carrinho</button>
            <h3 className="font-black uppercase italic text-sm tracking-tighter">Escolha o Pagamento</h3>
            <div className="grid grid-cols-1 gap-3">
              {["PIX", "DINHEIRO", "CARTÃO DE CRÉDITO"].map((m) => (
                <button
                  key={m}
                  onClick={() => { setPaymentMethod(m); setCheckoutStep("details"); }}
                  className="w-full py-6 rounded-[24px] font-black uppercase italic text-[11px] border-2 border-zinc-100 hover:border-black transition-all text-left px-8 flex justify-between items-center group"
                >
                  {m}
                  <span className="opacity-0 group-hover:opacity-100 transition-all">→</span>
                </button>
              ))}
            </div>
          </div>
        );

      case "details":
        return (
          <div className="p-6 space-y-6">
            <button onClick={() => setCheckoutStep("payment")} className="text-[10px] font-black uppercase text-zinc-400">← Alterar método</button>
            
            {paymentMethod === "PIX" && (
              <div className="text-center py-6">
                <div className="w-40 h-40 bg-zinc-50 mx-auto rounded-[40px] flex items-center justify-center border-2 border-dashed border-zinc-200 mb-6">
                  <span className="text-4xl">⚡</span>
                </div>
                <p className="text-[10px] font-black uppercase text-zinc-400 italic px-10 leading-relaxed text-center">
              
                </p>
              </div>
            )}

            {paymentMethod === "DINHEIRO" && (
              <div className="space-y-4">
                <p className="font-black uppercase italic text-xs tracking-tight">Precisa de troco?</p>
                <div className="flex gap-2">
                  {["NÃO", "SIM"].map(opt => (
                    <button 
                      key={opt}
                      onClick={() => setNeedsChange(opt)}
                      className={`flex-1 py-5 rounded-2xl font-black text-[10px] transition-all ${needsChange === opt ? 'bg-black text-white' : 'bg-zinc-100 text-zinc-400'}`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
                {needsChange === "SIM" && (
                  <input 
                    type="number" 
                    placeholder="Troco para quanto?"
                    className="w-full p-5 bg-zinc-50 rounded-[24px] text-[11px] font-black outline-none border-2 border-transparent focus:border-black transition-all"
                    value={changeAmount} onChange={(e) => setChangeAmount(e.target.value)}
                  />
                )}
              </div>
            )}

            {paymentMethod === "CARTÃO DE CRÉDITO" && (
              <div className="space-y-3">
                <p className="font-black uppercase italic text-xs mb-2">Dados do Cartão</p>
                <input type="text" placeholder="NÚMERO DO CARTÃO" className="w-full p-5 bg-zinc-50 rounded-2xl text-[10px] font-black outline-none border border-transparent focus:border-zinc-200" />
                <input type="text" placeholder="NOME NO CARTÃO" className="w-full p-5 bg-zinc-50 rounded-2xl text-[10px] font-black outline-none border border-transparent focus:border-zinc-200 uppercase" />
                <div className="flex gap-2">
                  <input type="text" placeholder="MM/AA" className="flex-1 p-5 bg-zinc-50 rounded-2xl text-[10px] font-black outline-none" />
                  <input type="text" placeholder="CVV" className="flex-1 p-5 bg-zinc-50 rounded-2xl text-[10px] font-black outline-none" />
                </div>
              </div>
            )}
          </div>
        );
    }
  };

  return (
    <>
      <OrderConfirmedAnimation 
        isVisible={showAnimation} 
        onComplete={() => { 
          setShowAnimation(false); 
          onClose(); 
          setCheckoutStep("cart"); 
        }} 
      />
      
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[999]" />
            <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-[1000] flex flex-col shadow-2xl">
              
              <div className="p-8 flex justify-between items-center">
                <h2 className="font-black uppercase italic text-2xl tracking-tighter">O Teu Drop</h2>
                <button onClick={onClose} className="w-10 h-10 rounded-full bg-zinc-50 flex items-center justify-center text-xs font-black hover:bg-zinc-100 transition-colors">✕</button>
              </div>

              {renderStepContent()}

              <div className="p-8 bg-white border-t border-zinc-50 space-y-6">
                <div className="flex justify-between items-end">
                  <span className="text-[10px] font-black uppercase text-zinc-400 italic">Total do Drop</span>
                  <span className="text-4xl font-black italic tracking-tighter">R$ {cartTotal.toFixed(2)}</span>
                </div>

                <button 
                  onClick={checkoutStep === "cart" ? () => setCheckoutStep("payment") : handleFinalizar}
                  disabled={cart.length === 0}
                  className="w-full bg-zinc-900 text-white py-6 rounded-[28px] font-black uppercase italic tracking-[0.2em] text-[11px] hover:bg-orange-500 transition-all shadow-xl disabled:opacity-20"
                >
                  {checkoutStep === "cart" ? "Próximo Passo" : "Confirmar Drop"}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}