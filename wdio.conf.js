// makes possible to select browser
const argv = require('yargs').argv;


const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

const browserName = argv.browser || process.env.BROWSER || 'chrome';
const isHeadless = argv.headless || process.argv.includes('--headless');
const logger = require('./test/utils/logger');

const fs = require('fs');
const path = require('path');

puppeteer.use(StealthPlugin());

let browserInstance;

exports.config = {
    runner: 'local',
    specs: ['./test/specs/e2e/**/*.js'],
    maxInstances: 1,
    capabilities: [
        {
            maxInstances: 1,
            browserName,
            ...(browserName === 'chrome' && {
                'goog:chromeOptions': {
                    args: isHeadless ? ['--headless=new', '--disable-gpu', '--no-sandbox'] : [],
                },
            }),
            ...(browserName === 'firefox' && {
                'moz:firefoxOptions': {
                    args: isHeadless ? ['--headless'] : [],
                },
            }),
        },
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
        retries: 0,
    },

    beforeSession: async function (config, capabilities) {
        browserInstance = await puppeteer.launch({
            headless: isHeadless, 
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
            ignoreDefaultArgs: ['--enable-automation']
        });

        const browserWSEndpoint = browserInstance.wsEndpoint();
        capabilities['goog:chromeOptions'] = {
            debuggerAddress: browserWSEndpoint.split('//')[1],
        };
    },

    before: async function () {
        await browser.maximizeWindow();
    },

    beforeTest: (test) => {
        logger.info(`Starting test: ${test.title}`);
    },

    afterTest: async function (test, context, { error, result, duration, passed, retries }) {
        if (!passed) {
            logger.error(`Test failed: ${test.title}\nError: ${error.message}\nStack: ${error.stack}`);

            const timestamp = new Date().toISOString().replace(/:/g, '-');
            const screenshotDir = path.join(__dirname, 'logs/screenshots');

            if (!fs.existsSync(screenshotDir)) {
                fs.mkdirSync(screenshotDir, { recursive: true });
            }

            const screenshotFilePath = path.join(screenshotDir, `${test.title}-${timestamp}.png`);
            await browser.saveScreenshot(screenshotFilePath);
        }
        logger.info(`Finished test: ${test.title}`);
    },

    onComplete: async function () {
        if (browserInstance) {
            await browserInstance.close();
        }
    },
};
