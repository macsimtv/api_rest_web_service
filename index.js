const express = require("express");
const cors = require('cors');
const fs = require('fs');
const winston = require('winston');
const {error} = require("winston");

const PORT = process.env.PORT || 3009;

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


app.use(cors({origin: 'http://localhost:3000'}));


app.get("/api", (req, res) => {
    logger.log({
        level: 'info',
        message: 'aller hop c est fini !'
    });

    logger.info('Hello again distributed logs');
    res.json({ message: "Cadeau de Florian !" });
});


app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});