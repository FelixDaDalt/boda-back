
import { comprobarJWT } from "../middleware/session";
import { Router } from "express";
import { EliminarCancion, EnviarCanciones, ObtenerCanciones } from "../controllers/lista.controller";
 ;

const router = Router()

router.get('/:idBoda', comprobarJWT, ObtenerCanciones)
router.post('/:invitacion', EnviarCanciones);
router.delete('/eliminar/:invitacion', EliminarCancion);

export {router} //exportamos la rutas
