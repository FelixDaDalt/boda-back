"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.eliminarBoda = exports.editarBodaUsuario = exports.obtenerBodaInvitacion = exports.obtenerBodaUrl = exports.obtenerBodaDetalle = exports.crearBodaUsuario = exports.obtenerBodasUsuario = void 0;
const sequelize_1 = require("sequelize"); // Importa 'Op' desde 'sequelize'
const novio_1 = require("../models/novio");
const boda_1 = require("../models/boda");
const novia_1 = require("../models/novia");
const database_1 = __importDefault(require("../config/database"));
const evento_1 = require("../models/evento");
const invitacion_1 = require("../models/invitacion");
const invitado_1 = require("../models/invitado");
const historia_1 = require("../models/historia");
const lista_1 = require("../models/lista");
const galeria_1 = require("../models/galeria");
const secciones_1 = require("../models/secciones");
const regalos_1 = require("../models/regalos");
const obtenerBodasUsuario = async (userId) => {
    try {
        const bodasUsuario = await boda_1.boda.findAll({
            where: {
                id_usuario: userId
            },
            include: [
                {
                    model: novio_1.novio,
                    as: 'id_novio_novio',
                    required: true
                },
                {
                    model: novia_1.novia,
                    as: 'id_novia_novium',
                    required: true
                }
            ]
        });
        return bodasUsuario;
    }
    catch (e) {
        throw new Error(e.message);
    }
};
exports.obtenerBodasUsuario = obtenerBodasUsuario;
const obtenerBodaDetalle = async (userId, idBoda) => {
    try {
        const bodasUsuario = await boda_1.boda.findAll({
            where: {
                id_usuario: userId,
                id: idBoda
            },
            attributes: ['id', 'url', 'nombre', 'activo'],
            include: [{
                    model: novio_1.novio,
                    as: 'id_novio_novio',
                    required: true
                }, {
                    model: novia_1.novia,
                    as: 'id_novia_novium',
                    required: true,
                }, {
                    model: evento_1.evento,
                    as: 'eventos',
                    required: false,
                    attributes: { exclude: ['id_boda'] },
                }]
        });
        return bodasUsuario;
    }
    catch (e) {
        throw new Error(e.message);
    }
};
exports.obtenerBodaDetalle = obtenerBodaDetalle;
const crearBodaUsuario = async (userId, nuevaBoda) => {
    const transaction = await database_1.default.transaction();
    try {
        // Insertar la novia y obtener su id
        const noviaCreada = await novia_1.novia.create({
            ...nuevaBoda.novia,
            foto: nuevaBoda.novia.foto, // Guardar la ruta de la foto
        }, { transaction });
        const id_novia = noviaCreada.id;
        // Insertar el novio y obtener su id
        const novioCreado = await novio_1.novio.create({
            ...nuevaBoda.novio,
            foto: nuevaBoda.novio.foto, // Guardar la ruta de la foto
        }, { transaction });
        const id_novio = novioCreado.id;
        // Crear la boda y asignar los ids
        const bodaCreada = await boda_1.boda.create({
            ...nuevaBoda.boda,
            id_usuario: userId, // Asigna el id del usuario
            id_novia: id_novia, // Asigna el id de la novia
            id_novio: id_novio // Asigna el id del novio
        }, { transaction });
        //Realizar commit
        await transaction.commit();
        // excluir id_usuario
        const { id_usuario, ...respuesta } = bodaCreada.get();
        return respuesta;
    }
    catch (e) {
        await transaction.rollback();
        throw new Error(e.message);
    }
};
exports.crearBodaUsuario = crearBodaUsuario;
const obtenerBodaUrl = async (url) => {
    try {
        const bodaDetalle = await boda_1.boda.findOne({
            where: {
                url: url
            },
            attributes: ['url'],
            include: [{
                    model: novio_1.novio,
                    as: 'id_novio_novio',
                    required: true,
                    attributes: ['nombre', 'apellido'],
                }, {
                    model: novia_1.novia,
                    as: 'id_novia_novium',
                    required: true,
                    attributes: ['nombre', 'apellido'],
                }]
        });
        if (!bodaDetalle) {
            const error = new Error('Boda no encontrada.');
            error.statusCode = 404;
            throw error;
        }
        const detalles = {
            url: bodaDetalle?.url || '',
            pareja: {
                novia: {
                    nombre: `${bodaDetalle?.id_novia_novium?.nombre || ''} ${bodaDetalle?.id_novia_novium?.apellido || ''}`,
                },
                novio: {
                    nombre: `${bodaDetalle?.id_novio_novio?.nombre || ''} ${bodaDetalle?.id_novio_novio?.apellido || ''}`,
                }
            },
        };
        return {
            invitacion: false,
            detalles
        };
    }
    catch (e) {
        throw new Error(e.message);
    }
};
exports.obtenerBodaUrl = obtenerBodaUrl;
const obtenerBodaInvitacion = async (url, cod) => {
    try {
        const bodaDetalle = await boda_1.boda.findOne({
            where: {
                url: url
            },
            attributes: ['url'], // Agrega aquí otros atributos de la boda que necesites
            include: [{
                    model: secciones_1.secciones,
                    as: 'secciones',
                    required: true
                }, {
                    model: invitacion_1.invitacion,
                    as: 'invitacions',
                    required: true, // Para asegurar que solo se traigan bodas con invitación válida
                    where: {
                        randomkey: cod
                    },
                    attributes: ['fecha_limite'],
                    include: [{
                            model: invitado_1.invitado,
                            as: 'invitados',
                            required: false
                        }]
                }, {
                    model: novio_1.novio,
                    as: 'id_novio_novio',
                    required: true
                }, {
                    model: novia_1.novia,
                    as: 'id_novia_novium',
                    required: true,
                }, {
                    model: evento_1.evento,
                    as: 'eventos',
                    required: false,
                }, {
                    model: historia_1.historia,
                    as: 'historia',
                    required: false,
                }, {
                    model: galeria_1.galeria,
                    as: 'galeria',
                    required: false,
                }, {
                    model: lista_1.lista,
                    as: 'lista',
                    required: false,
                    where: {
                        randomkey: cod
                    },
                    attributes: ['id', 'nombre', 'artista'],
                }, {
                    model: regalos_1.regalos,
                    as: 'regalos',
                    required: false
                }]
        });
        if (!bodaDetalle) {
            const error = new Error('Boda no encontrada o invitación inválida.');
            error.statusCode = 404;
            throw error;
        }
        const procesarGaleria = () => {
            const indices = Array.from({ length: 7 }, (_, i) => i);
            return indices.map(index => {
                const url = `/uploads/bodas/${bodaDetalle?.url}/galeria/image-${index}.jpg`;
                const existe = bodaDetalle?.galeria?.find(gal => gal.url === url);
                return { url: existe?.url || null }; // Devuelve el objeto galería si existe, o null si no
            });
        };
        const detalles = {
            url: bodaDetalle?.url || '',
            invitacion: {
                novia: `${bodaDetalle?.id_novia_novium?.nombre || ''} ${bodaDetalle?.id_novia_novium?.apellido || ''}`,
                novio: `${bodaDetalle?.id_novio_novio?.nombre || ''} ${bodaDetalle?.id_novio_novio?.apellido || ''}`,
                evento: (() => {
                    const principalEvento = bodaDetalle?.eventos?.find(e => e.principal == 1) || {};
                    return {
                        lugar: principalEvento.nombre_lugar || '',
                        fecha: principalEvento.fecha || '',
                        direccion: principalEvento.direccion || '',
                        hora: principalEvento.hora || '',
                    };
                })()
            },
            pareja: bodaDetalle?.secciones[0]?.pareja == 1 ? {
                novia: {
                    nombre: `${bodaDetalle?.id_novia_novium?.nombre || ''} ${bodaDetalle?.id_novia_novium?.apellido || ''}`,
                    nac: bodaDetalle?.id_novia_novium?.fecha_nacimiento || '',
                    descripcion: bodaDetalle?.id_novia_novium?.descripcion || '',
                    foto: bodaDetalle?.id_novia_novium?.foto || ''
                },
                novio: {
                    nombre: `${bodaDetalle?.id_novio_novio?.nombre || ''} ${bodaDetalle?.id_novio_novio?.apellido || ''}`,
                    nac: bodaDetalle?.id_novio_novio?.fecha_nacimiento || '',
                    descripcion: bodaDetalle?.id_novio_novio?.descripcion || '',
                    foto: bodaDetalle?.id_novio_novio?.foto || ''
                }
            } : null,
            historia: bodaDetalle?.secciones[0]?.historia == 1 ?
                (bodaDetalle?.historia?.map(historia => ({
                    imagen: historia.imagen || '',
                    titulo: historia.titulo || '',
                    fecha: historia.fecha || '',
                    descripcion: historia.descripcion || ''
                })) || []).sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime()) : null,
            confirmacion: {
                invitacion: cod,
                limite: bodaDetalle?.invitacions[0].fecha_limite,
                invitados: bodaDetalle?.invitacions[0].invitados.map(i => ({
                    id: i.id,
                    nombre: `${i.nombre}, ${i.apellido}`,
                    confirmado: i.confirmado,
                    vegetariano: i.vegetariano,
                    menor: i.menor
                })) || []
            },
            eventos: bodaDetalle?.secciones[0]?.eventos == 1 ? bodaDetalle?.eventos?.map(e => ({
                nombre: e.nombre_evento || '',
                fecha: e.fecha || '',
                hora: e.hora || '',
                lugar: e.nombre_lugar || '',
                direccion: e.direccion || '',
                latitud: e.ubicacion_lat || null,
                longitud: e.ubicacion_lon || null
            })) : null,
            lista: bodaDetalle?.secciones[0]?.lista == 1 ? {
                seleccion: bodaDetalle?.lista?.map(l => ({
                    id: l.id,
                    nombre: l.nombre,
                    artista: l.artista
                })),
                invitacion: cod,
            } : null,
            galeria: bodaDetalle?.secciones[0]?.galeria == 1 ? procesarGaleria() : null,
            capturas: bodaDetalle?.secciones[0]?.capturas == 1 ? true : false,
            upload: bodaDetalle?.secciones[0]?.upload == 1 &&
                bodaDetalle?.invitacions?.some(i => i.invitados.some(inv => inv.confirmado)) ? true : false,
            regalos: bodaDetalle?.secciones[0]?.regalos == 1 ? bodaDetalle?.regalos[0] : null
        };
        return {
            invitacion: true,
            detalles
        };
    }
    catch (e) {
        throw new Error(e.message);
    }
};
exports.obtenerBodaInvitacion = obtenerBodaInvitacion;
const editarBodaUsuario = async (userId, idBoda, nuevaBoda) => {
    const transaction = await database_1.default.transaction();
    try {
        // Buscar la boda por id y verificar si pertenece al usuario
        const bodaExistente = await boda_1.boda.findOne({
            where: { id: idBoda, id_usuario: userId }
        });
        if (!bodaExistente) {
            const error = new Error('No se encontró una boda con ese ID para el usuario proporcionado.');
            error.statusCode = 404;
            throw error;
        }
        // Actualizar datos de la novia si es necesario
        await novia_1.novia.update({
            ...nuevaBoda.novia,
        }, {
            where: { id: bodaExistente.id_novia },
            transaction
        });
        // Actualizar datos del novio si es necesario
        await novio_1.novio.update({
            ...nuevaBoda.novio,
        }, {
            where: { id: bodaExistente.id_novio },
            transaction
        });
        // Actualizar los datos de la boda
        await boda_1.boda.update({
            ...nuevaBoda.boda
        }, {
            where: { id: idBoda, id_usuario: userId },
            transaction
        });
        // Realizar commit de la transacción
        await transaction.commit();
        // Volver a buscar la boda para devolver la respuesta, validando que no sea null
        const bodaActualizada = await boda_1.boda.findByPk(idBoda);
        if (!bodaActualizada) {
            throw new Error('No se pudo recuperar la boda después de la actualización.');
        }
        // Excluir id_usuario de la respuesta
        const { id_usuario, ...respuesta } = bodaActualizada.get();
        return respuesta;
    }
    catch (e) {
        await transaction.rollback();
        throw new Error(e.message);
    }
};
exports.editarBodaUsuario = editarBodaUsuario;
const eliminarBoda = async (userId, idBoda) => {
    const transaction = await database_1.default.transaction();
    try {
        // Buscar la boda para obtener los IDs de la novia y el novio
        const bodaEncontrada = await boda_1.boda.findOne({
            where: {
                id: idBoda,
                id_usuario: userId,
            },
            transaction,
        });
        if (!bodaEncontrada) {
            const error = new Error("No se encontró una boda con ese ID para el usuario proporcionado.");
            error.statusCode = 404;
            throw error;
        }
        const id_novia = bodaEncontrada.id_novia;
        const id_novio = bodaEncontrada.id_novio;
        // Obtener las invitaciones relacionadas con la boda
        const invitaciones = await invitacion_1.invitacion.findAll({
            where: { id_boda: idBoda },
            transaction
        });
        if (invitaciones.length > 0) {
            // Eliminar los invitados relacionados con las invitaciones obtenidas
            const idsInvitaciones = invitaciones.map((inv) => inv.id);
            await invitado_1.invitado.destroy({
                where: {
                    id_invitacion: {
                        [sequelize_1.Op.in]: idsInvitaciones // Usamos Op.in para obtener todos los invitados de las invitaciones
                    }
                },
                transaction,
            });
        }
        // Eliminar las invitaciones relacionadas con la boda
        await invitacion_1.invitacion.destroy({ where: { id_boda: idBoda }, transaction });
        // Eliminar eventos relacionados con la boda
        await evento_1.evento.destroy({ where: { id_boda: idBoda }, transaction });
        // Eliminar la boda
        await boda_1.boda.destroy({ where: { id: idBoda }, transaction });
        // Eliminar las historias
        await historia_1.historia.destroy({ where: { id: idBoda }, transaction });
        // Eliminar la novia y el novio
        await novia_1.novia.destroy({ where: { id: id_novia }, transaction });
        await novio_1.novio.destroy({ where: { id: id_novio }, transaction });
        // Commit de la transacción
        await transaction.commit();
        return bodaEncontrada;
    }
    catch (e) {
        await transaction.rollback();
        throw new Error(e.message);
    }
};
exports.eliminarBoda = eliminarBoda;
