// src/middleware/upload.ts
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { NextFunction,Response, Request,Router } from "express"; 

// Configurar Multer para almacenar archivos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Obtener la URL de la boda para determinar el directorio
        const bodaUrl = req.body.boda_url;
        const dir = path.join(__dirname, `../../uploads/bodas/${bodaUrl}/capturas`);

        // Verificar si la carpeta existe, si no, crearla
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        cb(null, dir); // Establecer el directorio de destino
    },
    filename: (req, file, cb) => {
        // Generar un nombre único para el archivo
        const bodaUrl = req.body.boda_url;
        const fileExtension = path.extname(file.originalname);

        // Generar un nombre único con la fecha y hora
        const timestamp = new Date().toISOString().replace(/[-:.]/g, ''); // Formato: YYYYMMDDHHMMSS
        const uniqueName = `${bodaUrl}_${timestamp}${fileExtension}`;

        cb(null, uniqueName); // Nombre final del archivo
    }
});

// Middleware de Multer para aceptar hasta 5 imágenes (maxCount: 5)
export const uploadCaptura = multer({
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