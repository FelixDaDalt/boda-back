"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditarSecciones = exports.ObtenerSecciones = void 0;
const error_handle_1 = require("../utils/error.handle");
const secciones_service_1 = require("../services/secciones.service");
const ObtenerSecciones = async (req, res) => {
    try {
        const userId = req?.user?.id;
        const { idBoda } = req.params;
        const eventos = await (0, secciones_service_1.obtenerSecciones)(userId, idBoda);
        const data = { "data": eventos, "mensaje": "Eventos obtenidos" };
        res.status(200).send(data);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'Error al obtener los eventos', e);
    }
};
exports.ObtenerSecciones = ObtenerSecciones;
const EditarSecciones = async (req, res) => {
    try {
        const userId = req?.user?.id;
        const crearBoda = await (0, secciones_service_1.editarSecciones)(userId, req.body);
        const data = { "data": crearBoda, "mensaje": 'Boda editada con exito' };
        res.status(200).send(data);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'Error al crear la Boda', e);
    }
};
exports.EditarSecciones = EditarSecciones;
