const { Builder, By, Key, until } = require('selenium-webdriver');

describe('Login Test', () => {
    let driver;

    beforeAll(async () => {
        driver = await new Builder().forBrowser('firefox').build();
        await driver.manage().window().maximize();
        await driver.get('https://www.cache-it.com/signin');
    });

    afterAll(async () => {
        if (driver) {
            await driver.quit();
        }
    });
    

    beforeEach(async () => {
        // Clear fields at the start of each test
        const emailInput = await driver.findElement(By.id('normal_login_email'));
        await emailInput.clear();
        const passwordInput = await driver.findElement(By.id('normal_login_password'));
        await passwordInput.clear();
    });

    test('should fail if email is not entered', async () => {
        const passwordInput = await driver.findElement(By.id('normal_login_password'));
        await passwordInput.sendKeys('test');
        const loginButton = await driver.findElement(By.css('.login-form-button'));
        await loginButton.click();
        const errorMessage = await driver.findElement(By.xpath("//div[contains(text(), 'Please input your E-mail!')]"));
        expect(await errorMessage.isDisplayed()).toBe(true);
    });

    test('should fail if password is not entered', async () => {
        const emailInput = await driver.findElement(By.id('normal_login_email'));
        await emailInput.sendKeys('test@eagle.fgcu.edu');
        const loginButton = await driver.findElement(By.css('.login-form-button'));
        await loginButton.click();
        const errorMessage = await driver.findElement(By.xpath("//div[contains(text(), 'Please input your Password!')]"));
        expect(await errorMessage.isDisplayed()).toBe(true);
    });

    test('should fail if email does not include "@eagle.fgcu.edu"', async () => {
        const emailInput = await driver.findElement(By.id('normal_login_email'));
        await emailInput.sendKeys('test@gmail.com');
        const passwordInput = await driver.findElement(By.id('normal_login_password'));
        await passwordInput.sendKeys('test');
        const loginButton = await driver.findElement(By.css('.login-form-button'));
        await loginButton.click();
        const errorMessage = await driver.findElement(By.xpath("//div[contains(text(), 'Please enter a valid @eagle.fgcu.edu email address!')]"));
        expect(await errorMessage.isDisplayed()).toBe(true);
    });

    test('should successfully login by typing an email, password and click login button', async () => {        
        // Wait for the email input to be visible and enabled
        const emailInput = await driver.wait(until.elementLocated(By.id('normal_login_email')));
        await driver.wait(until.elementIsVisible(emailInput));
        await driver.wait(until.elementIsEnabled(emailInput));
        await emailInput.sendKeys('test@eagle.fgcu.edu');

        const passwordInput = await driver.findElement(By.id('normal_login_password'));
        await passwordInput.sendKeys('test');

        const loginButton = await driver.findElement(By.css('.login-form-button'));
        await loginButton.click();

        // Wait for the URL to change
        await driver.wait(until.urlIs('https://www.cache-it.com/'), 10000);

        // Retrieve the current URL and assert it
        const currentUrl = await driver.getCurrentUrl();
        expect(currentUrl).toBe('https://www.cache-it.com/');
    });
});