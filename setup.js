const { execSync } = require('child_process');
const os = require('os');
const fs = require('fs');
const path = require('path');

// Check if Node.js is already running this script
console.log('Detecting operating system...');
const platform = os.platform();

// Create platform-specific setup scripts
const windowsSetupScript = `
@echo off
echo Installing Node.js and dependencies for Windows...
powershell -ExecutionPolicy Bypass -Command "iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))"
powershell -Command "refreshenv"
powershell -Command "choco install nodejs-lts -y"
powershell -Command "refreshenv"
call npm install
call npx wdio config
echo Setup completed successfully!
`;

const unixSetupScript = `
#!/bin/bash
echo "Installing Node.js and dependencies for Unix-based system..."
curl -fsSL https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.4/install.sh | bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
nvm install 20.18.3
nvm use 20.18.3
npm install
npx wdio config
echo "Setup completed successfully!"
`;

try {
  if (platform === 'win32') {
    console.log('Windows detected. Creating setup script...');
    fs.writeFileSync('setup.bat', windowsSetupScript);
    console.log('Run setup.bat to install Node.js and dependencies.');
  } else if (platform === 'darwin' || platform === 'linux') {
    console.log('Unix-based system detected (macOS or Linux). Creating setup script...');
    fs.writeFileSync('setup.sh', unixSetupScript);
    execSync('chmod +x setup.sh', { stdio: 'inherit' });
    console.log('Run ./setup.sh to install Node.js and dependencies.');
  } else {
    console.error(`Unsupported platform: ${platform}`);
    process.exit(1);
  }
} catch (error) {
  console.error('Setup preparation failed with error:', error.message);
  process.exit(1);
} 