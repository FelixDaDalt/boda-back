"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.guardarCaptura = exports.compressImage = exports.uploadCaptura = void 0;
// src/middleware/upload.ts
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
// @ts-ignore
const sharp_1 = __importDefault(require("sharp"));
// Configurar Multer para almacenar archivos
// Configuración de Multer para almacenar los archivos en memoria
const storage = multer_1.default.memoryStorage();
// Middleware para manejar la subida de archivos y compresión
exports.uploadCaptura = (0, multer_1.default)({
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
const compressImage = async (req, res, next) => {
    try {
        // Verificar si hay archivos en la solicitud
        if (req.files && 'capturas[]' in req.files) {
            const files = req.files['capturas[]'];
            // Comprimir cada archivo de imagen antes de subirlo
            for (const file of files) {
                const image = (0, sharp_1.default)(file.buffer);
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
                const resizedImage = (0, sharp_1.default)(resizedImageBuffer);
                // Obtener las dimensiones de la imagen redimensionada
                const { width, height } = await resizedImage.metadata();
                // Crear el buffer del SVG con las nuevas dimensiones
                // 🔥 Calcular el tamaño del texto proporcional al alto de la imagen
                const fontSize = Math.max(Math.min(width, height) * 0.05, 15);
                const yPosition = height - fontSize - 10; // Ubicar el texto arriba del borde inferior
                // Crear el buffer del SVG con tamaño de texto dinámico
                const svgBuffer = Buffer.from(`<svg width="${width}" height="${height}">
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
                    </svg>`);
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
    }
    catch (error) {
        next(error);
    }
};
exports.compressImage = compressImage;
// Middleware para guardar las imágenes comprimidas en el servidor
const guardarCaptura = (req, res, next) => {
    try {
        // Verificar si se han subido archivos
        if (!req.files || !('capturas[]' in req.files)) {
            const error = new Error('No se subieron archivos o no hay archivos válidos');
            return next(error); // Llamamos a next con el error
        }
        const files = req.files['capturas[]'];
        const bodaUrl = req.body.boda_url;
        const dir = path_1.default.join(__dirname, `../../uploads/bodas/${bodaUrl}/capturas`);
        // Crear el directorio si no existe
        if (!fs_1.default.existsSync(dir)) {
            fs_1.default.mkdirSync(dir, { recursive: true });
        }
        // Guardar los archivos comprimidos
        for (const file of files) {
            const fileExtension = path_1.default.extname(file.originalname); // Extensión del archivo
            const timestamp = new Date().toISOString().replace(/[-:.]/g, ''); // Formato: YYYYMMDDHHMMSS
            const uniqueName = `${bodaUrl}_${timestamp}${fileExtension}`; // Nombre único basado en la URL y timestamp
            // Ruta completa con el nombre único
            const filePath = path_1.default.join(dir, uniqueName);
            fs_1.default.writeFileSync(filePath, file.buffer); // Guardar el buffer comprimido
            file.filename = uniqueName;
        }
        // Llamamos a next() para continuar con el siguiente middleware o controlador
        next();
    }
    catch (error) {
        console.error(error);
        next(error); // Si hay un error, pasarlo al siguiente middleware de manejo de errores
    }
};
exports.guardarCaptura = guardarCaptura;
