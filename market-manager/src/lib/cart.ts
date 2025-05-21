import { db } from './firebase';
import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
  runTransaction,
} from 'firebase/firestore';
import type { Product } from '@/src/types/product';

// ✅ Updated: use Firestore transaction to safely update stock
async function updateProductStock(productId: string, quantityDelta: number) {
  const productRef = doc(db, 'products', productId);

  try {
    await runTransaction(db, async (transaction) => {
      const productDoc = await transaction.get(productRef);

      if (!productDoc.exists()) {
        throw new Error('Product does not exist!');
      }

      const currentStock = productDoc.data().quantity || 0;
      const newStock = currentStock + quantityDelta;

      if (newStock < 0) {
        throw new Error('Not enough stock available');
      }

      transaction.update(productRef, { quantity: newStock });
    });
  } catch (error) {
    console.error('Failed to update stock:', error);
    throw error;
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

  // ✅ Try to update stock — abort if insufficient
  try {
    await updateProductStock(product.id, -quantity);
  } catch (error) {
    console.error('Error adding to cart:', error);
    throw new Error('Not enough stock to add to cart');
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

export async function removeProductFromCart(
  userId: string,
  productId: string
) {
  const cartRef = doc(db, 'carts', userId);
  const snapshot = await getDoc(cartRef);

  if (!snapshot.exists()) return;

  const existingProducts: (Product & { quantity: number })[] =
    snapshot.data().products || [];

  const removedProduct = existingProducts.find((p) => p.id === productId);

  if (!removedProduct) return;

  const updatedProducts = existingProducts.filter((p) => p.id !== productId);

  // ✅ Add product quantity back to stock
  try {
    await updateProductStock(productId, removedProduct.quantity);
  } catch (error) {
    console.error('Error restoring stock on removal:', error);
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