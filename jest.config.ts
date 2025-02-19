// jest.config.js
import type { Config } from "jest";
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  // Path to Next.js app to load next.config.js
  dir: './'
})

/** @type {import('@jest/types').Config.InitialOptions} */
const customJestConfig: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  // Add more setup options before each test is run
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  preset: "ts-jest"
 }

// Necesario meter el transformIgnorePatterns tras el await cuando se usa Next con swiper y Jest
module.exports = async () => ({
  ...(await createJestConfig(customJestConfig)()),
  transformIgnorePatterns: [
    // The regex below is just a guess, you might tweak it
    'node_modules/(?!(swiper|ssr-window|dom7)/)',
  ]
})