// src/middleware/upload.ts
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { NextFunction,Response, Request,Router } from "express"; 

// Configurar multer para almacenar archivos
const storage = multer.diskStorage({
    destination: (req:Request, file, cb) => {
        console.log(req.body)
        // Definir la carpeta en función de la URL de la boda
        const bodaUrl = req.body.boda_url; 
        const dir = path.join(__dirname, `../../uploads/bodas/${bodaUrl}/imagenes`);

        // Verificar si la carpeta existe, si no, crearla
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        cb(null, dir); // Establecer la carpeta de destino
    },
    filename: (req, file, cb) => {
        // Nombrar los archivos en función de si es novio o novia
        if (file.fieldname === 'noviaFoto') {
            cb(null, 'novia.jpg');
        } else if (file.fieldname === 'novioFoto') {
            cb(null, 'novio.jpg');
        }
    }
});

// Middleware de multer que maneja la subida de archivos para novio y novia
export const uploadFotosNovios = multer({ storage });