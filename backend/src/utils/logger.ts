import fs from 'fs';
import path from 'path';

export default function logger(message: string, level: 'info' | 'warn' | 'error' = 'info'): void {
    const timestamp = new Date().toISOString();

    // Tạo folder logs nếu chưa có
    const logDir = path.join(process.cwd(), 'logs');

    if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir, { recursive: true });
    }

    // Tên file theo ngày
    const date = new Date().toISOString().split('T')[0];
    const logFile = path.join(logDir, `${date}.log`);

    const logMessage = `[${timestamp}] [${level.toUpperCase()}] ${message}\n`;

    // Console
    switch (level) {
        case 'info':
            console.log(logMessage);
            break;

        case 'warn':
            console.warn(logMessage);
            break;

        case 'error':
            console.error(logMessage);
            break;
    }

    // Ghi file
    fs.appendFileSync(logFile, logMessage, 'utf8');
}