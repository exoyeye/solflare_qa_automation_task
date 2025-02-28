const logger = require("../utils/logger");

class BasePage {
    constructor() {
    }

    // wait for element and click afterwards
    async clickElement(element) {
        await element.waitForClickable();
        await element.click();
    }

    // wait for element and get it's text
    async getText(element) {
        await element.waitForDisplayed();
        return await element.getText();
    }

    // open url    
    async open(path) {
        await browser.url(path);
    }

    // wait for element and enter text afterwards
    async setValue(element, text) {
        await element.waitForDisplayed();
        await element.setValue(text);
    }

    // verifies element is checked - switcher is set to "on"
    async verifyElementIsChecked(element) {
        const dataState = await element.getAttribute('data-state');
        expect(dataState).toBe('checked');
    }

    // checks if element is displayed
    async verifyElementIsDisplayed(element) {
        await element.waitForDisplayed({timeout: 5000});
        let isDisplayed =  await element.isDisplayed();
        expect(isDisplayed).toBe(true);
    }
    
    // verifies element is disabled
    async verifyElementIsDisabled(element) {
        const isEnabled = await element.isEnabled();
        expect(isEnabled).toBe(false);
    }
}

module.exports = BasePage; 