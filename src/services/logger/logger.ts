
import path from "path";
import fs from "fs";
import * as winston from 'winston';
import { format } from 'util';
import moment from 'moment';
import ILogger from "../../interfaces/logger";
import { LoggerConfig as TLoggerConfig } from "../../types/logger";

export class CustomLogger {
    protected _logger: ILogger;
    protected _dateFormat: string;

    constructor(config: TLoggerConfig) {
        this._dateFormat = config.dateFormat;

        config.logs.filename = path.join(config.logs.directory, config.logs.filename);
        if (!fs.existsSync(config.logs.directory)) {
            fs.mkdirSync(config.logs.directory);
        };

        const logger: winston.Logger = winston.createLogger({
            format: winston.format.combine(winston.format.splat(), this.LogFormat()),
            transports: [
                new winston.transports.Console({
                    format: winston.format.combine(winston.format.colorize(), winston.format.simple())
                }),
                new winston.transports.File(config.logs)
            ]
        });

        this._logger = {
            error: this.Wrapper(logger.error),
            warn: this.Wrapper(logger.warn),
            info: this.Wrapper(logger.info),
            verbose: this.Wrapper(logger.verbose),
            debug: this.Wrapper(logger.debug),
            silly: this.Wrapper(logger.silly)
        };

        process.on('unhandledRejection', (err: Error): void => {
            this._logger.error('Unhandled error', err);
        });
    }

    public getLogger() {
        return this._logger;
    };

    private LogFormat(): any {
        return winston.format.printf((info): string => {
            const levelUppercase: string = (info.level.toUpperCase() + ' '.repeat(7)).slice(0, 7);
            let msg: any = info.message;
            if (Array.isArray(msg)) {
                msg = msg.map((arg: any): string => format(arg)).join(' # ');
            } else {
                msg = format(msg);
            }
            // return `${levelUppercase} ${this.getCurrentDate()}: ${msg}`
            const now: string = moment(new Date()).format(this._dateFormat);
            return `${levelUppercase} ${now}: ${msg}`;
        });
    };

    protected Wrapper(original: (args: any[]) => void): (...args: any) => any {
        return (...args: any): void => {
            original(args);
        };
    };
};