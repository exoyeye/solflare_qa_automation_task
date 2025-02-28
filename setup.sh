#!/bin/bash
echo "Installing Node.js and dependencies for Unix-based system..."

# Check if nvm is installed
if [ ! -d "$HOME/.nvm" ]; then
    echo "Installing nvm..."
    curl -fsSL https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.4/install.sh | bash
    echo "nvm installed successfully."
else
    echo "nvm is already installed."
fi

# Load nvm
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"

# Check if nvm command is available
if ! command -v nvm &> /dev/null; then
    echo "Error: nvm command not found. Please restart your terminal and run this script again."
    exit 1
fi

# Install Node.js
echo "Installing Node.js 20.18.3..."
nvm install 20.18.3
nvm use 20.18.3

# Check if Node.js is installed correctly
if ! command -v node &> /dev/null; then
    echo "Error: Node.js installation failed."
    exit 1
else
    echo "Node.js $(node -v) installed successfully."
fi

# Install project dependencies
echo "Installing project dependencies..."
npm install

# Configure WebdriverIO
echo "Configuring WebdriverIO..."
npx wdio config

echo "Setup completed successfully!" 