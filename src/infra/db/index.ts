import { join } from 'path';
import * as models from './models';
import { DBConfig } from '../../types/db';
import { Sequelize, Op } from 'sequelize';
import { App } from '../../interfaces';

export default class Database {
    public readonly models: any;
    public readonly sequelize: Sequelize;

    /**
     * TODO: check sequilize sync methods and implement the best pattern
     */
    public constructor(config: DBConfig) {
        config.operatorsAliases = Op;
        config.models = [join(__dirname, 'models')];

        this.sequelize = new Sequelize(config);

        const obj: { [key: string]: any } = models;

        for (const key of Object.keys(obj)) {
            obj[key].Init(this.sequelize);
        }
    };
};