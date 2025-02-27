"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EliminarHistoria = exports.CrearHistoria = exports.ObtenerHistorias = void 0;
const error_handle_1 = require("../utils/error.handle");
const historia_service_1 = require("../services/historia.service");
const ObtenerHistorias = async (req, res) => {
    try {
        const userId = req?.user?.id;
        const { idBoda } = req.params;
        const histroias = await (0, historia_service_1.obtenerHistorias)(userId, idBoda);
        const data = { "data": histroias, "mensaje": "Historias obtenidas" };
        res.status(200).send(data);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'Error al obtener las Historias', e);
    }
};
exports.ObtenerHistorias = ObtenerHistorias;
const CrearHistoria = async (req, res) => {
    try {
        const userId = req?.user?.id;
        const nuevaHistoria = await (0, historia_service_1.crearHistoria)(userId, req.body);
        const data = { "data": nuevaHistoria, "mensaje": 'Historia creado con exito' };
        res.status(200).send(data);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'Error al crear la Historia', e);
    }
};
exports.CrearHistoria = CrearHistoria;
const EliminarHistoria = async (req, res) => {
    try {
        const userId = req?.user?.id;
        const { idHistoria } = req.params;
        const historiaEliminada = await (0, historia_service_1.eliminarHistoria)(userId, idHistoria);
        const data = { "data": historiaEliminada, "mensaje": 'Historia Eliminada' };
        res.status(200).send(data);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'Error al eliminar la Historia', e);
    }
};
exports.EliminarHistoria = EliminarHistoria;
