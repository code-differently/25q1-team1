import { NextResponse } from 'next/server';

const products = [
  {
    id: "1",
    name: "Apple",
    price: 3.5,
    quantity: 50,
    category: "Fruit",
    description: "Fresh and crispy apples",
    imageUrl: "/images/redapples.jpg",
  },
  {
    id: "2",
    name: "Banana",
    price: 2.1,
    quantity: 40,
    category: "Fruit",
    description: "Ripe yellow bananas",
    imageUrl: "/images/bananas.jpg",
  },
  {
    id: "3",
    name: "Orange",
    price: 2.3,
    quantity: 25,
    category: "Fruit",
    description: "Fresh oranges",
    imageUrl: "/images/freshoranges.jpg",
  },
];

export async function GET() {
  return NextResponse.json(products);
}


