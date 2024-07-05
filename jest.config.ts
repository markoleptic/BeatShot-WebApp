/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from "jest";
import nextJest from "next/jest.js";
import { pathsToModuleNameMapper } from "ts-jest";
import { compilerOptions } from "./tsconfig.json";

const createJestConfig = nextJest({
	// Provide the path to your Next.js app to load next.config.js and .env files in your test environment
	dir: ".",
});

const config: Config = {
	testPathIgnorePatterns: [
		"/node_modules/",
		"<rootDir>/__tests__/jest.setup.ts",
		"<rootDir>/__tests__/jest.teardown.ts",
	],

	globalSetup: "<rootDir>/__tests__/jest.setup.ts",

	globalTeardown: "<rootDir>/__tests__/jest.teardown.ts",

	moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),

	testEnvironment: "node",
};

export default createJestConfig(config);
