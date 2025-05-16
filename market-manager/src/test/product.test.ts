import { calculateTotal, Product } from '../types/product'; // adjust the path based on your project structure

describe('calculateTotal', () => {
  it('should return price * quantity', () => {
    const product: Product = {
      id: 'p1',
      name: 'Phone',
      price: 100,
      quantity: 3,
      category: 'Electronics',
    };
    expect(calculateTotal(product)).toBe(300);
  });
});


describe('Product Interface', () => {
  const mockProduct: Product = {
    id: 'prod-123',
    name: 'Test Product',
    quantity: 10,
    price: 99.99,
    category: 'Electronics',
  };

  it('should create a valid Product object', () => {
    expect(mockProduct).toEqual({
      id: 'prod-123',
      name: 'Test Product',
      quantity: 10,
      price: 99.99,
      category: 'Electronics',
    });
  });

  it('should have the correct types for each property', () => {
    expect(typeof mockProduct.id).toBe('string');
    expect(typeof mockProduct.name).toBe('string');
    expect(typeof mockProduct.quantity).toBe('number');
    expect(typeof mockProduct.price).toBe('number');
    expect(typeof mockProduct.category).toBe('string');
  });
});