import express from "express";
import path from "path";
import cors from "cors";
import bodyParser from "body-parser";
import authRoutes from "./routes/authRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import { fileURLToPath } from "url";

export const startServer = (options) => {
    const { port, public_path = "public" } = options;
    const app = express();

    // Solución para __dirname en ES Modules
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    // Middleware
    app.use(cors());
    app.use(bodyParser.json());
    app.use(express.static(path.join(__dirname, public_path))); // Servir archivos estáticos

    // Rutas
    app.use("/auth", authRoutes);
    app.use("/orders", orderRoutes);

    // Manejo de rutas en una SPA (Single Page Application)
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, public_path, "index.html"));
    });

    // Iniciar servidor
    app.listen(port, () => {
        console.log(`Servidor corriendo en http://localhost:${port}`);
    });
};
