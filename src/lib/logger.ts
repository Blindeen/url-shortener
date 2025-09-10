import path from 'path';

import { createLogger, format, transports } from 'winston';

const infoFilter = format((info) => (info.level === 'info' ? info : false));

export const logger = createLogger({
    level: 'info',
    format: format.combine(format.timestamp(), format.json()),
    transports: [
        new transports.File({
            filename: path.join(process.cwd(), 'logs/info.log'),
            level: 'info',
            format: infoFilter(),
        }),
        new transports.File({
            filename: path.join(process.cwd(), 'logs/error.log'),
            level: 'error',
        }),
    ],
});
