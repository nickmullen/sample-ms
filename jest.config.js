module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/**/*.test.ts"],
  verbose: true,
  forceExit: true,
  clearMocks: true,
  resetMocks: true,
  restoreMocks: true,
  setupFiles: ["<rootDir>/.jest/setEnvVars.js"],
  coverageThreshold: {
    "./src/controllers": {
      branches: 75,
      functions: 80,
      lines: 80,
      statements: -20
    }
  }
};
