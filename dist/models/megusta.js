"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.megusta = void 0;
const sequelize_1 = require("sequelize");
class megusta extends sequelize_1.Model {
    static initModel(sequelize) {
        return megusta.init({
            idcaptura: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'capturas',
                    key: 'id'
                }
            },
            randomkey: {
                type: sequelize_1.DataTypes.STRING(5),
                allowNull: false
            },
            megusta: {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: 0
            },
            id: {
                autoIncrement: true,
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            }
        }, {
            sequelize,
            tableName: 'megusta',
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
                    name: "fk_megusta_capturas",
                    using: "BTREE",
                    fields: [
                        { name: "idcaptura" },
                    ]
                },
            ]
        });
    }
}
exports.megusta = megusta;
