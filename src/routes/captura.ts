
import { Router } from "express";
import express from "express"
import { uploadCaptura } from "../middleware/capturaUpload";
import { MeGusta, ObtenerCapturas, SubirCaptura } from "../controllers/captura.controller";


const router = Router()

// Definir la ruta con el middleware y el manejador
router.get('/:url', ObtenerCapturas);
router.put('/megusta/:url', MeGusta);
router.post('/subir',uploadCaptura, SubirCaptura);


export {router} //exportamos la rutas
