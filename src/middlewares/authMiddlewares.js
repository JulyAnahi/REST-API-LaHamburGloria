import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/env.js';

export const verificarToken = (req, res, next) =>{
    const token = req.header['autorization'];
    if(!token) return res.status(403).json({message:'Token requerido'})
        
    jwt.verify(token.split(' ')[1], JWT_SECRET, (err, user)=>{
        if (err) return res.status(401).json({message:'Token invalido'});

        req.user = user;
        next();
    });    
};