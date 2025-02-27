
import { Router } from "express"; 
import { comprobarJWT } from "../middleware/session";
import { EditarRegalo, ObtenerRegalo } from "../controllers/regalo.controller";

const router = Router()

router.get('/:idBoda', comprobarJWT, ObtenerRegalo)
router.post('/editar', 
    comprobarJWT, 
    EditarRegalo
);





export {router} //exportamos la rutas
