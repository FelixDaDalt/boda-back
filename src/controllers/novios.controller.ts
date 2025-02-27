import { Request, Response } from "express"
import { handleHttp } from "../utils/error.handle"
import { RequestExt } from "../interfaces/requestExt"
import { editarNovios, obtenerNovios } from "../services/novios.service"
import { novia } from "../models/novia"
import { novio } from "../models/novio"

const ObtenerNovios = async (req:RequestExt,res:Response)=>{
    try{
        const userId = req?.user?.id;
        const {idBoda} = req.params;
        const novios = await obtenerNovios(userId,idBoda)
        const data = {"data":novios, "mensaje":"Novios encontrados"}
        res.status(200).send(data);
    }catch(e){
        handleHttp(res,'Error al obtener los novios',e)    
    }
}

const EditarNovios = async (req:RequestExt,res:Response)=>{
    try{
        const userId = req?.user?.id;

        let novia:novia = JSON.parse(req.body.novia);
        let novio:novio = JSON.parse(req.body.novio);

        const editar = {
            novia: novia,
            novio: novio
        };

        const edicion = await editarNovios(userId,editar)
        const data = {"data":edicion,"mensaje":'Novios Editados con exito'}
        res.status(200).send(data);
    }catch(e){
        handleHttp(res,'Error al editar los novios',e)    
    }
}

export {ObtenerNovios,EditarNovios}