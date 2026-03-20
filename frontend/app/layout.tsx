import "./globals.css";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      {/* Removemos o bg-gray-50 daqui para não dar conflito com o branco do carrinho */}
      <body className="antialiased min-h-screen bg-white">
        <CartProvider>
          <Navbar />
          {/* O segredo: Tiramos o max-w e px daqui. 
              O Carrinho precisa estar fora de qualquer container limitado. */}
          <main>
            {children}
          </main>
        </CartProvider>
      </body>
    </html>
  );
}