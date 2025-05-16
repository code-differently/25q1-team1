// Interface for Item objects (id, name, quantity, price, etc.)

export interface Product {
  id: string;
  name: string;
  quantity: number;
  price: number;
  category: string;
}