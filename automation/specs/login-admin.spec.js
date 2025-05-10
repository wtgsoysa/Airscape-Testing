const { test } = require('@playwright/test');
const { LoginPage } = require('../pages/loginPage');

test.describe(`Admin Login`, ()=> {
    test('RBA-TC007 - should login successfully with valid Admin credentials', async( {page}) =>{

        const loginPage = new LoginPage(page)

        await loginPage.gotoRoleSelectionPage();
        await loginPage.selectAdminRole();
        await loginPage.loginAsAdmin('admin@airscape.lk', 'password123'); 
        await loginPage.assertDashboardURL();


    })
})