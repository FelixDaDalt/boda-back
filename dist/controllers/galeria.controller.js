"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrearGaleria = exports.ObtenerGaleria = void 0;
const galeria_service_1 = require("../services/galeria.service");
const error_handle_1 = require("../utils/error.handle");
const ObtenerGaleria = async (req, res) => {
    try {
        const userId = req?.user?.id;
        const { idBoda } = req.params;
        const eventos = await (0, galeria_service_1.obtenerGaleria)(userId, idBoda);
        const data = { "data": eventos, "mensaje": "Galeria obtenida" };
        res.status(200).send(data);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'Error al obtener la galeria', e);
    }
};
exports.ObtenerGaleria = ObtenerGaleria;
const CrearGaleria = async (req, res) => {
    try {
        const userId = req?.user?.id;
        const bodaUrl = req.body.boda_url;
        const bodaId = req.body.boda_id;
        const files = req.files;
        ;
        let archivos = [];
        if (files && files.length > 0) {
            archivos = files.map((file) => ({
                url: `/uploads/bodas/${bodaUrl}/galeria/${file.originalname}`, // Construir la URL del archivo
            }));
        }
        if (archivos?.length > 0) {
            const galeria = await (0, galeria_service_1.crearGaleria)(archivos, bodaId, userId);
            const data = { "data": galeria, "mensaje": 'Galeria creada con exito' };
            res.status(200).send(data);
        }
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'Error al crear la geleria', e);
    }
};
exports.CrearGaleria = CrearGaleria;
