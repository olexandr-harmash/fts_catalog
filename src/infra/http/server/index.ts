import { App as IApp } from "../../../interfaces/app";
import Express from 'express';
import Cors from 'cors';
import * as BodyParser from 'body-parser';
import Morgan from 'morgan';
import * as Http from 'http';
import * as Https from 'https';
import { ServerConfig as TServerConfig } from "../../../types/server";
import { ServerInitializer } from "../../../infra/http/server/initialize";
import { ServerListener } from "./listen";
import { Base } from "../../../app/base";
import ILogger from "../../../interfaces/logger";

export class Server extends Base implements IApp {
    public readonly express: Express.Application;

    protected _server: Http.Server | Https.Server;

    constructor(config: TServerConfig, logger: ILogger) {
        super(config);

        this._logger = logger;

        // Init express
        this.express = Express();
        this.express.use(BodyParser.json(config.bodyParser));
        this.express.use(BodyParser.urlencoded(config.bodyParser));
        this.express.use(Cors());

        // Add morgan middleware to express
        this.express.use(
            Morgan(':remote-addr :method :url :status :user-agent', {
                stream: {
                    write: (msg: string): void => {
                        logger.info(msg.slice(0, -1));
                    }
                }
            })
        );
    };

    public async Init() {
        this._server = await this.ServerInitializer();

        await this.ServerListener();
    }

    public ServerInitializer = ServerInitializer
    public ServerListener = ServerListener
}