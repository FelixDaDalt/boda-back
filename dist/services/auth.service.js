"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUsuario = exports.registrarUsuario = void 0;
const bcryptjs_1 = require("bcryptjs");
const password_handle_1 = require("../utils/password.handle");
const jw_handle_1 = require("../utils/jw.handle");
const usuario_1 = require("../models/usuario");
const registrarUsuario = async (nuevoUsuario) => {
    if (!nuevoUsuario.password) {
        const error = new Error('El Password no puede estar vacio');
        error.statusCode = 404;
        throw error;
    }
    const usuarioExistente = await usuario_1.usuario.findOne({
        where: {
            email: nuevoUsuario.email
        }
    });
    if (usuarioExistente) {
        const error = new Error('El Email ya está registrado');
        error.statusCode = 404;
        throw error;
    }
    const passEncrypt = await (0, password_handle_1.encriptar)(nuevoUsuario.password);
    nuevoUsuario.password = passEncrypt;
    const agregar = await usuario_1.usuario.create(nuevoUsuario);
    const { id, email } = agregar;
    return { id, email };
};
exports.registrarUsuario = registrarUsuario;
const loginUsuario = async (login) => {
    // 1. Verificar si el usuario existe por email
    const usuarioExistente = await usuario_1.usuario.findOne({
        where: {
            email: login.email
        }
    });
    if (!usuarioExistente) {
        const error = new Error('Usuario o contraseña incorrectos');
        error.statusCode = 401;
        throw error;
    }
    // 2. Comparar la contraseña ingresada con la almacenada
    const contraseñaValida = await compararContraseña(login.password, usuarioExistente.password);
    if (!contraseñaValida) {
        const error = new Error('Usuario o contraseña incorrectos');
        error.statusCode = 401;
        throw error;
    }
    // 3. Generar el token JWT con el id y usuarioKey del usuario
    const token = await (0, jw_handle_1.generarToken)(usuarioExistente.id);
    // 4. Devolver el token y los datos del usuario al cliente
    return {
        token,
        usuario: {
            id: usuarioExistente.id,
            email: usuarioExistente.email,
        }
    };
};
exports.loginUsuario = loginUsuario;
const compararContraseña = async (password, passwordHash) => {
    return await (0, bcryptjs_1.compare)(password, passwordHash);
};
