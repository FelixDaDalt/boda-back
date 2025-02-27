import { Request, Response } from "express"
import { handleHttp } from "../utils/error.handle"
import { crearBodaUsuario, editarBodaUsuario, eliminarBoda, obtenerBodaDetalle, obtenerBodaInvitacion, obtenerBodasUsuario, obtenerBodaUrl } from "../services/bodas.service"
import { RequestExt } from "../interfaces/requestExt"
import { boda } from "../models/boda"
import { novia } from "../models/novia"
import { novio } from "../models/novio"

const obtenerBodas = async (req:RequestExt,res:Response)=>{
    try{
        const userId = req?.user?.id;
        const bodas = await obtenerBodasUsuario(userId)
        const data = {"data":bodas}
        res.status(200).send(data);
    }catch(e){
        handleHttp(res,'Error al obtener las Bodas',e)    
    }
}

const crearBoda = async (req:RequestExt,res:Response)=>{
    try{
        const userId = req?.user?.id;
        const bodaUrl = req.body.boda_url;

        let novia:novia = JSON.parse(req.body.novia);
        let novio:novio = JSON.parse(req.body.novio);
        let boda:boda = JSON.parse(req.body.boda);

        // Asignar las rutas de las imágenes a los campos de novia y novio
        novia.foto = `/uploads/bodas/${bodaUrl}/imagenes/novia.jpg`;
        novio.foto = `/uploads/bodas/${bodaUrl}/imagenes/novio.jpg`;
   

        const nueva = {
            boda: boda,
            novia: novia,
            novio: novio
        };
       
        const crearBoda = await crearBodaUsuario(userId,nueva)
        const data = {"data":crearBoda,"mensaje":'Boda creada con exito'}
        res.status(200).send(data);
    }catch(e){
        handleHttp(res,'Error al crear la Boda',e)    
    }
}

const editarBoda = async (req:RequestExt,res:Response)=>{
    try{
       
        const userId = req?.user?.id;
        const {idBoda} = req.params;
        let novia:novia = JSON.parse(req.body.novia);
        let novio:novio = JSON.parse(req.body.novio);
        let boda:boda = JSON.parse(req.body.boda);  

        const editar = {
            boda: boda,
            novia: novia,
            novio: novio
        };
       
        const crearBoda = await editarBodaUsuario(userId,idBoda, editar)
        const data = {"data":crearBoda,"mensaje":'Boda editada con exito'}
        res.status(200).send(data);
    }catch(e){
        handleHttp(res,'Error al crear la Boda',e)    
    }
}

const obtenerDetalle = async (req:RequestExt,res:Response)=>{
    try{
        const userId = req?.user?.id;
        const {idBoda} = req.params
        const bodas = await obtenerBodaDetalle(userId,idBoda)
        const data = {"data":bodas,"mensaje":'Boda obtenida'}
        res.status(200).send(data);
    }catch(e){
        handleHttp(res,'Error al obtener la Boda',e)    
    }
}

const obtenerBodaPorUrl = async (req:RequestExt,res:Response)=>{
    try{
        const {url} = req.params
        const invitacion = req.query.invitacion?.toString();
        
        if(invitacion){
            const bodas = await obtenerBodaInvitacion(url,invitacion)
            const data = {"data":bodas,"mensaje":'Boda obtenida'}
            res.status(200).send(data);
        }else{
            const bodas = await obtenerBodaUrl(url)
            const data = {"data":bodas,"mensaje":'Boda obtenida'}
            res.status(200).send(data);
        }

    }catch(e){
        handleHttp(res,'Error al obtener la Boda',e)    
    }
}

const EliminarBoda = async (req:RequestExt,res:Response)=>{
    try{
        const userId = req?.user?.id;
        const {idBoda} = req.params
        const bodaEliminada = await eliminarBoda(userId,idBoda)
        const data = {"data":bodaEliminada,"mensaje":'Boda eliminada con exito'}
        res.status(200).send(data);
    }catch(e){
        handleHttp(res,'Error al crear la Boda',e)    
    }
}






export {obtenerBodas,crearBoda,obtenerDetalle,obtenerBodaPorUrl,editarBoda,EliminarBoda}