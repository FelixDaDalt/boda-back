"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const capturaUpload_1 = require("../middleware/capturaUpload");
const captura_controller_1 = require("../controllers/captura.controller");
const router = (0, express_1.Router)();
exports.router = router;
// Definir la ruta con el middleware y el manejador
router.get('/:url', captura_controller_1.ObtenerCapturas);
router.put('/megusta/:url', captura_controller_1.MeGusta);
router.post('/subir', capturaUpload_1.uploadCaptura, capturaUpload_1.compressImage, capturaUpload_1.guardarCaptura, captura_controller_1.SubirCaptura);
