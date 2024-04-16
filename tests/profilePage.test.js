const { Builder, By, until } = require('selenium-webdriver');
const { login } = require('../utils/loginUtils');

describe('Profile Page Tests', () => {
    let driver;

    beforeAll(async () => {
        driver = await new Builder().forBrowser('firefox').build();
        await driver.manage().window().maximize();
        await login(driver, 'test@eagle.fgcu.edu', 'test');  // Use the imported login function

        // Navigate to profile page by clicking the link
        await driver.wait(until.elementLocated(By.css('div.signin-btn a[href*="/profile/"]')), 20000);
        const profileLink = await driver.findElement(By.css('div.signin-btn a[href*="/profile/"]'));
        await profileLink.click();

        // Wait for the profile information to appear
        await driver.wait(until.elementLocated(By.css('.profile-container')), 20000);
    }, 60000); // Increase timeout if needed

    afterAll(async () => {
        if (driver) {
            await driver.quit();
        }
    });

    test('should verify the user\'s full name is "John Smith"', async () => {
      // Wait until the text within the <b> tag is exactly 'John Smith'
      await driver.wait(async () => {
          const nameElement = await driver.findElement(By.css('.profile-container div > b'));
          const nameText = await nameElement.getText();
          return nameText === 'John Smith';
      }, 20000); // Adjust the timeout as necessary
      const nameElement = await driver.findElement(By.css('.profile-container div > b'));
      const nameText = await nameElement.getText();
      expect(nameText).toBe('John Smith');
    }, 30000); // Adjust test timeout if necessary

    test('should verify the user\'s role is "user"', async () => {
        const roleElement = await driver.wait(until.elementLocated(By.css('.ant-tag.ant-tag-geekblue.ant-tag-borderless')), 20000);
        const roleText = await roleElement.getText();
        expect(roleText).toBe('user');
    }, 20000);

    test('should verify the full name input field contains "John Smith"', async () => {
      const fullNameInput = await driver.wait(until.elementLocated(By.id('input-full_name')), 10000);
      await driver.wait(until.elementIsVisible(fullNameInput), 10000);
      const fullNameValue = await fullNameInput.getAttribute('value');
      expect(fullNameValue).toBe('John Smith');
    }, 20000);

    test('should verify the email input field contains "test@eagle.fgcu.edu"', async () => {
      const emailInput = await driver.wait(until.elementLocated(By.id('input-email')), 10000);
      await driver.wait(until.elementIsVisible(emailInput), 10000);
      const emailValue = await emailInput.getAttribute('value');
      expect(emailValue).toBe('test@eagle.fgcu.edu');
    }, 20000);

    test('should verify the profile bio textarea contains the correct bio', async () => {
      const bioTextarea = await driver.wait(until.elementLocated(By.css('.ant-form-item-control-input-content textarea')), 10000);
      await driver.wait(until.elementIsVisible(bioTextarea), 10000);
      const bioText = await bioTextarea.getAttribute('value');
      expect(bioText).toBe('I am a test user.');
    }, 20000);

    test('should verify the major input field contains "Software Engineering"', async () => {
      const majorInput = await driver.wait(until.elementLocated(By.id('input-major')), 10000);
      await driver.wait(until.elementIsVisible(majorInput), 10000);
      const majorValue = await majorInput.getAttribute('value');
      expect(majorValue).toBe('Software Engineering');
    }, 20000);
  
    test('should verify the minor input field contains "Computer Science"', async () => {
      const minorInput = await driver.wait(until.elementLocated(By.id('input-minor')), 10000);
      await driver.wait(until.elementIsVisible(minorInput), 10000);
      const minorValue = await minorInput.getAttribute('value');
      expect(minorValue).toBe('Computer Science');
    }, 20000);
  
});
