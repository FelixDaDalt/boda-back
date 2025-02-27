"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.comprobarJWT = void 0;
const jw_handle_1 = require("../utils/jw.handle");
const comprobarJWT = async (req, res, next) => {
    try {
        const jwtUser = req.headers.authorization || "";
        const jwt = jwtUser.split(' ').pop() || 'notvalid';
        const isUser = await (0, jw_handle_1.verificarToken)(`${jwt}`);
        if (!isUser) {
            res.status(401).send('JWT_NOT_VALID');
        }
        else {
            req.user = isUser;
            next();
        }
    }
    catch (e) {
        res.status(400).send("SESSION_INVALID");
    }
};
exports.comprobarJWT = comprobarJWT;
