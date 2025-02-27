import { Request, Response } from "express"
import { handleHttp } from "../utils/error.handle"
import { RequestExt } from "../interfaces/requestExt"
import { meGusta, obtenerCapturas, subirCaptura } from "../services/captura.service"

export interface nuevaCaptura{
    id_boda?:number,
    boda_url:string,
    fecha:string,
    hora:string,
    url:string,
    invitacion:string
}


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

const SubirCaptura = async (req: RequestExt, res: Response) => {
    try {
        const bodaUrl = req.body.boda_url;
        const invitacion = req.body.invitacion;

        // Obtener los archivos subidos (campo 'capturas[]')
        const files = req.files as { [fieldname: string]: Express.Multer.File[] };
        const capturas = files['capturas[]'];

        // Verificar si no se subieron archivos
        if (!capturas || capturas.length === 0) {
            const error = new Error('No se ha subido ningun archivo.');
            (error as any).statusCode = 400;
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

            const captura: nuevaCaptura = {
                boda_url: bodaUrl,
                url: `/uploads/bodas/${bodaUrl}/capturas/${nombreDelArchivo}`,
                fecha: fecha,
                hora: hora,
                invitacion: invitacion
            };

            // Guardar cada captura en la base de datos
            const nuevaCaptura = await subirCaptura(captura);
            capturasSubidas.push(nuevaCaptura);
        }

        // Enviar la respuesta con todas las capturas subidas
        const data = { mensaje: 'Fotos subidas con éxito', data: capturasSubidas };
        res.status(200).send(data);
    } catch (e) {
        handleHttp(res, 'Error al subir las fotos', e);
    }
};

const ObtenerCapturas = async (req: Request, res: Response) => {
    try {
        const { url } = req.params;
        const invitacion = req.query.invitacion?.toString();

        // Extraer y validar los parámetros de paginación
        const page = parseInt(req.query.page as string) || 1; // Página actual, por defecto 1
        const limit = parseInt(req.query.limit as string) || 8; // Límite de elementos por página, por defecto 10

        if (!invitacion) {
            throw new Error('Sin Invitación no hay fotos');
        }

        const capturas = await obtenerCapturas(url, invitacion, page, limit);
        const data = { data: capturas, mensaje: 'Capturas obtenidas' };

        res.status(200).send(data);
    } catch (e: any) {
        handleHttp(res, 'Error al obtener las fotos', e);
    }
};


const MeGusta= async (req:RequestExt,res:Response)=>{
    try{
        const {url} = req.params
        const invitacion = req.query.invitacion?.toString();
        const captura = req.query.captura?.toString();
        if(invitacion && captura){
            const capturas = await meGusta(url,invitacion,captura)
            const data = {"data":capturas,"mensaje":'capturas obtenidas'}
            res.status(200).send(data);
        }else{
            throw new Error('Sin Invtacion no hay fotos')
        }    
    }catch(e){
        handleHttp(res,'Error al obtener las fotos',e)    
    }
}



export {SubirCaptura,ObtenerCapturas,MeGusta}