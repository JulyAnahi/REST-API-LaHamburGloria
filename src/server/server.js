import express from "express";
import path from "path";
import cors from "cors";
import bodyParser from "body-parser";
import authRoutes from "../routes/authRoutes.js";
import orderRoutes from "../routes/ordersRoutes.js";
import { fileURLToPath } from "url";

export const startServer = (options) => {
    const { port, public_path = "public" } = options;
    const app = express();

    // __dirname en ES Modules
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    // Construye la ruta absoluta a la carpeta 'public' (subiendo dos niveles)
    const publicDir = path.join(__dirname, "../../", public_path);

    console.log('📁 ruta __dirname: ',__dirname)
    // Middleware
    app.use(cors());
    app.use(bodyParser.json());
    // Servir archivos estáticos desde el directorio public
    app.use(express.static(publicDir)); 

    // Rutas
    app.use("/auth", authRoutes);
    app.use("/orders", orderRoutes);

    // Manejo de rutas para SPA (Single Page Application)
    app.get("*", (req, res) => {
        res.sendFile(path.join(publicDir, "index.html"));
    });

    // Inicio del servidor
    app.listen(port, () => {
        console.log(`Servidor corriendo en http://localhost:${port}`);
    });
};
