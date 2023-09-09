import { BaseApp } from "../base";
import { App as IApp } from "../../interfaces/app";
import Express from 'express';
import { ServerInitializer } from "../../infra/http/server/initialize";
import { ServerListener } from "../../infra/http/server/listen";
import { Server } from "../../infra/http/server";
import { AppConfig as TAppConfig } from "../../types/app";

export default class App extends BaseApp implements IApp {
    public readonly express: Express.Application;

    protected _server: Server;

    constructor(config: TAppConfig) {
        super(config);

        this._server = new Server(config, this._logger);
    }

    public async Init(): Promise<void> {
        try {
            await this._database.authenticate();

            await this._server.Init();
            
            this._logger.info('App was initialized completely.');
        } catch (error) {
            this._logger.error('App returned during initialize.', error);
        }
    }

    public ServerInitializer = ServerInitializer
    public ServerListener = ServerListener
}