# Solflare QA Automation Task

## INSTALLATION

### PREREQUISITS
Node.js version 20.18.3 - if it's not installed, it will be installed via setup script

### Setup (with or without Node.js):
Here are the setup instructions for WIndows, macOS and Linux:

Windows:
```bash
.\install-node.ps1
```
After node setup is complete, run:
```bash
npm install
```


For macOS/Linux:
```bash
# Make the script executable (first time only)
chmod +x setup.sh
# Run the setup script
./setup.sh
```

These scripts will:
1. Check if Node.js is installed and install it if needed
2. Install all project dependencies
3. Configure WebdriverIO

## RUN API TESTS

To run API tests, execute:

```bash
npm run test_api
```

## RUN End2End tests

To run E2E tests in Chrome, execute:

```bash
npx wdio run wdio.conf.js --browser=chrome
```

or

```bash
npm run test_e2e
```

To run E2E tests in Firefox, execute:

```bash
npx wdio run wdio.conf.js --browser=firefox
```

### Running E2E tests in headless mode

If you want to run tests in headless mode, just add '--headless' at the end of command lines from above:

```bash
npx wdio run wdio.conf.js --browser=chrome --headless
```

```bash
npx wdio run wdio.conf.js --browser=firefox --headless
```