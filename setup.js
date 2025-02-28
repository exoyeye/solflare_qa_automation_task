const { execSync } = require('child_process');
const os = require('os');

console.log('Detecting operating system...');
const platform = os.platform();

try {
  if (platform === 'win32') {
    console.log('Windows detected. Running Windows setup...');
    execSync('npm run setup:windows', { stdio: 'inherit' });
  } else if (platform === 'darwin' || platform === 'linux') {
    console.log('Unix-based system detected (macOS or Linux). Running Unix setup...');
    execSync('npm run setup:unix', { stdio: 'inherit' });
  } else {
    console.error(`Unsupported platform: ${platform}`);
    process.exit(1);
  }
  console.log('Setup completed successfully!');
} catch (error) {
  console.error('Setup failed with error:', error.message);
  process.exit(1);
} 