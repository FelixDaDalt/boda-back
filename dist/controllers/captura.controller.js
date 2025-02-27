"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MeGusta = exports.ObtenerCapturas = exports.SubirCaptura = void 0;
const error_handle_1 = require("../utils/error.handle");
const captura_service_1 = require("../services/captura.service");
// const SubirCaptura = async (req:RequestExt,res:Response)=>{
//     try{
//         const bodaUrl = req.body.boda_url;
//         const invitacion = req.body.invitacion;
//         const files = req.files as { [fieldname: string]: Express.Multer.File[] }; 
//         const file = files['captura']?.[0]; // Acceder al archivo 'captura'
//         if (!file) {
//              const error = new Error('No se ha subido ningun archivo.');
//             (error as any).statusCode = 400;
//             throw error;
//         }
//         const nombreDelArchivo = file.filename;
//         // Obtener fecha y hora actual
//         const now = new Date();
//         const fecha = now.toISOString().split('T')[0]; // Formato: YYYY-MM-DD
//         const hora = now.toTimeString().split(' ')[0]; // Formato: HH:MM:SS
//         const captura:nuevaCaptura = {
//             boda_url:bodaUrl,
//             url: `/uploads/bodas/${bodaUrl}/capturas/${nombreDelArchivo}`,
//             fecha: fecha,
//             hora: hora,
//             invitacion:invitacion
//         };
//         const nuevaCaptura = await subirCaptura(captura)
//         const data = {mensaje: 'Foto subida con éxito', data: nuevaCaptura}
//         res.status(200).send(data);
//     }catch(e){
//         handleHttp(res,'Error al subir la Foto',e)    
//     }
// }
const SubirCaptura = async (req, res) => {
    try {
        const bodaUrl = req.body.boda_url;
        const invitacion = req.body.invitacion;
        // Obtener los archivos subidos (campo 'capturas[]')
        const files = req.files;
        const capturas = files['capturas[]'];
        // Verificar si no se subieron archivos
        if (!capturas || capturas.length === 0) {
            const error = new Error('No se ha subido ningun archivo.');
            error.statusCode = 400;
            throw error;
        }
        // Crear una lista para guardar las capturas
        const capturasSubidas = [];
        for (let i = 0; i < capturas.length; i++) {
            const file = capturas[i];
            const nombreDelArchivo = file.filename;
            // Obtener fecha y hora actual
            const now = new Date();
            const fecha = now.toISOString().split('T')[0]; // Formato: YYYY-MM-DD
            const hora = now.toTimeString().split(' ')[0]; // Formato: HH:MM:SS
            const captura = {
                boda_url: bodaUrl,
                url: `/uploads/bodas/${bodaUrl}/capturas/${nombreDelArchivo}`,
                fecha: fecha,
                hora: hora,
                invitacion: invitacion
            };
            // Guardar cada captura en la base de datos
            const nuevaCaptura = await (0, captura_service_1.subirCaptura)(captura);
            capturasSubidas.push(nuevaCaptura);
        }
        // Enviar la respuesta con todas las capturas subidas
        const data = { mensaje: 'Fotos subidas con éxito', data: capturasSubidas };
        res.status(200).send(data);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'Error al subir las fotos', e);
    }
};
exports.SubirCaptura = SubirCaptura;
const ObtenerCapturas = async (req, res) => {
    try {
        const { url } = req.params;
        const invitacion = req.query.invitacion?.toString();
        // Extraer y validar los parámetros de paginación
        const page = parseInt(req.query.page) || 1; // Página actual, por defecto 1
        const limit = parseInt(req.query.limit) || 8; // Límite de elementos por página, por defecto 10
        if (!invitacion) {
            throw new Error('Sin Invitación no hay fotos');
        }
        const capturas = await (0, captura_service_1.obtenerCapturas)(url, invitacion, page, limit);
        const data = { data: capturas, mensaje: 'Capturas obtenidas' };
        res.status(200).send(data);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'Error al obtener las fotos', e);
    }
};
exports.ObtenerCapturas = ObtenerCapturas;
const MeGusta = async (req, res) => {
    try {
        const { url } = req.params;
        const invitacion = req.query.invitacion?.toString();
        const captura = req.query.captura?.toString();
        if (invitacion && captura) {
            const capturas = await (0, captura_service_1.meGusta)(url, invitacion, captura);
            const data = { "data": capturas, "mensaje": 'capturas obtenidas' };
            res.status(200).send(data);
        }
        else {
            throw new Error('Sin Invtacion no hay fotos');
        }
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'Error al obtener las fotos', e);
    }
};
exports.MeGusta = MeGusta;
