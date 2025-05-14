// Functions to manage cart data (addToCart, getCartByCustomer)

import { Item } from './Item';

export class cart {
    private carts: Map<string, Item[]> = new Map();

    addToCart(customerId: string, item: Item): void {
        const cart = this.carts.get(customerId) || [];
        cart.push(item);
        this.carts.set(customerId, cart);
    }

    getCartByCustomer(customerId: string): Item[] {
        return this.carts.get(customerId) || [];
    }

    removeFromCart(customerId: string, itemId: string): void {
        const cart = this.carts.get(customerId) || [];
        const updatedCart = cart.filter(item => item.id !== itemId);
        this.carts.set(customerId, updatedCart);
    }

    clearCart(customerId: string): void {
        this.carts.delete(customerId);
    }

    getTotal(): number {
        return this.items.reduce(
            (total, item) => total +item.price *item.quantity, 0);
    }
}