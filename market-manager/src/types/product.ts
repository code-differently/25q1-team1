export interface Product {
  product: any;
  id: string;
  name: string;
  quantity: number;
  price: number;
  category: string;
}

export function calculateTotal(product: Product): number {
  return product.price * product.quantity;
}
