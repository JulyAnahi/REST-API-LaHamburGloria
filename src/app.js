import { envs } from "./config/env.js";
import { startServer } from "./server/server.js";

// funcion autoconvocada 
const main = ()=>{
    console.log('Aca comienza el servidor')
    startServer({
        port : envs.PORT,
        public_path : envs.PUBLIC_PATH
    })
}

(async ()=>{
    main()
})();