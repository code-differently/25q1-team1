import {
  saveCartToFirestore,
  getCartFromFirestore,
  addProductToCart,
  removeProductFromCart,
} from '../lib/cart';

import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
} from 'firebase/firestore';

jest.mock('../lib/firebase', () => ({
  db: {}, // mocked db export
}));

jest.mock('firebase/firestore', () => ({
  doc: jest.fn(),
  getDoc: jest.fn(),
  setDoc: jest.fn(),
  serverTimestamp: jest.fn(() => 'mockTimestamp'),
}));

describe('Firestore Cart Functions', () => {
  const mockUserId = 'testUser123';
  const mockCartRef = { path: 'mock/doc/path' };
  const mockProduct = {
    id: '1',
    name: 'Apple',
    price: 1.0,
    quantity: 10,
    category: 'fruit',
  };
  const mockProducts = [
    { ...mockProduct, quantity: 3 },
    {
      id: '2',
      name: 'Bread',
      price: 2.5,
      quantity: 1,
      category: 'bakery',
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    (doc as jest.Mock).mockImplementation((_db, collection, id) => {
      if (collection === 'carts') return mockCartRef;
      if (collection === 'products') return { path: `products/${id}` };
    });
  });

  it('should save cart to Firestore', async () => {
    await saveCartToFirestore(mockUserId, mockProducts);

    expect(setDoc).toHaveBeenCalledWith(
      mockCartRef,
      {
        customerId: mockUserId,
        products: mockProducts,
        updatedAt: 'mockTimestamp',
        createdAt: 'mockTimestamp',
      },
      { merge: true }
    );
  });

  it('should return products from Firestore if document exists', async () => {
    (getDoc as jest.Mock).mockResolvedValue({
      exists: () => true,
      data: () => ({ products: mockProducts }),
    });

    const result = await getCartFromFirestore(mockUserId);
    expect(result).toEqual(mockProducts);
  });

  it('should return empty array if document does not exist', async () => {
    (getDoc as jest.Mock).mockResolvedValue({ exists: () => false });

    const result = await getCartFromFirestore(mockUserId);
    expect(result).toEqual([]);
  });

  it('should return empty array if products field is undefined', async () => {
    (getDoc as jest.Mock).mockResolvedValue({
      exists: () => true,
      data: () => ({}),
    });

    const result = await getCartFromFirestore(mockUserId);
    expect(result).toEqual([]);
  });

  it('should add product to cart and reduce stock if not already in cart', async () => {
    const updatedProducts = [{ ...mockProduct, quantity: 2 }];

    (getDoc as jest.Mock).mockImplementation((ref) => {
      if (ref.path === mockCartRef.path) {
        return Promise.resolve({ exists: () => true, data: () => ({ products: [] }) });
      }
      if (ref.path === `products/${mockProduct.id}`) {
        return Promise.resolve({ exists: () => true, data: () => ({ quantity: 10 }) });
      }
    });

    await addProductToCart(mockUserId, mockProduct, 2);

    expect(setDoc).toHaveBeenCalledWith(
      expect.objectContaining(mockCartRef),
      expect.objectContaining({
        customerId: mockUserId,
        products: updatedProducts,
        updatedAt: 'mockTimestamp',
      }),
      { merge: true }
    );

    expect(setDoc).toHaveBeenCalledWith(
      expect.objectContaining({ path: `products/${mockProduct.id}` }),
      { quantity: 8 },
      { merge: true }
    );
  });

  it('should remove product from cart and restore stock', async () => {
    const productInCart = { ...mockProduct, quantity: 2 };
    const cartData = { products: [productInCart] };

    (getDoc as jest.Mock).mockImplementation((ref) => {
      if (ref.path === mockCartRef.path) {
        return Promise.resolve({ exists: () => true, data: () => cartData });
      }
      if (ref.path === `products/${mockProduct.id}`) {
        return Promise.resolve({ exists: () => true, data: () => ({ quantity: 8 }) });
      }
    });

    await removeProductFromCart(mockUserId, mockProduct.id);

    expect(setDoc).toHaveBeenCalledWith(
      expect.objectContaining({ path: `products/${mockProduct.id}` }),
      { quantity: 10 },
      { merge: true }
    );

    expect(setDoc).toHaveBeenCalledWith(
      expect.objectContaining(mockCartRef),
      expect.objectContaining({
        customerId: mockUserId,
        products: [],
        updatedAt: 'mockTimestamp',
      }),
      { merge: true }
    );
  });
});