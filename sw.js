/* Service Worker — Exámenes de Inducción ONI
   Estrategia: HTML "network-first" (para ver cambios al recargar en línea);
   el resto de archivos "cache-first". Sube el número CACHE al editar archivos
   para forzar la actualización en los dispositivos. */
const CACHE = 'examenes-oni-v5';
const ASSETS = [
  './', './index.html', './examenes.js', './manifest.json', './icon.svg',
  './img/logo.png',
  './img/altura_peldanos.jpg', './img/altura_pictograma.png', './img/altura_uso_escalera.jpg',
  './img/electrico_lineas.jpg', './img/electrico_senal.png',
  './img/ergo_p1_A.jpg', './img/ergo_p1_B.jpg', './img/ergo_p2_A.jpg', './img/ergo_p2_B.jpg',
  './img/ergo_p3_A.jpg', './img/ergo_p3_B.jpg', './img/ergo_p4_A.jpg', './img/ergo_p4_B.jpg',
  './img/ergo_p5_A.jpg', './img/ergo_p5_B.jpg'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(
    keys.filter(k => k !== CACHE).map(k => caches.delete(k))
  )).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;                 // no interceptar POST al backend
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;       // solo mismo origen

  const isHTML = req.mode === 'navigate' || (req.headers.get('accept') || '').includes('text/html');
  if (isHTML) {
    // network-first
    e.respondWith(
      fetch(req).then(res => { const cp = res.clone(); caches.open(CACHE).then(c => c.put(req, cp)); return res; })
        .catch(() => caches.match(req).then(r => r || caches.match('./index.html')))
    );
  } else {
    // cache-first
    e.respondWith(
      caches.match(req).then(r => r || fetch(req).then(res => {
        const cp = res.clone(); caches.open(CACHE).then(c => c.put(req, cp)); return res;
      }))
    );
  }
});
