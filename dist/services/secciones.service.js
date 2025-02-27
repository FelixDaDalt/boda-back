"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editarSecciones = exports.obtenerSecciones = void 0;
const boda_1 = require("../models/boda");
const database_1 = __importDefault(require("../config/database"));
const secciones_1 = require("../models/secciones");
const obtenerSecciones = async (userId, idBoda) => {
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
        const seccion = await secciones_1.secciones.findOne({
            where: {
                id_boda: idBoda,
            },
            transaction: transaction
        });
        transaction.commit();
        return seccion;
    }
    catch (e) {
        await transaction.rollback();
        throw new Error(e.message);
    }
};
exports.obtenerSecciones = obtenerSecciones;
const editarSecciones = async (userId, seccionesConfig) => {
    const transaction = await database_1.default.transaction();
    try {
        const bodaExistente = await boda_1.boda.findOne({
            where: {
                id: seccionesConfig.id_boda,
                id_usuario: userId
            },
            transaction
        });
        if (!bodaExistente) {
            const error = new Error('No se encontró una boda con ese ID para el usuario proporcionado.');
            error.statusCode = 404;
            throw error;
        }
        const seccion = await secciones_1.secciones.findOne({
            where: {
                id_boda: seccionesConfig.id_boda,
            },
            transaction
        });
        if (!seccion) {
            const error = new Error('No se encontro la configuracion');
            error.statusCode = 404;
            throw error;
        }
        const seccionActualizada = await secciones_1.secciones.update(seccionesConfig, {
            where: { id_boda: seccionesConfig.id_boda },
            transaction,
        });
        //Realizar commit
        await transaction.commit();
        return seccionActualizada;
    }
    catch (e) {
        await transaction.rollback();
        throw new Error(e.message);
    }
};
exports.editarSecciones = editarSecciones;
