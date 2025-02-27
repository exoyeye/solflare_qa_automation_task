## INSTALLATION
To install project dependencies, run ```npm install```. This will install Node.js. 

## RUN API TESTS
To run api tests, execute: ```npm run test_api```.

## RUN End2End tests
To run E2E tests in Chrome, execute: ```npx wdio run wdio.conf.js --browser=chrome``` or ```npm run test_e2e```
To run E2E tests in Firefox, execute: ```npx wdio run wdio.conf.js --browser=firefox```

### Running E2E tests in headless mode
If you want to run tests in headless mode, just add '--headless' at the end of command lines from above:
```npx wdio run wdio.conf.js --browser=chrome -- headless```
```npx wdio run wdio.conf.js --browser=firefox -- headless```