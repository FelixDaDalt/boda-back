import { boda } from "../models/boda";
import Sequelize from "../config/database";
import { galeria} from '../models/galeria';


const crearGaleria = async (archivos:any[],bodaId:string,userId:string) => {
    const transaction = await Sequelize.transaction(); 
   
    try {
        const bodaExistente = await boda.findOne({
            where:{
                id:bodaId,
                id_usuario:userId
            }
        })

        if (!bodaExistente) {
            const error = new Error('No se encontró una boda con ese ID para el usuario proporcionado.');
            (error as any).statusCode = 404;
            throw error;
        }
        
        for (let index = 0; index < archivos.length; index++) {
            const url = archivos[index].url;
            const encontrado = await galeria.findOne({
                where:{
                    id_boda:bodaId,
                    url:url
                },
                transaction:transaction
            })

            if(!encontrado){
                const galeriaUrl = {
                    id_boda:Number(bodaId),
                    url:url
                }
                await galeria.create(galeriaUrl,{transaction:transaction})
            }
            
        }
       

        //Realizar commit
        await transaction.commit();

       
        return { mensaje: 'Galería creada exitosamente.' };
        
    } catch (e:any) {
        await transaction.rollback();
        throw new Error(e.message);
    }
};

const obtenerGaleria = async (userId:number, idBoda:string) => {
    const transaction = await Sequelize.transaction(); 
    try {

        const bodaExistente = await boda.findOne({
            where:{
                id:idBoda,
                id_usuario:userId
            },
            transaction:transaction
        })

        if (!bodaExistente) {
            const error = new Error('No se encontró una boda con ese ID para el usuario proporcionado.');
            (error as any).statusCode = 404;
            throw error;
        }

        const galeriaEncontrada = await galeria.findAll({
            where:{
                id_boda:idBoda,
            },
            transaction:transaction
        })
        
        transaction.commit()

        return galeriaEncontrada;
        
    } catch (e:any) {
        await transaction.rollback();
        throw new Error(e.message);
    }
};



export {crearGaleria,obtenerGaleria}