import { Request, Response } from 'express';
import { RequestExt } from '../interfaces/requestExt';
import { crearGaleria, obtenerGaleria } from '../services/galeria.service';
import { handleHttp } from '../utils/error.handle';


const ObtenerGaleria = async (req:RequestExt,res:Response)=>{
  try{
      const userId = req?.user?.id;
      const {idBoda} = req.params;
      const eventos = await obtenerGaleria(userId,idBoda)
      const data = {"data":eventos, "mensaje":"Galeria obtenida"}
      res.status(200).send(data);
  }catch(e){
      handleHttp(res,'Error al obtener la galeria',e)    
  }
}

const CrearGaleria = async (req: RequestExt, res: Response) => {
  try{
      const userId = req?.user?.id;
      const bodaUrl = req.body.boda_url;
      const bodaId = req.body.boda_id;
      const files = req.files as Express.Multer.File[];;

      let archivos:any[]=[]
      if(files && files.length > 0){
        archivos = files.map((file) => ({
          url: `/uploads/bodas/${bodaUrl}/galeria/${file.originalname}`, // Construir la URL del archivo
      }));
      }

      if(archivos?.length>0){
        const galeria = await crearGaleria(archivos,bodaId,userId)
        const data = {"data":galeria,"mensaje":'Galeria creada con exito'}
        res.status(200).send(data);
      }

    }catch(e){
      handleHttp(res,'Error al crear la geleria',e)    
  }
     
};

export {ObtenerGaleria,CrearGaleria}