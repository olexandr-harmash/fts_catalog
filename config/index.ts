import { resolve } from "path";

export const NODE_ENV = process.env.NODE_ENV || 'development';
export const TMP = process.env.tmp || '/tmp';

export default {
    protocol: process.env.NODE_ENV === 'production' ? 'https' : 'http',
    port: 3000,
    bodyParser: {
        limit: '50mb',
        extended: true
    },

    logs: {
        directory: resolve(__dirname, '..', 'logs'),
        filename: 'logfile.log',
        handleExceptions: true,
        json: false,
        maxsize: 5242880, // 5MB
        maxFiles: 25,
        colorize: false
    },

    dateFormat: 'DD MMM YY, H:mm:ss',

    authentication: {
        userPasswordSalt: 8,
        expiresIn: 60 * 60 * 24,
        jwtSecret: "super-secret",
    },
    // Database
    storageLimits: {
        userLoginHistory: 12
    },
    development: {
        database: "fts",
        username: "postgres",
        password: "postgres",
        host: "sequelize",
        dialect: "postgres",
        logging: true
    },
    test: {
        database: "fts",
        username: "postgres",
        password: "postgres",
        host: "sequelize",
        dialect: "postgres",
        logging: true
    },
    production: {
        database: "fts",
        username: "postgres",
        password: "postgres",
        host: "sequelize",
        dialect: "postgres",
        logging: true
    }
};