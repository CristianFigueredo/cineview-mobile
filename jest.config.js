/** @type {import('@jest/types').Config.ProjectConfig} */
module.exports = {
  preset: "jest-expo",
  testEnvironment: "node",
  testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/.maestro/"],
  setupFiles: ["<rootDir>/test/setup.ts"],
  setupFilesAfterEnv: ["<rootDir>/test/setupAfterFramework.ts"],
  moduleNameMapper: {
    // Stub asset files
    "\\.(jpg|jpeg|png|gif|svg|ttf|woff|woff2)$": "<rootDir>/test/mockFile.ts",
    // Resolve bare "assets/..." imports (used in EmptyState, MovieCard)
    "^assets/(.*)$": "<rootDir>/assets/$1",
    // Prevent expo/virtual/streams from crashing axios auto-mock in Node
    "^expo/virtual/streams$": "<rootDir>/test/mocks/streams.ts",
  },
}
