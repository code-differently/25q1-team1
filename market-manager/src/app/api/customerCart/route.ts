// src/app/api/customerCart/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { getCustomerCart } from '@/src/lib/cart';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const customerId = searchParams.get('customerId');

  if (!customerId) {
    return NextResponse.json({ error: 'Missing customerId' }, { status: 400 });
  }

  try {
    const cart = await getCustomerCart(customerId);
    return NextResponse.json(cart);
  } catch (error) {
    console.error('Error fetching cart:', error);
    return NextResponse.json({ error: 'Failed to fetch cart' }, { status: 500 });
  }
}
