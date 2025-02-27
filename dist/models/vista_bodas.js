"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VistaBodas = void 0;
const database_1 = __importDefault(require("../config/database"));
const sequelize_1 = require("sequelize");
const VistaBodas = database_1.default.define('VistaBodas', // Nombre del modelo
{
    nombre: {
        type: sequelize_1.DataTypes.STRING,
    },
    artista: {
        type: sequelize_1.DataTypes.STRING,
    },
    cantidad: {
        type: sequelize_1.DataTypes.INTEGER,
    },
}, {
    tableName: 'vistas_bodas', // Nombre de la vista en la base de datos
    timestamps: false, // Las vistas no tienen columnas `createdAt` o `updatedAt`
    freezeTableName: true, // Evita que Sequelize cambie el nombre de la tabla a plural
});
exports.VistaBodas = VistaBodas;
VistaBodas.removeAttribute('id');
