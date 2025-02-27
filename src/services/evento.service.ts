
import { boda } from "../models/boda";
import Sequelize from "../config/database";
import { evento } from "../models/evento";


const crearEvento = async (userId:number, nuevoEvento:evento) => {
    const transaction = await Sequelize.transaction(); 
    try {

        const bodaExistente = await boda.findOne({
            where:{
                id:nuevoEvento.id_boda,
                id_usuario:userId
            }
        })

        if (!bodaExistente) {
            const error = new Error('No se encontró una boda con ese ID para el usuario proporcionado.');
            (error as any).statusCode = 404;
            throw error;
        }

        const eventos = await evento.findAll({
            where:{
                id_boda:nuevoEvento.id_boda,
            }
        })

        if(eventos.some(evento => evento.principal == 1) && nuevoEvento.principal){
            const error = new Error('No puede haber dos eventos principales');
            (error as any).statusCode = 404;
            throw error;
        }

        if(eventos.length >=3){
            const error = new Error('No puedes crear mas de 3 eventos');
            (error as any).statusCode = 404;
            throw error;
        }

        const eventoCreado = await evento.create(nuevoEvento,{transaction:transaction})

        //Realizar commit
        await transaction.commit();

        // excluir id_usuario
        const { ...respuesta } = eventoCreado.get();
        
        return respuesta;
        
    } catch (e:any) {
        await transaction.rollback();
        throw new Error(e.message);
    }
};

const obtenerEventos = async (userId:number, idBoda:string) => {
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

        const eventos = await evento.findAll({
            where:{
                id_boda:idBoda,
            },
            transaction:transaction
        })
        
        transaction.commit()

        return eventos;
        
    } catch (e:any) {
        await transaction.rollback();
        throw new Error(e.message);
    }
};

const eliminarEvento = async (userId: string, idEvento: string) => {
    const transaction = await Sequelize.transaction();
    try {
      // Buscar la boda para obtener los IDs de la novia y el novio
      const eventoEncontrado = await evento.findOne({
        where: { id: idEvento },
        include: [
          {
            model: boda,
            as: 'id_boda_boda', // Alias configurado en la relación
            required: true,
            where: { id_usuario: userId },
          },
        ],
        transaction,
      });
  
      if (!eventoEncontrado) {
        const error = new Error(
          "No se encontró el evento con ese ID para el usuario proporcionado."
        );
        (error as any).statusCode = 404;
        throw error;
      }
  
     
      // Eliminar invitados relacionados con las invitaciones de la boda
      await evento.destroy({
        where: {
          id:idEvento,
        },
        transaction,
      });
    
      // Commit de la transacción
      await transaction.commit();
  
      return eventoEncontrado
    } catch (e: any) {
        await transaction.rollback();
        throw new Error(e.message);
    }
  };


export {crearEvento,obtenerEventos,eliminarEvento}