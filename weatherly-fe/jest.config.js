module.exports = {
  roots: ["<rootDir>/src"],
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/jest.setup.ts"],
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/src/Application/Mocks/Jest/fileMock.js",
    "\\.(css|less)$": "<rootDir>/src/Application/Mocks/Jest/styleMock.js",
  },
  transform: { "\\.tsx?$": "ts-jest" },
  collectCoverage: true,
  coverageDirectory: "coverage",
  testPathIgnorePatterns: ["/node_modules/"],
  verbose: true,
  coverageThreshold: {
    global: {
      branches: 10,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
};
