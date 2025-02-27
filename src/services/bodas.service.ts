import { Op } from 'sequelize';  // Importa 'Op' desde 'sequelize'
import { novio } from "../models/novio";
import { boda } from "../models/boda";
import { novia } from "../models/novia";
import Sequelize from "../config/database";
import { evento } from "../models/evento";
import { invitacion } from "../models/invitacion";
import { invitado } from "../models/invitado";
import { historia } from '../models/historia';
import { lista } from '../models/lista';
import { galeria } from '../models/galeria';
import { secciones } from '../models/secciones';
import { regalos } from '../models/regalos';


interface nuevaBoda{
    boda:boda,
    novio:novio,
    novia:novia
}



const obtenerBodasUsuario = async (userId:string) => {
    try {
        const bodasUsuario = await boda.findAll({
            where: {
                id_usuario: userId
            },
            include:[
                {
                model:novio,
                as:'id_novio_novio',
                required:true
            },
            {
                model:novia,
                as:'id_novia_novium',
                required:true
            }]
        });
        return bodasUsuario;
    } catch (e:any) {
        throw new Error(e.message);
    }
};

const obtenerBodaDetalle = async (userId:string, idBoda: string) => {
    try {
        const bodasUsuario = await boda.findAll({
            where: {
                id_usuario: userId,
                id:idBoda
            },
            attributes: ['id', 'url', 'nombre','activo'],
            include:[{
                model:novio,
                as:'id_novio_novio',
                required:true
            },{
                model:novia,
                as:'id_novia_novium',
                required:true,
            },{
                model: evento,
                as:'eventos',
                required: false,
                attributes: { exclude: ['id_boda'] }, 
            }]
        });
        return bodasUsuario;
    } catch (e:any) {
        throw new Error(e.message);
    }
};

const crearBodaUsuario = async (userId:number, nuevaBoda:nuevaBoda) => {
    const transaction = await Sequelize.transaction(); 
    try {
        
        // Insertar la novia y obtener su id
        const noviaCreada = await novia.create({
            ...nuevaBoda.novia,
            foto: nuevaBoda.novia.foto, // Guardar la ruta de la foto
        }, { transaction });
        const id_novia = noviaCreada.id;

        // Insertar el novio y obtener su id
        const novioCreado = await novio.create({
            ...nuevaBoda.novio,
            foto: nuevaBoda.novio.foto, // Guardar la ruta de la foto
        }, { transaction });
        const id_novio = novioCreado.id

        // Crear la boda y asignar los ids
        const bodaCreada = await boda.create({
            ...nuevaBoda.boda,
            id_usuario: userId,    // Asigna el id del usuario
            id_novia: id_novia,    // Asigna el id de la novia
            id_novio: id_novio     // Asigna el id del novio
        }, { transaction });

        //Realizar commit
        await transaction.commit();

        // excluir id_usuario
        const { id_usuario, ...respuesta } = bodaCreada.get();
        
        return respuesta;
        
    } catch (e:any) {
        await transaction.rollback();
        throw new Error(e.message);
    }
};

const obtenerBodaUrl = async (url:string) => {
    try {
        const bodaDetalle = await boda.findOne({
            where: {
                url: url
            },
            attributes: ['url'],
            include:[{
                model:novio,
                as:'id_novio_novio',
                required:true,
                attributes: ['nombre','apellido'],
            },{
                model:novia,
                as:'id_novia_novium',
                required:true,
                attributes: ['nombre','apellido'],
            }]
        });

        if (!bodaDetalle) {
            const error = new Error('Boda no encontrada.');
            (error as any).statusCode = 404;
            throw error;
        }

        const detalles = {
            url:bodaDetalle?.url || '',
            pareja: {
                novia: {
                    nombre: `${bodaDetalle?.id_novia_novium?.nombre || ''} ${bodaDetalle?.id_novia_novium?.apellido || ''}`,
                },
                novio: {
                    nombre: `${bodaDetalle?.id_novio_novio?.nombre || ''} ${bodaDetalle?.id_novio_novio?.apellido || ''}`,
                }
            },
        }

        return {
            invitacion:false,
            detalles
        }
    } catch (e:any) {
        throw new Error(e.message);
    }
};

const obtenerBodaInvitacion = async (url:string, cod:string) => {
    try {
        const bodaDetalle = await boda.findOne({
            where: {
                url: url
            },
            attributes: ['url'], // Agrega aquí otros atributos de la boda que necesites
            include: [{
                model:secciones,
                as:'secciones',
                required:true
                },{
                model: invitacion,
                as: 'invitacions',
                required: true, // Para asegurar que solo se traigan bodas con invitación válida
                where: {
                    randomkey: cod
                },
                attributes: ['fecha_limite'],
                include:[{
                    model:invitado,
                    as:'invitados',
                    required:false
                }]
            },{
                model:novio,
                as:'id_novio_novio',
                required:true
            },{
                model:novia,
                as:'id_novia_novium',
                required:true,
            },{
                model: evento,
                as:'eventos',
                required: false,
            },{
                model:historia,
                as:'historia',
                required: false,
            },{
                model:galeria,
                as:'galeria',
                required: false,
            },{
                model:lista,
                as:'lista',
                required: false,
                where: {
                    randomkey: cod
                },
                attributes: ['id','nombre','artista'],
            },{
                model:regalos,
                as:'regalos',
                required:false
            }]
        });

        if (!bodaDetalle) {
            const error = new Error('Boda no encontrada o invitación inválida.');
            (error as any).statusCode = 404;
            throw error;
        }

        const procesarGaleria = (): (any | null)[] => {
            const indices = Array.from({ length: 7 }, (_, i) => i);
            return indices.map(index => {
                const url = `/uploads/bodas/${bodaDetalle?.url}/galeria/image-${index}.jpg`;
                const existe = bodaDetalle?.galeria?.find(gal => gal.url === url);
                return {url:existe?.url || null} ; // Devuelve el objeto galería si existe, o null si no
            });
        };

        const detalles = {
                url:bodaDetalle?.url || '',
                invitacion: {
                    novia: `${bodaDetalle?.id_novia_novium?.nombre || ''} ${bodaDetalle?.id_novia_novium?.apellido || ''}`,
                    novio: `${bodaDetalle?.id_novio_novio?.nombre || ''} ${bodaDetalle?.id_novio_novio?.apellido || ''}`,
                    evento: (() => {
                        const principalEvento = bodaDetalle?.eventos?.find(e => e.principal == 1) as evento || {};
                        return {
                            lugar: principalEvento.nombre_lugar || '',
                            fecha: principalEvento.fecha || '',
                            direccion: principalEvento.direccion || '',
                            hora:principalEvento.hora || '',
                        };
                    })()
                },
                pareja:bodaDetalle?.secciones[0]?.pareja == 1? {
                    novia: {
                        nombre: `${bodaDetalle?.id_novia_novium?.nombre || ''} ${bodaDetalle?.id_novia_novium?.apellido || ''}`,
                        nac: bodaDetalle?.id_novia_novium?.fecha_nacimiento || '',
                        descripcion: bodaDetalle?.id_novia_novium?.descripcion || '',
                        foto: bodaDetalle?.id_novia_novium?.foto || ''
                    },
                    novio: {
                        nombre: `${bodaDetalle?.id_novio_novio?.nombre || ''} ${bodaDetalle?.id_novio_novio?.apellido || ''}`,
                        nac: bodaDetalle?.id_novio_novio?.fecha_nacimiento || '',
                        descripcion: bodaDetalle?.id_novio_novio?.descripcion || '',
                        foto: bodaDetalle?.id_novio_novio?.foto || ''
                    }
                }:null,
                historia: bodaDetalle?.secciones[0]?.historia == 1 ?
        (bodaDetalle?.historia?.map(historia => ({
            imagen: historia.imagen || '',
            titulo: historia.titulo || '',
            fecha: historia.fecha || '',
            descripcion: historia.descripcion || ''
        })) || []).sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime()) : null,
                confirmacion:{
                    invitacion:cod,
                    limite:bodaDetalle?.invitacions[0].fecha_limite,
                    invitados:bodaDetalle?.invitacions[0].invitados.map(i=>({
                        id:i.id,
                        nombre:`${i.nombre}, ${i.apellido}`,
                        confirmado: i.confirmado,
                        vegetariano:i.vegetariano,
                        menor:i.menor
                    })) || []
                },
                eventos:bodaDetalle?.secciones[0]?.eventos == 1? bodaDetalle?.eventos?.map(e => ({
                    nombre:e.nombre_evento || '',
                    fecha: e.fecha || '',
                    hora: e.hora || '',
                    lugar:e.nombre_lugar || '',
                    direccion:e.direccion || '',
                    latitud: e.ubicacion_lat || null,
                    longitud: e.ubicacion_lon || null
                })):null,
                lista:bodaDetalle?.secciones[0]?.lista == 1? {
                    seleccion:bodaDetalle?.lista?.map(l=>({
                        id:l.id,
                        nombre:l.nombre,
                        artista:l.artista
                    })),
                    invitacion:cod,
                }:null,
                galeria:bodaDetalle?.secciones[0]?.galeria == 1? procesarGaleria():null,
                capturas:bodaDetalle?.secciones[0]?.capturas == 1? true:false,
                upload: bodaDetalle?.secciones[0]?.upload == 1 && 
                         bodaDetalle?.invitacions?.some(i => i.invitados.some(inv => inv.confirmado)) ? true : false,
                regalos:bodaDetalle?.secciones[0]?.regalos == 1? bodaDetalle?.regalos[0]:null

        };

        return {
            invitacion:true,
            detalles
        };
    } catch (e:any) {
        throw new Error(e.message);
    }
};

const editarBodaUsuario = async (userId: number, idBoda: string, nuevaBoda: nuevaBoda) => {
    const transaction = await Sequelize.transaction(); 
    try {
        // Buscar la boda por id y verificar si pertenece al usuario
        const bodaExistente = await boda.findOne({
            where: { id: idBoda, id_usuario: userId }
        });

        if (!bodaExistente) {
            const error = new Error('No se encontró una boda con ese ID para el usuario proporcionado.');
            (error as any).statusCode = 404;
            throw error;
        }

        // Actualizar datos de la novia si es necesario
        await novia.update({
            ...nuevaBoda.novia,
        }, {
            where: { id: bodaExistente.id_novia },
            transaction
        });

        // Actualizar datos del novio si es necesario
        await novio.update({
            ...nuevaBoda.novio,
        }, {
            where: { id: bodaExistente.id_novio },
            transaction
        });

        // Actualizar los datos de la boda
        await boda.update({
            ...nuevaBoda.boda
        }, {
            where: { id: idBoda, id_usuario: userId },
            transaction
        });

        // Realizar commit de la transacción
        await transaction.commit();

        // Volver a buscar la boda para devolver la respuesta, validando que no sea null
        const bodaActualizada = await boda.findByPk(idBoda);
        if (!bodaActualizada) {
            throw new Error('No se pudo recuperar la boda después de la actualización.');
        }

        // Excluir id_usuario de la respuesta
        const { id_usuario, ...respuesta } = bodaActualizada.get();
        
        return respuesta;
        
    } catch (e: any) {
        await transaction.rollback();
        throw new Error(e.message);
    }
};

const eliminarBoda = async (userId: string, idBoda: string) => {
    const transaction = await Sequelize.transaction();
    try {
      // Buscar la boda para obtener los IDs de la novia y el novio
      const bodaEncontrada = await boda.findOne({
        where: {
          id: idBoda,
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
  
      const id_novia = bodaEncontrada.id_novia;
      const id_novio = bodaEncontrada.id_novio;
  
      // Obtener las invitaciones relacionadas con la boda
      const invitaciones = await invitacion.findAll({
        where: { id_boda: idBoda },
        transaction
      });

      if (invitaciones.length > 0) {
        // Eliminar los invitados relacionados con las invitaciones obtenidas
        const idsInvitaciones = invitaciones.map((inv: any) => inv.id);
        await invitado.destroy({
          where: {
            id_invitacion: {
              [Op.in]: idsInvitaciones  // Usamos Op.in para obtener todos los invitados de las invitaciones
            }
          },
          transaction,
        });
      }

      // Eliminar las invitaciones relacionadas con la boda
      await invitacion.destroy({ where: { id_boda: idBoda }, transaction });
  
      // Eliminar eventos relacionados con la boda
      await evento.destroy({ where: { id_boda: idBoda }, transaction });
  
      // Eliminar la boda
      await boda.destroy({ where: { id: idBoda }, transaction });

         // Eliminar las historias
         await historia.destroy({ where: { id: idBoda }, transaction });
  
      // Eliminar la novia y el novio
      await novia.destroy({ where: { id: id_novia }, transaction });
      await novio.destroy({ where: { id: id_novio }, transaction });
  
      // Commit de la transacción
      await transaction.commit();
  
      return bodaEncontrada
    } catch (e: any) {
        await transaction.rollback();
        throw new Error(e.message);
    }
};



export {obtenerBodasUsuario,crearBodaUsuario, obtenerBodaDetalle,obtenerBodaUrl,obtenerBodaInvitacion,editarBodaUsuario,eliminarBoda}