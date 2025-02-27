# Solflare QA Automation Task

## INSTALLATION

To install Node.js and project dependencies, run:

```bash
npm install
```

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