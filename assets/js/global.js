/* ==========================================================================
   GLOBAL.JS - WICHTIGSTE FUNKTIONEN
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function() {
    
    console.log('✅ global.js gestartet');
    
    // ========== 1. PRELOADER MIT TYPING ANIMATION ==========
    function initPreloader() {
        const preloader = document.getElementById('preloader');
        const preloaderText = document.querySelector('.preloader-text');
        const cursor = document.querySelector('.cursor');
        
        if (preloaderText) {
            // Text setzen
            preloaderText.textContent = '';
            
            // Typing Animation
            const text = "MATTHIAS SILBERHAIN";
            let index = 0;
            const speed = 80; // ms pro Buchstabe
            
            function typeWriter() {
                if (index < text.length) {
                    preloaderText.textContent += text.charAt(index);
                    index++;
                    setTimeout(typeWriter, speed);
                } else {
                    // Animation beendet
                    preloaderText.classList.add('final');
                    
                    // Cursor ausblenden
                    if (cursor) {
                        cursor.style.opacity = '0';
                    }
                    
                    // Preloader nach 1 Sekunde ausblenden
                    setTimeout(() => {
                        if (preloader) {
                            preloader.classList.add('hidden');
                            
                            // Nach Animation komplett entfernen
                            setTimeout(() => {
                                preloader.style.display = 'none';
                                console.log('✅ Preloader entfernt');
                            }, 600);
                        }
                    }, 1000);
                }
            }
            
            // Starte Typing nach kurzer Verzögerung
            setTimeout(typeWriter, 300);
        } else {
            // Fallback: Einfaches Ausblenden
            setTimeout(() => {
                if (preloader) {
                    preloader.classList.add('hidden');
                    setTimeout(() => {
                        preloader.style.display = 'none';
                    }, 600);
                }
            }, 1500);
        }
    }
    
    // ========== 2. COPYRIGHT JAHR AUTOMATISCH ==========
    const yearElement = document.getElementById('jahr');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
        console.log('✅ Copyright Jahr gesetzt:', yearElement.textContent);
    }
    
    // ========== 3. EXTERNE LINKS MIT TARGET="_BLANK" ==========
    const externalLinks = document.querySelectorAll('a[href^="http"]:not([href*="' + window.location.host + '"])');
    externalLinks.forEach(link => {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
    });
    
    if (externalLinks.length > 0) {
        console.log('✅ Externe Links gesichert:', externalLinks.length);
    }
    
    // ========== 4. STARTE PRELOADER ==========
    // Kurze Verzögerung für bessere UX
    setTimeout(initPreloader, 500);
    
    console.log('✅ global.js erfolgreich geladen');
});

// ========== HELPER FUNCTIONS ==========
window.WebsiteHelpers = {
    formatDate: function(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('de-DE', options);
    },
    
    getCurrentPage: function() {
        return window.location.pathname.split('/').pop() || 'index.html';
    },
    
    isDarkMode: function() {
        return document.body.classList.contains('dark-mode');
    }
};
