// Interface for Cart (customer ID, list of reserved items, timestamps, etc.)

import { Timestamp } from "firebase/firestore";

export interface Cart {
 customerId: string;
 product: string[];
 createdAt: Timestamp;
 updatedAt: Timestamp;
 totalPrice?: number; // optional, if you want to cache it
}
