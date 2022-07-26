module.exports = {
  preset: 'ts-jest',
  moduleNameMapper: {
    '^@/(.+)': '<rootDir>/src/$1',
    '\\.(css|scss)$': 'identity-obj-proxy',
  },
  setupFiles: ['./__mocks__/globalMock.js'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node', 'svg'],
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!<rootDir>/node_modules/',
    '!src/App.tsx',
  ],
  coveragePathIgnorePatterns: [
    '18n',
    '.eslintrc.js',
    'index',
    'react-app-env.d.ts',
    'report-web-vitals.ts',
    'stories',
    'route.ts',
    '.stories.tsx',
    'models',
    'services',
    'routers',
    'stores',
    'utils',
  ],
  testPathIgnorePatterns: ['<rootDir>/node_modules/'],
  coverageThreshold: {
    global: {
      branches: 66,
      functions: 72,
      lines: 77,
      statements: 77,
    },
  },
  coverageDirectory: '<rootDir>/coverage',
  verbose: true,
  globals: {
    'ts-jest': {
      tsConfig: {
        // allow js in typescript
        allowJs: true,
      },
    },
  },
  testEnvironment: 'jsdom',
  transform: {
    '\\.js$': '<rootDir>/node_modules/babel-jest',
  },
};
