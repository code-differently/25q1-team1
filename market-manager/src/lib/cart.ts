import { Product } from '@/src/types/product';

export class Cart {
  private items: Map<string, Product>;

  constructor() {
    this.items = new Map();
  }

private products: { [id: string]: Product & { quantity: number } } = {};

addProduct(product: Product, quantity: number = 1): void {
  if (this.products[product.id]) {
    this.products[product.id].quantity += quantity;
  } else {
    this.products[product.id] = { ...product, quantity };
  }
}

  removeProduct(productId: string): void {
    this.items.delete(productId);
  }

  getProduct(): Product[] {
    return Array.from(this.items.values());
  }

  clear(): void {
    this.items.clear();
  }
}