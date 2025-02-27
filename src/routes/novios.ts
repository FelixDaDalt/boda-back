
import { Router } from "express"; 
import { comprobarJWT } from "../middleware/session";
import { EditarNovios, ObtenerNovios } from "../controllers/novios.controller";
import { uploadFotosNovios } from "../middleware/upload";

const router = Router()

router.get('/:idBoda', comprobarJWT, ObtenerNovios)
router.post('/editar', comprobarJWT,uploadFotosNovios.fields([{ name: 'noviaFoto', maxCount: 1 }, { name: 'novioFoto', maxCount: 1 }]), 
EditarNovios);





export {router} //exportamos la rutas
