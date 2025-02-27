"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EliminarBoda = exports.editarBoda = exports.obtenerBodaPorUrl = exports.obtenerDetalle = exports.crearBoda = exports.obtenerBodas = void 0;
const error_handle_1 = require("../utils/error.handle");
const bodas_service_1 = require("../services/bodas.service");
const obtenerBodas = async (req, res) => {
    try {
        const userId = req?.user?.id;
        const bodas = await (0, bodas_service_1.obtenerBodasUsuario)(userId);
        const data = { "data": bodas };
        res.status(200).send(data);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'Error al obtener las Bodas', e);
    }
};
exports.obtenerBodas = obtenerBodas;
const crearBoda = async (req, res) => {
    try {
        const userId = req?.user?.id;
        const bodaUrl = req.body.boda_url;
        let novia = JSON.parse(req.body.novia);
        let novio = JSON.parse(req.body.novio);
        let boda = JSON.parse(req.body.boda);
        // Asignar las rutas de las imágenes a los campos de novia y novio
        novia.foto = `/uploads/bodas/${bodaUrl}/imagenes/novia.jpg`;
        novio.foto = `/uploads/bodas/${bodaUrl}/imagenes/novio.jpg`;
        const nueva = {
            boda: boda,
            novia: novia,
            novio: novio
        };
        const crearBoda = await (0, bodas_service_1.crearBodaUsuario)(userId, nueva);
        const data = { "data": crearBoda, "mensaje": 'Boda creada con exito' };
        res.status(200).send(data);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'Error al crear la Boda', e);
    }
};
exports.crearBoda = crearBoda;
const editarBoda = async (req, res) => {
    try {
        const userId = req?.user?.id;
        const { idBoda } = req.params;
        let novia = JSON.parse(req.body.novia);
        let novio = JSON.parse(req.body.novio);
        let boda = JSON.parse(req.body.boda);
        const editar = {
            boda: boda,
            novia: novia,
            novio: novio
        };
        const crearBoda = await (0, bodas_service_1.editarBodaUsuario)(userId, idBoda, editar);
        const data = { "data": crearBoda, "mensaje": 'Boda editada con exito' };
        res.status(200).send(data);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'Error al crear la Boda', e);
    }
};
exports.editarBoda = editarBoda;
const obtenerDetalle = async (req, res) => {
    try {
        const userId = req?.user?.id;
        const { idBoda } = req.params;
        const bodas = await (0, bodas_service_1.obtenerBodaDetalle)(userId, idBoda);
        const data = { "data": bodas, "mensaje": 'Boda obtenida' };
        res.status(200).send(data);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'Error al obtener la Boda', e);
    }
};
exports.obtenerDetalle = obtenerDetalle;
const obtenerBodaPorUrl = async (req, res) => {
    try {
        const { url } = req.params;
        const invitacion = req.query.invitacion?.toString();
        if (invitacion) {
            const bodas = await (0, bodas_service_1.obtenerBodaInvitacion)(url, invitacion);
            const data = { "data": bodas, "mensaje": 'Boda obtenida' };
            res.status(200).send(data);
        }
        else {
            const bodas = await (0, bodas_service_1.obtenerBodaUrl)(url);
            const data = { "data": bodas, "mensaje": 'Boda obtenida' };
            res.status(200).send(data);
        }
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'Error al obtener la Boda', e);
    }
};
exports.obtenerBodaPorUrl = obtenerBodaPorUrl;
const EliminarBoda = async (req, res) => {
    try {
        const userId = req?.user?.id;
        const { idBoda } = req.params;
        const bodaEliminada = await (0, bodas_service_1.eliminarBoda)(userId, idBoda);
        const data = { "data": bodaEliminada, "mensaje": 'Boda eliminada con exito' };
        res.status(200).send(data);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'Error al crear la Boda', e);
    }
};
exports.EliminarBoda = EliminarBoda;
