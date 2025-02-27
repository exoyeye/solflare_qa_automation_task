const BasePage = require('./base.page');
const testData = require('../data/test-data.json');
const logger = require('../utils/logger');

class HomePage extends BasePage {

    // Selectors
    get accessWalletButton() { return $('a=Access wallet'); }
    get continueButton() { return $('button=Continue'); }
    get enterSolanaButton() { return $('button=Enter Solana'); }
    get iNeedNewWalletButton() { return $('button=I need a new wallet'); }
    get iSavedMyRecoveryPhraseButton() { return $('button=I saved my recovery phrase'); }

    get mnemonicInputs() { return $$('input[id^="mnemonic-input-"]'); }
    get newPasswordInput() { return $('input[name="password"]'); }
    get repeatPasswordInput() { return $('input[name="password2"]'); }

    
    // Click on "Access Wallet" button
    async clickAccessWalletButton() {
        await this.clickElement(this.accessWalletButton);
        logger.userAction("Clicked button Access wallet");
    }

    // Click on "I Need a New Wallet" button
    async clickNewWalletButton() {
        await this.clickElement(this.iNeedNewWalletButton);
        logger.userAction("Clicked button I need new wallet");
    }
    // Click on "I saved my recovery phrase" button
    async clickISavedMyRecoveryPhraseButton() {
        await this.clickElement(this.iSavedMyRecoveryPhraseButton);
        logger.userAction("Clicked I saved my recovery phrase button");
    }

    // Click Continue button
    async clickContinueButton() {
        await this.clickElement(this.continueButton);
        logger.userAction("Clicked continue button");
    }

    // Click Enter Solana button
    async clickEnterSolanaButton() {
        await this.clickElement(this.enterSolanaButton);
        logger.userAction("Clicked enter solana button");
    }

    // Enter recovery phrase - pass list of 12 mnemonics as argument
    async enterRecoveryPhrase(phrase) {
        for (let i = 0; i < phrase.length; i++) {
            await this.setValue(this.mnemonicInputs[i], phrase[i]);
        }
        logger.userAction("Entered recovery phrase");
        }
    
        // Enter passwordi in New password field
        async enterNewPassword(password) {
            await this.setValue(this.newPasswordInput, password);
            logger.userAction("Entered new password");
        }
    
        // Enter password in Repeat password field
        async enterRepeatPassword(password) {
            await this.setValue(this.repeatPasswordInput, password);
            logger.userAction("Entered repeat password");
        }

    // Open Solflare homepage
    async open() {
        await super.open(testData.baseUrl);
        logger.userAction("Opened solflare webpage");
    }

    // read recovery phrase - go through all 'mnemonic' elements, find their "value" property and add them to the list
    async readRecoveryPhrase() {
        const mnemonics = [];
        try {
            for (let i = 1; i < 13; i++) {
                const mnemonicElement = await $(`[id="mnemonic-input-${i}"]`);
                
                await mnemonicElement.waitForDisplayed({ 
                    timeout: 5000,
                    timeoutMsg: `Mnemonic element ${i} not displayed after 5s`
                });

                const mnemonic = await mnemonicElement.getAttribute('Value');
                if (!mnemonic) {
                    console.warn(`Warning: No defaultValue found for mnemonic with index ${i}`);
                }
                mnemonics.push(mnemonic);
            }
            logger.userAction("Finished reading recovery phrase");
            return mnemonics;
        } catch (error) {
            logger.error('Error reading recovery phrase:', error);
            throw error;
        }
    }
}

module.exports = new HomePage(); 