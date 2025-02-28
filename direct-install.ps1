# Direct Node.js installation and project setup script
# This script downloads Node.js, installs it, and sets up your project
# without relying on PATH environment variables

# Set Node.js version and download URL
$nodeVersion = "20.18.3"
$nodeUrl = "https://nodejs.org/dist/v$nodeVersion/node-v$nodeVersion-x64.msi"
$installerPath = "$env:TEMP\node-installer.msi"

# Download Node.js installer
Write-Host "Downloading Node.js v$nodeVersion..."
Invoke-WebRequest -Uri $nodeUrl -OutFile $installerPath

# Install Node.js silently
Write-Host "Installing Node.js..."
Start-Process -FilePath "msiexec.exe" -ArgumentList "/i", $installerPath, "/quiet", "/norestart", "ADDLOCAL=ALL" -Wait

# Define paths to Node.js executables (default installation paths)
$nodePath = "C:\Program Files\nodejs\node.exe"
$npmPath = "C:\Program Files\nodejs\npm.cmd"

# Check if Node.js was installed to the expected location
if (Test-Path $nodePath) {
    Write-Host "Node.js installed successfully at: $nodePath"
    
    # Get Node.js version
    $nodeVersionInstalled = & "$nodePath" -v
    Write-Host "Node.js $nodeVersionInstalled installed."
    
    # Create a batch file to run npm install and setup the project
    $batchContent = @"
@echo off
echo Setting up project...
set NODE_PATH=C:\Program Files\nodejs
set PATH=%NODE_PATH%;%PATH%
cd /d "%~dp0"
echo Installing dependencies...
"%NODE_PATH%\npm.cmd" install
echo Configuring WebdriverIO...
"%NODE_PATH%\npx.cmd" wdio config
echo.
echo Setup completed!
echo.
echo To run API tests:
echo "%NODE_PATH%\npm.cmd" run test_api
echo.
echo To run E2E tests:
echo "%NODE_PATH%\npm.cmd" run test_e2e
echo.
pause
"@

    # Write the batch file
    $batchPath = "setup-project.bat"
    $batchContent | Out-File -FilePath $batchPath -Encoding ASCII
    
    Write-Host "Created setup-project.bat file."
    Write-Host "Run setup-project.bat to install dependencies and configure the project."
    
    # Clean up
    Remove-Item $installerPath -Force
} else {
    Write-Host "Node.js installation failed or was installed to a different location."
    Write-Host "Please install Node.js manually from https://nodejs.org/"
} 