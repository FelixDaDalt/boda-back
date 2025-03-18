// src/middleware/upload.ts
import multer from 'multer';
import path from 'path';
import fs from 'fs';
// @ts-ignore
import sharp from 'sharp';

import { NextFunction,Response, Request,Router } from "express"; 

// Configurar Multer para almacenar archivos
// Configuración de Multer para almacenar los archivos en memoria
const storage = multer.memoryStorage();

// Middleware para manejar la subida de archivos y compresión
export const uploadCaptura = multer({
    storage: storage, // Usar almacenamiento en memoria
    fileFilter: (req, file, cb) => {
        // Solo aceptar imágenes JPEG
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
    { name: 'capturas[]', maxCount: 5 }
]);

// Middleware para comprimir las imágenes
export const compressImage = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Verificar si hay archivos en la solicitud
        if (req.files && 'capturas[]' in req.files) {
            const files = req.files['capturas[]'] as Express.Multer.File[];

            // Comprimir cada archivo de imagen antes de subirlo
            for (const file of files) {
                const image = sharp(file.buffer);
            
                // Redimensionar, rotar y convertir a buffer
                const resizedImageBuffer = await image
                    .resize({
                        width: 1920, // Limitar el ancho máximo a 1920 px
                        withoutEnlargement: true, // No permitir que la imagen se amplíe si ya es más pequeña
                    })
                    .rotate()
                    .jpeg({ quality: 80 })
                    .toBuffer(); // Convertir la imagen redimensionada a buffer
            
                // Crear una nueva instancia de sharp con el buffer redimensionado
                const resizedImage = sharp(resizedImageBuffer);
            
                // Obtener las dimensiones de la imagen redimensionada
                const { width, height } = await resizedImage.metadata();
            
                // Crear el buffer del SVG con las nuevas dimensiones
                // 🔥 Calcular el tamaño del texto proporcional al alto de la imagen
                const fontSize = Math.max(Math.min(width, height) * 0.05, 15); 
                const yPosition = height - fontSize - 10; // Ubicar el texto arriba del borde inferior

                // Crear el buffer del SVG con tamaño de texto dinámico
                const svgBuffer = Buffer.from(
                    `<svg width="${width}" height="${height}">
                        <style>
                            .watermark-text {
                                font-family: 'Dancing Script', cursive;
                                font-size: ${fontSize}px;
                                fill: rgba(255, 255, 255, 0.5);
                                text-anchor: start;
                            }
                        </style>
                        <text x="10" y="${yPosition}" class="watermark-text">
                            www.celebremosnuestroamor.com.ar
                        </text>
                    </svg>`
                );
            
                // Aplicar la marca de agua con composite()
                const compressedBuffer = await resizedImage
                    .composite([
                        {
                            input: svgBuffer,
                            gravity: 'southwest', // Coloca el texto en la parte inferior izquierda
                        }
                    ])
                    .toBuffer();
            
                // Reemplazar el archivo original con el comprimido
                file.buffer = compressedBuffer;
            }
        }
        next();
    } catch (error) {
        next(error);
    }
};

// Middleware para guardar las imágenes comprimidas en el servidor
export const guardarCaptura = (req: Request, res: Response, next: NextFunction) => {
    try {
        // Verificar si se han subido archivos
        if (!req.files || !('capturas[]' in req.files)) {
            const error = new Error('No se subieron archivos o no hay archivos válidos');
            return next(error);  // Llamamos a next con el error
        }

        const files = req.files['capturas[]'] as Express.Multer.File[];
        const bodaUrl = req.body.boda_url;
        const dir = path.join(__dirname, `../../uploads/bodas/${bodaUrl}/capturas`);
        
        // Crear el directorio si no existe
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        // Guardar los archivos comprimidos
        for (const file of files) {
            const fileExtension = path.extname(file.originalname); // Extensión del archivo
            const timestamp = new Date().toISOString().replace(/[-:.]/g, ''); // Formato: YYYYMMDDHHMMSS
            const uniqueName = `${bodaUrl}_${timestamp}${fileExtension}`; // Nombre único basado en la URL y timestamp

            // Ruta completa con el nombre único
            const filePath = path.join(dir, uniqueName);
            fs.writeFileSync(filePath, file.buffer);  // Guardar el buffer comprimido
            file.filename = uniqueName;
        }

        // Llamamos a next() para continuar con el siguiente middleware o controlador
        next();
    } catch (error) {
        console.error(error);
        next(error);  // Si hay un error, pasarlo al siguiente middleware de manejo de errores
    }
};


