import { Request, Response } from "express"
import { handleHttp } from "../utils/error.handle"
import { RequestExt } from "../interfaces/requestExt"
import { crearHistoria, eliminarHistoria, obtenerHistorias } from "../services/historia.service"

const ObtenerHistorias = async (req:RequestExt,res:Response)=>{
    try{
        const userId = req?.user?.id;
        const {idBoda} = req.params;
        const histroias = await obtenerHistorias(userId,idBoda)
        const data = {"data":histroias, "mensaje":"Historias obtenidas"}
        res.status(200).send(data);
    }catch(e){
        handleHttp(res,'Error al obtener las Historias',e)    
    }
}

const CrearHistoria = async (req:RequestExt,res:Response)=>{
    try{
        const userId = req?.user?.id;
        const nuevaHistoria = await crearHistoria(userId,req.body)
        const data = {"data":nuevaHistoria,"mensaje":'Historia creado con exito'}
        res.status(200).send(data);
    }catch(e){
        handleHttp(res,'Error al crear la Historia',e)    
    }
}

const EliminarHistoria = async (req:RequestExt,res:Response)=>{
    try{
        const userId = req?.user?.id;
        const {idHistoria} = req.params
        const historiaEliminada = await eliminarHistoria(userId,idHistoria)
        const data = {"data":historiaEliminada ,"mensaje":'Historia Eliminada'}
        res.status(200).send(data);
    }catch(e){
        handleHttp(res,'Error al eliminar la Historia',e)    
    }
}

// const editarEvento = async (req:RequestExt,res:Response)=>{
//     try{
       
//         const userId = req?.user?.id;
//         const {idBoda} = req.params;
//         let novia:novia = JSON.parse(req.body.novia);
//         let novio:novio = JSON.parse(req.body.novio);
//         let boda:boda = JSON.parse(req.body.boda);  

//         const editar = {
//             boda: boda,
//             novia: novia,
//             novio: novio
//         };
       
//         const crearBoda = await editarBodaUsuario(userId,idBoda, editar)
//         const data = {"data":crearBoda,"mensaje":'Boda editada con exito'}
//         res.status(200).send(data);
//     }catch(e){
//         handleHttp(res,'Error al crear la Boda',e)    
//     }
// }






export {ObtenerHistorias, CrearHistoria,EliminarHistoria}