import express from 'express'
import path from 'path'

export const startServer = (options)=>{
    const {port, public_path = 'public' } = options;
    const app = express();
    
    app.use(express.static(public_path));// contenido estatico que esta en la carpeta public

    // '*' trae todo el contenido de nuestra pagina html se utiliza en single page por lo general
    app.get('*', (req, res)=>{
        const indexPath = path.join(__dirname + '../../public/index.html')
        res.sendFile(indexPath);// por defecto siempre vamos a estar devlviendo nuestra pagina index.html
    });

    app.listen(port,()=>{
        console.log(`Escuchando en http://localhost:${port}`)
    })
}
