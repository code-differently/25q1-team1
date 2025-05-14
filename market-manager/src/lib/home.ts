// Functions to interact with the 'items' collection (getAvailableItems, reserveItem)
import { Item } from './Item';

export class Inventory {
    items: Item[] = [];

    addItem(item: Item) {
        this.items.push(item);
    }

    removeItem(id: string) {
        this.items = this.items.filter(item => item.id !== id);
    }

    getItem(id: string): Item | undefined{
        return this.items.find(item => item.id === id);
    }

    updateItem(updatedItem: Item): void {
        this.items = this.items.map(item => item.id === updatedItem.id ? updatedItem : item);
    }

    listItems(): Item[] {
        return this.items;
    }

    getAvailableItems(): Item[] {
        return this.items.filter(item => item.available);
    }

    reserveItem(id: string): boolean {
        const item = this.getItem(id);
        if (item && item.available) {
            item.available = false;
            this.updateItem(item);
            return true;
        }
        return false;
    }
}