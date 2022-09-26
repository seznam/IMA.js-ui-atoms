module.exports = {
  bail: true,
  verbose: false,
  testEnvironment: 'node',
  coverageThreshold: {
    global: {
      functions: 45,
      lines: 45,
      statements: 45,
    },
  },
  setupFiles: ['<rootDir>/setupJest.js'],
  modulePaths: ['<rootDir>/'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  transformIgnorePatterns: [
    'node_modules/(?!(@ima/core|@ima/plugin-useragent)/)',
  ],
  transform: {
    '\\.jsx?': './preprocess.cjs',
  },
  testRegex: '(/src/(.*/)?__tests__/).*Spec\\.jsx?$',
};
