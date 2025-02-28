const fs = require('fs');
const path = require('path');

// Create logs directory if it doesn't exist
const logsDir = path.join(__dirname, '../../logs');
if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir, { recursive: true });
}

const logFilePath = path.join(logsDir, 'logs.log');

// Check if file exists and delete it and if file doesnt exist, create it
    if (fs.existsSync(logFilePath)) {
        fs.unlinkSync(logFilePath);
    }
    fs.writeFileSync(logFilePath, '');

class Logger {
    constructor() {}
    
    error(message) {
        // log errors to a file
        const timestamp = new Date().toISOString();
        const logEntry = `[${timestamp}] ERROR: ${message}\n`;
        
        fs.appendFileSync(logFilePath, logEntry);
    }

    info(message) {
        // log info to a file
        const timestamp = new Date().toISOString();
        const logEntry = `[${timestamp}] INFO: ${message}\n`;
        
        fs.appendFileSync(logFilePath, logEntry);
    }

    userAction(message) {
        // log user actions to a file        
        const timestamp = new Date().toISOString();
        const logEntry = `[${timestamp}] USER ACTION: ${message}\n`;
        
        fs.appendFileSync(logFilePath, logEntry);
    }
}

module.exports = new Logger();
