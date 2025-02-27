"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.historia = void 0;
const sequelize_1 = require("sequelize");
class historia extends sequelize_1.Model {
    static initModel(sequelize) {
        return historia.init({
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
            titulo: {
                type: sequelize_1.DataTypes.STRING(15),
                allowNull: false
            },
            descripcion: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: false
            },
            borrado: {
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
            },
            imagen: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: true
            }
        }, {
            sequelize,
            tableName: 'historia',
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
                    name: "historia_a_boda",
                    using: "BTREE",
                    fields: [
                        { name: "id_boda" },
                    ]
                },
            ]
        });
    }
}
exports.historia = historia;
