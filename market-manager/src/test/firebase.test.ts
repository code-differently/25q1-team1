import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { isSupported, getAnalytics } from 'firebase/analytics';

jest.mock('firebase/app', () => ({
  initializeApp: jest.fn(),
  getApps: jest.fn(() => []),
  getApp: jest.fn(),
}));

jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(),
}));

jest.mock('firebase/firestore', () => ({
  getFirestore: jest.fn(),
}));

jest.mock('firebase/storage', () => ({
  getStorage: jest.fn(),
}));

jest.mock('firebase/analytics', () => ({
  isSupported: jest.fn(() => Promise.resolve(true)),
  getAnalytics: jest.fn(),
}));

it('initializes Firebase if no apps exist', async () => {
  await import('../lib/firebase');

  expect(initializeApp).toHaveBeenCalled();
  expect(getAuth).toHaveBeenCalled();
  expect(getFirestore).toHaveBeenCalled();
  expect(getStorage).toHaveBeenCalled();
  expect(isSupported).toHaveBeenCalled();
  expect(getAnalytics).toHaveBeenCalled();
});