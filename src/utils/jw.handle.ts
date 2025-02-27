import {sign, verify} from 'jsonwebtoken'


const secret = process.env.JWT_SECRET || 'secret'

const generarToken = async (id: string | number) => {
    const jwt = sign({ id }, secret, {
        expiresIn: "2h",
    });
    return jwt;
};

const verificarToken = async (jwt:string) => {
    const ok = await verify(jwt, secret);
    return ok; 
};

export{generarToken,verificarToken}