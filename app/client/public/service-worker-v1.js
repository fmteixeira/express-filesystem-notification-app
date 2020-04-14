console.log("My custom service worker");

const cacheName = "v1";

const cacheAssets = [];

const ignoredUrlPaths = ["/getApps"];

const OFFLINE_URL = "offline.html";

// Call Install Event
self.addEventListener("install", (e) => {
  console.log("Service Worker: Installed");

  e.waitUntil(
    caches
      .open(cacheName)
      .then((cache) => {
        console.log("Service Worker: Caching Files");
        cache.addAll(cacheAssets);
      })
      .then(() => self.skipWaiting())
  );
});

// Call Activate Event
self.addEventListener("activate", (e) => {
  console.log("Service Worker: Activated");
  // Remove unwanted caches
  e.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== cacheName) {
            console.log("Service Worker: Clearing Old Cache");
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Call Fetch Event
self.addEventListener("fetch", (e) => {
  console.log("Service Worker: Fetching");
  if (!ignoredUrlPaths.some((url) => e.request.url.includes(url))) {
    /*e.respondWith(
      fetch(e.request)
        .then((res) => {
          console.log("From Network: ", e.request.url);
          return res;
        })
        .catch(() => {
          console.log("From Cache: ", e.request.url);
          caches.match(e.request).then((res) => res);
        })
    );*/
    /*e.respondWith(
      fetch(e.request)
        .then((res) => {
          console.log("From Network: ", e.request.url);
          return res;
        })
        .catch(() => {
          console.log("From Cache: ", e.request.url);
          caches.match(e.request).then((res) => res);
        })
    );*/
    e.respondWith(
      caches.match(e.request).then((res) => {
        console.log("From Cache: ", e.request.url);
        return (
          res ||
          fetch(e.request).then((response) => {
            console.log("From Network & saved: ", e.request.url);
            // Make copy/clone of response
            const resClone = response.clone();
            // Open cahce
            caches.open(cacheName).then((cache) => {
              // Add response to cache
              cache.put(e.request, resClone);
            });
            return response;
          })
        );
      })
    );
    /*e.respondWith(
      caches.match(e.request).then(function (response) {
        return response || fetch(e.request);
      })
    );*/
  } else {
    //e.respondWith(caches.match(e.request).then((res) => res));
    //console.log("From Server: ", e.request.url);
    //e.respondWith(fetch(e.request)).catch(() => {});
    fetch(e.request)
      .then((res) => {
        console.log("From Server: ", e.request.url);
        return res;
      })
      .catch(() => {});
  }
});
