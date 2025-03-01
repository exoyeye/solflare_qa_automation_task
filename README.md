# Solflare QA Automation Task

## INSTALLATION

### PREREQUISITS
Node.js version 20.18.3 - if it's not installed, it will be installed via setup script

### Setup (with or without Node.js):
Here are the setup instructions for WIndows, macOS and Linux:

To install NodeJS version 20.18.3 on Windows, run following command:
```bash
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
.\install-node.ps1
```
If you receive some error like "fnm" command is not recognized, just restart your terminal!

After node version is successfully installed, run following command to install packages:
```
npm install
```

That's it, you are ready to run tests!



To install NodeJS version 20.18.3 on macOS/Linux, run following command
```bash
chmod +x install-node.sh
./install-node.sh
```

Please make sure version 20.18.3 is used with the command:
```
node -v
```

If, for some reason, version is not automatically set to 20.18.3, use the following command to change node version:
```
nvm use 20.18.3
```

After node version is successfully installed, run following command to install packages:
```
npm install
```

That's it, you are ready to run tests!

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