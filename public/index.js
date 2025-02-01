const productos =[
    {id:"1", nombre: "Simple con queso", precio:3250},
    {id:"2", nombre: "Simple con queso y tomate", precio:3500 },
    {id:"3", nombre: "Combo Toro", precio: 5700},
    {id:"4", nombre: "Bacon", precio: 5300},
];

// funcion para llenar el primer select con los datos del json
 
function llenarSelect(){
    const selectProductos= document.getElementById("productos")
    productos.forEach(producto=>{
        const opcion = document.createElement("option");
        opcion.value = producto.id;
        opcion.textContent = producto.nombre;
        selectProductos.appendChild(opcion)
    });
}

//funcion mostrar el precio en cascada segundo select

function mostrarPrecio() {
    const selectProductos = document.getElementById("productos");
    const precioSeleccionado = document.getElementById("precio");
    const idSeleccionado = selectProductos.value;

    //Buscar el producto en el json
    const producto = productos.find(p => p.id === idSeleccionado);
    precioSeleccionado.value = producto ? `$${producto.precio}`: "No disponible";
}

//llamar a la funcion llenarSelect al cargar la pagina
window.onload = llenarSelect;