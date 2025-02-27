
import { Login, Registro } from "../controllers/usuario.controller";
import { Router } from "express"; 

const router = Router()

router.post('/registro', Registro);
router.post('/login', Login)

export {router} //exportamos la rutas
