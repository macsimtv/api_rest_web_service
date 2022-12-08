const express = require("express");
const cors = require('cors');
const fs = require('fs');
const winston = require('winston');
const {error} = require("winston");

const PORT = process.env.PORT || 5000;

const app = express();

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        winston.format.json()
    ),
    defaultMeta: { service: 'user-service' },
    transports: [
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
        new winston.transports.File({ filename: 'logs/combined.log' }),
    ],
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple(),
    }));
}

app.use(cors('*'));

app.get("/api", (req, res) => {
    logger.info('Hello again distributed logs');
    res.json({ message: "Hello from server!" });
});

app.get('*', (req, res) => {
    logger.error('Not found');
    res.status(404).json({ message: 'Not found...' });
});

app.listen(PORT, () => {
    console.log(`✅ http://localhost:${PORT}`);
});