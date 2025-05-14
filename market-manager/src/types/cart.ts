import { Item } from './item';

export class Cart {
    private items: Item[] = [];
    private userId: string;

    constructor(userId: string) {
        this.userId = userId;
    }

    addItem(Item: Item): void {
        const existing = this.items.find(i => i.id === this.items.id);
        if (existing) {
            existing.quantity += this.items.quantity;
        } else {
            this.items.push(item);
        }
    }

    removeItem(itemId: string): void {
        this.items = this.items.filter(item => item.id !== itemId);
    }

    clearCart(): void {
        this.items = [];
    }

    getItems(): Item[] {
        return this.items
    }

    getTotal(): number {
        return this.items.reduce(
            (total, item) => total +item.price *item.quantity, 0);
    }
}