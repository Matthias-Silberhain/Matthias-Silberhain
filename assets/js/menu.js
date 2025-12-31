/**
 * MOBILE MENÜ FUNKTIONALITÄT
 * Handhabung von Burger-Menü, Overlay und Navigation
 */

document.addEventListener('DOMContentLoaded', function() {
    // Elemente auswählen
    const burger = document.querySelector('.burger');
    const hauptnavigation = document.querySelector('.hauptnavigation');
    const menuOverlay = document.querySelector('.menu-overlay');
    const navLinks = document.querySelectorAll('.hauptnavigation a');
    const body = document.body;
    
    // Burger-Menü Toggle
    function toggleMenu() {
        burger.classList.toggle('aktiv');
        hauptnavigation.classList.toggle('aktiv');
        menuOverlay.classList.toggle('active');
        body.classList.toggle('menu-open'); // Optional für Scroll-Sperre
        
        // ARIA-Attribute für Barrierefreiheit
        const isExpanded = hauptnavigation.classList.contains('aktiv');
        burger.setAttribute('aria-expanded', isExpanded);
        
        if (isExpanded) {
            // Ersten Menüpunkt fokussieren
            navLinks[0]?.focus();
            // Scrollen verhindern
            body.style.overflow = 'hidden';
        } else {
            // Scrollen wieder erlauben
            body.style.overflow = '';
            burger.focus();
        }
    }
    
    // Menü schließen
    function closeMenu() {
        burger.classList.remove('aktiv');
        hauptnavigation.classList.remove('aktiv');
        menuOverlay.classList.remove('active');
        body.classList.remove('menu-open');
        body.style.overflow = '';
        burger.setAttribute('aria-expanded', 'false');
    }
    
    // Event Listener
    if (burger) {
        burger.addEventListener('click', toggleMenu);
        
        // ARIA-Attribute initialisieren
        burger.setAttribute('aria-label', 'Hauptmenü öffnen');
        burger.setAttribute('aria-expanded', 'false');
        burger.setAttribute('aria-controls', 'hauptnavigation');
    }
    
    // Overlay schließt Menü bei Klick
    if (menuOverlay) {
        menuOverlay.addEventListener('click', closeMenu);
    }
    
    // Menü schließt nach Link-Klick
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Kleine Verzögerung für bessere UX
            setTimeout(closeMenu, 100);
        });
    });
    
    // Menü schließt bei ESC-Taste
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && hauptnavigation.classList.contains('aktiv')) {
            closeMenu();
        }
    });
    
    // Responsive Resize Handler
    function handleResize() {
        if (window.innerWidth > 768) {
            // Auf Desktop: Menü immer sichtbar
            burger.classList.remove('aktiv');
            hauptnavigation.classList.remove('aktiv');
            menuOverlay.classList.remove('active');
            body.style.overflow = '';
        } else {
            // Auf Mobile: Menü verstecken
            if (!hauptnavigation.classList.contains('aktiv')) {
                hauptnavigation.style.display = 'none';
            }
        }
    }
    
    // Menü sichtbar machen bei Aktivierung
    const originalDisplay = hauptnavigation.style.display;
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.attributeName === 'class') {
                if (hauptnavigation.classList.contains('aktiv')) {
                    hauptnavigation.style.display = 'flex';
                } else if (window.innerWidth <= 768) {
                    hauptnavigation.style.display = 'none';
                }
            }
        });
    });
    
    observer.observe(hauptnavigation, { attributes: true });
    
    // Initial und bei Resize
    handleResize();
    window.addEventListener('resize', handleResize);
    
    // Touch-Gesten für Swipe (optional)
    let touchStartX = 0;
    let touchEndX = 0;
    
    document.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, false);
    
    document.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const swipeDistance = touchEndX - touchStartX;
        
        // Rechts nach Links swiped schließt Menü
        if (swipeDistance < -swipeThreshold && hauptnavigation.classList.contains('aktiv')) {
            closeMenu();
        }
    }
});
