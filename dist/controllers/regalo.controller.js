"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditarRegalo = exports.ObtenerRegalo = void 0;
const error_handle_1 = require("../utils/error.handle");
const regalos_service_1 = require("../services/regalos.service");
const ObtenerRegalo = async (req, res) => {
    try {
        const userId = req?.user?.id;
        const { idBoda } = req.params;
        const eventos = await (0, regalos_service_1.obtenerRegalo)(userId, idBoda);
        const data = { "data": eventos, "mensaje": "Seccion regalo obtenida" };
        res.status(200).send(data);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'Error al obtener la seccion regalo', e);
    }
};
exports.ObtenerRegalo = ObtenerRegalo;
const EditarRegalo = async (req, res) => {
    try {
        const userId = req?.user?.id;
        const crearBoda = await (0, regalos_service_1.editarRegalo)(userId, req.body);
        const data = { "data": crearBoda, "mensaje": 'Seccion regalo editada con exito' };
        res.status(200).send(data);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'Error al editar la seccion Regalos', e);
    }
};
exports.EditarRegalo = EditarRegalo;
