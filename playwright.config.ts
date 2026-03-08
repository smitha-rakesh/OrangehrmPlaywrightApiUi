 import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  timeout: 120000,
  reporter:  [
    ['html'],
    ['list']
  ],

  use: {
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
    headless: true,
    navigationTimeout: 45000,
    actionTimeout: 30000
  },

  projects: [

    {
      name: 'setup',
      testMatch: /auth\.setup\.ts/
    },

    {
      name: 'chromium',
      dependencies: ['setup'],
      use: {
        browserName: 'chromium',
        storageState: 'storageState.json'
      }
    }

  ]
});
