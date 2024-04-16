const { Builder, By, until, Key } = require('selenium-webdriver');
const { login } = require('../utils/loginUtils');  // Adjust the path as necessary

describe('Events Page Tests', () => {
    let driver;

    beforeAll(async () => {
        driver = await new Builder().forBrowser('firefox').build();
        await driver.manage().window().maximize();
        await login(driver, 'test@eagle.fgcu.edu', 'test');  // Use the imported login function

        // Navigate to events page by clicking the link
        await driver.wait(until.elementLocated(By.css('a.nav-link[href="/events"]')), 10000);
        const eventsLink = await driver.findElement(By.css('a.nav-link[href="/events"]'));
        await eventsLink.click();
    }, 30000);

    afterAll(async () => {
      if (driver) {
          await driver.quit();
      }
    });

    test('should click between tabs on the page', async () => {

      await driver.wait(until.elementLocated(By.css('#rc-tabs-0-tab-1')), 10000);
      // Locate and click on the Calendar tab using JavaScript
      const calendarTab = await driver.findElement(By.css('#rc-tabs-0-tab-1'));
      await driver.executeScript("arguments[0].click();", calendarTab);
      await driver.sleep(1000); // Allow some time for the tab to become active

      // Check if the Calendar tab is active
      let isCalendarActive = await calendarTab.getAttribute('aria-selected');
      expect(isCalendarActive).toBe('true');

      // Locate and click on the Events tab using JavaScript
      const eventsTab = await driver.findElement(By.css('#rc-tabs-0-tab-2'));
      await driver.executeScript("arguments[0].click();", eventsTab);
      await driver.sleep(1000); // Allow some time for the tab to become active

      // Check if the Events tab is active
      let isEventsActive = await eventsTab.getAttribute('aria-selected');
      expect(isEventsActive).toBe('true');
  }, 20000);

    test('should verify more than one list item on the Events tab', async () => {

       await driver.wait(until.elementLocated(By.css('#rc-tabs-0-tab-2')), 10000);

        // Ensure we are on the Events tab
        const eventsTab = await driver.findElement(By.css('#rc-tabs-0-tab-2'));
        await driver.executeScript("arguments[0].click();", eventsTab);
        await driver.sleep(1000); // Allow some time for the tab to become active

        // Wait for the list items to load
        await driver.wait(until.elementLocated(By.css('.ant-list-item')), 10000);
        const listItems = await driver.findElements(By.css('.ant-list-item'));
        expect(listItems.length).toBeGreaterThan(0);
    }, 20000);

    test('should check the title and name of a list item', async () => {

        await driver.wait(until.elementLocated(By.css('#rc-tabs-0-tab-2')), 10000);

        // Ensure we are on the Events tab
        const eventsTab = await driver.findElement(By.css('#rc-tabs-0-tab-2'));
        await driver.executeScript("arguments[0].click();", eventsTab);
        await driver.sleep(1000); // Allow some time for the tab to become active

        // Locate the first list item and extract its title
        const listItemTitle = await driver.findElement(By.css('.ant-list-item-meta-title')).getText();
        expect(listItemTitle).toContain('SEC Hackathon!'); // Assuming 'SEC Hackathon!' is the event title

        // Check for additional details like the location and date
        const location = await driver.findElement(By.css('.ant-list-item-meta-description div:nth-child(1)')).getText();
        expect(location).toContain('Holmes Hall');

        const time = await driver.findElement(By.css('.ant-list-item-meta-description div:nth-child(2)')).getText();
        expect(time).toContain('3/30/2024 @ 08:00 AM');
    }, 20000);

});
