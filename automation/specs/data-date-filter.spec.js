const { test } = require('@playwright/test');
const { LoginPage } = require('../pages/loginPage');
const { DataPage } = require('../pages/dataPage');

test.describe('Data Management - Date Range Filter', ()=>{
    test('DM-TC002 - should filter AQI data by date range', async ({page}) =>{
        const loginPage = new LoginPage(page);
        const dataPage = new DataPage(page);

        // Step 01: Login
        await loginPage.gotoRoleSelectionPage();
        await loginPage.selectWebMasterRole();
        await loginPage.loginAsWebMaster('webmaster@airscape.lk', 'password123');

        // Step 2: Go to Data Management
        await dataPage.gotoDataManagementPage();

        // Step 3: Enter date range (update based on actual data range)
        const from = '2025-04-27T15:00'; 
        const to = '2025-05-10T20:00'
        await dataPage.filterByDateRange(from, to);

        // Step 4: Assert chart updates
        await dataPage.assertChartIsVisible();
    })
})