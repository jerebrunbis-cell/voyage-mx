
const CACHE_NAME = 'voyage-mx-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/styles.css',
  '/app.js',
  '/data.js',
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png'
];
self.addEventListener('install', evt => {
  evt.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ASSETS)));
});
self.addEventListener('activate', evt => {
  evt.waitUntil(caches.keys().then(keys => Promise.all(keys.map(k => k !== CACHE_NAME && caches.delete(k)))));
});
self.addEventListener('fetch', evt => {
  evt.respondWith(
    caches.match(evt.request).then(res => res || fetch(evt.request).then(resp => {
      const copy = resp.clone();
      caches.open(CACHE_NAME).then(c => c.put(evt.request, copy)).catch(()=>{});
      return resp;
    }).catch(()=> caches.match('/index.html')))
   );
