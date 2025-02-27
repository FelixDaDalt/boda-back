"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.novia = void 0;
const sequelize_1 = require("sequelize");
class novia extends sequelize_1.Model {
    static initModel(sequelize) {
        return novia.init({
            id: {
                autoIncrement: true,
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            nombre: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: false
            },
            apellido: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: false
            },
            fecha_nacimiento: {
                type: sequelize_1.DataTypes.DATEONLY,
                allowNull: false
            },
            descripcion: {
                type: sequelize_1.DataTypes.STRING(1024),
                allowNull: true
            },
            foto: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: true
            }
        }, {
            sequelize,
            tableName: 'novia',
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
            ]
        });
    }
}
exports.novia = novia;
