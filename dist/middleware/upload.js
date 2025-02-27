"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFotosNovios = void 0;
// src/middleware/upload.ts
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
// Configurar multer para almacenar archivos
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        console.log(req.body);
        // Definir la carpeta en función de la URL de la boda
        const bodaUrl = req.body.boda_url;
        const dir = path_1.default.join(__dirname, `../../uploads/bodas/${bodaUrl}/imagenes`);
        // Verificar si la carpeta existe, si no, crearla
        if (!fs_1.default.existsSync(dir)) {
            fs_1.default.mkdirSync(dir, { recursive: true });
        }
        cb(null, dir); // Establecer la carpeta de destino
    },
    filename: (req, file, cb) => {
        // Nombrar los archivos en función de si es novio o novia
        if (file.fieldname === 'noviaFoto') {
            cb(null, 'novia.jpg');
        }
        else if (file.fieldname === 'novioFoto') {
            cb(null, 'novio.jpg');
        }
    }
});
// Middleware de multer que maneja la subida de archivos para novio y novia
exports.uploadFotosNovios = (0, multer_1.default)({ storage });
