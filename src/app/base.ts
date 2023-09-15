import { Logger } from "../interfaces/logger";
import { CustomLogger } from "../services/logger/logger";
import path from "path";
import Database from "../infra/db";
import { NODE_ENV } from "../../config";
import { AppConfig as IAppConfig } from "../types/app";

export class Base {
    protected _config: any;
    protected _logger: Logger;
    protected _rootDir: string;

    constructor(config: any) {
        this._config = config;

        this._rootDir = path.resolve(__dirname, '..', '..');
    }
}

export class BaseApp extends Base {
    /**
     * Для простоты используэтся непосредственно.
     */
    protected _database: Database;

    constructor(config: IAppConfig) {
        super(config);

        // Init logger
        this._logger = new CustomLogger(config).getLogger();

        // Init model
        // Add logger to sequelize
        this._config.development.logging = this._logger.info;
        this._config.test.logging = this._logger.info;

        this._database = new Database(this._config[NODE_ENV]);
    }
};