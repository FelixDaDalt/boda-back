"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.galeria = void 0;
const sequelize_1 = require("sequelize");
class galeria extends sequelize_1.Model {
    static initModel(sequelize) {
        return galeria.init({
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
            url: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: true
            }
        }, {
            sequelize,
            tableName: 'galeria',
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
                    name: "fk_galeria_boda",
                    using: "BTREE",
                    fields: [
                        { name: "id_boda" },
                    ]
                },
            ]
        });
    }
}
exports.galeria = galeria;
