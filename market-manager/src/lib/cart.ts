import { db } from './firebase';
import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp
} from 'firebase/firestore';
import type { Product } from '@/src/types/product';


export async function saveCartToFirestore(
  userId: string,
  products: (Product & { quantity: number })[]
) {
  const cartRef = doc(db, 'carts', userId);
  await setDoc(
    cartRef,
    {
      customerId: userId,
      products,
      updatedAt: serverTimestamp(),
      createdAt: serverTimestamp(),
    },
    { merge: true }
  );
}

export async function getCartFromFirestore(
  userId: string
): Promise<(Product & { quantity: number })[]> {
  const cartRef = doc(db, 'carts', userId);
  const snapshot = await getDoc(cartRef);

  if (snapshot.exists()) {
    return snapshot.data().products || [];
  }

  return [];
}
