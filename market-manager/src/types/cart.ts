// Interface for Cart (customer ID, list of reserved items, timestamps, etc.)

import { Timestamp } from "firebase/firestore";

export interface Product {
 itemId: string;
 name: string;
 price: number;
 quantity: number;
 category: string;
}

export interface Cart {
 customerId: string;
 items: Product[];
 createdAt: Timestamp;
 updatedAt: Timestamp;
 totalPrice?: number; // optional, if you want to cache it
}
