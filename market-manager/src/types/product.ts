export type Product = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
  description?: string;
  category?: string;
};

export function calculateTotal(product: Product): number {
  return product.price * product.quantity;
}
