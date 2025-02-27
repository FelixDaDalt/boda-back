"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const usuario_controller_1 = require("../controllers/usuario.controller");
const express_1 = require("express");
const router = (0, express_1.Router)();
exports.router = router;
router.post('/registro', usuario_controller_1.Registro);
router.post('/login', usuario_controller_1.Login);
