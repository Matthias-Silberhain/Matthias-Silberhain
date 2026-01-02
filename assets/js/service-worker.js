// Service Worker für Matthias Silberhain Website
const CACHE_NAME = 'silberhain-v1.0';
const urlsToCache = [
  '/',
  '/index.html',
  '/ueber-mich.html',
  '/werke.html',
  '/termine.html',
  '/kontakt.html',
  '/impressum.html',
  '/datenschutz.html',
  '/assets/css/style.css',
  '/assets/js/global.js',
  '/assets/js/dark-mode.js',
  '/assets/js/menu.js',
  '/assets/images/logo.png',
  'https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600&family=EB+Garamond:wght@400;500&family=Great+Vibes&display=swap'
];

// Installation des Service Workers
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('✅ Service Worker: Cache geöffnet');
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        console.log('✅ Service Worker: Alle Ressourcen gecached');
        return self.skipWaiting();
      })
      .catch(error => {
        console.error('❌ Service Worker: Fehler beim Cachen:', error);
      })
  );
});

// Aktivierung des Service Workers
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('🗑️ Service Worker: Alten Cache löschen:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('✅ Service Worker: Aktiviert');
      return self.clients.claim();
    })
  );
});

// Fetch-Event: Auslieferung aus Cache oder Netzwerk
self.addEventListener('fetch', event => {
  // Nur GET-Requests cachen
  if (event.request.method !== 'GET') return;
  
  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        // Wenn im Cache gefunden, ausliefern
        if (cachedResponse) {
          return cachedResponse;
        }
        
        // Andernfalls vom Netzwerk laden
        return fetch(event.request)
          .then(response => {
            // Prüfen ob valide Antwort
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            
            // Response klonen und im Cache speichern
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });
            
            return response;
          })
          .catch(error => {
            console.error('❌ Service Worker: Fetch fehlgeschlagen:', error);
            
            // Fallback für HTML-Seiten
            if (event.request.headers.get('accept').includes('text/html')) {
              return caches.match('/');
            }
            
            // Fallback für CSS
            if (event.request.url.includes('.css')) {
              return new Response(
                'body { color: #c0c0c0; background: #000; font-family: sans-serif; }',
                { headers: { 'Content-Type': 'text/css' } }
              );
            }
          });
      })
  );
});

// Push-Benachrichtigungen (optional)
self.addEventListener('push', event => {
  const options = {
    body: event.data ? event.data.text() : 'Neue Updates verfügbar',
    icon: 'assets/images/logo-192x192.png',
    badge: 'assets/images/logo-96x96.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: '2'
    },
    actions: [
      {
        action: 'explore',
        title: 'Website öffnen',
        icon: 'assets/images/icon-explore.png'
      },
      {
        action: 'close',
        title: 'Schließen',
        icon: 'assets/images/icon-close.png'
      }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification('Matthias Silberhain', options)
  );
});

// Notification Click Event
self.addEventListener('notificationclick', event => {
  event.notification.close();
  
  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  } else {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});
