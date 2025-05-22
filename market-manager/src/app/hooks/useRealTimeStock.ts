import { useEffect, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '@/src/lib/firebase';

export function useRealTimeStock(productId: string) {
  const [stock, setStock] = useState<number | null>(null);

  useEffect(() => {
    const productRef = doc(db, 'products', productId);

    const unsubscribe = onSnapshot(productRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data();
        setStock(data.quantity ?? 0);
      }
    });

    return () => unsubscribe(); // Cleanup when component unmounts
  }, [productId]);

  return stock;
}
