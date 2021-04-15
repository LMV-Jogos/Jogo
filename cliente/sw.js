const version = "0.1.0";
const cacheName = "lmv-jogos";
const precacheResources = [
    "./assets/agatha.png",
    "./assets/beatriz.png",
    "./assets/botao.png",
    "./assets/click.mp3",
    "./assets/cofre.png",
    "./assets/fullscreen.png",
    "./assets/fundoazul.png",
    "./assets/ganho.mp3",
    "./assets/introducao.mp3",
    "./assets/introdução.png",
    "./assets/jogo.json",
    "./assets/logo-128.png",
    "./assets/logo-192.png",
    "./assets/logo-256.png",
    "./assets/logo-384.png",
    "./assets/logo-512.png",
    "./assets/perda.mp3",
    "./assets/pular.png",
    "./assets/restart.png",
    "./assets/seringa.png",
    "./assets/right.png",
    "./assets/left.png",
    "./assets/up.png",
    "./assets/down.png",
    "./assets/teste.png",
    "./assets/tileset_final.png",
    "./assets/trilha.mp3",
    "./assets/virus.png",
    "./index.html",
    "./js/cena0.js",
    "./js/cena01.js",
    "./js/cena1.js",
    "./js/cena2.js",
    "./js/cena3.js",
    "./js/index.js",
    "./manifest.json",
    "./sw.js",
];

self.addEventListener("install", (event) => {
    console.log("Service worker install event!");
    event.waitUntil(
        caches.open(cacheName).then((cache) => {
            return cache.addAll(precacheResources).then(() => self.skipWaiting());
        })
    );
});

self.addEventListener("activate", (event) => {
    console.log("Service worker activate event!");
    event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
    console.log("Fetch intercepted for: ", event.request.url);
    event.respondWith(
        caches
            .open(cacheName)
            .then((cache) => cache.match(event.request, { ignoreSearch: true }))
            .then((response) => {
                return response || fetch(event.request);
            })
    );
});