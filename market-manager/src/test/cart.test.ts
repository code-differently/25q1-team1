import { Cart } from '../lib/cart';
import { Product } from '../types/product';

describe('Cart functionality', () => {
  let cart: Cart;
  const product1: Product = {
    id: '1',
    name: 'Laptop',
    price: 1000,
    quantity: 0,
    category: '',
  };
  const product2: Product = {
    id: '2',
    name: 'Phone',
    price: 500,
    quantity: 0,
    category: '',
  };

  beforeEach(() => {
    cart = new Cart();
  });

  test('should add products correctly', () => {
    cart.addProduct(product1, 2);
    cart.addProduct(product2, 1);

    const items = cart.getProducts();
    expect(items.length).toBe(2);
    expect(items.find((item) => item.id === '1')?.quantity).toBe(2);
    expect(items.find((item) => item.id === '2')?.quantity).toBe(1);
  });

  test('should remove a product', () => {
    cart.addProduct(product1, 1);
    cart.addProduct(product2, 1);
    cart.removeProduct('2');

    const items = cart.getProducts();
    expect(items.length).toBe(1);
    expect(items[0].id).toBe('1');
  });

  test('should clear the cart', () => {
    cart.addProduct(product1, 1);
    cart.addProduct(product2, 1);
    cart.clear();

    expect(cart.getProducts()).toEqual([]);
  });
});

