
import { Router } from "express";
import { CrearGaleria,ObtenerGaleria } from "../controllers/galeria.controller";
import express from "express"
import { galeriaUpload } from "../middleware/galeriaUpload";
import { comprobarJWT } from "../middleware/session";

const router = Router()

// Definir la ruta con el middleware y el manejador
router.get('/:idBoda', comprobarJWT, ObtenerGaleria)
router.post('/crear',comprobarJWT,galeriaUpload, CrearGaleria);

export {router} //exportamos la rutas
