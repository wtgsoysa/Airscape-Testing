const { expect } = require('@playwright/test');

class DashboardPage {

  constructor(page) {
    this.page = page;

    this.aqiCard = '.sensor-tile';
    this.aqiCardTitle = '.sensor-title';
    this.aqiCardLocation = '.sensor-meta';
    this.aqiCardBadge = '.condition-badge';
    this.aqiCardLevel = '.progress-track'; 
    this.aqiCardValue = '.aqi-value';
    this.aqiCardUpdateTime = '.last-updated';
  }

  async assertAtOneLeastAQICard() {
    const cards = this.page.locator(this.aqiCard);
    const count = await cards.count();
    expect(count).toBeGreaterThan(0);

  }

  async assertAQICardContent() {
    const firstCard = this.page.locator(this.aqiCard).first();

    await expect(firstCard).toBeVisible();
    await expect(firstCard.locator(this.aqiCardTitle)).toContainText(/NSBM Green University|IIT|SLIIT Campus|Moratuwa Uni/i);
    await expect(firstCard.locator(this.aqiCardLocation)).toContainText(/Homagama|Kollupitiya|Malabe|Moratuwa/i);
    await expect(firstCard.locator(this.aqiCardBadge)).toBeVisible();
    await expect(firstCard.locator(this.aqiCardValue)).toContainText(/19.17|66.56|111.01|56.22/i);
    await expect(firstCard.locator(this.aqiCardUpdateTime)).toBeVisible();
  }
}

module.exports = { DashboardPage };
