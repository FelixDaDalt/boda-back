
import { boda } from "../models/boda";
import Sequelize from "../config/database";
import { secciones } from "../models/secciones";

const obtenerSecciones = async (userId:number, idBoda:string) => {
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

        const seccion = await secciones.findOne({
            where:{
                id_boda:idBoda,
            },
            transaction:transaction
        })
        
        transaction.commit()

        return seccion;
        
    } catch (e:any) {
        await transaction.rollback();
        throw new Error(e.message);
    }
};

const editarSecciones = async (userId:number, seccionesConfig:secciones) => {
    const transaction = await Sequelize.transaction(); 
    try {

        const bodaExistente = await boda.findOne({
            where:{
                id:seccionesConfig.id_boda,
                id_usuario:userId
            },
            transaction
        })

        if (!bodaExistente) {
            const error = new Error('No se encontró una boda con ese ID para el usuario proporcionado.');
            (error as any).statusCode = 404;
            throw error;
        }

        const seccion = await secciones.findOne({
            where:{
                id_boda:seccionesConfig.id_boda,
            },
            transaction
        })

        if(!seccion){
            const error = new Error('No se encontro la configuracion');
            (error as any).statusCode = 404;
            throw error;
        }

        
        const seccionActualizada = await secciones.update(seccionesConfig,{
            where: { id_boda: seccionesConfig.id_boda },
            transaction,
        })

        //Realizar commit
        await transaction.commit();
        
        return seccionActualizada;
        
    } catch (e:any) {
        await transaction.rollback();
        throw new Error(e.message);
    }
};






export {obtenerSecciones,editarSecciones}