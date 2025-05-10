const { expect } = require('@playwright/test');

class DataPage {
  constructor(page) {
    this.page = page;

    // Sidebar nav to reach Data Management
    this.sideBarDataManagement = 'text=Data Management';

    // Filter controls
    this.sensorLocationDropdown = 'select[name="location"]';
    this.dateFromInput = 'input[name="from"]';
    this.dateToInput = 'input[name="to"]';
    this.refreshButton = 'button:has-text("Refresh")';

    // Chart canvas and title
    this.chartCanvas = '#aqiChart'; 
    this.chartTitle = 'text=AQI Over Time';
  }

  async gotoDataManagementPage() {
    await this.page.click(this.sideBarDataManagement);
    await expect(this.page.locator(this.sensorLocationDropdown)).toBeVisible();
  }

  async selectSensorLocation(value) {
    await this.page.selectOption(this.sensorLocationDropdown, value);
  }

  async assertChartIsVisible() {
    await expect(this.page.locator(this.chartCanvas)).toBeVisible();
   
  }

  async filterByDateRange(fromDate, toDate) {
    await this.page.fill(this.dateFromInput, fromDate);
    await this.page.fill(this.dateToInput, toDate);
    await this.page.click(this.refreshButton);
  }
}

module.exports = { DataPage };
