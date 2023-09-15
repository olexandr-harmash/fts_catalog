import {
    DataTypes,
    Model,
    Optional,
    Sequelize,
} from "sequelize";

import { ProposAttributes } from "../../../interfaces";

// Интерфейс для входных данных Журнала
interface ProposInput extends Optional<ProposAttributes, 'propos_id'> { }

// Интерфейс для выходных данных Журнала
interface ProposOutput extends Required<ProposAttributes> {
}

// Модель Журнала
export class Propos extends Model<ProposOutput, ProposInput> implements ProposAttributes {
    declare propos_id: string;
    declare propos_name: string;

    static Init(sequelize: Sequelize) {
        // Определение модели Журнала
        Propos.init(
            {
                propos_id: {
                    type: DataTypes.UUID,
                    defaultValue: DataTypes.UUIDV4,
                    allowNull: false,
                    primaryKey: true
                },
                propos_name: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
            },
            {
                sequelize: sequelize,
                modelName: 'Propos',
                paranoid: true,
            }
        );
    }
}