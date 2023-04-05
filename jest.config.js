import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./",
});

export default createJestConfig({
  moduleFileExtensions: ["js", "jsx"],
  moduleDirectories: ["node_modules", "./src"],
  moduleNameMapper: {
    "\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|css)$":
      "<rootDir>/src/__mocks__/fileMock.js",
  },
  testEnvironment: "jsdom",
  testEnvironmentOptions: {
    url: "https://test.aumni.fund",
  },
  collectCoverage: true,
  collectCoverageFrom: ["<rootDir>/src/testme.js"],
  coverageDirectory: "<rootDir>/.coverage-jest",
  coverageReporters: ["json"],
  reporters: [
    "default",
    [
      "jest-junit",
      { outputDirectory: "test-results/jest", outputName: "report.xml" },
    ],
  ],
});
