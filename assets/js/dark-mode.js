(function() {
    'use strict';

    document.addEventListener('DOMContentLoaded', function() {
        const themeToggle = document.getElementById('themeToggle');
        
        if (!themeToggle) return;
        
        // Toggle Event
        themeToggle.addEventListener('click', function() {
            const isDarkMode = document.body.classList.toggle('dark-mode');
            localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
            
            // Visuelles Feedback
            this.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
            
            console.log('Theme geändert:', isDarkMode ? 'dark' : 'light');
        });
        
        // Initial: Prüfen ob dark-mode aktiv ist
        const isDark = document.body.classList.contains('dark-mode');
        themeToggle.setAttribute('data-theme', isDark ? 'dark' : 'light');
    });
})();
