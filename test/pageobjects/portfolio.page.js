const BasePage = require('./base.page');
const logger = require('../utils/logger');

class PortfolioPage extends BasePage {

    // Selectors
    get avatarButton() { return $('div.edp3oa0'); }
    get firstToggleButton(){return $$('button._1qwtpic0')[0]}
    get fourthToggleButton(){return $$('button._1qwtpic0')[3]}
    get manageRecoveryPhraseButton() { return $('span=Manage recovery phrase'); }
    get myWalletsAddButton() { return $('div._1do4akc1._1do4akc6'); }
    get saveButton(){return $('button=Save')}
    get thirdToggleButton(){return $$('button._1qwtpic0')[2]}

    get mainWalletSpan(){return $('span=Main Wallet')}
    get walletTwoSpan(){return $('span=Wallet 2')}
    get walletThreeSpan(){return $('span=Wallet 3')}


    // Click avatar button
    async clickAvatarButton() {
        await this.clickElement(this.avatarButton);
        logger.userAction("Clicked Avatar button");
    }

    // Click "+" button in My wallets
    async clickMyWalletsAddButton() {
        await this.clickElement(this.myWalletsAddButton);
        logger.userAction("Clicked + in My wallets");
    }

    // Click "Manage Recovery Phrase" button
    async clickManageRecoveryPhraseButton() {
        await this.clickElement(this.manageRecoveryPhraseButton);
        logger.userAction("Clicked Manage Recovery Phrase button");
    }

    // Click Save button
    async clickSaveButton(){
        await this.clickElement(this.saveButton);
        logger.userAction("Clicked Save button");
    }

    // Select/enable third toggle
    async selectThirdToggle(){
        await this.clickElement(this.thirdToggleButton);
        logger.userAction("Selected third toggle");
    }

    // Select/enable third toggle
    async selectFourthToggle(){
        await this.clickElement(this.fourthToggleButton);
        logger.userAction("Selected fourth toggle");
    }

    // Verifies first toggle is disabled in My wallets section
    async verifyFirstToggleIsDisabled() {
        await this.verifyElementIsDisabled(this.firstToggleButton);
        logger.userAction("Verified first toggle is disabled");
    }

    // Verifies First toggle is on/enabled
    async verifyFirstToggleIsOn() {
        await this.verifyElementIsChecked(this.firstToggleButton);
        logger.userAction("Verified first toggle is on");
    }

    // Verifies Main wallet is displayed in "My wallets" section
    async verifyMainWalletIsDisplayed(){
        await this.verifyElementIsDisplayed(this.mainWalletSpan);
        logger.userAction("Verified Main Wallet is displayed");
    }

    // Verifies second wallet is displayed
    async verifyWalletTwoIsDisplayed(){
        await this.verifyElementIsDisplayed(this.walletTwoSpan);
        logger.userAction("Verified Wallet two is displayed");
    }
    
    // Verifies third wallet is displayed
    async verifyWalletThreeIsDisplayed(){
        await this.verifyElementIsDisplayed(this.walletThreeSpan);
        logger.userAction("Verified Wallet three is displayed");
    }
}
module.exports = new PortfolioPage(); 