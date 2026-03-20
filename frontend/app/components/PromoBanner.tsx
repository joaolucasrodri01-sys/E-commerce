import React, { useEffect, useState } from 'react';
import { doc, getDoc } from "firebase/firestore";
import { db } from "../lib/firebase"; // ajuste o caminho conforme sua pasta

export default function PromoBanner() {
  const [promoText, setPromoText] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        // CAMINHO EXATO: Banco -> Coleção "promoBanner" -> Documento "promoBanner"
        const docRef = doc(db, "promoBanner", "promoBanner");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setPromoText(data.text); // Pega o campo "text" que você mostrou
        } else {
          console.log("Documento não encontrado no Firestore!");
        }
      } catch (error) {
        console.error("Erro ao buscar banner:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBanner();
  }, []);

  if (loading) return <div>Carregando promoções...</div>;
  if (!promoText) return null;

  return (
    <div style={{ backgroundColor: '#ffeb3b', padding: '10px', textAlign: 'center' }}>
      <p>{promoText}</p>
    </div>
  );
}