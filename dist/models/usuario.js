"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usuario = void 0;
const sequelize_1 = require("sequelize");
class usuario extends sequelize_1.Model {
    static initModel(sequelize) {
        return usuario.init({
            id: {
                autoIncrement: true,
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            email: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: false
            },
            password: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: false
            }
        }, {
            sequelize,
            tableName: 'usuario',
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
exports.usuario = usuario;
