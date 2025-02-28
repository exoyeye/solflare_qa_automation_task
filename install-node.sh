#!/bin/bash


# Function to get the installed Node.js version (if installed)
get_node_version() {
    if command -v node &> /dev/null; then
        node -v | sed 's/v//'
    else
        echo ""
    fi
}

# Check if Node.js version 20.18.3 is already installed
INSTALLED_VERSION=$(get_node_version)

if [ "$INSTALLED_VERSION" == "$NODE_VERSION_REQUIRED" ]; then
    echo "Node.js version $INSTALLED_VERSION is already installed."
else
    echo "Node.js version $NODE_VERSION_REQUIRED is not installed. Installing..."

    # Check if NVM (Node Version Manager) is installed
    if ! command -v nvm &> /dev/null; then
        echo "NVM not found. Installing NVM..."

        # Install NVM (Node Version Manager) via curl
        curl -fsSL https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.4/install.sh | bash

        # Load NVM into the shell environment
        export NVM_DIR="$HOME/.nvm"
        [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads NVM

        # Optionally add the NVM loading lines to the shell configuration file to persist across sessions
        if ! grep -q 'nvm.sh' "$HOME/.bashrc"; then
            echo 'export NVM_DIR="$HOME/.nvm"' >> "$HOME/.bashrc"
            echo '[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"' >> "$HOME/.bashrc"
            source "$HOME/.bashrc"  # Apply changes to current session
        fi
    else
        # Load NVM if it's already installed
        export NVM_DIR="$HOME/.nvm"
        [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads NVM
    fi

    # Install Node.js version 20.18.3 using NVM
    echo "Installing Node.js version $NODE_VERSION_REQUIRED using NVM..."
    nvm install $NODE_VERSION_REQUIRED
    nvm use $NODE_VERSION_REQUIRED

    # Verify installation
    NEW_VERSION=$(get_node_version)
    if [ "$NEW_VERSION" == "$NODE_VERSION_REQUIRED" ]; then
        echo "Node.js version $NODE_VERSION_REQUIRED installed successfully via NVM."
    else
        echo "Installation failed or version mismatch."
    fi
fi

echo "Please restart your terminal and run 'node -v' to verify the installation."
