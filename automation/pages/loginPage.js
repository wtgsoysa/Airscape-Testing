// automation/pages/loginPage.js

const { expect } = require(`@playwright/test`);

class LoginPage {
    constructor(page) {
      this.page = page;
  
      // ✅ Use text-based selector for WEB MASTER role
      this.webMasterRoleCard = 'text=WEB MASTER'; 

  
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
      
  
    async loginAsWebMaster(email, password) {
      await this.page.click(this.webMasterRoleCard); // ✅ FIXED selector here
      await this.page.fill(this.emailInput, email);
      await this.page.fill(this.passwordInput, password);
      await this.page.click(this.loginButton);
    }
  
    async assertDashboardURL() {
      await expect(this.page).toHaveURL(/.*admin\/dashboard/);
    }

    async assertInvalidLoginError() {
        const errorLocator = this.page.locator('.alert-danger'); // Or adjust based on your UI
      
        const isVisible = await errorLocator.isVisible();
      
        if (!isVisible) {
          throw new Error('❌ Login failed, but no error message was shown. System should show an error.');
        }
      
        await expect(errorLocator).toBeVisible(); // ✅ Still assert if visible
    }
      
      
  }
  

module.exports = {LoginPage}
