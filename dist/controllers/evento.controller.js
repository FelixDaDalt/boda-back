"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EliminarEvento = exports.CrearEvento = exports.ObtenerEventos = void 0;
const error_handle_1 = require("../utils/error.handle");
const evento_service_1 = require("../services/evento.service");
const ObtenerEventos = async (req, res) => {
    try {
        const userId = req?.user?.id;
        const { idBoda } = req.params;
        const eventos = await (0, evento_service_1.obtenerEventos)(userId, idBoda);
        const data = { "data": eventos, "mensaje": "Eventos obtenidos" };
        res.status(200).send(data);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'Error al obtener los eventos', e);
    }
};
exports.ObtenerEventos = ObtenerEventos;
const CrearEvento = async (req, res) => {
    try {
        const userId = req?.user?.id;
        const crearBoda = await (0, evento_service_1.crearEvento)(userId, req.body);
        const data = { "data": crearBoda, "mensaje": 'Evento creado con exito' };
        res.status(200).send(data);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'Error al crear el evento', e);
    }
};
exports.CrearEvento = CrearEvento;
const EliminarEvento = async (req, res) => {
    try {
        const userId = req?.user?.id;
        const { idEvento } = req.params;
        const eventoEliminado = await (0, evento_service_1.eliminarEvento)(userId, idEvento);
        const data = { "data": eventoEliminado, "mensaje": 'Evento Eliminado' };
        res.status(200).send(data);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'Error al eliminar el evento', e);
    }
};
exports.EliminarEvento = EliminarEvento;
