// ============================================================================
// GLOBAL.JS - KORRIGIERTER PRELOADER
// ============================================================================

console.log('🚀 global.js wird geladen...');

// ============================================================================
// 1. PRELOADER ANIMATION - KORRIGIERT
// ============================================================================

(function() {
    'use strict';
    
    console.log('🌀 Initialisiere Preloader...');
    
    function initPreloader() {
        console.log('🔍 Suche Preloader Elemente...');
        
        const preloader = document.getElementById('preloader');
        const typeText = document.getElementById('type-text');
        
        if (!preloader) {
            console.error('❌ Preloader DIV nicht gefunden!');
            console.log('🔍 Suche nach:', '#preloader');
            console.log('🔍 Gefundene Elemente mit ID preloader:', document.querySelectorAll('#preloader').length);
            return;
        }
        
        if (!typeText) {
            console.warn('⚠️ type-text Element nicht gefunden, zeige nur Preloader');
        }
        
        console.log('✅ Preloader Elemente gefunden');
        
        // Preloader sofort sichtbar machen (falls CSS es ausblendet)
        preloader.style.display = 'flex';
        preloader.style.opacity = '1';
        preloader.style.visibility = 'visible';
        preloader.style.pointerEvents = 'none';
        
        const fullText = "MATTHIAS SILBERHAIN";
        let charIndex = 0;
        const typingSpeed = 100;
        
        function typeCharacter() {
            if (typeText && charIndex < fullText.length) {
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
                // Animation beendet oder kein typeText
                console.log('✅ Typing Animation beendet');
                
                // Kurze Pause bevor Preloader ausgeblendet wird
                setTimeout(() => {
                    console.log('👋 Verstecke Preloader...');
                    
                    // Preloader ausblenden mit CSS-Klasse
                    preloader.classList.add('hidden');
                    
                    // Nach der CSS-Transition komplett ausblenden
                    setTimeout(() => {
                        preloader.style.display = 'none';
                        console.log('✅ Preloader komplett ausgeblendet');
                        
                        // Interaktive Elemente aktivieren
                        enableInteractiveElements();
                    }, 600); // Muss mit CSS transition-duration übereinstimmen
                }, 800);
            }
        }
        
        // Starte Typing Animation nach kurzer Verzögerung
        setTimeout(() => {
            console.log('⌨️ Starte Typing Animation...');
            
            // typeText leeren, falls noch nicht leer
            if (typeText) {
                typeText.textContent = '';
            }
            
            typeCharacter();
        }, 300);
    }
    
    // Starte Preloader WENN das DOM geladen ist
    if (document.readyState === 'loading') {
        console.log('📄 Warte auf DOM...');
        document.addEventListener('DOMContentLoaded', function() {
            console.log('📄 DOM geladen, starte Preloader...');
            setTimeout(initPreloader, 100);
        });
    } else {
        console.log('📄 DOM bereits geladen, starte Preloader direkt...');
        setTimeout(initPreloader, 100);
    }
    
})();

// ============================================================================
// 2. INTERAKTIVE ELEMENTE AKTIVIEREN
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
            });
        } catch (e) {
            console.warn('⚠️ Fehler bei:', selector, e);
        }
    });
    
    console.log('✅ Interaktive Elemente aktiviert');
}

// ============================================================================
// 3. DARK MODE - VEREINFACHT
// ============================================================================

(function() {
    'use strict';
    
    function initDarkMode() {
        const toggleBtn = document.getElementById('darkModeToggle');
        if (!toggleBtn) {
            console.log('🔍 Dark Mode Button nicht gefunden, versuche es später...');
            setTimeout(initDarkMode, 500);
            return;
        }
        
        console.log('✅ Dark Mode Button gefunden');
        
        // Theme aus localStorage oder System
        const savedTheme = localStorage.getItem('ms-theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
        
        // Theme anwenden
        if (initialTheme === 'dark') {
            document.documentElement.classList.add('dark-mode');
            document.body.classList.add('dark-mode');
            console.log('🌙 Dark Mode aktiv (initial)');
        } else {
            console.log('☀️ Light Mode aktiv (initial)');
        }
        
        // Toggle-Funktion
        function toggleTheme() {
            const isDark = document.body.classList.contains('dark-mode');
            
            if (isDark) {
                document.documentElement.classList.remove('dark-mode');
                document.body.classList.remove('dark-mode');
                localStorage.setItem('ms-theme', 'light');
                console.log('☀️ Zu Light Mode gewechselt');
            } else {
                document.documentElement.classList.add('dark-mode');
                document.body.classList.add('dark-mode');
                localStorage.setItem('ms-theme', 'dark');
                console.log('🌙 Zu Dark Mode gewechselt');
            }
            
            // Button-Animation
            toggleBtn.style.transform = 'scale(1.1)';
            setTimeout(() => {
                toggleBtn.style.transform = 'scale(1)';
            }, 200);
        }
        
        // Event Listener
        toggleBtn.addEventListener('click', toggleTheme);
        toggleBtn.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleTheme();
            }
        });
        
        // System-Änderungen überwachen
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
            if (!localStorage.getItem('ms-theme')) {
                if (e.matches) {
                    document.documentElement.classList.add('dark-mode');
                    document.body.classList.add('dark-mode');
                } else {
                    document.documentElement.classList.remove('dark-mode');
                    document.body.classList.remove('dark-mode');
                }
            }
        });
    }
    
    // Starte Dark Mode nach Preloader
    setTimeout(initDarkMode, 1500);
    
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
        console.log('📅 Jahreszahl aktualisiert:', currentYear);
    }
}

// ============================================================================
// 5. HAUPTHAUPT-INITIALISIERUNG
// ============================================================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('📄 DOM vollständig geladen');
    
    // Jahreszahl sofort aktualisieren
    updateYear();
    
    // Debug: Zeige alle Elemente mit ID preloader
    console.log('🔍 Anzahl #preloader Elemente:', document.querySelectorAll('#preloader').length);
    
    // Check ob Preloader existiert
    const preloader = document.getElementById('preloader');
    if (preloader) {
        console.log('✅ Preloader gefunden, sollte automatisch starten');
        preloader.style.display = 'flex'; // Sicherstellen, dass er sichtbar ist
    } else {
        console.error('❌ KEIN PRELOADER GEFUNDEN!');
        // Ohne Preloader sofort interaktive Elemente aktivieren
        enableInteractiveElements();
    }
});

// ============================================================================
// 6. FEHLERBEHANDLUNG
// ============================================================================

window.addEventListener('error', function(e) {
    console.error('❌ JavaScript Fehler:', e.message, 'in', e.filename, 'Zeile:', e.lineno);
});

console.log('✅ global.js vollständig geladen');
