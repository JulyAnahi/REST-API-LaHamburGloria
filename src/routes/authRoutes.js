import express from 'express';
import { register, login, getAllUsers, getUserById, updaterUser, deleteUser } from '../controllers/authController.js'
import { verificarToken } from '../middlewares/authMiddlewares.js';

const router = express.Router();

router.post('/register', register)
router.post('/login', login)
router.get('/',verificarToken, getAllUsers)
router.get('/:id',verificarToken, getUserById)
router.put('/:id',verificarToken, updaterUser)
router.delete('/:id',verificarToken, deleteUser)

export default router;