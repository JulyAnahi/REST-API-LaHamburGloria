const productos = [
    { id: "1", nombre: "Simple con queso", precio: 3250 },
    { id: "2", nombre: "Simple con queso y tomate", precio: 3500 },
    { id: "3", nombre: "Combo Toro", precio: 5700 },
    { id: "4", nombre: "Bacon", precio: 5300 }
];

// Función para llenar el select con productos
function llenarSelect() {
    const selectProductos = document.getElementById("productos");
    productos.forEach(producto => {
        const opcion = document.createElement("option");
        opcion.value = producto.id;
        opcion.textContent = producto.nombre;
        selectProductos.appendChild(opcion);
    });
}

// Mostrar el precio del producto seleccionado
function mostrarPrecio() {
    const selectProductos = document.getElementById("productos");
    const precioSeleccionado = document.getElementById("precio");
    const idSeleccionado = selectProductos.value;

    const producto = productos.find(p => p.id === idSeleccionado);
    precioSeleccionado.value = producto ? `$${producto.precio}` : "No disponible";
}

// Obtener el token del usuario almacenado
function getToken() {
    return localStorage.getItem("token");
}

// Función para registrar usuarios
async function registerUser(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const direccion = document.getElementById("direccion").value;

    try {
        const res = await fetch("http://localhost:3000/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password, direccion })
        });

        const data = await res.json();

        if (!res.ok) {
            alert(`Error: ${data.message}`);
            return;
        }

        alert("Registro exitoso, ahora inicia sesión.");
    } catch (error) {
        console.error("Error al registrar usuario:", error);
        alert("Error en el registro");
    }
}

// Función para iniciar sesión
async function loginUser(event) {
    event.preventDefault();

    // Usá los id correctos para el formulario de login:
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    try {
        const res = await fetch("http://localhost:3000/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();

        if (!res.ok) {
            alert(`Error: ${data.message}`);
            return;
        }

        localStorage.setItem("token", data.token);
        console.log("Token guardado correctamente:", data.token);

        alert("Inicio de sesión exitoso.");
        window.location.reload();
    } catch (error) {
        console.error("Error al iniciar sesión:", error);
        alert("Error en el inicio de sesión");
    }
}


//Función para agregar una orden

async function agregarOrden() {
    const token = getToken();
    if (!token) {
        alert("Debes iniciar sesión para hacer un pedido.");
        return;
    }

    const selectProductos = document.getElementById("productos");
    const productoSeleccionado = productos.find(p => p.id === selectProductos.value);

    if (!productoSeleccionado) {
        alert("Selecciona un producto válido.");
        return;
    }

    const nuevaOrden = {
        producto: productoSeleccionado.nombre,
        precio: productoSeleccionado.precio
    };

    try {
        const res = await fetch("http://localhost:3000/orders/createOrder", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(nuevaOrden)
        });

        const data = await res.json();

        if (!res.ok) throw new Error(data.message || "Error desconocido");

        alert("Pedido agregado con éxito");
        fetchOrders();
    } catch (error) {
        console.error("Error al agregar la orden:", error);
        alert(error.message);
    }
}

// Obtener órdenes del backend
async function fetchOrders() {
    const token = getToken();
    if (!token) {
        console.log("No hay token, no se pueden obtener órdenes.");
        return;
    }

    try {
        const res = await fetch("http://localhost:3000/orders", {
            headers: { "Authorization": `Bearer ${token}` }
        });

        if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);

        const orders = await res.json();
        updateOrdersTable(orders);
    } catch (error) {
        console.error("Error al obtener las órdenes:", error);
    }
}

// Actualizar la tabla de pedidos
function updateOrdersTable(orders) {
    const tableBody = document.getElementById("products-table");
    tableBody.innerHTML = "";

    orders.forEach(order => {
        const tr = document.createElement("tr");

        // Producto
        const tdProducto = document.createElement("td");
        tdProducto.textContent = order.producto;
        tr.appendChild(tdProducto);

        // Precio
        const tdPrecio = document.createElement("td");
        tdPrecio.textContent = `$${order.precio}`;
        tr.appendChild(tdPrecio);

        // Fecha
        const tdFecha = document.createElement("td");
        tdFecha.textContent = new Date(order.fecha).toLocaleString();
        tr.appendChild(tdFecha);

        // Botón eliminar
        const tdActions = document.createElement("td");
        const btnDelete = document.createElement("button");
        btnDelete.textContent = "Eliminar";
        btnDelete.classList.add("btn", "btn-danger");
        btnDelete.addEventListener("click", () => deleteOrder(order.id));
        tdActions.appendChild(btnDelete);
        tr.appendChild(tdActions);

        tableBody.appendChild(tr);
    });
}

// Eliminar una orden
async function deleteOrder(orderId) {
    const token = getToken();
    if (!token) {
        alert("Debes iniciar sesión para eliminar un pedido.");
        return;
    }

    try {
        const res = await fetch(`http://localhost:3000/orders/${orderId}`, {
            method: "DELETE",
            headers: { "Authorization": `Bearer ${token}` }
        });

        if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);

        const data = await res.json();
        alert(data.message);
        fetchOrders();
    } catch (error) {
        console.error("Error al eliminar la orden:", error);
    }
}

// Inicializar funciones al cargar la página
window.onload = () => {
    console.log("Token almacenado:", getToken());

    llenarSelect();
    fetchOrders();

    const registerForm = document.getElementById("formulario");
    if (registerForm) registerForm.addEventListener("submit", registerUser);

    const loginForm = document.getElementById("login-form");
    if (loginForm) loginForm.addEventListener("submit", loginUser);
};
