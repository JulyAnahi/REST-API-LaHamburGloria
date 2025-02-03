import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/env.js';

export const verificarToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    console.log("Header recibido:", authHeader); // 

    if (!authHeader) return res.status(403).json({ message: 'Token requerido' });

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(403).json({ message: 'Token en formato incorrecto' });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            console.log("Error verificando token:", err.message); // 
            return res.status(401).json({ message: 'Token inválido' });
        }

        req.user = user;
        next();
    });
};
