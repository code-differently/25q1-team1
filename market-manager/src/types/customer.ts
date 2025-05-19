// Interface for Customer (id, name, email, optional cartId, etc.)

export interface Customer {
  id: string;             // Firestore document ID
  name: string;
  email: string;
  cartId: string;
}