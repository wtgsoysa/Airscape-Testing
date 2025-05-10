// automation/pages/loginPage.js

const { expect } = require(`@playwright/test`);

class LoginPage {
    constructor(page) {
      this.page = page;
  
     
      this.webMasterRoleCard = 'text=WEB MASTER'; 
      this.adminRoleCard = 'text=ADMINISTRATOR';

  
      this.emailInput = '#email';
      this.passwordInput = '#password';
      this.loginButton = 'button[type="submit"]';
    }
  
    async gotoRoleSelectionPage() {
        await this.page.goto('/admin'); // This opens the role selection page
    }

    async selectWebMasterRole() {
        await this.page.click(this.webMasterRoleCard);
    }
    
    async selectAdminRole() {
      await this.page.click(this.adminRoleCard);
    }
  
    //steps of login as webmaster
    async loginAsWebMaster(email, password) {
      await this.page.click(this.webMasterRoleCard); 
      await this.page.fill(this.emailInput, email);
      await this.page.fill(this.passwordInput, password);
      await this.page.click(this.loginButton);
    }
  
    //steps of navigate to the dashboard
    async assertDashboardURL() {
      await expect(this.page).toHaveURL(/.*admin\/dashboard/);
    }

    //steps of display error message
    async assertInvalidLoginError() {
        const errorLocator = this.page.locator('.alert-danger'); 
      
        const isVisible = await errorLocator.isVisible();
      
        if (!isVisible) {
          throw new Error('❌ Login failed, but no error message was shown. System should show an error.');
        }
      
        await expect(errorLocator).toBeVisible();
    }

    //steps of login as a admin
    async loginAsAdmin(email, password){

      await this.page.click(this.adminRoleCard); 
      await this.page.fill(this.emailInput , email);
      await this.page.fill(this.passwordInput , password);
      await this.page.click(this.loginButton);

    }
      
      
  }
  

module.exports = {LoginPage}
