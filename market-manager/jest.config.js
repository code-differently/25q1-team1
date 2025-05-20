const { defaults } = require('ts-jest/presets');

/** @type {import("jest").Config} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: defaults.transform, // <-- This is how to access ts-jest transform config
  collectCoverage: true,
  collectCoverageFrom: [
    'src/lib/**/*.{ts,tsx,js}',
    '!**/*.test.{ts,tsx,js}',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};
