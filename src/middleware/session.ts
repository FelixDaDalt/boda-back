import { Request,Response,NextFunction } from "express"
import { verificarToken } from "../utils/jw.handle"
import { JwtPayload } from "jsonwebtoken"


interface RequestExt extends Request{
    user?:string | JwtPayload
}

const comprobarJWT=async (req:RequestExt,res:Response,next:NextFunction)=>{
    try {
        const jwtUser = req.headers.authorization || ""
        const jwt = jwtUser.split(' ').pop() || 'notvalid'
        const isUser = await verificarToken(`${jwt}`)
        if(!isUser){
            res.status(401).send('JWT_NOT_VALID')
        }  
        else{
            req.user = isUser
            next()
        }   
    } catch (e) {
        res.status(400).send("SESSION_INVALID")
    }
}

export{comprobarJWT}

