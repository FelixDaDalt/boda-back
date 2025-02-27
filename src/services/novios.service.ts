
import { boda } from "../models/boda";
import Sequelize from "../config/database";
import { novio } from "../models/novio";
import { novia } from "../models/novia";

interface edicionNovios{
    novio:novio,
    novia:novia
}

const obtenerNovios = async (userId:number, idBoda:string) => {
    const transaction = await Sequelize.transaction(); 
    try {

        const bodaExistente = await boda.findOne({
            where:{
                id:idBoda,
                id_usuario:userId
            },
            include:[{
                model:novio,
                as:'id_novio_novio',
                required:true
            },
            {
                model:novia,
                as:'id_novia_novium',
                required:true
            }],
            transaction:transaction
        })

        if (!bodaExistente) {
            const error = new Error('No se encontró una boda con ese ID para el usuario proporcionado.');
            (error as any).statusCode = 404;
            throw error;
        }

        const data = {
            boda_url:bodaExistente.url,
            novio:bodaExistente.id_novio_novio,
            novia:bodaExistente.id_novia_novium
        }
        
        transaction.commit()

        return data;
        
    } catch (e:any) {
        await transaction.rollback();
        throw new Error(e.message);
    }
};

const editarNovios = async (userId:number, novios:edicionNovios) => {
    const transaction = await Sequelize.transaction(); 
    try {
        
        // Insertar la novia y obtener su id
        const noviaEditada = await novia.update(
            { ...novios.novia }, // Datos a actualizar
            {
              where: { id: novios.novia.id }, // Condición para encontrar el registro
              transaction,                    // Transacción en el mismo objeto
            }
          );

        // Insertar el novio y obtener su id
        const novioEditado = await novio.update(
            { ...novios.novio }, // Datos a actualizar
            {
              where: { id: novios.novio.id }, // Condición para encontrar el registro
              transaction,                    // Transacción en el mismo objeto
            }
          );


        //Realizar commit
        await transaction.commit();

        const editados = {
            novio:novioEditado,
            novia:noviaEditada
        }
        
        return editados;
        
    } catch (e:any) {
        await transaction.rollback();
        throw new Error(e.message);
    }
};







export {obtenerNovios,editarNovios}