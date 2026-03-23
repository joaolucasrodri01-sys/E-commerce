import "./globals.css";
import { CartProvider } from "./context/CartContext";
import { FavoritesProvider } from "./context/FavoritesContext"; // 1. Importação adicionada
import Navbar from "./components/Navbar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <body className="antialiased min-h-screen bg-white">
        {/* 2. O FavoritesProvider deve envolver tudo para que a Navbar e os Cards funcionem */}
        <FavoritesProvider>
          <CartProvider>
            
            <Navbar />
            
            <main>
              {children}
            </main>

          </CartProvider>
        </FavoritesProvider>
      </body>
    </html>
  );
}