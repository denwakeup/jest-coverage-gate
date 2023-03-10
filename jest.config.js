const path = require('path');

module.exports = {
  clearMocks: true,
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{js,jsx,ts,tsx}',
    '!<rootDir>/src/**/*.d.ts',
    '!<rootDir>/src/**/*.interfaces.ts',
    '!<rootDir>/src/**/mocks/**.ts',
    '!<rootDir>/src/index.ts',
  ],
  testMatch: ['<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}'],
  coverageThreshold: {
    global: {
      branches: 60,
      functions: 60,
      lines: 60,
      statements: 60,
    },
  },
  coverageReporters: [
    'clover',
    'json',
    'lcov',
    'text',
    [
      path.resolve(__dirname, './dist/index.js'),
      {
        since: 'origin/main',
        modified: {
          branches: 60,
          functions: 60,
          lines: 60,
          statements: 60,
        },
        added: {
          branches: 80,
          functions: 80,
          lines: 80,
          statements: 80,
        },
      },
    ],
  ],
};
