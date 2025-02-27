"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editarRegalo = exports.obtenerRegalo = void 0;
const boda_1 = require("../models/boda");
const database_1 = __importDefault(require("../config/database"));
const regalos_1 = require("../models/regalos");
const obtenerRegalo = async (userId, idBoda) => {
    const transaction = await database_1.default.transaction();
    try {
        const bodaExistente = await boda_1.boda.findOne({
            where: {
                id: idBoda,
                id_usuario: userId
            },
            transaction: transaction
        });
        if (!bodaExistente) {
            const error = new Error('No se encontró una boda con ese ID para el usuario proporcionado.');
            error.statusCode = 404;
            throw error;
        }
        const regalo = await regalos_1.regalos.findOne({
            where: {
                id_boda: idBoda,
            },
            transaction: transaction
        });
        transaction.commit();
        return regalo;
    }
    catch (e) {
        await transaction.rollback();
        throw new Error(e.message);
    }
};
exports.obtenerRegalo = obtenerRegalo;
const editarRegalo = async (userId, regalo) => {
    const transaction = await database_1.default.transaction();
    try {
        const bodaExistente = await boda_1.boda.findOne({
            where: {
                id: regalo.id_boda,
                id_usuario: userId
            },
            transaction
        });
        if (!bodaExistente) {
            const error = new Error('No se encontró una boda con ese ID para el usuario proporcionado.');
            error.statusCode = 404;
            throw error;
        }
        const regaloActualizado = await regalos_1.regalos.findOne({
            where: {
                id_boda: regalo.id_boda,
            },
            transaction
        });
        let nuevoRegalo;
        if (!regaloActualizado) {
            nuevoRegalo = await regalos_1.regalos.create(regalo, { transaction });
        }
        else {
            nuevoRegalo = await regalos_1.regalos.update(regalo, {
                where: { id_boda: regalo.id_boda },
                transaction,
            });
        }
        //Realizar commit
        await transaction.commit();
        return nuevoRegalo;
    }
    catch (e) {
        await transaction.rollback();
        throw new Error(e.message);
    }
};
exports.editarRegalo = editarRegalo;
