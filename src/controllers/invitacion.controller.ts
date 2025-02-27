import { Response } from "express"
import { handleHttp } from "../utils/error.handle"
import { RequestExt } from "../interfaces/requestExt"
import { confirmar, crearInvitacion, eliminarInvitacion, obtenerInvitaciones } from "../services/invitacion.service"



const confirmarInvitacion = async (req:RequestExt,res:Response)=>{
    try{
        const {invitacion} = req.params
        const confirmacion = await confirmar(invitacion,req.body)
        const data = {"data":confirmacion,"mensaje":'Invitaciones actualizadas'}
        res.status(200).send(data);
    }catch(e){
        handleHttp(res,'Error al confirmar las invitaciones',e)    
    }
}

const CrearInvitacion = async (req:RequestExt,res:Response)=>{
    try{
        const userId = req?.user?.id;
        const crearBoda = await crearInvitacion(userId,req.body)
        const data = {"data":crearBoda,"mensaje":'Invitacion creada con exito'}
        res.status(200).send(data);
    }catch(e){
        handleHttp(res,'Error al crear la invitacion',e)    
    }
}

const EliminarInvitacion = async (req:RequestExt,res:Response)=>{
    try{
        const userId = req?.user?.id;
        const {idInvitacion} = req.params
        const invitacionEliminado = await eliminarInvitacion(userId,idInvitacion)
        const data = {"data":invitacionEliminado ,"mensaje":'Invitacion Eliminada'}
        res.status(200).send(data);
    }catch(e){
        handleHttp(res,'Error al eliminar la invitacion',e)    
    }
}

const ObtenerInvitaciones = async (req:RequestExt,res:Response)=>{
    try{
        const userId = req?.user?.id;
        const {idBoda} = req.params;
        const invitaciones = await obtenerInvitaciones(userId,idBoda)
        const data = {"data":invitaciones, "mensaje":"Invitaciones obtenidas"}
        res.status(200).send(data);
    }catch(e){
        handleHttp(res,'Error al obtener las invitaciones',e)    
    }
}




export {confirmarInvitacion,CrearInvitacion,ObtenerInvitaciones,EliminarInvitacion}