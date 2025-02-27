"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.obtenerCanciones = exports.eliminarCancion = exports.enviarCanciones = void 0;
const database_1 = __importDefault(require("../config/database"));
const invitacion_1 = require("../models/invitacion");
const sequelize_1 = require("sequelize");
const lista_1 = require("../models/lista");
const boda_1 = require("../models/boda");
const vista_bodas_1 = require("../models/vista_bodas");
const enviarCanciones = async (key, listaCanciones) => {
    const t = await database_1.default.transaction(); // Iniciar la transacción
    try {
        const fechaActual = new Date();
        const invitacionEncontrada = await invitacion_1.invitacion.findOne({
            where: {
                randomkey: key,
                fecha_limite: {
                    [sequelize_1.Op.gte]: fechaActual
                }
            },
            transaction: t
        });
        if (!invitacionEncontrada) {
            const error = new Error('No se encontro la invitacion o ya caduco');
            error.statusCode = 401;
            throw error;
        }
        const cancionesExistentes = await lista_1.lista.findAll({
            where: {
                randomkey: key,
            },
            transaction: t // Incluir la transacción
        });
        if (cancionesExistentes && cancionesExistentes.length > 4) {
            const error = new Error('Ya ha elegido los 3 temas permitidos');
            error.statusCode = 401;
            throw error;
        }
        const cancionesNuevas = listaCanciones.filter(c => !c.id);
        const cancionesTotales = cancionesExistentes.length + cancionesNuevas.length;
        if (cancionesTotales > 5) {
            const error = new Error(`No puede agregar más de ${5 - cancionesExistentes.length} temas adicionales`);
            error.statusCode = 401;
            throw error;
        }
        const listaCreada = cancionesNuevas
            .map(c => {
            return {
                nombre: c.nombre,
                artista: c.artista || 'sin artista',
                randomkey: key,
                id_boda: invitacionEncontrada.id_boda
            };
        });
        if (listaCreada.length > 0)
            await lista_1.lista.bulkCreate(listaCreada, { transaction: t });
        const listaUsuario = await lista_1.lista.findAll({
            where: {
                randomkey: key,
            },
            transaction: t
        });
        await t.commit();
        return listaUsuario;
    }
    catch (e) {
        // Si algo falla, se revierte la transacción
        await t.rollback();
        throw new Error('Error al procesar las canciones: ' + e.message);
    }
};
exports.enviarCanciones = enviarCanciones;
const eliminarCancion = async (key, id) => {
    const t = await database_1.default.transaction();
    try {
        const fechaActual = new Date();
        const invitacionEncontrada = await invitacion_1.invitacion.findOne({
            where: {
                randomkey: key,
                fecha_limite: {
                    [sequelize_1.Op.gte]: fechaActual
                }
            },
            transaction: t
        });
        if (!invitacionEncontrada) {
            const error = new Error('No se encontro la invitacion o ya caduco');
            error.statusCode = 401;
            throw error;
        }
        const cancion = await lista_1.lista.findOne({
            where: {
                id: id,
                randomkey: key
            },
            transaction: t
        });
        if (!cancion) {
            const error = new Error('No se encontro la cancion');
            error.statusCode = 401;
            throw error;
        }
        await cancion.destroy({ transaction: t });
        await t.commit();
        return id;
    }
    catch (e) {
        await t.rollback();
        throw new Error('Error al procesar las canciones: ' + e.message);
    }
};
exports.eliminarCancion = eliminarCancion;
const obtenerCanciones = async (userId, idBoda) => {
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
        const canciones = await vista_bodas_1.VistaBodas.findAll({
            where: {
                id_boda: idBoda,
            },
            transaction: transaction
        });
        transaction.commit();
        return canciones;
    }
    catch (e) {
        await transaction.rollback();
        throw new Error(e.message);
    }
};
exports.obtenerCanciones = obtenerCanciones;
