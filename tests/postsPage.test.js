const { Builder, By, until, Key } = require('selenium-webdriver');
const { login } = require('../utils/loginUtils');  // Adjust the path as necessary

describe('Posts Page Tests', () => {
    let driver;

    beforeAll(async () => {
        driver = await new Builder().forBrowser('firefox').build();
        await driver.manage().window().maximize();
        await login(driver, 'test@eagle.fgcu.edu', 'test');  // Use the imported login function

        // Navigate to members page by clicking the link
        await driver.wait(until.elementLocated(By.css('a.nav-link[href="/posts"]')), 10000);
        const postsLink = await driver.findElement(By.css('a.nav-link[href="/posts"]'));
        await postsLink.click();
    }, 30000);

    afterAll(async () => {
      if (driver) {
          await driver.quit();
      }
  });

    test('should display more than 0 posts', async () => {
      // Wait for the posts list to be loaded and located
      await driver.wait(until.elementLocated(By.css('.Posts-List .ant-list-items')), 10000);

      // Find all elements that match the posts list item selector
      const postsListItems = await driver.findElements(By.css('.Posts-List .ant-list-item'));

      // Assert that the number of posts found is greater than 0
      expect(postsListItems.length).toBeGreaterThan(0);
  }, 10000);

  test('should check the title of the first post', async () => {
    // Ensure the posts list is loaded and find the first post's title element
    const firstPostTitleElement = await driver.wait(until.elementLocated(By.css('.Posts-List .ant-list-item:first-child .ant-list-item-meta-title span')), 10000);
    
    // Get the text from the title element
    const firstPostTitleText = await firstPostTitleElement.getText();

    // Assert to check the title text of the first post
    expect(firstPostTitleText).toContain('Danny Joseph'); // Adjust this to match expected content
}, 10000);

  
});
