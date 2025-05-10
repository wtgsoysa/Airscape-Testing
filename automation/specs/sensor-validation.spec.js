const { test } = require('@playwright/test');
const { LoginPage } = require('../pages/loginPage');
const { SensorPage } = require('../pages/sensorPage');

test.use({ browserName: 'chromium' });

test.describe('Sensor Add Form Validation', () => {
  test('SM-TC011 - should block empty form submission (HTML5 validation)', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const sensorPage = new SensorPage(page);

  await loginPage.gotoRoleSelectionPage();
  await loginPage.selectWebMasterRole();
  await loginPage.loginAsWebMaster('webmaster@airscape.lk', 'password123');

  await sensorPage.assertGotoSensorManagementPage();
  await sensorPage.assertEmptyFormIsBlocked(); // ✅ new method
});

});
