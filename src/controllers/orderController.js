import { ORDERS_FILE } from "../config/env.js";
import { leerJSON, escribirJSON } from "../config/util.js";
import { v4 as uuidv4 } from "uuid";

console.log("📂 Ruta de orders.json:", ORDERS_FILE);

// Crear orden
export const createOrder = async (req, res) => {
    const { email } = req.user; // Extraído del token JWT
    const { producto, precio } = req.body;

    // Verificar si los campos necesarios están presentes
    if (!producto || !precio) {
        return res.status(400).json({ error: 'Producto y precio son requeridos' });
    }

    if (!email) {
        return res.status(401).json({ error: 'Usuario no autenticado' });
    }

    try {
        const orders = await leerJSON(ORDERS_FILE);
        const newOrder = { id: uuidv4(), email, producto, precio, date: new Date() };

        orders.push(newOrder);
        
         console.log("✅ Nueva orden añadida:", newOrder);
        await escribirJSON(ORDERS_FILE, orders);

        res.json({ message: 'Orden guardada', order: newOrder });
    } catch (error) {
        console.error("Error al guardar la orden:", error);
        res.status(500).json({ message: 'Error al procesar la orden' });
    }
};

// Obtener todas las órdenes
export const getAllOrders = async (req, res) => {
    try {
        const orders = await leerJSON(ORDERS_FILE);
        res.json(orders);
    } catch (error) {
        console.error("Error al obtener las órdenes:", error);
        res.status(500).json({ message: 'Error al obtener las órdenes' });
    }
};

// Obtener orden por ID
export const getOrderById = async (req, res) => {
    try {
        const orders = await leerJSON(ORDERS_FILE);
        const order = orders.find(order => order.id == req.params.id);

        if (!order) {
            return res.status(404).json({ message: 'Orden no encontrada' });
        }

        res.json(order);
    } catch (error) {
        console.error("Error al obtener la orden:", error);
        res.status(500).json({ message: 'Error al obtener la orden' });
    }
};

// Actualizar orden
export const updateOrder = async (req, res) => {
    try {
        const orders = await leerJSON(ORDERS_FILE);
        const index = orders.findIndex(order => order.id == req.params.id);

        if (index === -1) {
            return res.status(404).json({ message: 'Orden no encontrada' });
        }

        orders[index] = { ...orders[index], ...req.body };
        await escribirJSON(ORDERS_FILE, orders);

        res.json({ message: 'Orden actualizada', order: orders[index] });
    } catch (error) {
        console.error("Error al actualizar la orden:", error);
        res.status(500).json({ message: 'Error al actualizar la orden' });
    }
};

// Eliminar orden
export const deleteOrder = async (req, res) => {
    try {
        let orders = await leerJSON(ORDERS_FILE);
        orders = orders.filter(order => order.id != req.params.id); // Filtrar la orden

        await escribirJSON(ORDERS_FILE, orders);
        res.json({ message: 'Orden eliminada' });
    } catch (error) {
        console.error("Error al eliminar la orden:", error);
        res.status(500).json({ message: 'Error al eliminar la orden' });
    }
};
