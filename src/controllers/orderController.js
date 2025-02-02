import { ORDERS_FILE } from "../config/env";
import { leerJSON, escribirJSON } from "../config/util";
import { v4 as uuidv4 } from "uuid";

export const createOrder =async (req, res)=>{
    const { email } =req.user;//extraido del token jwt
    const { producto, precio} = req.body;

    if(!email){
        return res.json({error: 'Usuario no autenticado'})
    }

    const orders = await leerJSON(ORDERS_FILE);
    const newOrder = {id:uuidv4(), email, producto, precio , date:new Date()}

    orders.push(newOrder);
    await escribirJSON(ORDERS_FILE, orders)
    
    res.json({message: 'Orden guardada', order:newOrder});

}


// Obtener todas las ordenes
export const getAllOrders = async (req, res)=>{
    const orders = await leerJSON(ORDERS_FILE)
    res.JSON(orders);
}

//obtener orden por id
 export const getOrderById = async (req, res)=>{
    const orders = await leerJSON(ORDERS_FILE);
    const order = orders.find(order=> order.id == req.params.id);
    if(!order){
        return res.satus(404).json({message:'Orden no encontrada'})
    }
    res.json(order)
 }

 export const updateOrder =async(req, res)=>{
    const orders = await leerJSON(ORDERS_FILE)
    const index = orders.findIndex(order => order.id == req.params.id);
    if (index === -1) return res.status(404).json({message:'Orden no encontrada'})
    orders[index] = {... orders[index], ...req.body}
    await escribirJSON(ORDERS_FILE, orders);
    res.json({message: 'Orden actualizada', order:orders[index]})
 }


// eliminar orden por id
export const deleteOrder = async (req, res)=>{
    const orders = await leerJSON(ORDERS_FILE);
    orders = orders.filter(order=> order.id != req.params.id);
    await escribirJSON(ORDERS_FILE, orders)
    res.json({message:'Orden eliminada'})
}


