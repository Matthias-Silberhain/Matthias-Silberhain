/**
 * DARK MODE TOGGLE - Matthias Silberhain Website
 * Version 2.1 - Kompatibel mit Preloader
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('🌙 Dark Mode Skript geladen (kompatibel mit Preloader)');
    
    const darkModeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    // Prüfe gespeicherten Modus oder Systemeinstellung
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const savedTheme = localStorage.getItem('darkMode');
    
    // Theme setzen - WICHTIG: Gleicher Key wie global.js
    if (savedTheme === 'true' || (!savedTheme && prefersDarkScheme.matches)) {
        body.classList.add('dark-mode');
        updateToggleIcon(true);
        console.log('✅ Dark Mode aktiviert (gespeichert oder System)');
    } else {
        body.classList.remove('dark-mode');
        updateToggleIcon(false);
        console.log('✅ Light Mode aktiviert');
    }
    
    // Toggle-Funktion
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', function() {
            body.classList.toggle('dark-mode');
            const isDarkMode = body.classList.contains('dark-mode');
            
            // Speichere Einstellung - WICHTIG: Gleicher Key wie global.js
            localStorage.setItem('darkMode', isDarkMode);
            updateToggleIcon(isDarkMode);
            
            console.log('🔄 Dark Mode:', isDarkMode ? 'aktiviert' : 'deaktiviert');
            
            // Haptic Feedback für Mobile
            if (navigator.vibrate) {
                navigator.vibrate(50);
            }
        });
        
        // Hover-Effekt für Toggle
        darkModeToggle.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            this.style.boxShadow = '0 0 15px rgba(192, 192, 192, 0.5)';
        });
        
        darkModeToggle.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = 'none';
        });
    } else {
        console.warn('⚠️ Dark Mode Toggle Button nicht gefunden!');
    }
    
    // System-Änderungen überwachen
    prefersDarkScheme.addEventListener('change', function(e) {
        if (!localStorage.getItem('darkMode')) {
            if (e.matches) {
                body.classList.add('dark-mode');
                updateToggleIcon(true);
                console.log('🌙 Dark Mode (Systemänderung)');
            } else {
                body.classList.remove('dark-mode');
                updateToggleIcon(false);
                console.log('☀️ Light Mode (Systemänderung)');
            }
        }
    });
    
    // Tastatur-Support (Accessibility)
    document.addEventListener('keydown', function(e) {
        if (e.altKey && e.key === 'd') {
            darkModeToggle.click();
            console.log('⌨️ Dark Mode via Tastatur getoggled');
        }
    });
    
    // Hilfsfunktion zum Aktualisieren des Toggle Icons
    function updateToggleIcon(isDarkMode) {
        if (!darkModeToggle) return;
        
        const moonIcon = darkModeToggle.querySelector('.moon-icon');
        const sunIcon = darkModeToggle.querySelector('.sun-icon');
        
        if (moonIcon && sunIcon) {
            if (isDarkMode) {
                moonIcon.style.display = 'none';
                sunIcon.style.display = 'block';
            } else {
                moonIcon.style.display = 'block';
                sunIcon.style.display = 'none';
            }
        }
        
        // Setze ARIA Attribute für Accessibility
        darkModeToggle.setAttribute('aria-pressed', isDarkMode);
        darkModeToggle.setAttribute('aria-label', 
            isDarkMode ? 'Dark Mode deaktivieren' : 'Dark Mode aktivieren'
        );
    }
});
