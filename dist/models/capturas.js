"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.capturas = void 0;
const sequelize_1 = require("sequelize");
class capturas extends sequelize_1.Model {
    static initModel(sequelize) {
        return capturas.init({
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
            boda_url: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: false
            },
            url: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: false
            },
            hora: {
                type: sequelize_1.DataTypes.STRING(50),
                allowNull: false
            },
            fecha: {
                type: sequelize_1.DataTypes.STRING(50),
                allowNull: true
            }
        }, {
            sequelize,
            tableName: 'capturas',
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
                    name: "fk_capturas_boda",
                    using: "BTREE",
                    fields: [
                        { name: "id_boda" },
                    ]
                },
            ]
        });
    }
}
exports.capturas = capturas;
