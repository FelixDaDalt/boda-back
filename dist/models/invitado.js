"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.invitado = void 0;
const sequelize_1 = require("sequelize");
class invitado extends sequelize_1.Model {
    static initModel(sequelize) {
        return invitado.init({
            id: {
                autoIncrement: true,
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            id_invitacion: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'invitacion',
                    key: 'id'
                }
            },
            nombre: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: false
            },
            apellido: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: false
            },
            email: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: true
            },
            whatsapp: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: true
            },
            confirmado: {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: 0
            },
            vegetariano: {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: 0
            },
            menor: {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: 0
            },
            celiaco: {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: 0
            }
        }, {
            sequelize,
            tableName: 'invitado',
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
                    name: "invitado_invitacion",
                    using: "BTREE",
                    fields: [
                        { name: "id_invitacion" },
                    ]
                },
            ]
        });
    }
}
exports.invitado = invitado;
