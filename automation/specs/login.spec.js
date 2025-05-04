// automation/specs/login.spec.js

const { test } = require('@playwright/test');
const { LoginPage } = require('../pages/loginPage');

test.describe('Web Master Login', () => {
  test('RBA-TC004 - should login successfully with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.gotoRoleSelectionPage();
    await loginPage.selectWebMasterRole();
    await loginPage.loginAsWebMaster('webmaster@airscape.lk', 'password123'); // 🔁 Replace with real creds
    await loginPage.assertDashboardURL();
  });
});
