import { novio } from "../models/novio";
import { boda } from "../models/boda";
import { novia } from "../models/novia";
import Sequelize from "../config/database";
import { invitacion } from "../models/invitacion";
import { invitado } from "../models/invitado";
import { Op } from "sequelize";

interface confirmacion{
    id_invitado:number
    confirmacion:number
    vegetariano:number
    menor:number
}

interface nuevaInvitacion{
    invitacion:invitacion
    invitados:invitado[]
}



const confirmar = async (key: string, confirmacion: confirmacion[]) => {
    const t = await Sequelize.transaction();  // Iniciar la transacción

    try {
        const fechaActual = new Date();

        const invitacio = await invitacion.findOne({
            where: {
                randomkey: key,
                fecha_limite: {
                    [Op.gte]: fechaActual 
                }
            },
            include: [{
                model: invitado,
                as: 'invitados',
                required: true
            }],
            transaction: t  // Incluir la transacción
        });

        if (!invitacio) {
            const error = new Error('Invitación no encontrada o la fecha límite ha expirado');
            (error as any).statusCode = 401;
            throw error;
        }

        // Iterar sobre los invitados y actualizar el campo 'confirmado'
        for (let i = 0; i < confirmacion.length; i++) {
            const conf = confirmacion[i];
            const invitadoEncontrado = invitacio.invitados.find((inv: invitado) => inv.id == conf.id_invitado);

            if (invitadoEncontrado) {
                invitadoEncontrado.confirmado = conf.confirmacion;
                invitadoEncontrado.vegetariano = conf.vegetariano;
                invitadoEncontrado.menor = conf.menor;
            }
        }

        // Guardar los cambios en todos los invitados dentro de la transacción
        await Promise.all(invitacio.invitados.map((invitadoActualizado: any) => invitadoActualizado.save({ transaction: t })));

        // Si todo ha ido bien, confirmar la transacción
        await t.commit();

        return invitacio.invitados

    } catch (e: any) {
        // Si algo falla, se revierte la transacción
        await t.rollback();

        throw new Error('Error al procesar las confirmaciones: ' + e.message);
    }
};

const crearInvitacion = async (userId:string, nuevaInvitacion:nuevaInvitacion) => {
    const transaction = await Sequelize.transaction();

    try {
        const bodaEncontrada = await boda.findOne({
            where: {
              id: nuevaInvitacion.invitacion.id_boda,
              id_usuario: userId,
            },
            transaction,
          });
      
          if (!bodaEncontrada) {
            const error = new Error(
              "No se encontró una boda con ese ID para el usuario proporcionado."
            );
            (error as any).statusCode = 404;
            throw error;
          }
      

        const invitacionCreada = await invitacion.create(nuevaInvitacion.invitacion,{transaction})
        const invitados = nuevaInvitacion.invitados.map((invitado: invitado) => ({
            ...invitado,
            id_invitacion: invitacionCreada.id,
          }));

        await invitado.bulkCreate(invitados, { transaction });

         // Confirmar la transacción
    await transaction.commit();

    return invitacionCreada ;

    } catch (e: any) {

        await transaction.rollback();

        throw new Error('Error al procesar las confirmaciones: ' + e.message);
    }
};

const obtenerInvitaciones = async (userId:number, idBoda:string) => {
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

        const invitaciones = await invitacion.findAll({
            where:{
                id_boda:idBoda,
            },
            include:[{
                model:invitado,
                as:'invitados',
                required:false
            }],
            transaction:transaction
        })

        let cantidadInvitados = 0;
            let cantidadConfirmados = 0;
            let cantidadNoConfirmados = 0;

        invitaciones.forEach((invitacion) => {
            // Recorremos los invitados de la invitación
            invitacion.invitados.forEach((invitado) => {
                cantidadInvitados++;
                if (invitado.confirmado == 1) {
                    cantidadConfirmados++;
                } else if (invitado.confirmado == 0) {
                    cantidadNoConfirmados++;
                }
            });
        });

        transaction.commit()

        return {
            cantidadInvitados:cantidadInvitados,
            cantidadConfirmados:cantidadConfirmados,
            cantidadNoConfirmados:cantidadNoConfirmados,
            invitaciones
        };
        
    } catch (e:any) {
        await transaction.rollback();
        throw new Error(e.message);
    }
};

const eliminarInvitacion= async (userId: string, idInvitacion: string) => {
    const transaction = await Sequelize.transaction();
    try {
      // Buscar la boda para obtener los IDs de la novia y el novio
      const invitacionEncontrada = await invitacion.findOne({
        where: { id: idInvitacion },
        include: [
          {
            model: invitado,
            as: 'invitados', // Alias configurado en la relación
            required: true,
          },
          {
            model:boda,
            as:'id_boda_boda',
            where:{id_usuario:userId}
          }
        ],
        transaction,
      });
  
      if (!invitacionEncontrada) {
        const error = new Error(
          "No se encontró la invitacion."
        );
        (error as any).statusCode = 404;
        throw error;
      }
  
     
       // Eliminar invitados relacionados con la invitación
        await invitado.destroy({
        where: {
          id_invitacion: idInvitacion, // Suponiendo que hay una columna `id_invitacion` en `invitado`
        },
        transaction,
      });
  
      // Eliminar la invitación
      await invitacion.destroy({
        where: {
          id: idInvitacion,
        },
        transaction,
      });
    
      // Commit de la transacción
      await transaction.commit();
  
      return invitacionEncontrada
    } catch (e: any) {
        await transaction.rollback();
        throw new Error(e.message);
    }
  };



export {confirmar,crearInvitacion,obtenerInvitaciones, eliminarInvitacion}