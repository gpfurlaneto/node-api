module.exports = {
  rootDir: ".",
  testPathIgnorePatterns: ["/node_modules/"],
  moduleFileExtensions: ["ts", "js"],
  testEnvironment: "node",
  transform: {
    "^.+\\.ts?$": "ts-jest"
  }
}