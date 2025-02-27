"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadCaptura = void 0;
// src/middleware/upload.ts
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
// Configurar Multer para almacenar archivos
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        // Obtener la URL de la boda para determinar el directorio
        const bodaUrl = req.body.boda_url;
        const dir = path_1.default.join(__dirname, `../../uploads/bodas/${bodaUrl}/capturas`);
        // Verificar si la carpeta existe, si no, crearla
        if (!fs_1.default.existsSync(dir)) {
            fs_1.default.mkdirSync(dir, { recursive: true });
        }
        cb(null, dir); // Establecer el directorio de destino
    },
    filename: (req, file, cb) => {
        // Generar un nombre único para el archivo
        const bodaUrl = req.body.boda_url;
        const fileExtension = path_1.default.extname(file.originalname);
        // Generar un nombre único con la fecha y hora
        const timestamp = new Date().toISOString().replace(/[-:.]/g, ''); // Formato: YYYYMMDDHHMMSS
        const uniqueName = `${bodaUrl}_${timestamp}${fileExtension}`;
        cb(null, uniqueName); // Nombre final del archivo
    }
});
// Middleware de Multer para aceptar hasta 5 imágenes (maxCount: 5)
exports.uploadCaptura = (0, multer_1.default)({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const fileType = file.mimetype;
        if (fileType !== 'image/jpeg') {
            return cb(new Error('Formato de imagen no soportado'));
        }
        cb(null, true);
    },
    limits: {
        files: 5 // Limitar a un máximo de 5 archivos
    }
}).fields([
    { name: 'capturas[]', maxCount: 5 } // Permitimos hasta 5 archivos
]);
