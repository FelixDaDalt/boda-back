
import { Router } from "express"; 
import { comprobarJWT } from "../middleware/session";
import { CrearEvento, EliminarEvento, ObtenerEventos } from "../controllers/evento.controller";

const router = Router()

router.get('/:idBoda', comprobarJWT, ObtenerEventos)
router.post('/crear', 
    comprobarJWT, 
    CrearEvento
);
router.put('/eliminar/:idEvento', 
    comprobarJWT,
    EliminarEvento
);





export {router} //exportamos la rutas
