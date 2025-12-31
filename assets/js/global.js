// ============================================================================
// GLOBAL.JS - KORRIGIERTER PRELOADER OHNE DOPPELBUCHSTABEN
// ============================================================================

console.log('🚀 global.js wird geladen...');

// ============================================================================
// 1. PRELOADER ANIMATION - KORRIGIERT
// ============================================================================

(function() {
    'use strict';
    
    console.log('🌀 Preloader initialisiert');
    
    // Prüfe ob Preloader auf dieser Seite existiert
    const preloader = document.getElementById('preloader');
    if (!preloader) {
        console.log('⚠️ Kein Preloader auf dieser Seite');
        return;
    }
    
    function initPreloader() {
        const typeText = document.getElementById('type-text');
        
        if (!typeText) {
            console.warn('⚠️ type-text Element nicht gefunden');
            // Preloader trotzdem nach Zeit ausblenden
            setTimeout(() => {
                preloader.classList.add('hidden');
                setTimeout(() => {
                    preloader.style.display = 'none';
                    console.log('✅ Preloader ohne Animation ausgeblendet');
                }, 600);
            }, 2000);
            return;
        }
        
        console.log('✅ Preloader Elemente gefunden');
        
        // Text für die Typing Animation
        const fullText = "MATTHIAS SILBERHAIN";
        let charIndex = 0;
        const typingSpeed = 100; // ms pro Buchstabe
        
        // Stelle sicher, dass typeText leer ist
        typeText.textContent = '';
        
        function typeCharacter() {
            if (charIndex < fullText.length) {
                const nextChar = fullText.charAt(charIndex);
                
                // Füge das nächste Zeichen hinzu
                if (nextChar === ' ') {
                    typeText.innerHTML += '&nbsp;';
                } else {
                    typeText.textContent += nextChar;
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

document.addEventListener('DOMContentLoaded', function() {
    // Aktiviere interaktive Elemente nach Preloader
    setTimeout(function() {
        console.log('🖱️ Aktiviere interaktive Elemente...');
        
        const interactiveElements = ['button', 'a', '.burger', '.dark-mode-toggle', '.silber-button', '.social-link'];
        
        interactiveElements.forEach(selector => {
            document.querySelectorAll(selector).forEach(el => {
                el.style.pointerEvents = 'auto';
                el.style.cursor = 'pointer';
            });
        });
        
        console.log('✅ Website ist jetzt voll klickbar!');
    }, 2500); // Nach Preloader-Animation
});

// ============================================================================
// 4. JAHRESZAHL IM FOOTER
// ============================================================================

document.addEventListener('DOMContentLoaded', function() {
    const yearElement = document.getElementById('jahr');
    if (yearElement && !yearElement.textContent) {
        yearElement.textContent = new Date().getFullYear();
        console.log('📅 Jahreszahl aktualisiert');
    }
});
