export default {
    testEnvironment: "jsdom",

    transform: {
        "^.+\\.[jt]sx?$": "babel-jest"
    },

    setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],

    moduleNameMapper: {
        "\\.(css|less|scss|sass)$": "identity-obj-proxy",
        "\\.(svg|png|jpg|jpeg|gif|webp)$": "<rootDir>/src/__mocks__/fileMock.js"
    },

  setupFiles: ["<rootDir>/src/setupTests.js"],
};