import { Product, calculateTotal } from '../types/product'; // adjust the path based on your project structure

describe('Product Interface', () => {
  const mockProduct: Product = {
    id: 'prod-123',
    name: 'Test Product',
    quantity: 10,
    price: 99.99,
    category: 'Electronics',
    img: ''
  };

  it('should create a valid Product object', () => {
    expect(mockProduct).toEqual({
      id: 'prod-123',
      name: 'Test Product',
      quantity: 10,
      price: 99.99,
      category: 'Electronics',
      img: ''
    });
  });

  it('should have the correct types for each property', () => {
    expect(typeof mockProduct.id).toBe('string');
    expect(typeof mockProduct.name).toBe('string');
    expect(typeof mockProduct.quantity).toBe('number');
    expect(typeof mockProduct.price).toBe('number');
    expect(typeof mockProduct.category).toBe('string');
  });

  it('should calculate total correctly', () => {
    const total = calculateTotal(mockProduct);
    expect(total).toBe(999.90); // 99.99 * 10
  });

  it('should return 0 if quantity is 0', () => {
    const productWithZeroQuantity: Product = { ...mockProduct, quantity: 0 };
    const total = calculateTotal(productWithZeroQuantity);
    expect(total).toBe(0);
  });

  it('should handle negative quantity gracefully', () => {
    const productWithNegativeQuantity: Product = { ...mockProduct, quantity: -5 };
    const total = calculateTotal(productWithNegativeQuantity);
    expect(total).toBe(-499.95); // -99.99 * 5
  });

  it('should handle zero price', () => {
    const productWithZeroPrice: Product = { ...mockProduct, price: 0 };
    const total = calculateTotal(productWithZeroPrice);
    expect(total).toBe(0);
  });

  it('should handle negative price', () => {
    const productWithNegativePrice: Product = { ...mockProduct, price: -99.99 };
    const total = calculateTotal(productWithNegativePrice);
    expect(total).toBe(-999.90); // -99.99 * 10
  });

  it('should create a Product with optional fields', () => {
    const productWithOptionalFields: Product = {
      id: 'prod-456',
      name: 'Optional Fields Product',
      quantity: 1,
      price: 100,
      img: 'img.png',
      imageUrl: 'https://example.com/image.jpg',
      description: 'A product with optional fields',
      category: 'Gadgets'
    };

    expect(productWithOptionalFields.imageUrl).toBe('https://example.com/image.jpg');
    expect(productWithOptionalFields.description).toBe('A product with optional fields');
    expect(productWithOptionalFields.category).toBe('Gadgets');
  });
});