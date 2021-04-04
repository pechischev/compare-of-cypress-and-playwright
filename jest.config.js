module.exports = {
	preset: 'jest-playwright-preset',
	moduleDirectories: ['node_modules'],
	testMatch : ['<rootDir>/playwright/**/*.test.js'],
	setupFilesAfterEnv: ['expect-playwright'],
}