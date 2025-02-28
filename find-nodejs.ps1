# Script to find Node.js installation and create a project setup batch file
Write-Host "Searching for Node.js installation..."

# Possible locations for node.exe
$possibleLocations = @(
    "C:\Program Files\nodejs\node.exe",
    "C:\Program Files (x86)\nodejs\node.exe",
    "$env:APPDATA\npm\node.exe",
    "$env:LOCALAPPDATA\Programs\nodejs\node.exe"
)

# Search for node.exe in the system PATH
$nodePath = $null
$nodeDir = $null

# First check the possible fixed locations
foreach ($location in $possibleLocations) {
    if (Test-Path $location) {
        $nodePath = $location
        $nodeDir = Split-Path -Parent $location
        Write-Host "Found Node.js at: $nodePath"
        break
    }
}

# If not found in fixed locations, search in PATH
if ($null -eq $nodePath) {
    Write-Host "Searching for Node.js in PATH..."
    $pathDirs = $env:Path -split ';'
    foreach ($dir in $pathDirs) {
        $testPath = Join-Path $dir "node.exe"
        if (Test-Path $testPath) {
            $nodePath = $testPath
            $nodeDir = $dir
            Write-Host "Found Node.js in PATH at: $nodePath"
            break
        }
    }
}

# If still not found, search the entire system (this could take a while)
if ($null -eq $nodePath) {
    Write-Host "Searching entire system for node.exe (this may take a while)..."
    $drives = Get-PSDrive -PSProvider FileSystem
    foreach ($drive in $drives) {
        try {
            $searchResult = Get-ChildItem -Path "$($drive.Root)" -Filter "node.exe" -Recurse -ErrorAction SilentlyContinue -Force | Select-Object -First 1
            if ($null -ne $searchResult) {
                $nodePath = $searchResult.FullName
                $nodeDir = Split-Path -Parent $nodePath
                Write-Host "Found Node.js at: $nodePath"
                break
            }
        } catch {
            # Ignore errors during search
        }
    }
}

# If Node.js is found, create a batch file to set up the project
if ($null -ne $nodePath) {
    # Get Node.js version
    try {
        $nodeVersion = & "$nodePath" -v
        Write-Host "Node.js $nodeVersion found."
        
        # Create a batch file to run npm install and setup the project
        $npmPath = Join-Path $nodeDir "npm.cmd"
        $npxPath = Join-Path $nodeDir "npx.cmd"
        
        $batchContent = @"
@echo off
echo Setting up project...
set NODE_PATH=$nodeDir
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
    } catch {
        Write-Host "Error running Node.js: $_"
    }
} else {
    Write-Host "Node.js not found on this system."
    Write-Host "Please install Node.js manually from https://nodejs.org/"
    
    # Create a batch file that will download and install Node.js
    $installBatchContent = @"
@echo off
echo This script will download and install Node.js
echo.
echo Downloading Node.js installer...
powershell -Command "& {Invoke-WebRequest -Uri 'https://nodejs.org/dist/v20.18.3/node-v20.18.3-x64.msi' -OutFile 'node-installer.msi'}"
echo.
echo Installing Node.js...
start /wait msiexec /i node-installer.msi /quiet
echo.
echo Node.js installation completed.
echo Please restart your computer and then run setup-project.bat
echo.
pause
"@

    # Write the installation batch file
    $installBatchPath = "install-nodejs.bat"
    $installBatchContent | Out-File -FilePath $installBatchPath -Encoding ASCII
    
    Write-Host "Created install-nodejs.bat file."
    Write-Host "Run install-nodejs.bat to download and install Node.js."
} 