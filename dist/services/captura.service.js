"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.meGusta = exports.obtenerCapturas = exports.subirCaptura = void 0;
const boda_1 = require("../models/boda");
const database_1 = __importDefault(require("../config/database"));
const invitacion_1 = require("../models/invitacion");
const capturas_1 = require("../models/capturas");
const megusta_1 = require("../models/megusta");
// const subirCaptura = async (captura: nuevaCaptura) => {
//     const transaction = await Sequelize.transaction();
//     try {
//         // Buscar la boda con la invitación
//         const bodaEncontrada = await boda.findOne({
//             where: {
//                 url: captura.boda_url,
//                 activo: true
//             },
//             include: [
//                 {
//                     model: invitacion,
//                     as: 'invitacions',
//                     where: {
//                         randomkey: captura.invitacion
//                     },
//                     required: true
//                 }
//             ],
//             transaction
//         });
//         if (!bodaEncontrada) {
//             const error = new Error('La invitacion no esta asociada a la boda.');
//             (error as any).statusCode = 404;
//             throw error;
//         }
//         const nuevaCaptura = {
//             id_boda: bodaEncontrada.id,
//             boda_url: bodaEncontrada.url,
//             url: captura.url,
//             fecha: captura.fecha,
//             hora: captura.hora
//         };
//         // Guardar la captura en la base de datos
//         const capturaCreada = await capturas.create(nuevaCaptura, { transaction });
//         // Confirmar la transacción
//         await transaction.commit();
//         return capturaCreada; // Retornar la captura creada
//     } catch (e:any) {
//         await transaction.rollback();
//         throw new Error(e.message);
//     }
// };
const subirCaptura = async (captura) => {
    const transaction = await database_1.default.transaction();
    try {
        // Buscar la boda con la invitación
        const bodaEncontrada = await boda_1.boda.findOne({
            where: {
                url: captura.boda_url,
                activo: true
            },
            include: [
                {
                    model: invitacion_1.invitacion,
                    as: 'invitacions',
                    where: {
                        randomkey: captura.invitacion
                    },
                    required: true
                }
            ],
            transaction
        });
        if (!bodaEncontrada) {
            const error = new Error('La invitación no está asociada a la boda.');
            error.statusCode = 404;
            throw error;
        }
        const nuevaCaptura = {
            id_boda: bodaEncontrada.id,
            boda_url: bodaEncontrada.url,
            url: captura.url,
            fecha: captura.fecha,
            hora: captura.hora
        };
        // Guardar la captura en la base de datos
        const capturaCreada = await capturas_1.capturas.create(nuevaCaptura, { transaction });
        // Confirmar la transacción
        await transaction.commit();
        return capturaCreada; // Retornar la captura creada
    }
    catch (e) {
        await transaction.rollback();
        throw new Error(e.message);
    }
};
exports.subirCaptura = subirCaptura;
const obtenerCapturas = async (url, cod, page = 1, limit = 10) => {
    const transaction = await database_1.default.transaction();
    try {
        const bodaEncontrada = await boda_1.boda.findOne({
            where: {
                url: url,
                activo: true
            },
            include: [
                {
                    model: invitacion_1.invitacion,
                    as: 'invitacions',
                    where: {
                        randomkey: cod
                    },
                    required: true
                }
            ],
            transaction
        });
        if (!bodaEncontrada) {
            const error = new Error('La invitacion no esta asociada a la boda.');
            error.statusCode = 404;
            throw error;
        }
        // Configurar paginación
        const offset = (page - 1) * limit;
        // Obtén todas las fotos asociadas a la boda y la relación 'megusta'
        const { rows: fotos, count: total } = await capturas_1.capturas.findAndCountAll({
            where: {
                id_boda: bodaEncontrada.id
            },
            transaction,
            limit,
            offset,
            order: [['fecha', 'DESC'], ['hora', 'DESC']],
            include: [{
                    model: megusta_1.megusta,
                    as: 'megusta',
                    required: false,
                }],
            group: ['id']
        });
        // Recorre las fotos y agrega el campo 'megusta' y 'cantidad_megusta' a la respuesta
        const fotosConMegusta = fotos.map(foto => {
            const tieneMegusta = foto.megusta && foto.megusta.length > 0;
            const respuesta = foto.toJSON();
            if (tieneMegusta) {
                respuesta.cantidad = foto.megusta.filter(m => m.megusta == 1).length;
                respuesta.megusta = foto.megusta.find(f => f.randomkey == cod)?.megusta || 0;
            }
            else {
                respuesta.cantidad = 0;
                respuesta.megusta = 0;
            }
            return respuesta;
        });
        transaction.commit();
        return { fotos: fotosConMegusta, total, totalPages: Math.ceil(Number(total.length) / limit), currentPage: page };
    }
    catch (e) {
        await transaction.rollback();
        throw new Error(e.message);
    }
};
exports.obtenerCapturas = obtenerCapturas;
const meGusta = async (url, cod, idFoto) => {
    const transaction = await database_1.default.transaction();
    try {
        const bodaEncontrada = await boda_1.boda.findOne({
            where: {
                url: url,
                activo: true
            },
            include: [
                {
                    model: invitacion_1.invitacion,
                    as: 'invitacions',
                    where: {
                        randomkey: cod
                    },
                    required: true
                }
            ],
            transaction
        });
        if (!bodaEncontrada) {
            const error = new Error('La invitacion no esta asociada a la boda.');
            error.statusCode = 404;
            throw error;
        }
        const foto = await capturas_1.capturas.findOne({
            where: {
                id_boda: bodaEncontrada.id,
                id: idFoto
            },
            include: [{
                    model: megusta_1.megusta,
                    as: 'megusta',
                    where: {
                        randomkey: cod,
                    },
                    required: false
                }],
            transaction: transaction
        });
        if (!foto) {
            const error = new Error('No se encontró la foto.');
            error.statusCode = 404;
            throw error;
        }
        let meGusta = foto.megusta && foto.megusta[0]; // Obtenemos el primer "megusta" si existe
        if (meGusta) {
            // Si existe, actualizamos el valor de 'megusta'
            const nuevoValor = meGusta.megusta == 1 ? 0 : 1;
            await megusta_1.megusta.update({ megusta: nuevoValor }, {
                where: {
                    id: meGusta.id
                },
                transaction: transaction
            });
        }
        else {
            // Si no existe, lo creamos
            await megusta_1.megusta.create({
                randomkey: cod,
                idcaptura: Number(idFoto),
                megusta: 1 // Establecemos el valor inicial de 'megusta' a 1
            }, { transaction: transaction });
        }
        await transaction.commit();
        return foto; // Devuelves la foto (con la actualización de "megusta" si fue necesario)
    }
    catch (e) {
        await transaction.rollback();
        throw new Error(e.message);
    }
};
exports.meGusta = meGusta;
