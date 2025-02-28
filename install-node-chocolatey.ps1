# PowerShell script to install Node.js using Chocolatey
# This script must be run with administrator privileges

# Step 1: Install Chocolatey if not already installed
Write-Host "Checking for Chocolatey installation..."
if (!(Get-Command choco -ErrorAction SilentlyContinue)) {
    Write-Host "Installing Chocolatey..."
    Set-ExecutionPolicy Bypass -Scope Process -Force
    [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072
    Invoke-Expression ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))
    
    # Add Chocolatey to the current session's PATH
    $env:Path = "$env:Path;$env:ALLUSERSPROFILE\chocolatey\bin"
    Write-Host "Chocolatey installed successfully."
} else {
    Write-Host "Chocolatey is already installed."
}

# Step 2: Install Node.js using Chocolatey
Write-Host "Installing Node.js using Chocolatey..."
& choco install nodejs-lts -y --force

# Step 3: Refresh environment variables for this session
Write-Host "Refreshing environment variables..."
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")

# Step 4: Verify installation
Write-Host "Verifying Node.js installation..."
try {
    # Try to get Node.js version using the full path
    $nodePath = "$env:ProgramFiles\nodejs\node.exe"
    if (Test-Path $nodePath) {
        $nodeVersion = & "$nodePath" -v
        Write-Host "Node.js $nodeVersion installed at: $nodePath"
        
        # Install project dependencies
        Write-Host "Installing project dependencies..."
        & "$env:ProgramFiles\nodejs\npm.cmd" install
        
        Write-Host "Setup completed successfully!"
        Write-Host "IMPORTANT: You may need to restart your computer or terminal for the PATH changes to take effect."
        Write-Host "After restarting, you should be able to use 'node' and 'npm' commands directly."
    } else {
        Write-Host "Node.js executable not found at expected location: $nodePath"
        Write-Host "Installation may have failed or used a different location."
    }
} catch {
    Write-Host "Error verifying Node.js installation: $_"
    Write-Host "Please restart your computer and try running 'node -v' again."
} 