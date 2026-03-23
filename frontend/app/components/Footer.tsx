"use client";

export default function Footer() {
  return (
    <footer className="bg-zinc-950 text-white pt-20 pb-10 px-6 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          
          {/* COLUNA 1: LOGO E SOBRE */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-white text-black w-8 h-8 flex items-center justify-center font-black rounded-lg italic text-sm">S</div>
              <span className="font-black uppercase italic tracking-tighter text-xl">
                Original<span className="text-orange-500">Street</span>
              </span>
            </div>
            <p className="text-zinc-500 text-xs font-bold leading-relaxed uppercase italic">
              O autêntico lifestyle urbano. <br />
              Peças exclusivas para quem <br />
              domina as ruas.
            </p>
          </div>

          {/* COLUNA 2: CATEGORIAS */}
          <div>
            <h4 className="text-[10px] font-black text-orange-500 uppercase tracking-[0.3em] mb-6 italic">Categorias</h4>
            <ul className="space-y-4 text-xs font-bold uppercase italic text-zinc-400">
              <li className="hover:text-white cursor-pointer transition-colors">Tênis</li>
              <li className="hover:text-white cursor-pointer transition-colors">Moletons</li>
              <li className="hover:text-white cursor-pointer transition-colors">Calças Cargo</li>
              <li className="hover:text-white cursor-pointer transition-colors">Acessórios</li>
            </ul>
          </div>

          {/* COLUNA 3: SUPORTE */}
          <div>
            <h4 className="text-[10px] font-black text-orange-500 uppercase tracking-[0.3em] mb-6 italic">Suporte</h4>
            <ul className="space-y-4 text-xs font-bold uppercase italic text-zinc-400">
              <li className="hover:text-white cursor-pointer transition-colors">Rastrear Pedido</li>
              <li className="hover:text-white cursor-pointer transition-colors">Trocas e Devoluções</li>
              <li className="hover:text-white cursor-pointer transition-colors">Termos de Uso</li>
              <li className="hover:text-white cursor-pointer transition-colors">FAQ</li>
            </ul>
          </div>

          {/* COLUNA 4: NEWSLETTER / CONTATO */}
          <div>
            <h4 className="text-[10px] font-black text-orange-500 uppercase tracking-[0.3em] mb-6 italic">Drop VIP</h4>
            <p className="text-[10px] text-zinc-500 mb-4 font-bold uppercase italic">Receba avisos de novos drops no seu e-mail.</p>
            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder="SEU@EMAIL.COM" 
                className="bg-zinc-900 border-none rounded-xl px-4 py-3 text-[10px] font-bold uppercase italic w-full focus:ring-1 focus:ring-orange-500 outline-none"
              />
              <button className="bg-white text-black px-4 py-3 rounded-xl font-black italic text-[10px] hover:bg-orange-500 transition-colors">
                OK
              </button>
            </div>
          </div>
        </div>

        {/* BARRA INFERIOR: COPYRIGHT E PAGAMENTOS */}
        <div className="pt-10 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[9px] font-bold text-zinc-600 uppercase italic">
            © 2026 ORIGINAL STREET CLOTHING. TODOS OS DIREITOS RESERVADOS.
          </p>
          
          <div className="flex items-center gap-4 grayscale opacity-50">
            {/* Aqui você pode colocar ícones de cartões/Pix */}
            <div className="bg-zinc-800 h-6 w-10 rounded-sm"></div>
            <div className="bg-zinc-800 h-6 w-10 rounded-sm"></div>
            <div className="bg-zinc-800 h-6 w-10 rounded-sm"></div>
          </div>
        </div>
      </div>
    </footer>
  );
}