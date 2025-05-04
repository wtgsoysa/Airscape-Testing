

const { defineConfig, devices } = require('@playwright/test');


module.exports = defineConfig({

  testDir: './automation/specs',
  fullyParallel: true,

  forbidOnly: !!process.env.CI,

  retries: process.env.CI ? 2 : 0,


  workers: process.env.CI ? 1 : undefined,


  reporter: 'html',

 
  use: {
    headless: false,
    baseURL: 'http://127.0.0.1:8000/admin', 
    screenshot: 'only-on-failure', 
    video: 'retain-on-failure',    
    trace: 'on-first-retry',   
  },

  
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],


});
