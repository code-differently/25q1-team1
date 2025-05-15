// src/app/api/products/route.ts
import { NextResponse } from 'next/server';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/src/lib/firebase'; // make sure this matches your actual path

export async function GET() {
  try {
    const productsCollection = collection(db, 'products');
    const snapshot = await getDocs(productsCollection);

    const products = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products from Firestore:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}
