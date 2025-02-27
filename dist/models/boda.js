"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.boda = void 0;
const sequelize_1 = require("sequelize");
class boda extends sequelize_1.Model {
    static initModel(sequelize) {
        return boda.init({
            id: {
                autoIncrement: true,
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            id_novio: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'novio',
                    key: 'id'
                }
            },
            id_novia: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'novia',
                    key: 'id'
                }
            },
            id_usuario: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'usuario',
                    key: 'id'
                }
            },
            url: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: false
            },
            nombre: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: false
            },
            activo: {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: 1
            }
        }, {
            sequelize,
            tableName: 'boda',
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
                    name: "boda_novia",
                    using: "BTREE",
                    fields: [
                        { name: "id_novia" },
                    ]
                },
                {
                    name: "boda_novio",
                    using: "BTREE",
                    fields: [
                        { name: "id_novio" },
                    ]
                },
                {
                    name: "boda_usuario",
                    using: "BTREE",
                    fields: [
                        { name: "id_usuario" },
                    ]
                },
            ]
        });
    }
}
exports.boda = boda;
