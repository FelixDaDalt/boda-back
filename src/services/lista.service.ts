import Sequelize from "../config/database";
import { invitacion } from "../models/invitacion";
import { Op } from "sequelize";
import { lista } from "../models/lista";
import { boda } from "../models/boda";
import { VistaBodas } from "../models/vista_bodas";

interface canciones{
    id?:number,
    nombre:string,
    artista:string,
}




const enviarCanciones = async (key: string, listaCanciones: canciones[]) => {
    const t = await Sequelize.transaction();  // Iniciar la transacción

    try {
        const fechaActual = new Date();

        const invitacionEncontrada = await invitacion.findOne({
            where:{
                randomkey:key,
                fecha_limite: {
                    [Op.gte]: fechaActual 
                }
            },
            transaction: t 
        })

        if (!invitacionEncontrada) {
            const error = new Error('No se encontro la invitacion o ya caduco');
            (error as any).statusCode = 401;
            throw error;
        }

        const cancionesExistentes = await lista.findAll({
            where: {
                randomkey: key,
            },
            transaction: t  // Incluir la transacción
        });

        if (cancionesExistentes && cancionesExistentes.length>4) {
            const error = new Error('Ya ha elegido los 3 temas permitidos');
            (error as any).statusCode = 401;
            throw error;
        }

        const cancionesNuevas = listaCanciones.filter(c=>!c.id)

        const cancionesTotales = cancionesExistentes.length + cancionesNuevas.length;
        if (cancionesTotales > 5) {
            const error = new Error(`No puede agregar más de ${5 - cancionesExistentes.length} temas adicionales`,);
            (error as any).statusCode = 401;
            throw error;
        }

        const listaCreada = cancionesNuevas
        .map(c=>{
                return {
                    nombre:c.nombre,
                    artista: c.artista || 'sin artista',
                    randomkey:key,
                    id_boda:invitacionEncontrada.id_boda
                }
        })

        if(listaCreada.length > 0)
            await lista.bulkCreate(listaCreada, { transaction: t })

        const listaUsuario = await lista.findAll({
            where:{
                randomkey:key,
            },
            transaction:t
        })

        await t.commit();

        return listaUsuario

    } catch (e: any) {
        // Si algo falla, se revierte la transacción
        await t.rollback();

        throw new Error('Error al procesar las canciones: ' + e.message);
    }
};

const eliminarCancion = async (key: string, id:string) => {
    const t = await Sequelize.transaction();
    try{

        const fechaActual = new Date();
    
        const invitacionEncontrada = await invitacion.findOne({
            where:{
                randomkey:key,
                fecha_limite: {
                    [Op.gte]: fechaActual 
                }
            },
            transaction: t 
        })
    
        if (!invitacionEncontrada) {
            const error = new Error('No se encontro la invitacion o ya caduco');
            (error as any).statusCode = 401;
            throw error;
        }
    
        const cancion = await lista.findOne({
            where:{
                id:id,
                randomkey:key
            },
            transaction:t
        })
    
        if (!cancion) {
            const error = new Error('No se encontro la cancion');
            (error as any).statusCode = 401;
            throw error;
        }
    
        await cancion.destroy({transaction:t})

        await t.commit()
    
        return id

    }catch (e: any) {
        await t.rollback();
        throw new Error('Error al procesar las canciones: ' + e.message);
    }
  
}

const obtenerCanciones = async (userId:number, idBoda:string) => {
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

        const canciones = await VistaBodas.findAll({
            where:{
                id_boda:idBoda,
            },
            transaction:transaction
        })
        
        transaction.commit()

        return canciones;
        
    } catch (e:any) {
        await transaction.rollback();
        throw new Error(e.message);
    }
};

export {enviarCanciones,eliminarCancion,obtenerCanciones}