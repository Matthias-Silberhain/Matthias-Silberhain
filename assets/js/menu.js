/**
 * MOBILE MENÜ FUNKTIONALITÄT - KORRIGIERTE VERSION
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('Mobile Menu JS geladen'); // Debug
    
    // Elemente auswählen
    const burger = document.querySelector('.burger');
    const hauptnavigation = document.querySelector('.hauptnavigation');
    const menuOverlay = document.querySelector('.menu-overlay');
    const body = document.body;
    
    // Debug: Prüfe ob Elemente gefunden wurden
    console.log('Burger gefunden:', !!burger);
    console.log('Navigation gefunden:', !!hauptnavigation);
    console.log('Overlay gefunden:', !!menuOverlay);
    
    if (!burger || !hauptnavigation) {
        console.error('Wichtige Elemente für Mobile Menu nicht gefunden!');
        return;
    }
    
    // Stelle sicher dass Navigation initial ausgeblendet ist auf Mobile
    function checkInitialState() {
        if (window.innerWidth <= 768) {
            hauptnavigation.style.display = 'none';
            hauptnavigation.style.opacity = '0';
            hauptnavigation.style.transform = 'translateX(-100%)';
        } else {
            hauptnavigation.style.display = 'flex';
            hauptnavigation.style.opacity = '1';
            hauptnavigation.style.transform = 'translateX(0)';
        }
    }
    
    // Menü öffnen
    function openMenu() {
        console.log('Menü öffnen');
        burger.classList.add('aktiv');
        hauptnavigation.classList.add('aktiv');
        hauptnavigation.style.display = 'flex';
        
        // Kleine Verzögerung für CSS Transition
        setTimeout(() => {
            hauptnavigation.style.opacity = '1';
            hauptnavigation.style.transform = 'translateX(0)';
        }, 10);
        
        if (menuOverlay) {
            menuOverlay.classList.add('active');
        }
        
        body.style.overflow = 'hidden';
        burger.setAttribute('aria-expanded', 'true');
    }
    
    // Menü schließen
    function closeMenu() {
        console.log('Menü schließen');
        burger.classList.remove('aktiv');
        hauptnavigation.style.opacity = '0';
        hauptnavigation.style.transform = 'translateX(-100%)';
        
        setTimeout(() => {
            hauptnavigation.classList.remove('aktiv');
            if (window.innerWidth <= 768) {
                hauptnavigation.style.display = 'none';
            }
        }, 300);
        
        if (menuOverlay) {
            menuOverlay.classList.remove('active');
        }
        
        body.style.overflow = '';
        burger.setAttribute('aria-expanded', 'false');
    }
    
    // Menü umschalten
    function toggleMenu() {
        console.log('Menü toggle, aktueller Status:', hauptnavigation.classList.contains('aktiv'));
        
        if (hauptnavigation.classList.contains('aktiv')) {
            closeMenu();
        } else {
            openMenu();
        }
        
        // Verhindere Event-Bubbling
        event.stopPropagation();
    }
    
    // Event Listener mit Event Delegation
    burger.addEventListener('click', toggleMenu);
    
    // Overlay schließt Menü
    if (menuOverlay) {
        menuOverlay.addEventListener('click', closeMenu);
    }
    
    // Menü schließt bei Klick auf Links
    document.addEventListener('click', function(event) {
        if (hauptnavigation.classList.contains('aktiv') && 
            !hauptnavigation.contains(event.target) && 
            !burger.contains(event.target)) {
            closeMenu();
        }
    });
    
    // ESC-Taste schließt Menü
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && hauptnavigation.classList.contains('aktiv')) {
            closeMenu();
        }
    });
    
    // Bei Fenster-Resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            // Auf Desktop: Menü immer sichtbar und zurücksetzen
            closeMenu();
            hauptnavigation.style.display = 'flex';
            hauptnavigation.style.opacity = '1';
            hauptnavigation.style.transform = 'translateX(0)';
            body.style.overflow = '';
        } else {
            // Auf Mobile: Menü verstecken falls geschlossen
            if (!hauptnavigation.classList.contains('aktiv')) {
                hauptnavigation.style.display = 'none';
                hauptnavigation.style.opacity = '0';
                hauptnavigation.style.transform = 'translateX(-100%)';
            }
        }
    });
    
    // Initialisierung
    checkInitialState();
    burger.setAttribute('aria-label', 'Hauptmenü öffnen oder schließen');
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-controls', 'hauptnavigation');
    
    // Touch Device Optimierung
    if ('ontouchstart' in window) {
        burger.style.cursor = 'pointer';
    }
    
    // Verhindere Klick-Konflikte mit Preloader
    document.addEventListener('click', function(event) {
        const preloader = document.getElementById('preloader');
        if (preloader && !preloader.classList.contains('hidden')) {
            event.stopPropagation();
            event.preventDefault();
            console.log('Preloader blockiert Klick');
        }
    }, true);
});
