// ============================================================================
// GLOBAL.JS - KORRIGIERTE VERSION MIT STATISTIK-TRACKING
// ============================================================================

console.log('🚀 global.js wird geladen...');

// ============================================================================
// 1. PRELOADER ANIMATION
// ============================================================================

(function() {
    'use strict';
    
    console.log('🌀 Preloader initialisiert');
    
    function initPreloader() {
        const preloader = document.getElementById('preloader');
        const typeText = document.getElementById('type-text');
        
        if (!preloader || !typeText) {
            console.warn('⚠️ Preloader Elemente nicht gefunden');
            return;
        }
        
        console.log('✅ Preloader Elemente gefunden');
        
        // Text für die Typing Animation
        const fullText = "MATTHIAS SILBERHAIN";
        let charIndex = 0;
        const typingSpeed = 120; // ms pro Buchstabe
        
        function typeCharacter() {
            if (charIndex < fullText.length) {
                const currentText = typeText.textContent || '';
                const nextChar = fullText.charAt(charIndex);
                
                if (nextChar === ' ') {
                    typeText.innerHTML = currentText + '&nbsp;';
                } else {
                    typeText.textContent = currentText + nextChar;
                }
                
                charIndex++;
                setTimeout(typeCharacter, typingSpeed);
            } else {
                // Animation beendet, warte kurz und verstecke Preloader
                setTimeout(() => {
                    preloader.classList.add('hidden');
                    
                    // Nach Transition entfernen
                    setTimeout(() => {
                        preloader.style.display = 'none';
                        console.log('✅ Preloader ausgeblendet');
                        
                        // Alle interaktiven Elemente sicherstellen
                        enableInteractiveElements();
                    }, 600);
                }, 800);
            }
        }
        
        // Starte Typing Animation nach kurzer Verzögerung
        setTimeout(() => {
            console.log('⌨️ Starte Typing Animation');
            typeCharacter();
        }, 300);
    }
    
    // Starte Preloader Initialisierung
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            setTimeout(initPreloader, 100);
        });
    } else {
        setTimeout(initPreloader, 100);
    }
    
})();

// ============================================================================
// 2. DARK MODE - KORRIGIERT & VOLL FUNKTIONIERT
// ============================================================================

(function() {
    'use strict';
    
    console.log('🌓 Dark Mode Script geladen');
    
    // 1. THEME AUS LOCALSTORAGE LADEN
    function getSavedTheme() {
        try {
            return localStorage.getItem('ms-theme');
        } catch (e) {
            console.log('⚠️ Kein Zugriff auf localStorage');
            return null;
        }
    }
    
    // 2. SYSTEMPREFERENZ PRÜFEN
    function getSystemPreference() {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }
        return 'light';
    }
    
    // 3. THEME ANWENDEN
    function applyTheme(theme) {
        const html = document.documentElement;
        const body = document.body;
        
        console.log('🎨 Wende Theme an:', theme);
        
        if (theme === 'dark') {
            html.classList.add('dark-mode');
            body.classList.add('dark-mode');
            updateToggleIcon(true);
            console.log('🌙 Dark Mode aktiv');
        } else {
            html.classList.remove('dark-mode');
            body.classList.remove('dark-mode');
            updateToggleIcon(false);
            console.log('☀️ Light Mode aktiv');
        }
    }
    
    // 4. TOGGLE BUTTON ICON AKTUALISIEREN
    function updateToggleIcon(isDark) {
        const toggleBtn = document.getElementById('darkModeToggle');
        
        if (!toggleBtn) {
            console.warn('⚠️ Toggle Button nicht gefunden');
            return;
        }
        
        const moonIcon = toggleBtn.querySelector('.moon-icon');
        const sunIcon = toggleBtn.querySelector('.sun-icon');
        
        if (moonIcon && sunIcon) {
            if (isDark) {
                moonIcon.style.display = 'none';
                sunIcon.style.display = 'block';
                toggleBtn.setAttribute('aria-label', 'Zum Light Mode wechseln');
                toggleBtn.title = 'Zum Light Mode wechseln';
            } else {
                moonIcon.style.display = 'block';
                sunIcon.style.display = 'none';
                toggleBtn.setAttribute('aria-label', 'Zum Dark Mode wechseln');
                toggleBtn.title = 'Zum Dark Mode wechseln';
            }
        }
        
        console.log('🔄 Toggle Icon aktualisiert:', isDark ? 'Dark' : 'Light');
    }
    
    // 5. DARK MODE UMSCHALTEN
    function toggleDarkMode() {
        const html = document.documentElement;
        const body = document.body;
        const isDark = body.classList.contains('dark-mode');
        
        console.log('🔄 Toggle Dark Mode. Aktuell:', isDark ? 'Dark' : 'Light');
        
        if (isDark) {
            // Zu Light wechseln
            html.classList.remove('dark-mode');
            body.classList.remove('dark-mode');
            localStorage.setItem('ms-theme', 'light');
            updateToggleIcon(false);
            console.log('☀️ Zu Light Mode gewechselt');
        } else {
            // Zu Dark wechseln
            html.classList.add('dark-mode');
            body.classList.add('dark-mode');
            localStorage.setItem('ms-theme', 'dark');
            updateToggleIcon(true);
            console.log('🌙 Zu Dark Mode gewechselt');
        }
        
        // Animation für Feedback
        const toggleBtn = document.getElementById('darkModeToggle');
        if (toggleBtn) {
            toggleBtn.style.transform = 'scale(1.2)';
            setTimeout(() => {
                toggleBtn.style.transform = 'scale(1)';
            }, 200);
        }
    }
    
    // 6. INITIALISIERE DARK MODE
    function initDarkMode() {
        console.log('🚀 Initialisiere Dark Mode...');
        
        // Button finden
        const toggleBtn = document.getElementById('darkModeToggle');
        
        if (!toggleBtn) {
            console.error('❌ Dark Mode Toggle Button NICHT GEFUNDEN!');
            console.log('🔍 Suche Button erneut in 500ms...');
            setTimeout(initDarkMode, 500);
            return;
        }
        
        console.log('✅ Dark Mode Toggle Button gefunden');
        
        // Button klickbar machen
        toggleBtn.style.pointerEvents = 'auto';
        toggleBtn.style.cursor = 'pointer';
        toggleBtn.setAttribute('tabindex', '0');
        toggleBtn.style.opacity = '1';
        toggleBtn.style.visibility = 'visible';
        
        // Theme bestimmen und anwenden
        const savedTheme = getSavedTheme();
        const systemTheme = getSystemPreference();
        const initialTheme = savedTheme || systemTheme;
        
        applyTheme(initialTheme);
        
        // Click Event hinzufügen
        toggleBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('🎯 Dark Mode Button geklickt');
            toggleDarkMode();
        });
        
        // Auch per Enter-Taste aktivierbar
        toggleBtn.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleDarkMode();
            }
        });
        
        // System-Änderungen überwachen
        if (window.matchMedia) {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            mediaQuery.addEventListener('change', function(e) {
                if (!getSavedTheme()) { // Nur wenn kein manuelles Theme gesetzt
                    console.log('🖥️ System Theme geändert:', e.matches ? 'dark' : 'light');
                    applyTheme(e.matches ? 'dark' : 'light');
                }
            });
        }
        
        console.log('✅ Dark Mode initialisiert');
    }
    
    // 7. STARTE INITIALISIERUNG
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            setTimeout(initDarkMode, 50);
        });
    } else {
        setTimeout(initDarkMode, 50);
    }
    
    // 8. GLOBALE FUNKTION FÜR EXTERNE ZUGRIFF
    window.toggleDarkMode = toggleDarkMode;
    
    console.log('✅ Dark Mode Script bereit');
    
})();

// ============================================================================
// 3. INTERAKTIVE ELEMENTE AKTIVIEREN
// ============================================================================

function enableInteractiveElements() {
    console.log('🖱️ Aktiviere interaktive Elemente...');
    
    const interactiveSelectors = [
        'button',
        'a',
        '.burger',
        '.dark-mode-toggle',
        '.silber-button',
        '.social-link',
        '.hauptnavigation a'
    ];
    
    interactiveSelectors.forEach(selector => {
        try {
            document.querySelectorAll(selector).forEach(el => {
                el.style.pointerEvents = 'auto';
                el.style.cursor = 'pointer';
                el.style.opacity = '1';
                el.style.visibility = 'visible';
                el.removeAttribute('disabled');
            });
        } catch (e) {
            console.warn('⚠️ Fehler bei:', selector, e);
        }
    });
    
    // Speziell für Burger-Menü
    const burger = document.getElementById('burger');
    if (burger) {
        burger.style.pointerEvents = 'auto';
        burger.style.cursor = 'pointer';
    }
    
    console.log('✅ Alle interaktiven Elemente aktiviert');
}

// ============================================================================
// 4. JAHRESZAHL IM FOOTER AKTUALISIEREN
// ============================================================================

function updateYear() {
    const yearElement = document.getElementById('jahr');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.textContent = currentYear;
        console.log('📅 Jahreszahl aktualisiert:', currentYear);
    }
}

// ============================================================================
// 5. REAL-TIME STATISTIK-TRACKING FÜR ECHTE BUTTONS
// ============================================================================

function setupRealTracking() {
    console.log('📊 Initialisiere Echtzeit-Statistik-Tracking...');
    
    // Prüfe ob das Statistik-Objekt existiert (wird von animated-stats.js geladen)
    if (typeof window.silberhainStats === 'undefined') {
        console.log('⏳ Statistik-System noch nicht geladen, versuche es später...');
        setTimeout(setupRealTracking, 1000);
        return;
    }
    
    console.log('✅ Statistik-System gefunden, aktiviere Tracking...');
    
    // 1. ECHTE DOWNLOAD-BUTTONS ZÄHLEN
    const downloadSelectors = [
        'a[href*="download"]',
        'a[href*=".pdf"]', 
        'a[href*=".epub"]',
        'a[href*=".mobi"]',
        'a[href*=".zip"]',
        '.download-btn',
        '[data-action="download"]',
        '.btn-download',
        '.button-download'
    ];
    
    downloadSelectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(btn => {
            // Entferne zuerst alte Listener (falls vorhanden)
            const newBtn = btn.cloneNode(true);
            btn.parentNode.replaceChild(newBtn, btn);
            
            // Füge neuen Listener hinzu
            newBtn.addEventListener('click', function(e) {
                console.log('📥 Download-Button geklickt:', this.href || this.textContent);
                
                // Kurze Verzögerung, damit der Download startet
                setTimeout(() => {
                    if (window.silberhainStats && typeof window.silberhainStats.incrementDownloads === 'function') {
                        window.silberhainStats.incrementDownloads();
                        console.log('✅ Download gezählt');
                    }
                }, 300);
            });
        });
    });
    
    // 2. ECHTE "LESEPROBE LESEN" BUTTONS ZÄHLEN
    const sampleSelectors = [
        'a[href*="leseprobe"]',
        'a[href*="sample"]',
        '.read-sample-btn',
        '[data-action="read-sample"]',
        '.btn-sample',
        '.leseprobe-link',
        '.button-sample'
    ];
    
    sampleSelectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(btn => {
            const newBtn = btn.cloneNode(true);
            btn.parentNode.replaceChild(newBtn, btn);
            
            newBtn.addEventListener('click', function(e) {
                console.log('📖 Leseprobe-Button geklickt:', this.href || this.textContent);
                
                if (window.silberhainStats && typeof window.silberhainStats.incrementBookSamples === 'function') {
                    window.silberhainStats.incrementBookSamples();
                    console.log('✅ Leseprobe gezählt');
                }
            });
        });
    });
    
    // 3. AUTOMATISCHE BESUCHERZÄHLUNG (passiert bereits in animated-stats.js)
    console.log('✅ Echtzeit-Tracking aktiviert');
    
    // 4. DEMO-BUTTONS FÜR ENTWICKLUNG (kann später entfernt werden)
    const demoButtons = {
        'incrementSamples': 'incrementBookSamples',
        'incrementReviews': 'incrementReviews',
        'incrementDownloads': 'incrementDownloads'
    };
    
    Object.keys(demoButtons).forEach(buttonId => {
        const button = document.getElementById(buttonId);
        if (button) {
            button.addEventListener('click', function() {
                if (window.silberhainStats && window.silberhainStats[demoButtons[buttonId]]) {
                    if (buttonId === 'incrementReviews') {
                        // Zufällige Bewertung zwischen 3-5 Sternen
                        window.silberhainStats.incrementReviews(Math.floor(Math.random() * 3) + 3);
                    } else {
                        window.silberhainStats[demoButtons[buttonId]]();
                    }
                    console.log('🎮 Demo-Button geklickt:', buttonId);
                }
            });
        }
    });
    
    console.log('📊 Statistik-Tracking komplett initialisiert');
}

// ============================================================================
// 6. HAUPTHAUPT-INITIALISIERUNG
// ============================================================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('📄 DOM vollständig geladen');
    
    // Jahreszahl aktualisieren
    updateYear();
    
    // Interaktive Elemente aktivieren
    setTimeout(enableInteractiveElements, 500);
    
    // Statistik-Tracking einrichten (mit Verzögerung, damit animated-stats.js geladen ist)
    setTimeout(setupRealTracking, 1500);
    
    // Console Log für Entwickler
    console.log('✅ Matthias Silberhain Website initialisiert');
    console.log('🔧 Version: 1.0 | Dark Mode: Aktiv | Statistik: Aktiv');
    
    // Tastatur-Navigation verbessern
    document.addEventListener('keydown', function(e) {
        // Escape schließt mögliche Overlays
        if (e.key === 'Escape') {
            const menuOverlay = document.getElementById('menuOverlay');
            if (menuOverlay && menuOverlay.classList.contains('active')) {
                // Hier könntest du das Menü schließen
                console.log('ESC: Menü schließen');
            }
        }
    });
});

// ============================================================================
// 7. FEHLERBEHANDLUNG
// ============================================================================

window.addEventListener('error', function(e) {
    console.error('❌ JavaScript Fehler:', e.message, 'in', e.filename, 'Zeile:', e.lineno);
});

// ============================================================================
// 8. GLOBALE HELFER-FUNKTIONEN
// ============================================================================

// Sanftes Scrollen für Anker-Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const targetElement = document.querySelector(href);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Verhindere doppelte Formular-Absendungen
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function(e) {
        const submitBtn = this.querySelector('button[type="submit"]');
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = submitBtn.textContent + '...';
            
            // Nach 5 Sekunden wieder aktivieren (falls Fehler)
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.textContent = submitBtn.textContent.replace('...', '');
            }, 5000);
        }
    });
});

// Lazy Loading für Bilder
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

console.log('✅ global.js komplett geladen und bereit');
