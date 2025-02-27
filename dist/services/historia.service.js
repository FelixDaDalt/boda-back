"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.eliminarHistoria = exports.obtenerHistorias = exports.crearHistoria = void 0;
const boda_1 = require("../models/boda");
const database_1 = __importDefault(require("../config/database"));
const historia_1 = require("../models/historia");
const crearHistoria = async (userId, nuevaHistoria) => {
    const transaction = await database_1.default.transaction();
    try {
        const bodaExistente = await boda_1.boda.findOne({
            where: {
                id: nuevaHistoria.id_boda,
                id_usuario: userId
            }
        });
        if (!bodaExistente) {
            const error = new Error('No se encontró una boda con ese ID para el usuario proporcionado.');
            error.statusCode = 404;
            throw error;
        }
        const historias = await historia_1.historia.findAll({
            where: {
                id_boda: nuevaHistoria.id_boda,
                borrado: 0
            }
        });
        if (historias.length > 3) {
            const error = new Error('No puedes crear mas de 4 historias');
            error.statusCode = 404;
            throw error;
        }
        const historiaCreada = await historia_1.historia.create(nuevaHistoria, { transaction: transaction });
        //Realizar commit
        await transaction.commit();
        // excluir id_usuario
        const { ...respuesta } = historiaCreada.get();
        return respuesta;
    }
    catch (e) {
        await transaction.rollback();
        throw new Error(e.message);
    }
};
exports.crearHistoria = crearHistoria;
const obtenerHistorias = async (userId, idBoda) => {
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
        const historias = await historia_1.historia.findAll({
            where: {
                id_boda: idBoda,
                borrado: 0
            },
            order: [['fecha', 'ASC']],
            transaction: transaction
        });
        transaction.commit();
        return historias;
    }
    catch (e) {
        await transaction.rollback();
        throw new Error(e.message);
    }
};
exports.obtenerHistorias = obtenerHistorias;
const eliminarHistoria = async (userId, idHistoria) => {
    const transaction = await database_1.default.transaction();
    try {
        // Buscar la boda para obtener los IDs de la novia y el novio
        const historiaEncontrada = await historia_1.historia.findOne({
            where: { id: idHistoria },
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
        if (!historiaEncontrada) {
            const error = new Error("No se encontró el evento con ese ID para el usuario proporcionado.");
            error.statusCode = 404;
            throw error;
        }
        // Eliminar invitados relacionados con las invitaciones de la boda
        await historia_1.historia.destroy({
            where: {
                id: idHistoria,
            },
            transaction,
        });
        // Commit de la transacción
        await transaction.commit();
        return historiaEncontrada;
    }
    catch (e) {
        await transaction.rollback();
        throw new Error(e.message);
    }
};
exports.eliminarHistoria = eliminarHistoria;
