import { db } from './firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Product } from '@/src/types/product';

export async function getProducts(): Promise<Product[]> {
  const productsCollection = collection(db, 'products');
  const snapshot = await getDocs(productsCollection);

  const products: Product[] = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as Product[];

  return products;
}
