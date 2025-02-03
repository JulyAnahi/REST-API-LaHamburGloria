import {PORT,PUBLIC_PATH} from "./config/env.js";
import { startServer } from "./server/server.js";

// funcion autoconvocada 
const main = ()=>{
    console.log('Aca comienza el servidor')
    startServer({
        port : PORT,
        public_path : PUBLIC_PATH
    })
}

(async ()=>{
    main()
})();