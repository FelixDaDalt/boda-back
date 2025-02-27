"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editarNovios = exports.obtenerNovios = void 0;
const boda_1 = require("../models/boda");
const database_1 = __importDefault(require("../config/database"));
const novio_1 = require("../models/novio");
const novia_1 = require("../models/novia");
const obtenerNovios = async (userId, idBoda) => {
    const transaction = await database_1.default.transaction();
    try {
        const bodaExistente = await boda_1.boda.findOne({
            where: {
                id: idBoda,
                id_usuario: userId
            },
            include: [{
                    model: novio_1.novio,
                    as: 'id_novio_novio',
                    required: true
                },
                {
                    model: novia_1.novia,
                    as: 'id_novia_novium',
                    required: true
                }],
            transaction: transaction
        });
        if (!bodaExistente) {
            const error = new Error('No se encontró una boda con ese ID para el usuario proporcionado.');
            error.statusCode = 404;
            throw error;
        }
        const data = {
            boda_url: bodaExistente.url,
            novio: bodaExistente.id_novio_novio,
            novia: bodaExistente.id_novia_novium
        };
        transaction.commit();
        return data;
    }
    catch (e) {
        await transaction.rollback();
        throw new Error(e.message);
    }
};
exports.obtenerNovios = obtenerNovios;
const editarNovios = async (userId, novios) => {
    const transaction = await database_1.default.transaction();
    try {
        // Insertar la novia y obtener su id
        const noviaEditada = await novia_1.novia.update({ ...novios.novia }, // Datos a actualizar
        {
            where: { id: novios.novia.id }, // Condición para encontrar el registro
            transaction, // Transacción en el mismo objeto
        });
        // Insertar el novio y obtener su id
        const novioEditado = await novio_1.novio.update({ ...novios.novio }, // Datos a actualizar
        {
            where: { id: novios.novio.id }, // Condición para encontrar el registro
            transaction, // Transacción en el mismo objeto
        });
        //Realizar commit
        await transaction.commit();
        const editados = {
            novio: novioEditado,
            novia: noviaEditada
        };
        return editados;
    }
    catch (e) {
        await transaction.rollback();
        throw new Error(e.message);
    }
};
exports.editarNovios = editarNovios;
