import { db } from './firebase';
import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
} from 'firebase/firestore';
import type { Product } from '@/src/types/product';

async function updateProductStock(productId: string, quantityDelta: number) {
  const productRef = doc(db, 'products', productId);
  const snapshot = await getDoc(productRef);

  if (snapshot.exists()) {
    const currentStock = snapshot.data().quantity || 0;
    const newStock = Math.max(0, currentStock + quantityDelta);

    await setDoc(productRef, { quantity: newStock }, { merge: true });
  }
}

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

  // Subtract from product stock
  await updateProductStock(product.id, -quantity);

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

export async function removeProductFromCart(
  userId: string,
  productId: string
) {
  const cartRef = doc(db, 'carts', userId);
  const snapshot = await getDoc(cartRef);

  if (!snapshot.exists()) return;

  const existingProducts: (Product & { quantity: number })[] = snapshot.data().products || [];
  const removedProduct = existingProducts.find((p) => p.id === productId);

  if (!removedProduct) return;

  const updatedProducts = existingProducts.filter((p) => p.id !== productId);

  // Add product quantity back to stock
  await updateProductStock(productId, removedProduct.quantity);

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
