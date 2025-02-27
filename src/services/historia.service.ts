
import { boda } from "../models/boda";
import Sequelize from "../config/database";
import { historia } from "../models/historia";


const crearHistoria = async (userId:number, nuevaHistoria:historia) => {
    const transaction = await Sequelize.transaction(); 
    try {

        const bodaExistente = await boda.findOne({
            where:{
                id:nuevaHistoria.id_boda,
                id_usuario:userId
            }
        })

        if (!bodaExistente) {
            const error = new Error('No se encontró una boda con ese ID para el usuario proporcionado.');
            (error as any).statusCode = 404;
            throw error;
        }
        

        const historias = await historia.findAll({
            where:{
                id_boda:nuevaHistoria.id_boda,
                borrado:0
            }
        })

        if(historias.length>3){
            const error = new Error('No puedes crear mas de 4 historias');
            (error as any).statusCode = 404;
            throw error;
        }


        const historiaCreada = await historia.create(nuevaHistoria,{transaction:transaction})

        //Realizar commit
        await transaction.commit();

        // excluir id_usuario
        const { ...respuesta } = historiaCreada.get();
        
        return respuesta;
        
    } catch (e:any) {
        await transaction.rollback();
        throw new Error(e.message);
    }
};

const obtenerHistorias = async (userId:number, idBoda:string) => {
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

        const historias = await historia.findAll({
            where:{
                id_boda:idBoda,
                borrado:0
            },
            order: [['fecha', 'ASC']],
            transaction:transaction
        })
        
        transaction.commit()

        return historias;
        
    } catch (e:any) {
        await transaction.rollback();
        throw new Error(e.message);
    }
};

const eliminarHistoria = async (userId: string, idHistoria: string) => {
    const transaction = await Sequelize.transaction();
    try {
      // Buscar la boda para obtener los IDs de la novia y el novio
      const historiaEncontrada = await historia.findOne({
        where: { id: idHistoria },
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
  
      if (!historiaEncontrada) {
        const error = new Error(
          "No se encontró el evento con ese ID para el usuario proporcionado."
        );
        (error as any).statusCode = 404;
        throw error;
      }
  
     
      // Eliminar invitados relacionados con las invitaciones de la boda
      await historia.destroy({
        where: {
          id:idHistoria,
        },
        transaction,
      });
    
      // Commit de la transacción
      await transaction.commit();
  
      return historiaEncontrada
    } catch (e: any) {
        await transaction.rollback();
        throw new Error(e.message);
    }
  };


export {crearHistoria,obtenerHistorias,eliminarHistoria}