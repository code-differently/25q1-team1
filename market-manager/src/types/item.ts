// Interface for Item objects (id, name, quantity, price, etc.)

export interface Item {
    id: string;
    name: string;
    quantity: number;
    price: number;
    description?: string;
    category?: string;
    imageUrl?: string;
  }