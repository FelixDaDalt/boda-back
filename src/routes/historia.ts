
import { Router } from "express"; 
import { comprobarJWT } from "../middleware/session";
import { CrearHistoria, EliminarHistoria, ObtenerHistorias } from "../controllers/historia.controller";

const router = Router()

router.get('/:idBoda', comprobarJWT, ObtenerHistorias)
router.post('/crear', 
    comprobarJWT, 
    CrearHistoria
);
router.put('/eliminar/:idHistoria', 
    comprobarJWT,
    EliminarHistoria
);





export {router} //exportamos la rutas
