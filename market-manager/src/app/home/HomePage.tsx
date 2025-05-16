// Landing page — can redirect to /home or act as a welcome screen (not sure if we'll keep this yet)

'use client';

import { useEffect, useState } from 'react';
import { Product } from '@/src/types/product';
import Link from 'next/link';

export default function HomePage() {

  const [products, setProducts] = useState<Product[]>([]); // State to store product data

  useEffect(() => {
    // Call the fruits request
    fetch('/api/products')
      .then((response) => response.json())
      .then((data) => {
        console.log('Fruit API response', data);
        setProducts(data); // Store the fetched data in state
      })
      .catch((error) => {
        console.error('Error calling fruit API:', error);
      });
  }, []);

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold">Welcome to Market Manager</h1>
      <Link href="/customerCart">
        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Go to Customer Cart
        </button>
      </Link>

      {/* Render the products in a table */}
      {products.length > 0 ? (
        <table className="table-auto border-collapse border border-gray-400 mt-4">
          <thead>
            <tr>
              <th className="border border-gray-400 px-4 py-2">Name</th>
              <th className="border border-gray-400 px-4 py-2">Quantity</th>
              <th className="border border-gray-400 px-4 py-2">Price</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td className="border border-gray-400 px-4 py-2">{product.name}</td>
                <td className="border border-gray-400 px-4 py-2">{product.quantity}</td>
                <td className="border border-gray-400 px-4 py-2">{product.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="mt-4">No products available.</p>
      )}
    </main>
  );
}
