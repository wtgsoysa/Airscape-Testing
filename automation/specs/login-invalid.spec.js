const {test} = require(`@playwright/test`);
const {LoginPage} = require(`../pages/loginPage`);
const { log } = require("console");

test.describe('Web Master Invalid Login',() => {
    test(`RBA-TC006 - should show error with invalid credentials`, async ({page}) =>{

        const loginPage = new LoginPage(page);

        await loginPage.gotoRoleSelectionPage();
        await loginPage.selectWebMasterRole();
        // use invalid password
        await loginPage.loginAsWebMaster('webmaster@airscape.lk', 'wrongPassword');

        // check for error message
        await loginPage.assertInvalidLoginError();
    })
})
