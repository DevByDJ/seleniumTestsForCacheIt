const { Builder, By } = require('selenium-webdriver');
const assert = require('assert');

describe('Home Page', () => {
  let driver;

  beforeAll(async () => {
    driver = await new Builder().forBrowser('firefox').build();
    await driver.manage().window().maximize();
    await driver.get('https://www.cache-it.com');
  });

  afterAll(async () => {
    if (driver) {
        await driver.quit();
    }
});

  test('Checks the Lander header text', async () => {
    const header = await driver.findElement(By.css('h1'));
    const headerText = await header.getText();
    assert.strictEqual(headerText, "Looking for a new Internship? Cache It!");
  });

  test('Checks for the Internships of the day header', async () => {
    const header = await driver.findElement(By.css('h2'));
    const headerText = await header.getText();
    assert.strictEqual(headerText, "Internships of the Day");
  });

  test('Checks if the "Find Internship" button navigates to the internships page', async () => {

    // Locate the "Find Internship" button and click it
    const findInternshipButton = await driver.findElement(By.css('button.ant-btn'));
    await findInternshipButton.click();
    });

});
