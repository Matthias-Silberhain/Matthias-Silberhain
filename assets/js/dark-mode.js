/**
 * DARK MODE TOGGLE FUNKTIONALITÄT
 */

document.addEventListener('DOMContentLoaded', function() {
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    const body = document.body;
    
    // Prüfe gespeicherte Einstellung oder System-Präferenz
    function initDarkMode() {
        const savedMode = localStorage.getItem('darkMode');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (savedMode === 'enabled' || (savedMode === null && prefersDark)) {
            enableDarkMode();
        } else {
            disableDarkMode();
        }
    }
    
    function enableDarkMode() {
        body.classList.add('dark-mode');
        localStorage.setItem('darkMode', 'enabled');
        updateButtonText(true);
    }
    
    function disableDarkMode() {
        body.classList.remove('dark-mode');
        localStorage.setItem('darkMode', 'disabled');
        updateButtonText(false);
    }
    
    function toggleDarkMode() {
        if (body.classList.contains('dark-mode')) {
            disableDarkMode();
        } else {
            enableDarkMode();
        }
    }
    
    function updateButtonText(isDark) {
        // Optional: Button-Text oder Icon ändern
        const button = darkModeToggle;
        button.setAttribute('aria-label', 
            isDark ? 'Zum Hellmodus wechseln' : 'Zum Dunkelmodus wechseln'
        );
    }
    
    // Event Listener
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', toggleDarkMode);
        darkModeToggle.setAttribute('aria-label', 'Farbmodus wechseln');
    }
    
    // System-Präferenzänderung überwachen
    window.matchMedia('(prefers-color-scheme: dark)').addListener((e) => {
        if (!localStorage.getItem('darkMode')) {
            if (e.matches) {
                enableDarkMode();
            } else {
                disableDarkMode();
            }
        }
    });
    
    // Initialisierung
    initDarkMode();
});
