/**
 * DARK MODE TOGGLE - Matthias Silberhain Website
 * Version 2.2 - Funktioniert auf gesamter Website inklusive Preloader
 */

(function() {
    console.log('🌙 Dark Mode Skript initialisiert');
    
    // DOM vollständig geladen
    document.addEventListener('DOMContentLoaded', function() {
        console.log('🌙 Dark Mode: DOM geladen');
        initDarkMode();
    });
    
    // Sofortige Initialisierung für Preloader (falls DOM schon geladen)
    if (document.readyState !== 'loading') {
        console.log('🌙 Dark Mode: DOM bereits geladen, initialisiere sofort');
        setTimeout(initDarkMode, 0);
    }
})();

function initDarkMode() {
    const darkModeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    if (!darkModeToggle) {
        console.warn('⚠️ Dark Mode Toggle Button nicht gefunden!');
        return;
    }
    
    console.log('🌙 Dark Mode: Initialisiere mit localStorage');
    
    // 1. Prüfe gespeicherten Modus
    const savedDarkMode = localStorage.getItem('darkMode');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // 2. Setze initialen Modus - WICHTIG für Preloader
    let isDarkMode = false;
    
    if (savedDarkMode !== null) {
        isDarkMode = savedDarkMode === 'true';
        console.log(`🌙 Dark Mode: Gespeicherter Modus gefunden: ${isDarkMode}`);
    } else {
        isDarkMode = prefersDarkScheme.matches;
        console.log(`🌙 Dark Mode: Verwende Systemeinstellung: ${isDarkMode}`);
    }
    
    // 3. Wende Dark Mode SOFORT an (wichtig für Preloader)
    applyDarkMode(isDarkMode);
    
    // 4. Toggle Event Listener
    darkModeToggle.addEventListener('click', function() {
        const currentState = body.classList.contains('dark-mode');
        const newState = !currentState;
        
        applyDarkMode(newState);
        saveDarkMode(newState);
        
        console.log(`🌙 Dark Mode: Geändert auf ${newState ? 'Dark' : 'Light'}`);
        
        // Haptic Feedback für Mobile
        if (navigator.vibrate) {
            navigator.vibrate(50);
        }
    });
    
    // 5. Hover-Effekte für Toggle
    darkModeToggle.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
        this.style.boxShadow = '0 0 15px rgba(192, 192, 192, 0.5)';
    });
    
    darkModeToggle.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.boxShadow = 'none';
    });
    
    // 6. System-Änderungen überwachen
    prefersDarkScheme.addEventListener('change', function(e) {
        if (localStorage.getItem('darkMode') === null) {
            applyDarkMode(e.matches);
            console.log(`🌙 Dark Mode: Systemänderung auf ${e.matches ? 'Dark' : 'Light'}`);
        }
    });
    
    // 7. Tastatur-Support (Accessibility)
    document.addEventListener('keydown', function(e) {
        if (e.altKey && e.key === 'd') {
            darkModeToggle.click();
            console.log('🌙 Dark Mode: Via Tastatur getoggled');
        }
    });
    
    console.log('✅ Dark Mode: Initialisierung abgeschlossen');
}

function applyDarkMode(isDarkMode) {
    const body = document.body;
    
    if (isDarkMode) {
        body.classList.add('dark-mode');
        updateToggleIcon(true);
        updateAriaAttributes(true);
    } else {
        body.classList.remove('dark-mode');
        updateToggleIcon(false);
        updateAriaAttributes(false);
    }
}

function updateToggleIcon(isDarkMode) {
    const darkModeToggle = document.getElementById('themeToggle');
    if (!darkModeToggle) return;
    
    // Die Icons werden durch CSS gesteuert, hier nur ARIA-Attribute setzen
    darkModeToggle.setAttribute('aria-pressed', isDarkMode);
    darkModeToggle.setAttribute('aria-label', 
        isDarkMode ? 'Dark Mode deaktivieren' : 'Dark Mode aktivieren'
    );
}

function updateAriaAttributes(isDarkMode) {
    // Zusätzliche ARIA-Attribute für Accessibility
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
        mainContent.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    }
}

function saveDarkMode(isDarkMode) {
    localStorage.setItem('darkMode', isDarkMode);
    console.log(`🌙 Dark Mode: ${isDarkMode ? 'Dark' : 'Light'} gespeichert`);
}

// Export für globale Verwendung
window.darkMode = {
    init: initDarkMode,
    apply: applyDarkMode,
    save: saveDarkMode,
    isDark: function() {
        return document.body.classList.contains('dark-mode');
    }
};
