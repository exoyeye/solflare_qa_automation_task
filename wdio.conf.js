// allows to pass browser as argument
const argv = require('yargs').argv;

// sets browser, if no parameter is sent, chrome is runned by default
const browserName = argv.browser || process.env.BROWSER || 'chrome';
const isHeadless = argv.headless || process.argv.includes('--headless');
const logger = require('./test/utils/logger')

const fs = require('fs');
const path = require('path');

exports.config = {
    runner: 'local',
    specs: [
        './test/specs/e2e/**/*.js'
    ],
    maxInstances: 1,
    capabilities: [
        {
            maxInstances: 1,
            browserName,
            ...(browserName === 'chrome' && {
                'goog:chromeOptions': {
                    args: isHeadless ? ['--headless', '--disable-gpu', '--no-sandbox'] : []
                }
            }),
            ...(browserName === 'firefox' && {
                'moz:firefoxOptions': {
                    args: isHeadless ? ['--headless'] : []
                }
            })
        }
    ],
    logLevel: 'info',
    bail: 0,
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 1,
    framework: 'mocha',
    reporters: ['spec'],
    mochaOpts: {
        timeout: 60000,
        retries: 0
    },
    before: async function () {
        await browser.maximizeWindow();
    },

    beforeTest: (test) => {
        logger.info(`Starting test: ${test.title}`);
    },
     
    afterTest: async function (test, context, { error, result, duration, passed, retries }) {
        if (!passed) {

            // write error message to a file
            logger.error(`Test failed: ${test.title}\nError: ${error.message}\nStack: ${error.stack}`);
            
            // Take screenshot of the failed test
            const timestamp = new Date().toISOString().replace(/:/g, '-');
            const screenshotDir = path.join(__dirname, 'logs/screenshots');

            // create screenshot directory if it doesn't exist
            if (!fs.existsSync(screenshotDir)) {
                fs.mkdirSync(screenshotDir, { recursive: true });
            }

            // save screenshot
            const screenshotFilePath = path.join(screenshotDir, `${test.title}-${timestamp}.png`);
            await browser.saveScreenshot(screenshotFilePath);
        }
        logger.info(`Finished test: ${test.title}`);
    }
}