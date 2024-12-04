const CACHE_NAME = 'v1';
const resourcesToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/script.js',
  '/image/lechuga.webp',
  '/image/mango.jpg',   
  '/image/manzana-roja.png',
  '/image/naranja.webp', 
  '/image/pera.jpg',
  '/image/platano.jpg',
  '/image/sandia.jpg',
  '/image/tomate.avif',
   '/image/uva.jpg',
   '/image/zanahoria.jpg',
 
  // Añade todas las imágenes
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(resourcesToCache);
    })
  );
});



self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      // Si el recurso está en caché, devolverlo; de lo contrario, intentar obtenerlo de la red.
      return response || fetch(event.request).catch(() => {
        // Si no hay conexión y el recurso no está en el caché, devolver nada.
        return new Response("", { status: 404, statusText: "Not Found" });
      });
    })
  );
});
