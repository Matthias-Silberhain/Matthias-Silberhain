// assets/js/dark-mode.js
document.addEventListener('DOMContentLoaded', function() {
    console.log('Dark Mode JS wird geladen');
    
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    if (!themeToggle) {
        console.error('Theme Toggle nicht gefunden');
        return;
    }
    
    // Theme initialisieren
    function initTheme() {
        // Prüfe Local Storage
        const savedTheme = localStorage.getItem('silberhain-theme');
        
        // Prüfe System-Präferenz
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        // Entscheidungslogik
        if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
            enableDarkMode();
        } else {
            disableDarkMode();
        }
    }
    
    // Dark Mode aktivieren
    function enableDarkMode() {
        console.log('Aktiviere Dark Mode');
        body.classList.add('dark-mode');
        body.classList.remove('light-mode');
        localStorage.setItem('silberhain-theme', 'dark');
        updateToggleIcon(true);
    }
    
    // Dark Mode deaktivieren
    function disableDarkMode() {
        console.log('Aktiviere Light Mode');
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
        localStorage.setItem('silberhain-theme', 'light');
        updateToggleIcon(false);
    }
    
    // Icon aktualisieren
    function updateToggleIcon(isDark) {
        const moonIcon = themeToggle.querySelector('.moon-icon');
        const sunIcon = themeToggle.querySelector('.sun-icon');
        
        if (moonIcon && sunIcon) {
            if (isDark) {
                moonIcon.style.display = 'none';
                sunIcon.style.display = 'block';
                themeToggle.setAttribute('aria-label', 'Zum Hellmodus wechseln');
            } else {
                moonIcon.style.display = 'block';
                sunIcon.style.display = 'none';
                themeToggle.setAttribute('aria-label', 'Zum Dunkelmodus wechseln');
            }
        }
    }
    
    // Theme umschalten
    function toggleTheme() {
        if (body.classList.contains('dark-mode')) {
            disableDarkMode();
        } else {
            enableDarkMode();
        }
    }
    
    // Event Listener
    themeToggle.addEventListener('click', toggleTheme);
    
    // System-Themeänderungen überwachen
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        // Nur ändern wenn kein manueller Theme gespeichert ist
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
