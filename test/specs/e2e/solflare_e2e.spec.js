const HomePage = require('../../pageobjects/home.page');
const testData = require('../../data/test-data.json');
const PortfolioPage = require('../../pageobjects/portfolio.page');

describe('Registration form', () => {
    it('Verify that the recovery phrase list contains the original wallet and the newly added wallets', async () => {
        // Go to https://solflare.com/
        await HomePage.open();

        // Click on button Access wallet
        await HomePage.clickAccessWalletButton();
        
        // Click on button I need a new wallet
        await HomePage.clickNewWalletButton();

        // Read the given recovery phrase (do not copy)
        const recoveryPhrase = await HomePage.readRecoveryPhrase();

        // Click on button I saved my recovery phrase
        await HomePage.clickISavedMyRecoveryPhraseButton();

        // Enter (do not paste) the recovery phrase
        await HomePage.enterRecoveryPhrase(recoveryPhrase);

        // Click on button Continue
        await HomePage.clickContinueButton();

        // Enter password
        await HomePage.enterNewPassword(testData.password);

        // Enter the same password to the second input field
        await HomePage.enterRepeatPassword(testData.password);

        // Click on button Continue
        await HomePage.clickContinueButton();

        // Click on button Enter Solana
        await HomePage.clickEnterSolanaButton();

        // Click on button Wallet management (Avatar in the right corner of the header)
        await PortfolioPage.clickAvatarButton();

        // Verify that the Main wallet is displayed
        await PortfolioPage.verifyMainWalletIsDisplayed();

        // Click on icon +
        await PortfolioPage.clickMyWalletsAddButton();

        // Click on button Manage recovery phrase
        await PortfolioPage.clickManageRecoveryPhraseButton();
        
        // Verify that the first toggle is on
        await PortfolioPage.verifyFirstToggleIsDisabled();

        // Verify that the first toggle is on
        await PortfolioPage.verifyFirstToggleIsOn();

        // Select the 3rd and 4th list item
        await PortfolioPage.selectThirdToggle();
        await PortfolioPage.selectFourthToggle();

        // Click on button Save
        await PortfolioPage.clickSaveButton();

        // Verify that the recovery phrase list contains the original wallet and the newly added wallets
        await PortfolioPage.verifyMainWalletIsDisplayed();
        await PortfolioPage.verifyWalletTwoIsDisplayed();
        await PortfolioPage.verifyWalletThreeIsDisplayed();
    });
}); 