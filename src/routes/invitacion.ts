
import { comprobarJWT } from "../middleware/session";
import { confirmarInvitacion, CrearInvitacion, EliminarInvitacion, ObtenerInvitaciones } from "../controllers/invitacion.controller";
import { Router } from "express"; ;

const router = Router()

router.get('/:idBoda', comprobarJWT, ObtenerInvitaciones);
router.post('/confirmar/:invitacion', confirmarInvitacion);
router.post('/', comprobarJWT, CrearInvitacion);
router.put('/eliminar/:idInvitacion', 
    comprobarJWT,
    EliminarInvitacion
);

export {router} //exportamos la rutas
