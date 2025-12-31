// assets/js/browser-refresh.js
(function() {
    'use strict';
    
    console.log('🔄 Browser Refresh aktiviert');
    
    // Entwicklungsmodus nur auf localhost
    const isLocalhost = window.location.hostname === 'localhost' || 
                        window.location.hostname === '127.0.0.1';
    
    // Oder spezielle URL für Live-Testing
    const isDevelopment = isLocalhost || 
                         window.location.hostname.includes('test') ||
                         window.location.search.includes('dev=true');
    
    if (!isDevelopment) {
        console.log('🌐 Produktionsmodus - Auto-Refresh deaktiviert');
        return;
    }
    
    let lastModified = {};
    let checkInterval = null;
    let connectionCheckInterval = null;
    
    // Dateien überwachen
    const filesToWatch = [
        '/',
        '/assets/css/style.css',
        '/assets/js/global.js',
        '/assets/js/dark-mode.js',
        '/assets/js/menu.js',
        '/assets/js/browser-refresh.js'
    ];
    
    // Prüfe Verbindung
    function checkConnection() {
        if (!navigator.onLine) {
            console.warn('⚠️ Keine Internetverbindung');
            return false;
        }
        return true;
    }
    
    // Prüfe Datei-Änderungen
    async function checkForChanges() {
        if (!checkConnection()) return;
        
        try {
            for (const file of filesToWatch) {
                const response = await fetch(file, {
                    method: 'HEAD',
                    cache: 'no-cache',
                    headers: {
                        'Cache-Control': 'no-cache',
                        'Pragma': 'no-cache'
                    }
                });
                
                if (response.ok) {
                    const lastModifiedHeader = response.headers.get('last-modified');
                    
                    if (lastModified[file] && lastModified[file] !== lastModifiedHeader) {
                        console.log(`🔄 Änderung erkannt in: ${file}`);
                        reloadPage();
                        return;
                    }
                    
                    lastModified[file] = lastModifiedHeader;
                }
            }
        } catch (error) {
            console.log('📡 Fehler beim Prüfen auf Änderungen:', error.message);
        }
    }
    
    // Seite neu laden
    function reloadPage() {
        console.log('🔄 Seite wird neu geladen...');
        
        // CSS Dateien neu laden
        document.querySelectorAll('link[rel="stylesheet"]').forEach(link => {
            const href = link.href.split('?')[0];
            link.href = href + '?v=' + Date.now();
        });
        
        // Kurze Verzögerung für vollständiges Neuladen
        setTimeout(() => {
            window.location.reload(true);
        }, 500);
    }
    
    // Live Reload für CSS (ohne Seitenneuladen)
    function setupCssLiveReload() {
        const links = document.querySelectorAll('link[rel="stylesheet"]');
        
        links.forEach(link => {
            const originalHref = link.href.split('?')[0];
            
            setInterval(async () => {
                try {
                    const response = await fetch(originalHref + '?check=' + Date.now(), {
                        method: 'HEAD',
                        cache: 'no-cache'
                    });
                    
                    if (response.ok) {
                        const serverModified = response.headers.get('last-modified');
                        const clientModified = link.getAttribute('data-last-modified');
                        
                        if (clientModified !== serverModified) {
                            console.log('🎨 CSS aktualisiert:', originalHref);
                            link.href = originalHref + '?v=' + Date.now();
                            link.setAttribute('data-last-modified', serverModified);
                        }
                    }
                } catch (error) {
                    // Fehler ignorieren
                }
            }, 2000);
        });
    }
    
    // Hotkeys für Entwickler
    function setupHotkeys() {
        document.addEventListener('keydown', function(e) {
            // Ctrl + R = Hard Reload
            if (e.ctrlKey && e.key === 'r') {
                e.preventDefault();
                console.log('🔄 Hard Reload mit Ctrl+R');
                window.location.reload(true);
            }
            
            // Ctrl + Shift + R = Cache leeren und neu laden
            if (e.ctrlKey && e.shiftKey && e.key === 'R') {
                e.preventDefault();
                console.log('🗑️ Cache leeren und neu laden');
                caches.keys().then(function(names) {
                    for (let name of names) caches.delete(name);
                }).then(function() {
                    window.location.reload(true);
                });
            }
            
            // F5 = Normaler Reload
            if (e.key === 'F5') {
                console.log('🔁 Normaler Reload mit F5');
                // Standardverhalten zulassen
            }
        });
    }
    
    // Browser Verbindung überwachen
    function setupConnectionMonitoring() {
        window.addEventListener('online', function() {
            console.log('✅ Verbindung wiederhergestellt');
            if (checkInterval) {
                clearInterval(checkInterval);
                startWatching();
            }
        });
        
        window.addEventListener('offline', function() {
            console.warn('⚠️ Verbindung verloren');
            if (checkInterval) {
                clearInterval(checkInterval);
                checkInterval = null;
            }
        });
    }
    
    // Starte Überwachung
    function startWatching() {
        // Initiale Prüfung
        checkForChanges();
        
        // Regelmäßige Prüfung alle 2 Sekunden
        checkInterval = setInterval(checkForChanges, 2000);
        
        // Verbindungsprüfung alle 10 Sekunden
        connectionCheckInterval = setInterval(checkConnection, 10000);
        
        console.log('👁️  Überwache Dateien auf Änderungen...');
    }
    
    // Initialisierung
    function init() {
        console.log('🚀 Browser Refresh initialisiert');
        
        setupHotkeys();
        setupConnectionMonitoring();
        setupCssLiveReload();
        startWatching();
        
        // Entwickler-Info in Console
        console.log('%c🛠️  Entwicklermodus aktiviert!', 'color: #4CAF50; font-weight: bold;');
        console.log('%cVerfügbare Hotkeys:', 'color: #2196F3;');
        console.log('%c• Ctrl+R = Hard Reload', 'color: #666;');
        console.log('%c• Ctrl+Shift+R = Cache leeren', 'color: #666;');
        console.log('%c• F5 = Normaler Reload', 'color: #666;');
    }
    
    // Starte wenn DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    // Globale Funktionen für Console
    window.devTools = {
        reload: function() {
            reloadPage();
        },
        clearCache: function() {
            caches.keys().then(names => {
                names.forEach(name => caches.delete(name));
                console.log('🗑️  Cache geleert');
            });
        },
        checkNow: function() {
            checkForChanges();
        }
    };
    
})();
