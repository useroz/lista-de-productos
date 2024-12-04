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
  '/image/default-placeholder.png', // Imagen de placeholder para recursos faltantes
];

// Evento de instalación
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(resourcesToCache);
    })
  );
});

// Evento de activación
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Evento de fetch
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request).catch(() => {
        // Si es una imagen y no se encuentra, mostrar el placeholder
        if (event.request.destination === 'image') {
          return caches.match('/image/default-placeholder.png');
        }
        // Respuesta para otros recursos no encontrados
        return new Response('Recurso no disponible en modo offline.', {
          status: 404,
          headers: { 'Content-Type': 'text/plain' }
        });
      });
    })
  );
});
