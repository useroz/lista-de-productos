[1mdiff --git a/service-worker.js b/service-worker.js[m
[1mindex 52d60ae..75bba75 100644[m
[1m--- a/service-worker.js[m
[1m+++ b/service-worker.js[m
[36m@@ -4,16 +4,16 @@[m [mconst resourcesToCache = [[m
   '/index.html',[m
   '/styles.css',[m
   '/script.js',[m
[31m-  '/images/lechuga.webp',[m
[31m-  '/images/mango.jpg',   [m
[31m-  '/images/manzana-roja.png',[m
[31m-  '/images/naranja.webp', [m
[32m+[m[32m  '/image/lechuga.webp',[m
[32m+[m[32m  '/image/mango.jpg',[m[41m   [m
[32m+[m[32m  '/image/manzana-roja.png',[m
[32m+[m[32m  '/image/naranja.webp',[m[41m [m
   '/image/pera.jpg',[m
[31m-  '/images/platano.jpg',[m
[31m-  '/images/sandia.jpg',[m
[31m-  '/images/tomate.avif',[m
[31m-   '/images/uva.jpg',[m
[31m-   '/images/zanahoria.jpg',[m
[32m+[m[32m  '/image/platano.jpg',[m
[32m+[m[32m  '/image/sandia.jpg',[m
[32m+[m[32m  '/image/tomate.avif',[m
[32m+[m[32m   '/image/uva.jpg',[m
[32m+[m[32m   '/image/zanahoria.jpg',[m
  [m
   // Añade todas las imágenes[m
 ];[m
