import { Product } from '@/src/types/product';


export class Cart {
  private items: Map<string, Product>;

  constructor() {
    this.items = new Map();
  }

  addProduct(product: Product, quantity: number = 1): void {
    if (this.items.has(product.id)) {
      const existing = this.items.get(product.id)!;
      existing.quantity += quantity;
    } else {
      this.items.set(product.id, { ...product, quantity });
    }
  }

  removeProduct(productId: string): void {
    this.items.delete(productId);
  }

  updateQuantity(productId: string, quantity: number): void {
    if (this.items.has(productId)) {
      if (quantity <= 0) {
        this.removeProduct(productId);
      } else {
        const item = this.items.get(productId)!;
        item.quantity = quantity;
      }
    }
  }

  getTotal(): number {
    let total = 0;
    this.items.forEach(item => {
      total += item.product.price * item.quantity;
    });
    return total;
  }

  getItems(): Product[] {
    return Array.from(this.items.values());
  }

  clear(): void {
    this.items.clear();
  }
}