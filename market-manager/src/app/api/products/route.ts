import { NextResponse } from 'next/server';
import { getProducts } from '@/src/lib/products';

export async function GET() {
  try {
    const products = await getProducts();
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products from Firestore:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}
