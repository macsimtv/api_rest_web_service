const express = require("express");
const cors = require('cors');
const fs = require('fs');
const winston = require('winston');
const {error} = require("winston");

const PORT = process.env.PORT || 5000;

const app = express();

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' }),
    ],
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple(),
    }));
}

app.use(cors('*'));

app.get("/api", (req, res) => {
    logger.log({
        level: 'info',
        message: 'Hello distributed log files!'
    });

    logger.info('Hello again distributed logs');
    res.json({ message: "Hello from server!" });
});


app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});