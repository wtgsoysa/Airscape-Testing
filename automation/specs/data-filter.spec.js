const { test } = require('@playwright/test');
const { LoginPage } = require('../pages/loginPage');
const { DataPage } = require('../pages/dataPage');

test.describe('Data Management - Location Filter', () => {
  test('DM-TC001 - should update AQI chart after filtering by location', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dataPage = new DataPage(page);

    // Step 1: Login as Web Master
    await loginPage.gotoRoleSelectionPage();
    await loginPage.selectWebMasterRole();
    await loginPage.loginAsWebMaster('webmaster@airscape.lk', 'password123');

    // Step 2: Navigate to Data Management page
    await dataPage.gotoDataManagementPage();

    // Step 3: Select a specific location (e.g., 'kalaniya')
    await dataPage.selectSensorLocation('Kalaniya');

    // Step 4: Assert the chart updated (visible)
    await dataPage.assertChartIsVisible();
  });
});
