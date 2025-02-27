"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EliminarInvitacion = exports.ObtenerInvitaciones = exports.CrearInvitacion = exports.confirmarInvitacion = void 0;
const error_handle_1 = require("../utils/error.handle");
const invitacion_service_1 = require("../services/invitacion.service");
const confirmarInvitacion = async (req, res) => {
    try {
        const { invitacion } = req.params;
        const confirmacion = await (0, invitacion_service_1.confirmar)(invitacion, req.body);
        const data = { "data": confirmacion, "mensaje": 'Invitaciones actualizadas' };
        res.status(200).send(data);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'Error al confirmar las invitaciones', e);
    }
};
exports.confirmarInvitacion = confirmarInvitacion;
const CrearInvitacion = async (req, res) => {
    try {
        const userId = req?.user?.id;
        const crearBoda = await (0, invitacion_service_1.crearInvitacion)(userId, req.body);
        const data = { "data": crearBoda, "mensaje": 'Invitacion creada con exito' };
        res.status(200).send(data);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'Error al crear la invitacion', e);
    }
};
exports.CrearInvitacion = CrearInvitacion;
const EliminarInvitacion = async (req, res) => {
    try {
        const userId = req?.user?.id;
        const { idInvitacion } = req.params;
        const invitacionEliminado = await (0, invitacion_service_1.eliminarInvitacion)(userId, idInvitacion);
        const data = { "data": invitacionEliminado, "mensaje": 'Invitacion Eliminada' };
        res.status(200).send(data);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'Error al eliminar la invitacion', e);
    }
};
exports.EliminarInvitacion = EliminarInvitacion;
const ObtenerInvitaciones = async (req, res) => {
    try {
        const userId = req?.user?.id;
        const { idBoda } = req.params;
        const invitaciones = await (0, invitacion_service_1.obtenerInvitaciones)(userId, idBoda);
        const data = { "data": invitaciones, "mensaje": "Invitaciones obtenidas" };
        res.status(200).send(data);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'Error al obtener las invitaciones', e);
    }
};
exports.ObtenerInvitaciones = ObtenerInvitaciones;
