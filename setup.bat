@echo off
echo Installing Node.js and dependencies for Windows...

REM Check if Chocolatey is installed
where choco >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Installing Chocolatey...
    powershell -ExecutionPolicy Bypass -Command "iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))"
    echo Chocolatey installed successfully.
) else (
    echo Chocolatey is already installed.
)

REM Refresh environment variables
call refreshenv || echo Unable to refresh environment, continuing anyway...

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Installing Node.js...
    choco install nodejs-lts -y
    echo Node.js installed successfully.
) else (
    echo Node.js is already installed.
)

REM Refresh environment variables again
call refreshenv || echo Unable to refresh environment, continuing anyway...

REM Install project dependencies
echo Installing project dependencies...
call npm install

REM Configure WebdriverIO
echo Configuring WebdriverIO...
call npx wdio config

echo Setup completed successfully!
pause 