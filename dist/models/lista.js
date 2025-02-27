"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lista = void 0;
const sequelize_1 = require("sequelize");
class lista extends sequelize_1.Model {
    static initModel(sequelize) {
        return lista.init({
            id_boda: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'boda',
                    key: 'id'
                }
            },
            artista: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: true,
                defaultValue: "sin artista"
            },
            nombre: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: false
            },
            randomkey: {
                type: sequelize_1.DataTypes.STRING(5),
                allowNull: false
            },
            id: {
                autoIncrement: true,
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            }
        }, {
            sequelize,
            tableName: 'lista',
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
                    name: "fk_canciones_boda",
                    using: "BTREE",
                    fields: [
                        { name: "id_boda" },
                    ]
                },
            ]
        });
    }
}
exports.lista = lista;
