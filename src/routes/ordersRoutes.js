
import express from 'express'
import { verificarToken } from '../middlewares/authMiddlewares';
import { createOrder, deleteOrder, getAllOrders, getOrderById, updateOrder } from '../controllers/orderController';

const router = express.Router();

router.post('/', verificarToken, createOrder);
router.get('/', verificarToken, getAllOrders)
router.get('/:id', verificarToken, getOrderById)
router.put('/:id', verificarToken,updateOrder )
router.delete('/:id', verificarToken, deleteOrder)

export default router;