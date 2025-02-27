"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObtenerCanciones = exports.EliminarCancion = exports.EnviarCanciones = void 0;
const error_handle_1 = require("../utils/error.handle");
const lista_service_1 = require("../services/lista.service");
const EnviarCanciones = async (req, res) => {
    try {
        const { invitacion } = req.params;
        const canciones = await (0, lista_service_1.enviarCanciones)(invitacion, req.body);
        const data = { "data": canciones, "mensaje": 'Canciones enviadas con exito' };
        res.status(200).send(data);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'Error al enviar las canciones', e);
    }
};
exports.EnviarCanciones = EnviarCanciones;
const EliminarCancion = async (req, res) => {
    try {
        const { invitacion } = req.params;
        const { id } = req.query;
        const cancion = await (0, lista_service_1.eliminarCancion)(invitacion, id);
        const data = { "data": cancion, "mensaje": 'Cancion Eliminada' };
        res.status(200).send(data);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'Error al eliminar la cancion', e);
    }
};
exports.EliminarCancion = EliminarCancion;
const ObtenerCanciones = async (req, res) => {
    try {
        const userId = req?.user?.id;
        const { idBoda } = req.params;
        const canciones = await (0, lista_service_1.obtenerCanciones)(userId, idBoda);
        const data = { "data": canciones, "mensaje": "Canciones obtenidas" };
        res.status(200).send(data);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'Error al obtener las canciones', e);
    }
};
exports.ObtenerCanciones = ObtenerCanciones;
