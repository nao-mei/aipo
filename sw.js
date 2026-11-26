/* Cache-first service worker. The version is stamped by scripts/build.js. */
var VERSION = "20261126.1123";
var CACHE = "aipo-coach-" + VERSION;
var FILES = ["./","index.html","app.js","logic.js","mascot.js","manifest.webmanifest","content/data.js","content/domains.js","content/eval.js","content/frame.js","content/hax.js","content/intro.js","content/ops.js","content/po.js","content/risk.js","content/use.js","icons/icon-180.png","icons/icon-192.png","icons/icon-512.png","icons/icon-maskable-512.png","icons/icon.svg"];

self.addEventListener("install", function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(FILES); }).then(function () { return self.skipWaiting(); }));
});
self.addEventListener("activate", function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k.indexOf("aipo-coach-") === 0 && k !== CACHE; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});
self.addEventListener("fetch", function (e) {
  if (e.request.method !== "GET") return;
  e.respondWith(caches.match(e.request, { ignoreSearch: true }).then(function (hit) {
    return hit || fetch(e.request);
  }));
});
