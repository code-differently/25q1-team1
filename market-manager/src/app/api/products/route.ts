import { NextResponse } from 'next/server';
import { getProducts } from '@/src/lib/products';

export async function GET() {
  const fruits = getProducts();
  return NextResponse.json(fruits, { status: 200 });
}