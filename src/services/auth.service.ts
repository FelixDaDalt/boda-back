import { compare } from "bcryptjs"
import { encriptar } from "../utils/password.handle"
import { generarToken } from "../utils/jw.handle"
import { usuario } from "../models/usuario"

interface login{
    email:string,
    password:string
}

const registrarUsuario = async (nuevoUsuario:usuario) => {
   
    if(!nuevoUsuario.password){
        const error = new Error('El Password no puede estar vacio');
        (error as any).statusCode = 404;
        throw error; 
    }

    const usuarioExistente = await usuario.findOne(
        {
            where:{
                email:nuevoUsuario.email
            }
        }
    )
    
    if (usuarioExistente) {
        const error = new Error('El Email ya está registrado');
        (error as any).statusCode = 404;
        throw error; 
    }

    const passEncrypt = await encriptar(nuevoUsuario.password)
    nuevoUsuario.password = passEncrypt
        
    const agregar = await usuario.create(nuevoUsuario)
    const { id, email } = agregar;
    return { id, email };
}

const loginUsuario = async (login:login) => {
    // 1. Verificar si el usuario existe por email
    const usuarioExistente = await usuario.findOne({
        where: {
            email: login.email
        }
    });

    if (!usuarioExistente) {
        const error = new Error('Usuario o contraseña incorrectos');
        (error as any).statusCode = 401;
        throw error;
    }

    // 2. Comparar la contraseña ingresada con la almacenada
    const contraseñaValida = await compararContraseña(login.password, usuarioExistente.password);
    if (!contraseñaValida) {
        const error = new Error('Usuario o contraseña incorrectos');
        (error as any).statusCode = 401;
        throw error;
    }

    // 3. Generar el token JWT con el id y usuarioKey del usuario
    const token = await generarToken(usuarioExistente.id);

    // 4. Devolver el token y los datos del usuario al cliente
    return {
        token,
        usuario: {
            id: usuarioExistente.id,
            email: usuarioExistente.email,
        }
    };
}

const compararContraseña = async (password: string, passwordHash: string) => {
    return await compare(password, passwordHash);
}

export{registrarUsuario,loginUsuario}