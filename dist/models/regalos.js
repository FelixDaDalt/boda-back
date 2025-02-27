"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.regalos = void 0;
const sequelize_1 = require("sequelize");
class regalos extends sequelize_1.Model {
    static initModel(sequelize) {
        return regalos.init({
            id: {
                autoIncrement: true,
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            id_boda: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'boda',
                    key: 'id'
                }
            },
            cbu: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true
            },
            alias: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: true
            }
        }, {
            sequelize,
            tableName: 'regalos',
            timestamps: false,
            indexes: [
                {
                    name: "PRIMARY",
                    unique: true,
                    using: "BTREE",
                    fields: [
                        { name: "id" },
                    ]
                },
                {
                    name: "fk_regalos_boda",
                    using: "BTREE",
                    fields: [
                        { name: "id_boda" },
                    ]
                },
            ]
        });
    }
}
exports.regalos = regalos;
