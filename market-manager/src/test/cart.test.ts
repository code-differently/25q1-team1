import {
  saveCartToFirestore,
  getCartFromFirestore,
} from '../lib/cart';
import {
  doc,
  getDoc,
  setDoc,
} from 'firebase/firestore';

jest.mock('../lib/firebase', () => ({
  db: {}, // mock the Firestore db export
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
  const mockProducts = [
    { id: '1', name: 'Apple', price: 1.0, quantity: 3, category: 'fruit' },
    { id: '2', name: 'Bread', price: 2.5, quantity: 1, category: 'bakery' },
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
      data: () => ({
        products: mockProducts,
      }),
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
});
