import { Item } from './Item';

export interface CartItem {
    item: Item;
    quantity: number;
}

export interface Cart {
    customerId: string;
    items: CartItem[];
    createdAt: Date;
    updatedAt?: Date;
    status?: 'active' | 'checked_out' | 'cancelled';
}