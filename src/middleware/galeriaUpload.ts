import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { NextFunction,Response, Request,Router } from "express"; 

interface RequestExt extends Request{
    fileIndex?: number;
}

const storage = multer.diskStorage({
    destination: (req: Request, file, cb) => {

        // Obtener la URL de la boda desde el cuerpo de la solicitud
        const bodaUrl = req.body.boda_url; 
        const dir = path.join(__dirname, `../../uploads/bodas/${bodaUrl}/galeria`);

        // Verificar si la carpeta existe, si no, crearla
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        cb(null, dir); // Establecer la carpeta de destino
    },
    filename: (req, file, cb) => {
        // Usar el nombre original del archivo
        cb(null, file.originalname); // Asignar el nombre original del archivo
    }
});

// Middleware de multer que maneja la subida de múltiples imágenes
export const galeriaUpload = multer({ storage }).array('images'); // El campo debe coincidir con el FormData del cliente