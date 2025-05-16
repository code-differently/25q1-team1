'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { CartItem } from '@/src/types/cart';
import { Product } from '@/src/types/product';

export default function CustomerCartPage() {
  const [items, setItems] = useState<(CartItem & Product)[]>([]);
  const customerId = 'CUST001'; // eventually dynamic

  useEffect(() => {
    fetch(`/api/customerCart?customerId=${customerId}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load cart');
        return res.json();
      })
      .then(setItems)
      .catch((err) => console.error('Error fetching cart:', err));
  }, []);

  return (
    <main>
      <h1>Your Cart</h1>

      {items.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>${item.price.toFixed(2)}</td>
                <td>{item.quantity}</td>
                <td>${(item.quantity * item.price).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <Link href="/">
        <button>
          Go to Home Page
        </button>
      </Link>
    </main>
  );
}
