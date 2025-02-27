
import { Router } from "express"; 
import { comprobarJWT } from "../middleware/session";
import { EditarSecciones, ObtenerSecciones } from "../controllers/secciones.controller";

const router = Router()

router.get('/:idBoda', comprobarJWT, ObtenerSecciones)
router.post('/editar', 
    comprobarJWT, 
    EditarSecciones
);



export {router} //exportamos la rutas
