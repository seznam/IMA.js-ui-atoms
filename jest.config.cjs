module.exports = {
  bail: true,
  verbose: true,
  testRegex: '(/src(/?[^/]*){0,5}/__tests__/).*Spec\\.jsx?$',
  modulePaths: ['<rootDir>/'],
  setupFiles: ['<rootDir>/setupJest.js'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  transformIgnorePatterns: ['node_modules/(?!(@ima)/)'],
  transform: {
    '\\.(js|jsx|ts|tsx)': '<rootDir>/preprocess.cjs',
  },
  testEnvironment: 'node',
};
