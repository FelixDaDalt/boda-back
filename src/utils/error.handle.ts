// AQUI MANEJO ERRORES

import { Response } from "express";

const handleHttp = (res: Response, error: string, errorRaw: any) => {
    const statusCode = errorRaw.statusCode || 500; 
    console.log(errorRaw.message);
    res.status(statusCode).send({
        "Error": error,
        "Descripcion": errorRaw.message
    });
};

export {handleHttp}