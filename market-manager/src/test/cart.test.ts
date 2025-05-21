import {
  saveCartToFirestore,
  getCartFromFirestore,
  addProductToCart,
} from '../lib/cart';

import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
} from 'firebase/firestore';

jest.mock('../lib/firebase', () => ({
  db: {}, // Mocked Firestore db object
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
    category: 'fruit',
    img: '',
    description: '',
  };
  const mockProducts = [
    { ...mockProduct, quantity: 3 },
    {
      id: '2',
      name: 'Bread',
      price: 2.5,
      quantity: 1,
      category: 'bakery',
      img: '',
      description: '',
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    (doc as jest.Mock).mockReturnValue(mockCartRef);
  });

  it('should save cart to Firestore', async () => {
    await saveCartToFirestore(mockUserId, mockProducts);

    expect(doc).toHaveBeenCalledWith(expect.anything(), 'carts', mockUserId);
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
    expect(doc).toHaveBeenCalledWith(expect.anything(), 'carts', mockUserId);
    expect(getDoc).toHaveBeenCalledWith(mockCartRef);
    expect(result).toEqual(mockProducts);
  });

  it('should return empty array if document does not exist', async () => {
    (getDoc as jest.Mock).mockResolvedValue({
      exists: () => false,
    });

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

  describe('addProductToCart', () => {
    it('should add a new product to an empty cart', async () => {
      (getDoc as jest.Mock).mockResolvedValue({
        exists: () => true,
        data: () => ({ products: [] }),
      });

      await addProductToCart(mockUserId, mockProduct, 2);

      expect(setDoc).toHaveBeenCalledWith(
        mockCartRef,
        {
          customerId: mockUserId,
          products: [{ ...mockProduct, quantity: 2 }],
          updatedAt: 'mockTimestamp',
        },
        { merge: true }
      );
    });

    it('should update quantity if product already exists', async () => {
      (getDoc as jest.Mock).mockResolvedValue({
        exists: () => true,
        data: () => [{ ...mockProduct, quantity: 3 }],
      });

      (getDoc as jest.Mock).mockResolvedValue({
        exists: () => true,
        data: () => ({ products: [{ ...mockProduct, quantity: 3 }] }),
      });

      await addProductToCart(mockUserId, mockProduct, 2);

      expect(setDoc).toHaveBeenCalledWith(
        mockCartRef,
        {
          customerId: mockUserId,
          products: [{ ...mockProduct, quantity: 5 }],
          updatedAt: 'mockTimestamp',
        },
        { merge: true }
      );
    });

    it('should create new cart if no existing cart', async () => {
      (getDoc as jest.Mock).mockResolvedValue({
        exists: () => false,
      });

      await addProductToCart(mockUserId, mockProduct, 1);

      expect(setDoc).toHaveBeenCalledWith(
        mockCartRef,
        {
          customerId: mockUserId,
          products: [{ ...mockProduct, quantity: 1 }],
          updatedAt: 'mockTimestamp',
        },
        { merge: true }
      );
    });

    it('should handle undefined products by initializing with an empty array', async () => {
      (getDoc as jest.Mock).mockResolvedValue({
        exists: () => true,
        data: () => ({ products: undefined }),
      });

      await addProductToCart(mockUserId, mockProduct, 1);

      expect(setDoc).toHaveBeenCalledWith(
        mockCartRef,
        {
          customerId: mockUserId,
          products: [{ ...mockProduct, quantity: 1 }],
          updatedAt: 'mockTimestamp',
        },
        { merge: true }
      );
    });
  });
});