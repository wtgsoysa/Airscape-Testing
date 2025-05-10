const { expect } = require('@playwright/test');

class SensorPage {
  constructor(page) {
    this.page = page;

    // Sidebar + open modal
    this.sideBarSensorManagement = 'text=Sensor Management';
    this.addSensorBtn = 'button:has-text("Add Sensor")';
    this.addSensorPopup = '.modal-content';

    // ✅ Correct form input selectors (match actual DOM)
    this.sensorNameInput = 'input[name="name"]';         
    this.sensorIdInput = 'input[name="sensor_id"]';    
    this.sensorAreaInput = 'input[name="location"]';     
    this.sensorStatusInput = 'select[name="status"]';    
    this.sensorAQIInput = 'input[name="baseline_aqi"]';  
    this.sensorFrequencyInput = 'input[name="frequency"]';
    this.sensorVariation = 'input[name="variation"]';
    this.sensorLatituteInput = 'input[name="latitude"]';
    this.sensorLongitudeInput = 'input[name="longitude"]';

    this.sensorAddBtn = '.modal-content button:has-text("Add")';

  }

  async assertGotoSensorManagementPage() {
    await this.page.click(this.sideBarSensorManagement);
  }

  async assertAddNewSensor() {
    await this.page.click(this.addSensorBtn);
    await expect(this.page.locator(this.addSensorPopup)).toBeVisible();
  }

  async assertEnterDetailsToAddSensor(name, id, area, status, aqi, freq, variation, lat, lng) {
    await this.page.fill(this.sensorNameInput, name);
    await this.page.fill(this.sensorIdInput, id);
    await this.page.fill(this.sensorAreaInput, area);
    await this.page.selectOption(this.sensorStatusInput, status);
    await this.page.fill(this.sensorAQIInput, aqi);
    await this.page.fill(this.sensorFrequencyInput, freq);
    await this.page.fill(this.sensorVariation, variation);
    await this.page.fill(this.sensorLatituteInput, lat);
    await this.page.fill(this.sensorLongitudeInput, lng);

    await this.page.click(this.sensorAddBtn);
  }

  async assertEmptyFormIsBlocked() {
    await this.page.click(this.addSensorBtn);
    await expect(this.page.locator(this.addSensorPopup)).toBeVisible();

    // Try clicking the submit button without filling anything
    await this.page.click(this.sensorAddBtn);

    // Wait briefly to give the browser time to block the submission
    await this.page.waitForTimeout(500);

    // ✅ Check if the name input is still marked as invalid
    const isInvalid = await this.page.$eval(this.sensorNameInput, el => !el.checkValidity());
    expect(isInvalid).toBe(true);
  }


}

module.exports = { SensorPage };
