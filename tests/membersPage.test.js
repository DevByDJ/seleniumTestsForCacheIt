const { Builder, By, until, Key } = require('selenium-webdriver');
const { login } = require('../utils/loginUtils');  // Adjust the path as necessary

describe('Members Page Tests', () => {
    let driver;

    beforeAll(async () => {
        driver = await new Builder().forBrowser('firefox').build();
        await driver.manage().window().maximize();
        await login(driver, 'test@eagle.fgcu.edu', 'test');  // Use the imported login function

        // Navigate to members page by clicking the link
        await driver.wait(until.elementLocated(By.css('a.nav-link[href="/members"]')), 10000);
        const membersLink = await driver.findElement(By.css('a.nav-link[href="/members"]'));
        await membersLink.click();
    }, 30000);

    afterAll(async () => {
      if (driver) {
          await driver.quit();
      }
  });

    test('should display member list items', async () => {
        // Wait for the member list items to be located
        await driver.wait(until.elementLocated(By.css('.ant-list-item')), 10000);
        
        // Find all elements that match the member list item selector
        const memberItems = await driver.findElements(By.css('.ant-list-item'));

        // Assert that the number of member items found is greater than 0
        expect(memberItems.length).toBeGreaterThan(0);
    }, 10000);

    test('should verify the name of a specific member', async () => {
        // Wait and find the specific member's name within the list
        const memberName = await driver.wait(until.elementLocated(By.css('.ant-list-item-meta-title')), 10000).getText();
        
        // Assert that the name is correctly displayed
        expect(memberName).toContain('Danny Joseph');
    }, 10000);

    test('should verify that "Show Profile" button is clickable', async () => {
      // Wait for the "Show Profile" button to be visible and clickable
      const showProfileButton = await driver.wait(until.elementLocated(By.css('.ant-btn')), 10000);
      
      // Assert that the button is enabled
      expect(await showProfileButton.isEnabled()).toBe(true);
  }, 10000);
  
});
