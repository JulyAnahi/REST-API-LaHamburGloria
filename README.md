# API-REST La Hamburgloria

Realizamos un servidor donde servimos una web de tipo fast food con registro y login de usuario, donde cada usuario autenticado puede generar su pedido

## ¿Como usarlo?

1. Debes realizar el clonado del repositorio con git clone https://github.com/JulyAnahi/REST-API-LaHamburGloria.git
2. Abrir en tu editor de codigo y hacer en la terminal **npm install** e instala todas la dependencias:
		   

		npm install express jsonwebtoken bcryptjs cors body-parser fs-extra

		express → Servidor web

		jsonwebtoken → Manejo de JWT

		bcryptjs → Hash de contraseñas

		cors → Permitir solicitudes desde frontend

		body-parser → Leer datos JSON

		fs-extra (en lugar de fs) → Funciones asíncronas para manejo de archivos

4. Debes armar  tu variables de entorno . env con la plantilla que dejamos disponible.(Recomendado PORT:3000) y carpeta 'public'
