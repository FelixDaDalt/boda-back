"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.eliminarEvento = exports.obtenerEventos = exports.crearEvento = void 0;
const boda_1 = require("../models/boda");
const database_1 = __importDefault(require("../config/database"));
const evento_1 = require("../models/evento");
const crearEvento = async (userId, nuevoEvento) => {
    const transaction = await database_1.default.transaction();
    try {
        const bodaExistente = await boda_1.boda.findOne({
            where: {
                id: nuevoEvento.id_boda,
                id_usuario: userId
            }
        });
        if (!bodaExistente) {
            const error = new Error('No se encontró una boda con ese ID para el usuario proporcionado.');
            error.statusCode = 404;
            throw error;
        }
        const eventos = await evento_1.evento.findAll({
            where: {
                id_boda: nuevoEvento.id_boda,
            }
        });
        if (eventos.some(evento => evento.principal == 1) && nuevoEvento.principal) {
            const error = new Error('No puede haber dos eventos principales');
            error.statusCode = 404;
            throw error;
        }
        if (eventos.length >= 3) {
            const error = new Error('No puedes crear mas de 3 eventos');
            error.statusCode = 404;
            throw error;
        }
        const eventoCreado = await evento_1.evento.create(nuevoEvento, { transaction: transaction });
        //Realizar commit
        await transaction.commit();
        // excluir id_usuario
        const { ...respuesta } = eventoCreado.get();
        return respuesta;
    }
    catch (e) {
        await transaction.rollback();
        throw new Error(e.message);
    }
};
exports.crearEvento = crearEvento;
const obtenerEventos = async (userId, idBoda) => {
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
        const eventos = await evento_1.evento.findAll({
            where: {
                id_boda: idBoda,
            },
            transaction: transaction
        });
        transaction.commit();
        return eventos;
    }
    catch (e) {
        await transaction.rollback();
        throw new Error(e.message);
    }
};
exports.obtenerEventos = obtenerEventos;
const eliminarEvento = async (userId, idEvento) => {
    const transaction = await database_1.default.transaction();
    try {
        // Buscar la boda para obtener los IDs de la novia y el novio
        const eventoEncontrado = await evento_1.evento.findOne({
            where: { id: idEvento },
            include: [
                {
                    model: boda_1.boda,
                    as: 'id_boda_boda', // Alias configurado en la relación
                    required: true,
                    where: { id_usuario: userId },
                },
            ],
            transaction,
        });
        if (!eventoEncontrado) {
            const error = new Error("No se encontró el evento con ese ID para el usuario proporcionado.");
            error.statusCode = 404;
            throw error;
        }
        // Eliminar invitados relacionados con las invitaciones de la boda
        await evento_1.evento.destroy({
            where: {
                id: idEvento,
            },
            transaction,
        });
        // Commit de la transacción
        await transaction.commit();
        return eventoEncontrado;
    }
    catch (e) {
        await transaction.rollback();
        throw new Error(e.message);
    }
};
exports.eliminarEvento = eliminarEvento;
