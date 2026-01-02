// ==========================================================================
// PRELOADER MIT TYPEWRITER & SILBERNER STRICH
// ==========================================================================

document.addEventListener('DOMContentLoaded', function() {
    // Elemente auswählen
    const preloader = document.getElementById('preloader');
    const typeText = document.getElementById('type-text');
    const preloaderLine = document.getElementById('preloaderLine');
    
    // Typewriter-Text
    const typewriterText = "MATTHIAS SILBERHAIN";
    let index = 0;
    
    // Typewriter-Effekt
    function typeWriter() {
        if (index < typewriterText.length) {
            typeText.textContent += typewriterText.charAt(index);
            index++;
            setTimeout(typeWriter, 100); // Geschwindigkeit anpassen
        } else {
            // Wenn Typewriter fertig ist, starte den silbernen Strich
            startLineAnimation();
        }
    }
    
    // Silbernen Strich animieren
    function startLineAnimation() {
        if (preloaderLine) {
            preloaderLine.classList.add('active');
        }
        
        // Nach der Strich-Animation den Preloader ausblenden
        setTimeout(() => {
            preloader.classList.add('loaded');
            
            // Kurze Verzögerung, dann Preloader komplett entfernen
            setTimeout(() => {
                preloader.style.display = 'none';
                document.body.classList.remove('menu-open');
                
                // Inhalt einblenden
                document.querySelector('.inhalt').style.opacity = '1';
                document.querySelector('.inhalt').style.transform = 'translateY(0)';
            }, 600);
        }, 2500); // Warte bis der Strich animiert ist
    }
    
    // Scroll Event für Menü-Hintergrund
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 50) {
            document.body.classList.add('scrolled');
        } else {
            document.body.classList.remove('scrolled');
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Starte den Typewriter nach kurzer Verzögerung
    setTimeout(() => {
        if (typeText && typewriterText) {
            typeWriter();
        } else {
            // Fallback wenn Typewriter nicht funktioniert
            startLineAnimation();
        }
    }, 500);
});

// ==========================================================================
// GLOBAL FUNCTIONS
// ==========================================================================

// Aktuelles Jahr im Footer setzen
function setCurrentYear() {
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// Seiteneffekte nach Laden initialisieren
function initPageEffects() {
    // Smooth Scroll für interne Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Verhindere leere Link-Klicks
    document.querySelectorAll('a[href="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
        });
    });
}

// Alles initialisieren wenn Seite geladen ist
window.addEventListener('load', function() {
    setCurrentYear();
    initPageEffects();
    
    // Fallback: Falls Preloader nach 8 Sekunden noch sichtbar ist, ausblenden
    setTimeout(() => {
        const preloader = document.getElementById('preloader');
        if (preloader && !preloader.classList.contains('loaded')) {
            preloader.classList.add('loaded');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 600);
        }
    }, 8000);
});
