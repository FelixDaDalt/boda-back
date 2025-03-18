"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.eliminarInvitacion = exports.obtenerInvitaciones = exports.crearInvitacion = exports.confirmar = void 0;
const boda_1 = require("../models/boda");
const database_1 = __importDefault(require("../config/database"));
const invitacion_1 = require("../models/invitacion");
const invitado_1 = require("../models/invitado");
const sequelize_1 = require("sequelize");
const confirmar = async (key, confirmacion) => {
    const t = await database_1.default.transaction(); // Iniciar la transacción
    try {
        const fechaActual = new Date();
        const invitacio = await invitacion_1.invitacion.findOne({
            where: {
                randomkey: key,
                fecha_limite: {
                    [sequelize_1.Op.gte]: fechaActual
                }
            },
            include: [{
                    model: invitado_1.invitado,
                    as: 'invitados',
                    required: true
                }],
            transaction: t // Incluir la transacción
        });
        if (!invitacio) {
            const error = new Error('Invitación no encontrada o la fecha límite ha expirado');
            error.statusCode = 401;
            throw error;
        }
        // Iterar sobre los invitados y actualizar el campo 'confirmado'
        for (let i = 0; i < confirmacion.length; i++) {
            const conf = confirmacion[i];
            const invitadoEncontrado = invitacio.invitados.find((inv) => inv.id == conf.id_invitado);
            if (invitadoEncontrado) {
                invitadoEncontrado.confirmado = conf.confirmacion;
                invitadoEncontrado.vegetariano = conf.vegetariano;
                invitadoEncontrado.menor = conf.menor;
                invitadoEncontrado.celiaco = conf.celiaco;
            }
        }
        // Guardar los cambios en todos los invitados dentro de la transacción
        await Promise.all(invitacio.invitados.map((invitadoActualizado) => invitadoActualizado.save({ transaction: t })));
        // Si todo ha ido bien, confirmar la transacción
        await t.commit();
        return invitacio.invitados;
    }
    catch (e) {
        // Si algo falla, se revierte la transacción
        await t.rollback();
        throw new Error('Error al procesar las confirmaciones: ' + e.message);
    }
};
exports.confirmar = confirmar;
const crearInvitacion = async (userId, nuevaInvitacion) => {
    const transaction = await database_1.default.transaction();
    try {
        const bodaEncontrada = await boda_1.boda.findOne({
            where: {
                id: nuevaInvitacion.invitacion.id_boda,
                id_usuario: userId,
            },
            transaction,
        });
        if (!bodaEncontrada) {
            const error = new Error("No se encontró una boda con ese ID para el usuario proporcionado.");
            error.statusCode = 404;
            throw error;
        }
        const invitacionCreada = await invitacion_1.invitacion.create(nuevaInvitacion.invitacion, { transaction });
        const invitados = nuevaInvitacion.invitados.map((invitado) => ({
            ...invitado,
            id_invitacion: invitacionCreada.id,
        }));
        await invitado_1.invitado.bulkCreate(invitados, { transaction });
        // Confirmar la transacción
        await transaction.commit();
        return invitacionCreada;
    }
    catch (e) {
        await transaction.rollback();
        throw new Error('Error al procesar las confirmaciones: ' + e.message);
    }
};
exports.crearInvitacion = crearInvitacion;
const obtenerInvitaciones = async (userId, idBoda) => {
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
        const invitaciones = await invitacion_1.invitacion.findAll({
            where: {
                id_boda: idBoda,
            },
            include: [{
                    model: invitado_1.invitado,
                    as: 'invitados',
                    required: false
                }],
            transaction: transaction
        });
        let cantidadInvitados = 0;
        let cantidadConfirmados = 0;
        let cantidadNoConfirmados = 0;
        let cantidadMenores = 0;
        let cantidadVegetarianos = 0;
        let cantidadCeliacos = 0;
        invitaciones.forEach((invitacion) => {
            // Recorremos los invitados de la invitación
            invitacion.invitados.forEach((invitado) => {
                cantidadInvitados++;
                // Solo contar los invitados confirmados
                if (invitado.confirmado == 1) {
                    cantidadConfirmados++;
                    // Si está confirmado, evaluar otras condiciones
                    if (invitado.menor)
                        cantidadMenores++;
                    if (invitado.vegetariano)
                        cantidadVegetarianos++;
                    if (invitado.celiaco)
                        cantidadCeliacos++;
                }
                else if (invitado.confirmado == 0) {
                    cantidadNoConfirmados++;
                }
            });
        });
        transaction.commit();
        return {
            cantidadInvitados: cantidadInvitados,
            cantidadConfirmados: cantidadConfirmados,
            cantidadNoConfirmados: cantidadNoConfirmados,
            cantidadMenores: cantidadMenores,
            cantidadVegetarianos: cantidadVegetarianos,
            cantidadCeliacos: cantidadCeliacos,
            invitaciones
        };
    }
    catch (e) {
        await transaction.rollback();
        throw new Error(e.message);
    }
};
exports.obtenerInvitaciones = obtenerInvitaciones;
const eliminarInvitacion = async (userId, idInvitacion) => {
    const transaction = await database_1.default.transaction();
    try {
        // Buscar la boda para obtener los IDs de la novia y el novio
        const invitacionEncontrada = await invitacion_1.invitacion.findOne({
            where: { id: idInvitacion },
            include: [
                {
                    model: invitado_1.invitado,
                    as: 'invitados', // Alias configurado en la relación
                    required: true,
                },
                {
                    model: boda_1.boda,
                    as: 'id_boda_boda',
                    where: { id_usuario: userId }
                }
            ],
            transaction,
        });
        if (!invitacionEncontrada) {
            const error = new Error("No se encontró la invitacion.");
            error.statusCode = 404;
            throw error;
        }
        // Eliminar invitados relacionados con la invitación
        await invitado_1.invitado.destroy({
            where: {
                id_invitacion: idInvitacion, // Suponiendo que hay una columna `id_invitacion` en `invitado`
            },
            transaction,
        });
        // Eliminar la invitación
        await invitacion_1.invitacion.destroy({
            where: {
                id: idInvitacion,
            },
            transaction,
        });
        // Commit de la transacción
        await transaction.commit();
        return invitacionEncontrada;
    }
    catch (e) {
        await transaction.rollback();
        throw new Error(e.message);
    }
};
exports.eliminarInvitacion = eliminarInvitacion;
