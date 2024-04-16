const { Builder, By, until, Key } = require('selenium-webdriver');
const { login } = require('../utils/loginUtils');  // Adjust the path as necessary

describe('Company Page Tests', () => {
    let driver;

    beforeAll(async () => {
        driver = await new Builder().forBrowser('firefox').build();
        await driver.manage().window().maximize();
        await login(driver, 'test@eagle.fgcu.edu', 'test');  // Use the imported login function

        // Navigate to company page by clicking the link
        await driver.wait(until.elementLocated(By.css('a.nav-link[href="/company"]')), 10000);
        const companiesLink = await driver.findElement(By.css('a.nav-link[href="/company"]'));
        await companiesLink.click();
    }, 30000);

    afterAll(async () => {
      if (driver) {
          await driver.quit();
      }
  });
  

    test('company card details check', async () => {
        // Ensure that each company card contains essential details like company name and location
        const companyCards = await driver.findElements(By.css('.company-grid-margin .ant-card'));
        for (let card of companyCards) {
            const name = await card.findElement(By.css('.company-name')).getText();
            const location = await card.findElement(By.css('.company-location')).getText();
            expect(name).not.toBe('');
            expect(location).not.toBe('');
        }
    }, 10000);

    test('search box functionality', async () => {
      await driver.wait(until.elementLocated(By.css('input[placeholder="Search using a keyword"]')), 10000);
      // Enter the name of a company in the search box and submit
      const searchBox = await driver.findElement(By.css('input[placeholder="Search using a keyword"]'));
      await searchBox.sendKeys('Apple');
      await searchBox.sendKeys(Key.RETURN);
      
      // Wait for the search results to update
      await driver.wait(until.elementLocated(By.css('.ant-card-hoverable')), 10000);
      
      // Find all cards and check if one of them contains the name 'Apple'
      const cards = await driver.findElements(By.css('.ant-card-hoverable'));
      const found = await Promise.all(cards.map(async card => {
        const titleText = await card.findElement(By.css('.ant-card-meta-title')).getText();
        return titleText === 'Apple';
    }));
    
    expect(found.includes(true)).toBeTruthy();
}, 10000);
  

test('View Card Profile', async () => {
  await driver.wait(until.elementLocated(By.css('input[placeholder="Search using a keyword"]')), 10000);
  // Find the search box, clear any existing content, and submit the search term
  const searchBox = await driver.findElement(By.css('input[placeholder="Search using a keyword"]'));
  await searchBox.clear(); // Clears the input field
  await searchBox.sendKeys('Apple');
  await searchBox.sendKeys(Key.RETURN);
  
  // Wait for the search results to update
  await driver.wait(until.elementLocated(By.css('.ant-card-hoverable')), 10000);
  
  // Find all cards, check if one of them contains the name 'Apple', and click the 'View Profile' button
  const cards = await driver.findElements(By.css('.ant-card-hoverable'));
  let foundApple = false;
  for (const card of cards) {
      const titleText = await card.findElement(By.css('.ant-card-meta-title')).getText();
      if (titleText === 'Apple') {
          foundApple = true;
          const viewProfileButton = await card.findElement(By.css('button.ant-btn'));
          await viewProfileButton.click();
          break;
      }
  }

  expect(foundApple).toBeTruthy(); // Check that 'Apple' was found

  // Wait for the navigation to the company profile page and check the URL
  await driver.wait(until.urlContains('/company/'), 10000);
  const url = await driver.getCurrentUrl();
  expect(url).toContain('/company/'); // Verify URL contains '/company/'
}, 10000);


  
});
