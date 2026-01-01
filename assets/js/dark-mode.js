(function() {
    'use strict';

    // Funktion für sofortigen Theme-Wechsel OHNE Flackern
    function switchTheme(isDark) {
        // 1. Blockiere Übergänge während des Wechsels
        document.body.classList.add('theme-changing');
        
        // 2. Setze neue Klasse
        if (isDark) {
            document.body.className = 'dark-mode';
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.className = 'light-mode';
            localStorage.setItem('theme', 'light');
        }
        
        // 3. Aktualisiere Preloader-Hintergrund sofort
        const preloader = document.getElementById('preloader');
        if (preloader) {
            preloader.style.backgroundColor = isDark ? '#000000' : '#f8f8f8';
            preloader.style.backgroundImage = isDark 
                ? 'linear-gradient(135deg, #000000 0%, #111111 50%, #000000 100%)'
                : 'linear-gradient(135deg, #f8f8f8 0%, #ffffff 50%, #f8f8f8 100%)';
        }
        
        // 4. Entferne Block nach kurzer Zeit
        setTimeout(() => {
            document.body.classList.remove('theme-changing');
            // Füge loaded Klasse hinzu für Animationen
            if (!document.body.classList.contains('loaded')) {
                document.body.classList.add('loaded');
            }
        }, 50);
    }

    document.addEventListener('DOMContentLoaded', function() {
        const themeToggle = document.getElementById('themeToggle');
        
        if (!themeToggle) return;
        
        // Initial: Theme aus Body-Klasse lesen
        const isInitiallyDark = document.body.classList.contains('dark-mode');
        themeToggle.setAttribute('data-theme', isInitiallyDark ? 'dark' : 'light');
        
        // Toggle Event
        themeToggle.addEventListener('click', function() {
            const willBeDark = !document.body.classList.contains('dark-mode');
            switchTheme(willBeDark);
            
            // Button Animation
            this.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
        
        // System Theme Change (optional)
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
        prefersDark.addEventListener('change', function(e) {
            // Nur wenn kein manuelles Theme gesetzt wurde
            if (!localStorage.getItem('theme')) {
                switchTheme(e.matches);
            }
        });
    });
})();
