# Tienda demo con API

Una tienda de ejemplo para **ver una API funcionando**. No hay ningún producto escrito en el código: los productos, precios y fotos llegan desde una API.

## ¿Qué es una API y qué hace acá?

Pensalo como un **mostrador de despacho** entre la vitrina y el depósito:

| Pieza | Qué es en esta tienda |
| :--- | :--- |
| **Vitrina** | Esta página (HTML, CSS y JavaScript). Es lo que ve el cliente |
| **Depósito** | Los datos: productos, precios, fotos y categorías |
| **API (el mostrador)** | Recibe el pedido de la página y le entrega los datos del depósito |

El recorrido completo:

1. La persona abre la página.
2. La página le pide a la API: "dame los productos".
3. La API responde con los datos en formato JSON.
4. La página los dibuja en pantalla.

Es lo mismo que vimos en la Clase 3: el **cliente envía una solicitud** y el **servidor responde**, siguiendo las reglas del **contrato de la API**.

## ¿De dónde salen los datos?

De [DummyJSON](https://dummyjson.com), una API gratuita con datos de prueba (más de 190 productos, carritos y usuarios). No hace falta cuenta ni clave. Los productos son inventados: sirven para practicar y para armar el prototipo, y después cada equipo carga los de su comercio.

## Cómo probarla

1. Descargá o cloná este repositorio.
2. Abrí la carpeta con [VS Code](https://code.visualstudio.com/).
3. Abrí `index.html` con la extensión **Live Server** (o simplemente con doble clic).
4. Necesitás conexión a internet, porque los datos se piden en el momento.

## Qué hay en cada archivo

| Archivo | Para qué sirve |
| :--- | :--- |
| `index.html` | La estructura de la página |
| `estilos.css` | Los colores y el diseño (los colores se cambian al principio del archivo) |
| `app.js` | Le pide los datos a la API y dibuja los productos. Tiene cada línea comentada |

## Para practicar

- Cambiá los colores en `estilos.css` (bloque `:root`).
- Mostrá un dato más de cada producto, por ejemplo `producto.description` o `producto.rating`.
- Cambiá la cantidad de productos: probá `limit=12` en `app.js`.
- Agregá un botón para vaciar el carrito.
- Mirá qué devuelve la API abriendo [dummyjson.com/products?limit=3](https://dummyjson.com/products?limit=3) en una pestaña.

## Conexión con el TIF

La 2da etapa del TIF pide usar **al menos una API** en el sitio del comercio. Esta tienda es un punto de partida: la idea es copiarla, reemplazar los datos de prueba por los del comercio real y adaptar los colores y textos.
