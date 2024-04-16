const { Builder, By, until } = require('selenium-webdriver');
const { login } = require('../utils/loginUtils');  // Adjust the path as necessary

describe('Internship Page Test', () => {
    let driver;

    beforeAll(async () => {
        driver = await new Builder().forBrowser('firefox').build();
        await driver.manage().window().maximize();
        await login(driver, 'test@eagle.fgcu.edu', 'test');  // Use the imported login function

        // Navigate to internships page by clicking the link
        await driver.wait(until.elementLocated(By.css('a.nav-link[href="/internships"]')), 10000);
        const internshipsLink = await driver.findElement(By.css('a.nav-link[href="/internships"]'));
        await internshipsLink.click();

    }, 60000);

    afterAll(async () => {
      if (driver) {
          await driver.quit();
      }
  });

    test('should display correct header on internships page', async () => {

        await driver.wait(until.elementLocated(By.css('.internships-available-banner h2')), 10000);

        // Verify the internships page is displayed by checking the header inside the specific banner
        const header = await driver.findElement(By.css('.internships-available-banner h2'));
        const headerText = await header.getText();
        expect(headerText).toContain('Internships Available Now');
    }, 10000);
    
    test('should display internships', async () => {
      // Wait for the internship cards to be located
      await driver.wait(until.elementLocated(By.css('.internship-grid-margin .ant-card')), 10000);
  
      // Find all elements that match the internship card selector within the internship grid
      const internships = await driver.findElements(By.css('.internship-grid-margin .ant-card'));
  
      // Assert that the number of internship cards found is greater than 0
      expect(internships.length).toBeGreaterThan(0);
  }, 10000);
  
});
