"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Login = exports.Registro = void 0;
const error_handle_1 = require("../utils/error.handle");
const auth_service_1 = require("../services/auth.service");
const Registro = async (req, res) => {
    try {
        const registro = await (0, auth_service_1.registrarUsuario)(req.body);
        const data = { "data": registro, "mensaje": "Registro Creado: " + req.body.email };
        res.status(200).send(data);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'Error al registrarse', e);
    }
};
exports.Registro = Registro;
const Login = async (req, res) => {
    try {
        const login = await (0, auth_service_1.loginUsuario)(req.body);
        const data = { "data": login, "mensaje": "Login Exitoso" };
        res.status(200).send(data);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'Error al loguerse', e);
    }
};
exports.Login = Login;
