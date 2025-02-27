
import { NextFunction,Response, Request,Router } from "express"; 
import { crearBoda, obtenerBodaPorUrl, obtenerBodas, obtenerDetalle, editarBoda, EliminarBoda } from "../controllers/bodas.controller";
import { comprobarJWT } from "../middleware/session";
import { uploadFotosNovios } from '../middleware/upload';

const router = Router()
router.get('/:url', obtenerBodaPorUrl);

router.get('/', comprobarJWT, obtenerBodas);
router.post('/crear', comprobarJWT,uploadFotosNovios.fields([{ name: 'noviaFoto', maxCount: 1 }, { name: 'novioFoto', maxCount: 1 }]), 
crearBoda);
router.put('/editar/:idBoda', 
    comprobarJWT,
    uploadFotosNovios.fields([{ name: 'noviaFoto', maxCount: 1 }, { name: 'novioFoto', maxCount: 1 }]), 
    editarBoda
);
router.put('/eliminar/:idBoda', 
    comprobarJWT,
    EliminarBoda
);
router.get('/detalle/:idBoda', comprobarJWT, obtenerDetalle)




export {router} //exportamos la rutas
