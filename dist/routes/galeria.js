"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const galeria_controller_1 = require("../controllers/galeria.controller");
const galeriaUpload_1 = require("../middleware/galeriaUpload");
const session_1 = require("../middleware/session");
const router = (0, express_1.Router)();
exports.router = router;
// Definir la ruta con el middleware y el manejador
router.get('/:idBoda', session_1.comprobarJWT, galeria_controller_1.ObtenerGaleria);
router.post('/crear', session_1.comprobarJWT, galeriaUpload_1.galeriaUpload, galeria_controller_1.CrearGaleria);
