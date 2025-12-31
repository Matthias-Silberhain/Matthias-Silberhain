// ============================================================================
// GLOBAL.JS - KOMPLETT KORRIGIERT FÜR ALLE GERÄTE
// ============================================================================

console.log('🚀 global.js wird geladen - Mobile & Desktop optimiert');

// ============================================================================
// 1. PRELOADER - SIMPLER & ROBUSTER FÜR ALLE GERÄTE
// ============================================================================

(function() {
    'use strict';
    
    // Warte bis die Seite KOMPLETT geladen ist (inkl. Bilder)
    if (document.readyState === 'complete') {
        initPreloader();
    } else {
        window.addEventListener('load', function() {
            setTimeout(initPreloader, 100);
        });
    }
    
    function initPreloader() {
        console.log('🎬 Starte Preloader...');
        
        const preloader = document.getElementById('preloader');
        const typeText = document.getElementById('type-text');
        
        // Fallback: Wenn kein Preloader existiert
        if (!preloader) {
            console.log('⚠️ Kein Preloader gefunden, überspringe...');
            enableInteractiveElements();
            return;
        }
        
        console.log('✅ Preloader gefunden');
        
        // Sicherstellen dass Preloader sichtbar ist
        preloader.style.display = 'flex';
        preloader.style.opacity = '1';
        preloader.style.visibility = 'visible';
        preloader.style.pointerEvents = 'none';
        
        // Text für Typing Animation
        const fullText = "MATTHIAS SILBERHAIN";
        let charIndex = 0;
        
        function typeCharacter() {
            if (typeText && charIndex < fullText.length) {
                const nextChar = fullText.charAt(charIndex);
                
                if (nextChar === ' ') {
                    typeText.innerHTML += '&nbsp;';
                } else {
                    typeText.textContent += nextChar;
                }
                
                charIndex++;
                
                // Langsamere Animation auf Mobile
                const isMobile = window.innerWidth <= 768;
                const speed = isMobile ? 150 : 100;
                
                setTimeout(typeCharacter, speed);
            } else {
                // Animation beendet
                console.log('✅ Typing Animation beendet');
                
                // Kurze Pause, dann ausblenden
                setTimeout(() => {
                    preloader.classList.add('hidden');
                    
                    // Nach Transition komplett verstecken
                    setTimeout(() => {
                        preloader.style.display = 'none';
                        console.log('✅ Preloader ausgeblendet');
                        
                        // Interaktive Elemente freigeben
                        enableInteractiveElements();
                    }, 600);
                }, 800);
            }
        }
        
        // Starte Animation
        setTimeout(() => {
            if (typeText) typeText.textContent = '';
            typeCharacter();
        }, 300);
    }
})();

// ============================================================================
// 2. INTERAKTIVE ELEMENTE AKTIVIEREN
// ============================================================================

function enableInteractiveElements() {
    console.log('🖱️ Aktiviere alle klickbaren Elemente...');
    
    // Liste aller interaktiven Elemente
    const elementsToActivate = [
        'button',
        'a',
        '.burger',
        '.dark-mode-toggle', 
        '.silber-button',
        '.social-link',
        '.hauptnavigation a',
        '.karussell-button',
        '.comment-tag',
        '.buchauswahl-item',
        '.star-rating label',
        '.bewertung-submit'
    ];
    
    elementsToActivate.forEach(selector => {
        try {
            document.querySelectorAll(selector).forEach(el => {
                el.style.pointerEvents = 'auto';
                el.style.cursor = 'pointer';
                el.style.touchAction = 'manipulation'; // Wichtig für Mobile!
                el.style.webkitTapHighlightColor = 'rgba(200, 200, 200, 0.3)';
            });
        } catch (e) {
            // Ignoriere Fehler bei nicht vorhandenen Selektoren
        }
    });
    
    // Speziell für Burger-Menü auf Mobile
    const burger = document.getElementById('burger');
    if (burger) {
        burger.style.touchAction = 'manipulation';
        burger.style.webkitTapHighlightColor = 'rgba(255, 255, 255, 0.3)';
    }
    
    console.log('✅ Alle Elemente sind jetzt klickbar');
}

// ============================================================================
// 3. DARK MODE - EINFACH & FUNKTIONIERT
// ============================================================================

(function() {
    'use strict';
    
    // Sofortiges Setup für Dark Mode (verhindert Flackern)
    function setupDarkModeImmediately() {
        try {
            const savedTheme = localStorage.getItem('ms-theme');
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            
            if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
                document.documentElement.classList.add('dark-mode');
                document.body.classList.add('dark-mode');
            }
        } catch (e) {
            // Ignoriere Fehler
        }
    }
    
    // Initial sofort ausführen
    setupDarkModeImmediately();
    
    // Vollständige Initialisierung nach Preloader
    function initDarkMode() {
        const toggleBtn = document.getElementById('darkModeToggle');
        
        if (!toggleBtn) {
            console.log('🔄 Warte auf Dark Mode Button...');
            setTimeout(initDarkMode, 500);
            return;
        }
        
        console.log('✅ Dark Mode Button gefunden');
        
        // Button für Mobile optimieren
        toggleBtn.style.touchAction = 'manipulation';
        toggleBtn.style.webkitTapHighlightColor = 'rgba(255, 255, 255, 0.3)';
        toggleBtn.style.minWidth = '44px'; // Mindestgröße für Touch
        toggleBtn.style.minHeight = '44px';
        
        // Toggle-Funktion
        function toggleTheme() {
            const isDark = document.body.classList.contains('dark-mode');
            
            if (isDark) {
                document.documentElement.classList.remove('dark-mode');
                document.body.classList.remove('dark-mode');
                localStorage.setItem('ms-theme', 'light');
            } else {
                document.documentElement.classList.add('dark-mode');
                document.body.classList.add('dark-mode');
                localStorage.setItem('ms-theme', 'dark');
            }
            
            // Haptic Feedback für Mobile
            if (navigator.vibrate) {
                navigator.vibrate(50);
            }
        }
        
        // Event Listener - für Mobile und Desktop
        toggleBtn.addEventListener('click', toggleTheme);
        toggleBtn.addEventListener('touchstart', function(e) {
            e.preventDefault(); // Verhindert Doppel-Auslösung
            toggleTheme();
        }, { passive: false });
        
        // Tastatur-Support
        toggleBtn.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleTheme();
            }
        });
    }
    
    // Starte nach Preloader
    setTimeout(initDarkMode, 2000);
})();

// ============================================================================
// 4. JAHRESZAHL IM FOOTER
// ============================================================================

function updateYear() {
    const yearElements = document.querySelectorAll('#jahr');
    if (yearElements.length > 0) {
        const currentYear = new Date().getFullYear();
        yearElements.forEach(el => {
            el.textContent = currentYear;
        });
    }
}

// ============================================================================
// 5. MOBILE-OPTIMIERUNGEN
// ============================================================================

(function() {
    'use strict';
    
    // Verhindert Zoom bei Doppelklick auf iOS
    document.addEventListener('touchstart', function(event) {
        if (event.touches.length > 1) {
            event.preventDefault();
        }
    }, { passive: false });
    
    // Verhindert Hervorhebung bei langem Touch
    document.addEventListener('touchstart', function(event) {
        if (event.target.tagName === 'A' || event.target.tagName === 'BUTTON') {
            event.target.style.webkitTapHighlightColor = 'rgba(200, 200, 200, 0.3)';
        }
    });
    
    // Bessere Performance auf Mobile
    if ('connection' in navigator) {
        const connection = navigator.connection;
        if (connection.saveData || connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
            console.log('📱 Mobile mit langsamer Verbindung erkannt');
            // Hier könntest du weniger Animationen laden etc.
        }
    }
})();

// ============================================================================
// 6. HAUPTHAUPT-INITIALISIERUNG
// ============================================================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('📄 DOM ist bereit');
    
    // Jahreszahl sofort setzen
    updateYear();
    
    // Prüfe ob wir auf Mobile sind
    const isMobile = window.innerWidth <= 768;
    console.log(isMobile ? '📱 Mobile erkannt' : '🖥️ Desktop erkannt');
    
    // Lade Performance für Mobile verbessern
    if (isMobile) {
        // Verzögere nicht-kritische Scripts
        setTimeout(() => {
            // Hier könnten spätere Initialisierungen kommen
        }, 1000);
    }
});

// ============================================================================
// 7. FEHLERBEHANDLUNG & FALLBACKS
// ============================================================================

// Sanftes Fallback wenn Preloader nicht funktioniert
setTimeout(function() {
    const preloader = document.getElementById('preloader');
    if (preloader && preloader.style.display === 'flex') {
        console.log('⚠️ Preloader hängt, überspringe...');
        preloader.style.display = 'none';
        enableInteractiveElements();
    }
}, 10000); // Nach 10 Sekunden Timeout

// Globale Error-Handling
window.addEventListener('error', function(e) {
    console.error('❌ Fehler:', e.message);
    
    // Bei kritischen Fehlern, sicherstellen dass Seite benutzbar ist
    if (e.message.includes('preloader') || e.message.includes('undefined')) {
        enableInteractiveElements();
    }
});

// ============================================================================
// 8. HELPER FUNCTIONS
// ============================================================================

// Sanftes Scrollen (mit Mobile-Support)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Verbesserte Touch-Unterstützung für Formulare
document.querySelectorAll('input, textarea, select').forEach(element => {
    element.addEventListener('touchstart', function() {
        this.style.fontSize = '16px'; // Verhindert iOS Zoom
    });
});

console.log('✅ global.js vollständig geladen und bereit');
