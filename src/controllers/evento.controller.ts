import { Request, Response } from "express"
import { handleHttp } from "../utils/error.handle"
import { crearBodaUsuario, editarBodaUsuario, obtenerBodaDetalle, obtenerBodasUsuario } from "../services/bodas.service"
import { RequestExt } from "../interfaces/requestExt"
import { boda } from "../models/boda"
import { novia } from "../models/novia"
import { novio } from "../models/novio"
import { crearEvento, eliminarEvento, obtenerEventos } from "../services/evento.service"

const ObtenerEventos = async (req:RequestExt,res:Response)=>{
    try{
        const userId = req?.user?.id;
        const {idBoda} = req.params;
        const eventos = await obtenerEventos(userId,idBoda)
        const data = {"data":eventos, "mensaje":"Eventos obtenidos"}
        res.status(200).send(data);
    }catch(e){
        handleHttp(res,'Error al obtener los eventos',e)    
    }
}

const CrearEvento = async (req:RequestExt,res:Response)=>{
    try{
        const userId = req?.user?.id;
        const crearBoda = await crearEvento(userId,req.body)
        const data = {"data":crearBoda,"mensaje":'Evento creado con exito'}
        res.status(200).send(data);
    }catch(e){
        handleHttp(res,'Error al crear el evento',e)    
    }
}

const EliminarEvento = async (req:RequestExt,res:Response)=>{
    try{
        const userId = req?.user?.id;
        const {idEvento} = req.params
        const eventoEliminado = await eliminarEvento(userId,idEvento)
        const data = {"data":eventoEliminado ,"mensaje":'Evento Eliminado'}
        res.status(200).send(data);
    }catch(e){
        handleHttp(res,'Error al eliminar el evento',e)    
    }
}





export {ObtenerEventos, CrearEvento,EliminarEvento}