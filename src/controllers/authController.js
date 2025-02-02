import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { leerJSON, escribirJSON } from '../config/util'
import dotenv from '../config/env'
import { USER_FILE } from '../config/env'
import { JWT_SECRET } from '../config/env'
import uuidv4 from 'uuid'

//registrar usuario

export const register = async (req, res)=>{
    const { email, password, direccion} = req.body;
    const users = await leerJSON(USER_FILE);

    if (users.find(user => user.email === email)){
        return res.status(400).json({message: 'El usuario ya existe'})
    }

    const hashedPassword = await bcrypt.hash(password,10);
    users.push({ id:uuidv4(), email, password:hashedPassword, direccion});

    await escribirJSON(USER_FILE, users);
    res.json({message: 'Usuario registrado'});

}

//Iniciar sesion

export const login = async (req, res)=>{
    const {email, password} = req.body;
    const users = await readJSON(USER_FILE)
    const user = users.find(user=> user.email === email);

    if (!user || !await bcrypt.compare(password, user.password)){
        return res.status(401).json({message:'Usuario o password incorrectos'})
    }

    const token = jwt.sign({email}, JWT_SECRET, {expiresIn: '1h'});
    res.json({ token});
}

//Obtener usuarios 
export const getAllUsers = async (req, res)=>{
    const users = await leerJSON(USER_FILE);
    res.json(users);
};

//Obtener usuarios por id

export const getUserById = async(req, res)=>{
    const users = await leerJSON(USER_FILE);
    const user = users.find(user => user.id === req.params.id);
    if(!user) return res.status(404).json({message:'usuario no enconctrado'});
    res.json(user);
};

// actualizar usuario
export const updaterUser = async (req, res )=>{
     let users = await leerJSON(USER_FILE);
     const index = users.findIndex(user=> user.id == req.params.id);

     if (index === -1) return res.status(404).json({message:'Usuario no encontrado'});
     // si se actualiza la contraseña se encrita nuevamente

     if(req.body.password){
        req.body.password = await bcrypt.hash(req.body.password, 10);
     }

     users[index] = {...users[index], ...req.body}
     await writeJSON(USER_FILE, users);

     res.json({message:'Usuario actualizado', user:users[index]})
};

export const deleteUser = async (req, res)=>{
    let users = await readJSON(USER_FILE);
    users = users.filter(user=> user.id != req.params.id);
    await escribirJSON(USER_FILE, users);

    res.json({message:'Usuario eliminado'})
}
