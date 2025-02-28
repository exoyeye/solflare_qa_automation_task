#!/bin/bash

NODE_VERSION_REQUIRED="20.18.3"

# Check if Node.js is already installed
if command -v node &> /dev/null; then
    INSTALLED_VERSION=$(node -v | sed 's/v//')
else
    INSTALLED_VERSION=""
fi

if [ "$INSTALLED_VERSION" == "$NODE_VERSION_REQUIRED" ]; then
    echo "Node.js version $INSTALLED_VERSION is already installed."
else
    echo "Node.js version $NODE_VERSION_REQUIRED is not installed. Installing..."

    # Check if nvm is installed
    if ! command -v nvm &> /dev/null; then
        echo "nvm is not installed. Installing nvm..."
        curl -fsSL https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.4/install.sh | bash
        export NVM_DIR="$HOME/.nvm"
        [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
    fi

    # Install Node.js version 20.18.3
    nvm install $NODE_VERSION_REQUIRED

    # Use Node.js version 20.18.3
    nvm use $NODE_VERSION_REQUIRED

    # Verify installed version
    INSTALLED_VERSION=$(node -v | sed 's/v//')
    if [ "$INSTALLED_VERSION" == "$NODE_VERSION_REQUIRED" ]; then
        echo "Node.js version $NODE_VERSION_REQUIRED successfully installed."
    else
        echo "Failed to install Node.js version $NODE_VERSION_REQUIRED."
    fi
fi
