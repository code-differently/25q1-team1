import { db } from './firebase';
import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp
} from 'firebase/firestore';
import type { Product } from '@/src/types/product';


export async function addProductToCart(
  userId: string,
  product: Product,
  quantity: number
) {
  const cartRef = doc(db, 'carts', userId);
  const snapshot = await getDoc(cartRef);
  let existingProducts: (Product & { quantity: number })[] = [];

  if (snapshot.exists()) {
    existingProducts = snapshot.data().products || [];
  }

  const updatedProducts = [...existingProducts];
  const index = updatedProducts.findIndex((p) => p.id === product.id);

  if (index !== -1) {
    updatedProducts[index].quantity += quantity;
  } else {
    updatedProducts.push({ ...product, quantity });
  }

  await setDoc(
    cartRef,
    {
      customerId: userId,
      products: updatedProducts,
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );
}


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
