import { Request, Response } from "express"
import { handleHttp } from "../utils/error.handle"
import { loginUsuario, registrarUsuario } from "../services/auth.service"

const Registro = async (req:Request,res:Response)=>{
    try{
        const registro = await registrarUsuario(req.body)
        const data = {"data":registro,"mensaje":"Registro Creado: "+req.body.email}
        res.status(200).send(data);
    }catch(e){
        handleHttp(res,'Error al registrarse',e)    
    }
}

const Login = async (req:Request,res:Response)=>{
    try{
       const login = await loginUsuario(req.body)
       const data = {"data":login,"mensaje":"Login Exitoso"}
       res.status(200).send(data)
    }catch(e){
        handleHttp(res,'Error al loguerse',e)    
    }
}

export {Registro,Login}