import { Request, Response } from "express"
import { handleHttp } from "../utils/error.handle"
import { RequestExt } from "../interfaces/requestExt"
import { editarRegalo, obtenerRegalo } from "../services/regalos.service"

const ObtenerRegalo = async (req:RequestExt,res:Response)=>{
    try{
        const userId = req?.user?.id;
        const {idBoda} = req.params;
        const eventos = await obtenerRegalo(userId,idBoda)
        const data = {"data":eventos, "mensaje":"Seccion regalo obtenida"}
        res.status(200).send(data);
    }catch(e){
        handleHttp(res,'Error al obtener la seccion regalo',e)    
    }
}

const EditarRegalo = async (req:RequestExt,res:Response)=>{
    try{
        const userId = req?.user?.id;   
        const crearBoda = await editarRegalo(userId,req.body)
        const data = {"data":crearBoda,"mensaje":'Seccion regalo editada con exito'}
        res.status(200).send(data);
    }catch(e){
        handleHttp(res,'Error al editar la seccion Regalos',e)    
    }
}

export {ObtenerRegalo, EditarRegalo}