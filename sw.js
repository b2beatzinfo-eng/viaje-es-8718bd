/* Service worker · Spagna 2026 */
const VER = "spagna-2026-v7";
const SHELL = [
  "./",
  "./index.html",
  "./style.css",
  "./app.js",
  "./data.js",
  "./media.js",
  "./alts.js",
  "./geo.js",
  "./bookings.js",
  "./manifest.webmanifest",
  "./icon.svg",
  "./icon-192.png",
  "./icon-512.png"
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(VER).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()).catch(() => {}));
});

self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== VER).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});

// clic su una notifica (promemoria/prossimità): porta in primo piano l'app
self.addEventListener("notificationclick", e => {
  e.notification.close();
  e.waitUntil(self.clients.matchAll({ type: "window", includeUncontrolled: true }).then(cs => {
    for (const c of cs) { if ("focus" in c) return c.focus(); }
    if (self.clients.openWindow) return self.clients.openWindow("./index.html");
  }));
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);

  // foto Wikimedia: stale-while-revalidate (così restano anche offline)
  if (/upload\.wikimedia\.org$/.test(url.hostname)) {
    e.respondWith(caches.open(VER + "-img").then(async cache => {
      const hit = await cache.match(req);
      const net = fetch(req).then(r => { if (r && r.ok) cache.put(req, r.clone()); return r; }).catch(() => hit);
      return hit || net;
    }));
    return;
  }

  // app shell (stessa origine): cache-first con aggiornamento in background
  if (url.origin === location.origin) {
    e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(r => {
      const copy = r.clone(); caches.open(VER).then(c => c.put(req, copy)).catch(() => {}); return r;
    }).catch(() => caches.match("./index.html"))));
  }
});
