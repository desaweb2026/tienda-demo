// Dirección base de la API de datos de prueba
const URL_BASE = 'https://dummyjson.com';

// Cantidad de productos agregados al carrito (empieza en cero)
let cantidadCarrito = 0;
// Plata total del carrito (empieza en cero)
let totalCarrito = 0;

// Buscar en la página los elementos que vamos a usar
const lista = document.getElementById('lista');
// Selector de categorías
const selectorCategoria = document.getElementById('categoria');
// Mensaje de estado (cargando / error)
const estado = document.getElementById('estado');
// Número de productos del carrito
const textoCantidad = document.getElementById('cantidad');
// Total en plata del carrito
const textoTotal = document.getElementById('total');

// Función que le pide a la API las categorías y las pone en el selector
async function cargarCategorias() {
  // Hacer el pedido a la API y esperar la respuesta
  const respuesta = await fetch(URL_BASE + '/products/categories');
  // Convertir la respuesta a datos que JavaScript entienda
  const categorias = await respuesta.json();
  // Recorrer cada categoría recibida
  categorias.forEach(function (categoria) {
    // La API puede mandar texto simple o un objeto con "slug" y "name"
    const clave = typeof categoria === 'string' ? categoria : categoria.slug;
    // Nombre que ve la persona en pantalla
    const nombre = typeof categoria === 'string' ? categoria : categoria.name;
    // Crear una opción nueva para el selector
    const opcion = document.createElement('option');
    // Valor interno de la opción (lo que se le pide a la API)
    opcion.value = clave;
    // Texto visible de la opción
    opcion.textContent = nombre;
    // Agregar la opción al selector
    selectorCategoria.appendChild(opcion);
  });
}

// Función que le pide los productos a la API y los muestra
async function cargarProductos(categoria) {
  // Avisar que se están cargando los productos
  estado.textContent = 'Cargando productos...';
  // Vaciar la lista anterior
  lista.innerHTML = '';
  // Si se eligió una categoría pedimos solo esa; si no, pedimos 24 productos
  const direccion = categoria
    ? URL_BASE + '/products/category/' + categoria
    : URL_BASE + '/products?limit=24';
  // Intentar hacer el pedido; si falla, se va al bloque "catch"
  try {
    // Hacer el pedido a la API
    const respuesta = await fetch(direccion);
    // Convertir la respuesta a datos
    const datos = await respuesta.json();
    // Dibujar cada producto en pantalla
    datos.products.forEach(dibujarProducto);
    // Limpiar el mensaje de estado; si no hay productos, avisarlo
    estado.textContent = datos.products.length ? '' : 'No hay productos en esta categoría.';
  } catch (error) {
    // Si algo falló (por ejemplo, sin internet), avisar a la persona
    estado.textContent = 'No se pudieron cargar los productos. Probá de nuevo en un rato.';
  }
}

// Función que arma la tarjeta de un producto y la agrega a la lista
function dibujarProducto(producto) {
  // Crear el elemento de lista que será la tarjeta
  const tarjeta = document.createElement('li');
  // Darle el estilo de tarjeta
  tarjeta.className = 'tarjeta';

  // Crear la imagen del producto
  const imagen = document.createElement('img');
  // Dirección de la imagen que manda la API
  imagen.src = producto.thumbnail;
  // Texto alternativo para quienes no ven la imagen
  imagen.alt = producto.title;
  // Carga la imagen solo cuando está cerca de verse (ahorra datos)
  imagen.loading = 'lazy';

  // Crear el título del producto
  const titulo = document.createElement('h3');
  // Escribir el nombre del producto
  titulo.textContent = producto.title;

  // Crear el texto de la categoría
  const categoria = document.createElement('p');
  // Darle estilo de categoría
  categoria.className = 'categoria';
  // Escribir la categoría
  categoria.textContent = producto.category;

  // Crear el texto del precio
  const precio = document.createElement('p');
  // Darle estilo de precio
  precio.className = 'precio';
  // Escribir el precio con dos decimales
  precio.textContent = '$' + producto.price.toFixed(2);

  // Crear el botón de agregar al carrito
  const boton = document.createElement('button');
  // Tipo de botón común
  boton.type = 'button';
  // Texto del botón
  boton.textContent = 'Agregar al carrito';
  // Qué hacer cuando se toca el botón
  boton.addEventListener('click', function () {
    // Sumar un producto al contador
    cantidadCarrito = cantidadCarrito + 1;
    // Sumar el precio al total
    totalCarrito = totalCarrito + producto.price;
    // Actualizar los números del encabezado
    textoCantidad.textContent = cantidadCarrito;
    // Mostrar el total con dos decimales
    textoTotal.textContent = '$' + totalCarrito.toFixed(2);
  });

  // Poner todas las piezas dentro de la tarjeta
  tarjeta.append(imagen, titulo, categoria, precio, boton);
  // Agregar la tarjeta a la lista de la página
  lista.appendChild(tarjeta);
}

// Cuando la persona cambia de categoría, volver a pedir los productos
selectorCategoria.addEventListener('change', function () {
  // Pedir los productos de la categoría elegida
  cargarProductos(selectorCategoria.value);
});

// Al abrir la página: cargar las categorías (si falla, la tienda sigue funcionando)
cargarCategorias().catch(function () {});
// Al abrir la página: mostrar los primeros productos
cargarProductos('');
