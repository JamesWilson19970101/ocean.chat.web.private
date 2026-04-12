// Jest Config (jest.config.js)

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  roots: ['<rootDir>/src/test'],
  moduleNameMapper: {
    // process CSS Modules
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    // process assets
    '\\.(gif|ttf|eot|svg|png|webp)$': '<rootDir>/__mocks__/fileMock.js',
    // path alias
    '^@/components/(.*)$': '<rootDir>/components/$1',
    '^@/lib/(.*)$': '<rootDir>/lib/$1',
    '@/*': '<rootDir>/src/$1',
  },
  transform: {
    // Use ts-jest to process .ts and .tsx files
    '^.+\\.(ts|tsx)?$': ['ts-jest', { tsconfig: 'tsconfig.jest.json' }],
  },

  modulePathIgnorePatterns: ['<rootDir>/.next/'],
};
