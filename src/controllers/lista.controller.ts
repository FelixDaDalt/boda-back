import { Response } from "express"
import { handleHttp } from "../utils/error.handle"
import { RequestExt } from "../interfaces/requestExt"
import { eliminarCancion, enviarCanciones, obtenerCanciones } from "../services/lista.service"




const EnviarCanciones = async (req:RequestExt,res:Response)=>{
    try{
        const {invitacion} = req.params
        const canciones = await enviarCanciones(invitacion,req.body)
        const data = {"data":canciones,"mensaje":'Canciones enviadas con exito'}
        res.status(200).send(data);
    }catch(e){
        handleHttp(res,'Error al enviar las canciones',e)    
    }
}

const EliminarCancion = async (req:RequestExt,res:Response)=>{
    try{
        const {invitacion} = req.params
        const {id} = req.query
        const cancion = await eliminarCancion(invitacion,id as string)
        const data = {"data":cancion,"mensaje":'Cancion Eliminada'}
        res.status(200).send(data);
    }catch(e){
        handleHttp(res,'Error al eliminar la cancion',e)    
    }
}

const ObtenerCanciones = async (req:RequestExt,res:Response)=>{
    try{
        const userId = req?.user?.id;
        const {idBoda} = req.params;
        const canciones = await obtenerCanciones(userId,idBoda)
        const data = {"data":canciones, "mensaje":"Canciones obtenidas"}
        res.status(200).send(data);
    }catch(e){
        handleHttp(res,'Error al obtener las canciones',e)    
    }
}



export {EnviarCanciones,EliminarCancion,ObtenerCanciones}