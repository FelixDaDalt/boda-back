"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.obtenerGaleria = exports.crearGaleria = void 0;
const boda_1 = require("../models/boda");
const database_1 = __importDefault(require("../config/database"));
const galeria_1 = require("../models/galeria");
const crearGaleria = async (archivos, bodaId, userId) => {
    const transaction = await database_1.default.transaction();
    try {
        const bodaExistente = await boda_1.boda.findOne({
            where: {
                id: bodaId,
                id_usuario: userId
            }
        });
        if (!bodaExistente) {
            const error = new Error('No se encontró una boda con ese ID para el usuario proporcionado.');
            error.statusCode = 404;
            throw error;
        }
        for (let index = 0; index < archivos.length; index++) {
            const url = archivos[index].url;
            const encontrado = await galeria_1.galeria.findOne({
                where: {
                    id_boda: bodaId,
                    url: url
                },
                transaction: transaction
            });
            if (!encontrado) {
                const galeriaUrl = {
                    id_boda: Number(bodaId),
                    url: url
                };
                await galeria_1.galeria.create(galeriaUrl, { transaction: transaction });
            }
        }
        //Realizar commit
        await transaction.commit();
        return { mensaje: 'Galería creada exitosamente.' };
    }
    catch (e) {
        await transaction.rollback();
        throw new Error(e.message);
    }
};
exports.crearGaleria = crearGaleria;
const obtenerGaleria = async (userId, idBoda) => {
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
        const galeriaEncontrada = await galeria_1.galeria.findAll({
            where: {
                id_boda: idBoda,
            },
            transaction: transaction
        });
        transaction.commit();
        return galeriaEncontrada;
    }
    catch (e) {
        await transaction.rollback();
        throw new Error(e.message);
    }
};
exports.obtenerGaleria = obtenerGaleria;
