$nodeVersionRequired = "20.18.3"
$nodeInstallerUrl = "https://nodejs.org/dist/v$nodeVersionRequired/node-v$nodeVersionRequired-x64.msi"
$installerPath = "$env:TEMP\node-v$nodeVersionRequired-x64.msi"

# Function to get installed Node.js version
function Get-NodeVersion {
    try {
        $nodeVersion = node -v 2>$null
        if ($nodeVersion) {
            return $nodeVersion.TrimStart("v")
        } else {
            return $null
        }
    } catch {
        return $null
    }
}

# Check if Node.js is installed
$installedVersion = Get-NodeVersion

if ($installedVersion -eq $nodeVersionRequired) {
    Write-Host "Node.js version $installedVersion is already installed."
} else {
    Write-Host "Node.js version $nodeVersionRequired is not installed. Downloading..."

    # Download Node.js installer
    Invoke-WebRequest -Uri $nodeInstallerUrl -OutFile $installerPath

    if (Test-Path $installerPath) {
        Write-Host "Download complete. Installing Node.js..."
        
        # Install Node.js silently
        Start-Process -FilePath "msiexec.exe" -ArgumentList "/i `"$installerPath`" /quiet /norestart" -Wait -NoNewWindow

        # Verify installation
        $newVersion = Get-NodeVersion
        if ($newVersion -eq $nodeVersionRequired) {
            Write-Host "Node.js version $nodeVersionRequired installed successfully."
        } else {
            Write-Host "Installation failed or version mismatch."
        }

        # Cleanup installer
        Remove-Item -Path $installerPath -Force
    } else {
        Write-Host "Failed to download Node.js installer."
    }
}