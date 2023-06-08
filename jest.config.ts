import { Config } from "@jest/types";

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
const config: Config.InitialOptions = {
  clearMocks: true,
  moduleDirectories: ["node_modules", "<rootDir>/src"],
  // moduleNameMapper: {
  //   "config/(.*)": "<rootDir>/src/config/$1",
  //   "modules/(.*)": "<rootDir>/src/modules/$1",
  //   "utils/(.*)": "<rootDir>/src/utils/$1",
  // },
  preset: "ts-jest",
  setupFilesAfterEnv: ["<rootDir>/__mocks__/prisma.mock.ts"],
};

export default config;
