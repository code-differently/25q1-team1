import { Product } from '@/src/types/product';

export class Cart {
  // Correct and consistent use of one product storage structure
  private products: { [id: string]: Product & { quantity: number } } = {};

  addProduct(product: Product, quantity: number): void {
    if (this.products[product.id]) {
      this.products[product.id].quantity += quantity;
    } else {
      this.products[product.id] = { ...product, quantity };
    }
  }

  removeProduct(productId: string): void {
    delete this.products[productId];
  }

  getProducts(): (Product & { quantity: number })[] {
    return Object.values(this.products);
  }

  clear(): void {
    this.products = {};
  }
}