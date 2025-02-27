"use strict";
// AQUI MANEJO ERRORES
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleHttp = void 0;
const handleHttp = (res, error, errorRaw) => {
    const statusCode = errorRaw.statusCode || 500;
    console.log(errorRaw.message);
    res.status(statusCode).send({
        "Error": error,
        "Descripcion": errorRaw.message
    });
};
exports.handleHttp = handleHttp;
