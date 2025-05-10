const { test } = require('@playwright/test');
const { LoginPage } = require('../pages/loginPage');
const { SensorPage } = require('../pages/sensorPage');

test.describe('Add New Sensor Test', () => {
  test('SM-TC001 – Add Sensor with Valid Input', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const sensorPage = new SensorPage(page);

    // Step 01 : Login as Web Master
    await loginPage.gotoRoleSelectionPage();
    await loginPage.selectWebMasterRole();
    await loginPage.loginAsWebMaster('webmaster@airscape.lk', 'password123');

    // Step 02 : Navigate to Sensor Management
    await sensorPage.assertGotoSensorManagementPage();

    // Step 03 : Open Add Sensor Modal
    await sensorPage.assertAddNewSensor();

    // Step 04 : Fill Sensor Form
    await sensorPage.assertEnterDetailsToAddSensor(
      'Kalaniya-Uni',
      'S005',
      'Kalaniya',
      'Active',
      '50',
      '10',
      '8',
      '6.9754',
      '79.9156'
    );
  });
});
