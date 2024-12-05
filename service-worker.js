const CACHE_NAME = "v1_cache_lista_compras";
const urlsToCache = [
  "/",
  "/index.html",
  "/styles.css",
  "/script.js",
  "/manifest.json",
  "/image/lechuga.webp",
  "/image/mango.jpg",
  "/image/manzana_roja.jpg",
  "/image/Naranja.webp",
  "/image/pera.jpg",
  "/image/platano.jpg",
  "/image/sandia.webp",
  "/image/tomate.avif",
  "/image/uva.png",
  "/image/zanahoria.jpg",
  "/iconos/icono.jpg",
  "/iconos/icono.jpg"
  
 
];
// Instala el Service Worker y almacena los recursos en caché
self.addEventListener("install", event => {
  event.waitUntil(
      caches.open(CACHE_NAME)
      .then(cache => {
          console.log("Cachando recursos...", urlsToCache); // Agrega un log aquí
          return cache.addAll(urlsToCache);
      })
  );
});


// Intercepta las solicitudes de red y sirve desde el caché si está disponible
self.addEventListener("fetch", event => {
  event.respondWith(
      caches.match(event.request)
      .then(response => {
          if (response) {
              return response; // Si está en caché, devuelve el recurso
          }

          if (!navigator.onLine) {
              // Si está offline, devuelve un mensaje JSON o de texto
              return new Response(
                  "Estás offline. Algunas funcionalidades podrían no estar disponibles.", {
                      status: 503,
                      statusText: "Servicio no disponible",
                      headers: { "Content-Type": "text/plain" }
                  }
              );
          }

          return fetch(event.request);
      })
      .catch(error => {
          console.log("Error al intentar obtener el recurso:", error);
          return new Response("Error al cargar el recurso.", { status: 500 });
      })
  );
});