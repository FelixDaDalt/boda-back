"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.galeriaUpload = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        // Obtener la URL de la boda desde el cuerpo de la solicitud
        const bodaUrl = req.body.boda_url;
        const dir = path_1.default.join(__dirname, `../../uploads/bodas/${bodaUrl}/galeria`);
        // Verificar si la carpeta existe, si no, crearla
        if (!fs_1.default.existsSync(dir)) {
            fs_1.default.mkdirSync(dir, { recursive: true });
        }
        cb(null, dir); // Establecer la carpeta de destino
    },
    filename: (req, file, cb) => {
        // Usar el nombre original del archivo
        cb(null, file.originalname); // Asignar el nombre original del archivo
    }
});
// Middleware de multer que maneja la subida de múltiples imágenes
exports.galeriaUpload = (0, multer_1.default)({ storage }).array('images'); // El campo debe coincidir con el FormData del cliente
