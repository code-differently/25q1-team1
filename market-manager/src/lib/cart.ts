// src/lib/cart.ts
import { db } from './firebase';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { CartItem } from '@/src/types/cart';
import { Product } from '@/src/types/product';

export async function getCustomerCart(customerId: string): Promise<(CartItem & Product)[]> {
  const cartRef = collection(db, 'customers', customerId, 'cart');
  const cartSnap = await getDocs(cartRef);

  const merged = await Promise.all(
    cartSnap.docs.map(async (docSnap) => {
      const productId = docSnap.id;
      const { quantity } = docSnap.data();

      const productRef = doc(db, 'products', productId);
      const productSnap = await getDoc(productRef);
      const productData = productSnap.exists() ? productSnap.data() as Product : {
        name: 'Unknown',
        price: 0,
        quantity: 0,
        category: 'Unknown',
      };

      return {
        id: productId,
        ...productData,
        quantity,
      };
    })
  );

  return merged;
}
