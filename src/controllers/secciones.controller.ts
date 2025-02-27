import { Request, Response } from "express"
import { handleHttp } from "../utils/error.handle"
import { RequestExt } from "../interfaces/requestExt"
import { editarSecciones, obtenerSecciones } from "../services/secciones.service"

const ObtenerSecciones = async (req:RequestExt,res:Response)=>{
    try{
        const userId = req?.user?.id;
        const {idBoda} = req.params;
        const eventos = await obtenerSecciones(userId,idBoda)
        const data = {"data":eventos, "mensaje":"Eventos obtenidos"}
        res.status(200).send(data);
    }catch(e){
        handleHttp(res,'Error al obtener los eventos',e)    
    }
}

const EditarSecciones = async (req:RequestExt,res:Response)=>{
    try{
        const userId = req?.user?.id;   
        const crearBoda = await editarSecciones(userId,req.body)
        const data = {"data":crearBoda,"mensaje":'Boda editada con exito'}
        res.status(200).send(data);
    }catch(e){
        handleHttp(res,'Error al crear la Boda',e)    
    }
}

export {ObtenerSecciones,EditarSecciones}