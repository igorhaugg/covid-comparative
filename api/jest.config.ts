import type { Config } from "jest";

const config: Config = {
  verbose: true,
  roots: ["<rootDir>"],
  transform: {
    "^.+\\.ts?$": "./node_modules/ts-jest",
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.ts?$",
  moduleFileExtensions: ["ts", "js", "json", "node"],
  collectCoverage: true,
  coverageDirectory: "coverage",
};

export default config;
