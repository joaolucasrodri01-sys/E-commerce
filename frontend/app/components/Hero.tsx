export default function Hero() {
  return (
    <div className="relative w-full h-[70vh] flex items-center justify-center overflow-hidden rounded-3xl mb-12">
      <img 
        src="https://images.unsplash.com/photo-1552346154-21d32810aba3?w=1600" 
        className="absolute inset-0 w-full h-full object-cover"
        alt="Banner"
      />
      <div className="absolute inset-0 bg-black/40" /> {/* Dark overlay */}
      <div className="relative z-10 text-center px-4">
        <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-4">
          Nova Coleção <br/> <span className="text-orange-500">Street 2026</span>
        </h2>
        <p className="text-gray-200 text-lg mb-8 max-w-lg mx-auto font-medium">
          Onde o estilo encontra a performance. Explore o que há de novo na cultura urbana.
        </p>
        <button className="bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-orange-500 hover:text-white transition-all transform hover:scale-105">
          Comprar Agora
        </button>
      </div>
    </div>
  );
}