"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.evento = void 0;
const sequelize_1 = require("sequelize");
class evento extends sequelize_1.Model {
    static initModel(sequelize) {
        return evento.init({
            id: {
                autoIncrement: true,
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            fecha: {
                type: sequelize_1.DataTypes.DATEONLY,
                allowNull: false
            },
            hora: {
                type: sequelize_1.DataTypes.TIME,
                allowNull: false
            },
            nombre_lugar: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: false
            },
            nombre_evento: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: false
            },
            direccion: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: true
            },
            ubicacion_lat: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: true
            },
            ubicacion_lon: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: true
            },
            principal: {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: 0
            },
            id_boda: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'boda',
                    key: 'id'
                }
            }
        }, {
            sequelize,
            tableName: 'evento',
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
                    name: "fk_evento_boda",
                    using: "BTREE",
                    fields: [
                        { name: "id_boda" },
                    ]
                },
            ]
        });
    }
}
exports.evento = evento;
