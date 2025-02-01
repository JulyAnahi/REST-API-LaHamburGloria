import dotenv from 'dotenv';
import path from 'path'
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url)
const __dirname =path.dirname(__filename);


dotenv.config();

export const PORT = process.env.PORT || 3000;
export const PUBLIC_PATH = process.env.PUBLIC_PATH || 'public'
export const JWT_SECRET = process.env.JWT_SECRET ||"mi_clave_super_secreta"
export const USER_FILE = path.join(__dirname, '..users.json')
export const ORDERS_FILE = path.join(__dirname, '../orders.json')
