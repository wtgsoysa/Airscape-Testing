const { expect } = require('@playwright/test');

class DataPage {
  constructor(page) {
    this.page = page;

    // Sidebar nav to reach Data Management
    this.sideBarDataManagement = 'text=Data Management';

    // Location dropdown (adjust value as needed)
    this.sensorLocationDropdown = 'select[name="location"]';

    // Chart canvas and title
    this.chartCanvas = '#aqiChart'; // from your HTML: <canvas id="aqiChart">
    this.chartTitle = 'text=AQI Over Time'; // optional visual heading
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
}

module.exports = { DataPage };
