// Import your Cart class if it's in a different file
// import { Cart } from './Cart';

import { Cart } from "../lib/cart";
import { Product } from "../types/product";

const cart = new Cart();

// Sample products
const product1: Product = {
    id: '1', name: 'Laptop', price: 1000, quantity: 0,
    category: "",
    product: undefined
};
const product2: Product = {
    id: '2', name: 'Phone', price: 500, quantity: 0,
    category: "",
    product: undefined
};

// Add products
cart.addProduct(product1, 2); // 2 Laptops
cart.addProduct(product2, 1); // 1 Phone

console.log('Items after adding:', cart.getItems());
console.log('Total:', cart.getTotal()); // 2*1000 + 1*500 = 2500

// Update quantity
cart.updateQuantity('1', 1); // Reduce Laptops to 1
console.log('Items after updating quantity:', cart.getItems());
console.log('Total:', cart.getTotal()); // 1*1000 + 1*500 = 1500

// Remove product
cart.removeProduct('2');
console.log('Items after removing product 2:', cart.getItems());
console.log('Total:', cart.getTotal()); // Only 1 Laptop left = 1000

// Clear cart
cart.clear();
console.log('Items after clearing:', cart.getItems()); // []
console.log('Total after clearing:', cart.getTotal()); // 0