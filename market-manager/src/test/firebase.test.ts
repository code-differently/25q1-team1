// __tests__/firebase.test.ts
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics, isSupported } from 'firebase/analytics';

// Mock all Firebase SDK functions
jest.mock('firebase/app', () => ({
  initializeApp: jest.fn(),
  getApps: jest.fn(),
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
  getAnalytics: jest.fn(),
  isSupported: jest.fn(() => Promise.resolve(true)),
}));

// Set up environment variables before importing the module
process.env.NEXT_PUBLIC_FIREBASE_API_KEY = 'fake-api-key';
process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN = 'fake-auth-domain';
process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID = 'fake-project-id';
process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET = 'fake-storage-bucket';
process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID = 'fake-messaging-id';
process.env.NEXT_PUBLIC_FIREBASE_APP_ID = 'fake-app-id';
process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID = 'fake-measurement-id';

// Now import your module
import { app, auth, db, storage } from '../lib/firebase';

describe('Firebase initialization', () => {
  it('should initialize Firebase app if not already initialized', () => {
    const { getApps, initializeApp } = require('firebase/app');
    (getApps as jest.Mock).mockReturnValue([]);
    require('../lib/firebase'); // re-require to trigger the init
    expect(initializeApp).toHaveBeenCalledWith({
      apiKey: 'fake-api-key',
      authDomain: 'fake-auth-domain',
      projectId: 'fake-project-id',
      storageBucket: 'fake-storage-bucket',
      messagingSenderId: 'fake-messaging-id',
      appId: 'fake-app-id',
      measurementId: 'fake-measurement-id',
    });
  });

  it('should use existing Firebase app if already initialized', async () => {
  // Clear previous imports from the cache
  jest.resetModules();

  // Mock Firebase modules AFTER resetModules
  const mockGetApps = jest.fn(() => [{}]);
  const mockGetApp = jest.fn();

  jest.doMock('firebase/app', () => ({
    getApps: mockGetApps,
    getApp: mockGetApp,
    initializeApp: jest.fn(),
  }));

  jest.doMock('firebase/auth', () => ({
    getAuth: jest.fn(),
  }));
  jest.doMock('firebase/firestore', () => ({
    getFirestore: jest.fn(),
  }));
  jest.doMock('firebase/storage', () => ({
    getStorage: jest.fn(),
  }));
  jest.doMock('firebase/analytics', () => ({
    getAnalytics: jest.fn(),
    isSupported: jest.fn(() => Promise.resolve(false)),
  }));

  // Now re-import firebase module to trigger fresh initialization logic
  await import('../lib/firebase');

  // ✅ Verify that getApp() was called
  expect(mockGetApp).toHaveBeenCalled();
});

  it('should initialize auth, firestore, storage', () => {
    expect(getAuth).toHaveBeenCalled();
    expect(getFirestore).toHaveBeenCalled();
    expect(getStorage).toHaveBeenCalled();
  });

  it('should check if analytics is supported', async () => {
    expect(isSupported).toHaveBeenCalled();
  });
});