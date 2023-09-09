import { join } from 'path';
import { Op } from 'sequelize';
import { Sequelize } from 'sequelize';
import { DBConfig as TDBConfig } from '../../types/db';

export default class Database {
    public readonly sequelize: Sequelize;

    public constructor(config: TDBConfig) {
        config.operatorsAliases = Op;
        config.models = [join(__dirname, 'models')];

        this.sequelize = new Sequelize(config);
    }
}