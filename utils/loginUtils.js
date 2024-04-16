const { Builder, By, until } = require('selenium-webdriver');

async function login(driver, email, password) {
    await driver.get('https://www.cache-it.com/signin');
    const emailInput = await driver.findElement(By.id('normal_login_email'));
    await emailInput.clear();
    await emailInput.sendKeys(email);

    const passwordInput = await driver.findElement(By.id('normal_login_password'));
    await passwordInput.clear();
    await passwordInput.sendKeys(password);

    const loginButton = await driver.findElement(By.css('.login-form-button'));
    await loginButton.click();

    // Wait for the URL to change
    await driver.wait(until.urlIs('https://www.cache-it.com/'), 10000);
}

module.exports = { login };
