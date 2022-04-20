module.exports = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/src/Application/Mocks/Jest/fileMock.js",
    "\\.(css|less)$": "<rootDir>/src/Application/Mocks/Jest/styleMock.js",
  },
};
