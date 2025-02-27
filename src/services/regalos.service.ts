
import { boda } from "../models/boda";
import Sequelize from "../config/database";
import { regalos } from "../models/regalos";

const obtenerRegalo = async (userId:number, idBoda:string) => {
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

        const regalo = await regalos.findOne({
            where:{
                id_boda:idBoda,
            },
            transaction:transaction
        })
        
        transaction.commit()

        return regalo;
        
    } catch (e:any) {
        await transaction.rollback();
        throw new Error(e.message);
    }
};

const editarRegalo = async (userId:number, regalo:regalos) => {
    const transaction = await Sequelize.transaction(); 
    try {

        const bodaExistente = await boda.findOne({
            where:{
                id:regalo.id_boda,
                id_usuario:userId
            },
            transaction
        })

        if (!bodaExistente) {
            const error = new Error('No se encontró una boda con ese ID para el usuario proporcionado.');
            (error as any).statusCode = 404;
            throw error;
        }

        const regaloActualizado = await regalos.findOne({
            where:{
                id_boda:regalo.id_boda,
            },
            transaction
        })

        let nuevoRegalo;

        if(!regaloActualizado){
            nuevoRegalo = await regalos.create(regalo,{transaction})
        }else{
            nuevoRegalo =  await regalos.update(regalo,{
                where: { id_boda: regalo.id_boda },
                transaction,
            })
        }

        //Realizar commit
        await transaction.commit();
        
        return nuevoRegalo;
        
    } catch (e:any) {
        await transaction.rollback();
        throw new Error(e.message);
    }
};






export {obtenerRegalo,editarRegalo}