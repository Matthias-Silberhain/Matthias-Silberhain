/**
 * DARK MODE TOGGLE - Matthias Silberhain Website
 * Theme-Switching mit localStorage-Persistenz
 * Version 1.1 - Defensiv mit Prüfung auf Existenz
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('Dark Mode JS wird geladen');
    
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    // Initialisiere Theme
    function initTheme() {
        console.log('Initialisiere Theme');
        
        // 1. Prüfe Local Storage
        const savedTheme = localStorage.getItem('silberhain-theme');
        console.log('Gespeichertes Theme:', savedTheme);
        
        // 2. Prüfe System-Präferenz
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        console.log('System-Präferenz:', prefersDark ? 'dark' : 'light');
        
        // 3. Entscheidung
        if (savedTheme === 'dark') {
            enableDarkMode();
        } else if (savedTheme === 'light') {
            disableDarkMode();
        } else if (prefersDark) {
            // Keine gespeicherte Einstellung, aber System ist dark
            enableDarkMode();
        } else {
            // Standard: Light Mode
            disableDarkMode();
        }
    }
    
    // Dark Mode aktivieren
    function enableDarkMode() {
        console.log('Aktiviere Dark Mode');
        body.classList.add('dark-mode');
        localStorage.setItem('silberhain-theme', 'dark');
        updateToggleIcon(true);
    }
    
    // Light Mode aktivieren
    function disableDarkMode() {
        console.log('Aktiviere Light Mode');
        body.classList.remove('dark-mode');
        localStorage.setItem('silberhain-theme', 'light');
        updateToggleIcon(false);
    }
    
    // Toggle Icon aktualisieren
    function updateToggleIcon(isDark) {
        // Wenn der Toggle-Button existiert, aktualisiere das Icon
        if (themeToggle) {
            const moonIcon = themeToggle.querySelector('.moon-icon');
            const sunIcon = themeToggle.querySelector('.sun-icon');
            
            if (moonIcon && sunIcon) {
                if (isDark) {
                    // Dark Mode aktiv -> Sonne zeigen
                    moonIcon.style.display = 'none';
                    sunIcon.style.display = 'block';
                    themeToggle.setAttribute('aria-label', 'Zum Hellmodus wechseln');
                } else {
                    // Light Mode aktiv -> Mond zeigen
                    moonIcon.style.display = 'block';
                    sunIcon.style.display = 'none';
                    themeToggle.setAttribute('aria-label', 'Zum Dunkelmodus wechseln');
                }
            }
        }
    }
    
    // Theme umschalten
    function toggleTheme() {
        console.log('Toggle Theme geklickt');
        if (body.classList.contains('dark-mode')) {
            disableDarkMode();
        } else {
            enableDarkMode();
        }
    }
    
    // Wenn der Toggle-Button existiert, Event Listener hinzufügen
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    } else {
        console.warn('Theme Toggle Button nicht gefunden. Dark Mode wird trotzdem initialisiert, aber der Toggle ist nicht klickbar.');
    }
    
    // System-Präferenzänderung überwachen
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', (e) => {
        console.log('System-Theme geändert:', e.matches ? 'dark' : 'light');
        
        // Nur ändern wenn noch keine manuelle Einstellung
        if (!localStorage.getItem('silberhain-theme')) {
            if (e.matches) {
                enableDarkMode();
            } else {
                disableDarkMode();
            }
        }
    });
    
    // Initialisierung
    initTheme();
    
    console.log('Dark Mode JS erfolgreich geladen');
});
