$nodeVersionRequired = "20.18.3"

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
    Write-Host "Node.js version $nodeVersionRequired is not installed. Installing via FNM..."

    # Set execution policy for the current user
    Set-ExecutionPolicy -Scope CurrentUser RemoteSigned -Force

    # Install FNM using winget if not installed
    if (-not (Get-Command fnm -ErrorAction SilentlyContinue)) {
        Write-Host "Installing FNM (Fast Node Manager)..."
        winget install Schniz.fnm --silent
        $env:Path += ";$($HOME)\.fnm"
    }

    # Install Node.js version 20.18.3 using FNM
    Write-Host "Installing Node.js $nodeVersionRequired using FNM..."
    fnm install $nodeVersionRequired
    fnm use $nodeVersionRequired

    # Ensure FNM is configured in the PowerShell profile
    if (Test-Path $PROFILE) {
        Write-Host "PowerShell profile found. Adding FNM environment setup..."
    } else {
        Write-Host "PowerShell profile not found. Creating a new one..."
        New-Item -Type File -Path $PROFILE -Force
    }

    # Add FNM environment setup to profile (if not already present)
    $fnmCommand = "fnm env --use-on-cd --shell powershell | Out-String | Invoke-Expression"
    if (-not (Select-String -Path $PROFILE -Pattern $fnmCommand -Quiet)) {
        Add-Content -Path $PROFILE -Value "`n$fnmCommand"
    }

    # Reload profile
    . $PROFILE

    # Verify installation
    $newVersion = Get-NodeVersion
    if ($newVersion -eq $nodeVersionRequired) {
        Write-Host "Node.js version $nodeVersionRequired installed successfully via FNM."
    } else {
        Write-Host "Installation failed or version mismatch."
    }
}

Write-Host "Please restart PowerShell and run 'node -v' to verify the installation."
