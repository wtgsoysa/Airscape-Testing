const { test } = require(`@playwright/test`);
const { LoginPage } = require(`../pages/loginPage`);
const { DashboardPage } = require(`../pages/dashboardPage`);

test.describe('Dashboard AQI Card Test', ()=>{
    test('DA-TC001 - should display AQI cards with valid content', async ({page}) =>{
        const loginPage = new LoginPage(page);
        const dashboardPage = new DashboardPage(page);

        // Step 01 : Login as a WebMaster
        await loginPage.gotoRoleSelectionPage();
        await loginPage.selectWebMasterRole();
        await loginPage.loginAsWebMaster('webmaster@airscape.lk', 'password123');

        // Step 02 : Check at least one AQI card appears
        await dashboardPage.assertAQICardContent();

        // Step 03 : Check the content inside the first AQI card
        await dashboardPage.assertAtOneLeastAQICard();
    })
})