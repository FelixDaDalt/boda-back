"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditarNovios = exports.ObtenerNovios = void 0;
const error_handle_1 = require("../utils/error.handle");
const novios_service_1 = require("../services/novios.service");
const ObtenerNovios = async (req, res) => {
    try {
        const userId = req?.user?.id;
        const { idBoda } = req.params;
        const novios = await (0, novios_service_1.obtenerNovios)(userId, idBoda);
        const data = { "data": novios, "mensaje": "Novios encontrados" };
        res.status(200).send(data);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'Error al obtener los novios', e);
    }
};
exports.ObtenerNovios = ObtenerNovios;
const EditarNovios = async (req, res) => {
    try {
        const userId = req?.user?.id;
        let novia = JSON.parse(req.body.novia);
        let novio = JSON.parse(req.body.novio);
        const editar = {
            novia: novia,
            novio: novio
        };
        const edicion = await (0, novios_service_1.editarNovios)(userId, editar);
        const data = { "data": edicion, "mensaje": 'Novios Editados con exito' };
        res.status(200).send(data);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'Error al editar los novios', e);
    }
};
exports.EditarNovios = EditarNovios;
