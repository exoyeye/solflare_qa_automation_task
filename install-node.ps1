# PowerShell script to download and install Node.js
$nodeVersion = "20.18.3"
$nodeUrl = "https://nodejs.org/dist/v$nodeVersion/node-v$nodeVersion-x64.msi"
$nodeInstallerPath = "$env:TEMP\node-installer.msi"

Write-Host "Downloading Node.js v$nodeVersion..."
Invoke-WebRequest -Uri $nodeUrl -OutFile $nodeInstallerPath

Write-Host "Installing Node.js..."
Start-Process -FilePath "msiexec.exe" -ArgumentList "/i", $nodeInstallerPath, "/quiet", "/norestart" -Wait

# Refresh environment variables
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")

Write-Host "Node.js installation completed. Verifying..."
try {
    $nodeVersionInstalled = & node -v
    Write-Host "Node.js $nodeVersionInstalled installed successfully!"
    
    $npmVersionInstalled = & npm -v
    Write-Host "npm $npmVersionInstalled installed successfully!"
    
    Write-Host "Installing project dependencies..."
    & npm install
    
    Write-Host "Configuring WebdriverIO..."
    & npx wdio config
} catch {
    Write-Host "Node.js installation verification failed. You may need to restart your computer."
    Write-Host "After restarting, run 'npm install' to install dependencies."
}

# Clean up
Remove-Item $nodeInstallerPath -Force 