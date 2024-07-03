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

// Add any custom config to be passed to Jest
const config: Config = {
	// All imported modules in your tests should be mocked automatically
	// automock: false,

	// Automatically clear mock calls, instances, contexts and results before every test
	//clearMocks: true,

	// Indicates whether the coverage information should be collected while executing the test
	//collectCoverage: true,

	// The directory where Jest should output its coverage files
	//coverageDirectory: "coverage",

	// Indicates which provider should be used to instrument code for coverage
	//coverageProvider: "v8",
	testPathIgnorePatterns: [
		"/node_modules/",
		"/__tests__/jest.setup.ts",
		"/__tests__/api/login.ts",
		// Add the path to your setup file here
	],

	//rootDir: ".",
	setupFilesAfterEnv: ["<rootDir>/__tests__/jest.setup.ts"],

	// An array of directory names to be searched recursively up from the requiring module's location
	//moduleDirectories: ["node_modules", "<rootDir>/"],

	// A map from regular expressions to module names or to arrays of module names that allow to stub out resources with a single module
	moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),

	testEnvironment: "node",
};

export default createJestConfig(config);
