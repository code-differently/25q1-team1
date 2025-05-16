import Link from 'next/link';

export default function CustomerCart() {
  return (
    <div>
      <h1>Customer Cart</h1>
      <Link href="/">
        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Go to Home Page
        </button>
      </Link>
    </div>
  );
}