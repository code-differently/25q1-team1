import { fetchCustomerProfile } from '../lib/customer';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

jest.mock('../lib/firebase', () => ({
  db: {}, // mocked db object
}));

jest.mock('firebase/firestore', () => ({
  doc: jest.fn(),
  getDoc: jest.fn(),
}));

const mockedDoc = doc as jest.Mock;
const mockedGetDoc = getDoc as jest.Mock;

describe('fetchCustomerProfile', () => {
  const mockCustomerId = 'customer123';
  const mockData = {
    name: 'Alice',
    email: 'alice@example.com',
    cartId: 'cart456',
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return customer data when document exists', async () => {
    const mockSnapshot = {
      exists: () => true,
      data: () => mockData,
    };

    mockedDoc.mockReturnValue('mockDocRef');
    mockedGetDoc.mockResolvedValue(mockSnapshot);

    const result = await fetchCustomerProfile(mockCustomerId);

    expect(doc).toHaveBeenCalledWith(db, 'customers', mockCustomerId);
    expect(getDoc).toHaveBeenCalledWith('mockDocRef');
    expect(result).toEqual({
      id: mockCustomerId,
      name: 'Alice',
      email: 'alice@example.com',
      cartId: 'cart456',
    });
  });

  it('should return null when document does not exist', async () => {
    const mockSnapshot = {
      exists: () => false,
    };

    mockedDoc.mockReturnValue('mockDocRef');
    mockedGetDoc.mockResolvedValue(mockSnapshot);

    const result = await fetchCustomerProfile(mockCustomerId);

    expect(result).toBeNull();
  });

  it('should return null and log error on failure', async () => {
    mockedDoc.mockImplementation(() => {
      throw new Error('doc error');
    });

    const result = await fetchCustomerProfile(mockCustomerId);

    expect(result).toBeNull();
  });
});