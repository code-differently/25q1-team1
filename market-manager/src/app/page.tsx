// Landing page — can redirect to /home or act as a welcome screen (not sure if we'll keep this yet)

'use client';
import { auth, db } from '@/src/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';

export default function Home() {
  interface Product {
    id: string;
    name: string;
    quantity: number;
  }

  const [products, setProducts] = useState<Product[]>([]); // State to store product data

  useEffect(() => {
    console.log('Firebase Auth:', auth);
    console.log('Firebase DB:', db);

    // Optional: Check if someone is logged in
    onAuthStateChanged(auth, (user) => {
      console.log('Current user:', user);
    });

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
      <h1 className="text-2xl font-bold">Welcome to Store Manager</h1>
      <p>Check your browser console for Firebase logs and API response.</p>

      {/* Render the products in a table */}
      {products.length > 0 ? (
        <table className="table-auto border-collapse border border-gray-400 mt-4">
          <thead>
            <tr>
              <th className="border border-gray-400 px-4 py-2">ID</th>
              <th className="border border-gray-400 px-4 py-2">Name</th>
              <th className="border border-gray-400 px-4 py-2">Quantity</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td className="border border-gray-400 px-4 py-2">{product.id}</td>
                <td className="border border-gray-400 px-4 py-2">{product.name}</td>
                <td className="border border-gray-400 px-4 py-2">{product.quantity}</td>
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
