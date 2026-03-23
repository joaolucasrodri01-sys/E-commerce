export const allProducts = [

  { 
    id: "t1", name: "Nike Air Max 270", price: 899.90, category: "tenis", 
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800", 
    description: "O Nike Air Max 270 oferece conforto inigualável.", 
    colors: [
      { name: "Laranja", hex: "#f97316", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800" },
      { name: "Preto", hex: "#000000", image: "https://images.unsplash.com/photo-1514989940723-e8e51635b782?w=800" } // Exemplo de outra cor
    ], 
    sizes: ["38", "40", "42"], stock: 10, isPreOrder: true 
  },
  { 
    id: "t2", name: "Adidas Forum Low", price: 549.00, category: "tenis", 
    image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=800", 
    description: "Estilo retrô clássico.", 
    colors: [{ name: "Branco", hex: "#ffffff", image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=800" }], 
    sizes: ["39", "41"], stock: 5, isPreOrder: true 
  },
  { 
    id: "t3", name: "Jordan 1 Retro High", price: 1299.00, category: "tenis", 
    image: "https://images.tcdn.com.br/img/img_prod/1088635/tenis_air_jordan_1_retro_high_og_hyper_royal_161_1_76c55ae954610af6473db0f24768af4b.jpeg", 
    description: "O ícone do basquete.", 
    colors: [{ name: "Azul Real", hex: "#4169E1", image: "https://images.tcdn.com.br/img/img_prod/1088635/tenis_air_jordan_1_retro_high_og_hyper_royal_161_1_76c55ae954610af6473db0f24768af4b.jpeg" }], 
    sizes: ["40", "42"], stock: 4, isPreOrder: true 
  },
  
  { 
    id: "r1", name: "Moletom Oversized Black", price: 249.90, category: "roupas", 
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800", 
    description: "Corte oversized premium.", 
    colors: [{ name: "Preto", hex: "#000000", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800" }], 
    sizes: ["P", "M", "G"], stock: 10 
  },
  { 
    id: "r2", name: "Camiseta Boxy Off-White", price: 119.00, category: "roupas", 
    image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800", 
    description: "Algodão de alta gramatura.", 
    colors: [{ name: "Off-White", hex: "#fafafa", image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800" }], 
    sizes: ["M", "G"], stock: 15 
  },

  { 
    id: "f1", name: "Top Nike Swoosh High", price: 189.90, category: "feminino", 
    image: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=800", 
    description: "Suporte e estilo para o dia a dia.", 
    colors: [{ name: "Preto", hex: "#000000", image: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=800" }], 
    sizes: ["P", "M"], stock: 8, isPreOrder: true 
  },
  { 
    id: "f2", name: "Legging High Waist Carbon", price: 229.00, category: "feminino", 
    image: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800", 
    description: "Cintura alta com compressão.", 
    colors: [{ name: "Grafite", hex: "#222222", image: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800" }], 
    sizes: ["M", "G"], stock: 12, isPreOrder: false 
  },
  { 
    id: "f3", name: "Vestido T-Shirt Street", price: 159.90, category: "feminino", 
    image: "https://images.unsplash.com/photo-1515347648392-ef4936f6d9da?w=800", 
    description: "Look casual e versátil.", 
    colors: [{ name: "Bege", hex: "#d2b48c", image: "https://images.unsplash.com/photo-1515347648392-ef4936f6d9da?w=800" }], 
    sizes: ["P", "M", "G"], stock: 5, isPreOrder: true 
  },
  
  { 
    id: "c1", name: "Calça Cargo Street", price: 189.90, category: "calcas", 
    image: "https://down-br.img.susercontent.com/file/br-11134207-7r98o-lw2v87un42nqea", 
    description: "Vários bolsos e estilo.", 
    colors: [{ name: "Verde", hex: "#4b5320", image: "https://down-br.img.susercontent.com/file/br-11134207-7r98o-lw2v87un42nqea" }], 
    sizes: ["40", "42"], stock: 8 
  },
  
 
  { 
    id: "a1", name: "Boné Snapback NY", price: 99.00, category: "acessorios", 
    image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800", 
    description: "Aba curva original.", 
    colors: [{ name: "Azul", hex: "#0000ff", image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800" }], 
    sizes: ["Único"], stock: 20 
  },

  // --- OFERTAS ---
  { 
    id: "p1", name: "Corta Vento Neon Limited", price: 199.90, oldPrice: 399.90, category: "ofertas", 
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800", 
    description: "Refletivo e impermeável.", 
    colors: [{ name: "Neon", hex: "#ccff00", image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800" }], 
    sizes: ["G"], stock: 2 
  },
  { 
    id: "p2", name: "Corta Vento Nike Essential", price: 99.90, oldPrice: 399.90, category: "ofertas", 
    image: "https://images.tcdn.com.br/img/img_prod/1111144/arrumar_jaqueta_nike_corta_vento_essential_preta_feminina_1307_1_6a4eeec801fc0070a0f29a98aaaf3b22.jpg", 
    description: "Jaqueta Nike Corta Vento Essential Preta Feminina.", 
    colors: [{ name: "Preto", hex: "#000000", image: "https://images.tcdn.com.br/img/img_prod/1111144/arrumar_jaqueta_nike_corta_vento_essential_preta_feminina_1307_1_6a4eeec801fc0070a0f29a98aaaf3b22.jpg" }], 
    sizes: ["P", "M", "G"], stock: 2 
  },
  { 
    id: "p3", name: "Camiseta Oversized Preta", price: 99.90, oldPrice: 199.90, category: "ofertas", 
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrh4LE7GE_0AUiuByn1unC2eAJTpJmjNpzZg&s", 
    description: "Camiseta Oversized Preta Make Art Not War Rosa.", 
    colors: [
      { name: "Preto/Rosa", hex: "#000000", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrh4LE7GE_0AUiuByn1unC2eAJTpJmjNpzZg&s" },
      { name: "Branco", hex: "#ffffff", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800" } // Exemplo de outra cor para teste
    ], 
    sizes: ["P", "M", "G"], stock: 3 
  },
];