"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verificarToken = exports.generarToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const secret = process.env.JWT_SECRET || 'secret';
const generarToken = async (id) => {
    const jwt = (0, jsonwebtoken_1.sign)({ id }, secret, {
        expiresIn: "2h",
    });
    return jwt;
};
exports.generarToken = generarToken;
const verificarToken = async (jwt) => {
    const ok = await (0, jsonwebtoken_1.verify)(jwt, secret);
    return ok;
};
exports.verificarToken = verificarToken;
