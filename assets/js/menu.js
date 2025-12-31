// assets/js/menu.js
document.addEventListener('DOMContentLoaded', function() {
    console.log('Mobile Menü wird initialisiert');
    
    const burgerButton = document.getElementById('burgerButton');
    const mainNav = document.getElementById('mainNav');
    const menuOverlay = document.querySelector('.menu-overlay');
    
    // Debug Info
    console.log('Elemente gefunden:', {
        burgerButton: !!burgerButton,
        mainNav: !!mainNav,
        menuOverlay: !!menuOverlay
    });
    
    if (!burgerButton || !mainNav) {
        console.error('Wichtige Menü-Elemente nicht gefunden!');
        return;
    }
    
    // Prüfe ob Mobile
    function isMobile() {
        return window.innerWidth <= 768;
    }
    
    // Menü öffnen
    function openMenu() {
        console.log('Öffne Menü');
        
        // Burger Animation
        burgerButton.classList.add('aktiv');
        
        // Navigation anzeigen
        mainNav.classList.add('aktiv');
        mainNav.style.display = 'flex';
        
        // Kurze Verzögerung für CSS Transition
        setTimeout(() => {
            mainNav.style.opacity = '1';
            mainNav.style.transform = 'translateX(0)';
        }, 10);
        
        // Overlay anzeigen
        if (menuOverlay) {
            menuOverlay.classList.add('active');
        }
        
        // Scrollen sperren
        document.body.style.overflow = 'hidden';
        
        // ARIA
        burgerButton.setAttribute('aria-expanded', 'true');
    }
    
    // Menü schließen
    function closeMenu() {
        console.log('Schließe Menü');
        
        // Burger Animation zurücksetzen
        burgerButton.classList.remove('aktiv');
        
        // Navigation ausblenden
        mainNav.style.opacity = '0';
        mainNav.style.transform = 'translateX(-100%)';
        
        // Nach Transition Klasse entfernen
        setTimeout(() => {
            mainNav.classList.remove('aktiv');
            if (isMobile()) {
                mainNav.style.display = 'none';
            }
        }, 300);
        
        // Overlay ausblenden
        if (menuOverlay) {
            menuOverlay.classList.remove('active');
        }
        
        // Scrollen erlauben
        document.body.style.overflow = '';
        
        // ARIA
        burgerButton.setAttribute('aria-expanded', 'false');
    }
    
    // Menü umschalten
    function toggleMenu(event) {
        event.preventDefault();
        event.stopPropagation();
        
        console.log('Toggle Menü - Aktuell aktiv:', mainNav.classList.contains('aktiv'));
        
        if (mainNav.classList.contains('aktiv')) {
            closeMenu();
        } else {
            openMenu();
        }
    }
    
    // Event Listener
    burgerButton.addEventListener('click', toggleMenu);
    
    // Overlay schließt Menü
    if (menuOverlay) {
        menuOverlay.addEventListener('click', function(event) {
            event.preventDefault();
            closeMenu();
        });
    }
    
    // Links schließen Menü auf Mobile
    const navLinks = mainNav.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (isMobile()) {
                console.log('Link geklickt, schließe Menü:', this.href);
                setTimeout(closeMenu, 100);
            }
        });
    });
    
    // ESC-Taste schließt Menü
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && mainNav.classList.contains('aktiv')) {
            closeMenu();
        }
    });
    
    // Klick außerhalb schließt Menü
    document.addEventListener('click', function(event) {
        if (mainNav.classList.contains('aktiv') && 
            !mainNav.contains(event.target) && 
            !burgerButton.contains(event.target)) {
            closeMenu();
        }
    });
    
    // Bei Fenster-Resize
    function handleResize() {
        console.log('Resize - Mobile:', isMobile());
        
        if (!isMobile()) {
            // Auf Desktop: Menü immer sichtbar
            closeMenu();
            mainNav.style.display = 'flex';
            mainNav.style.opacity = '1';
            mainNav.style.transform = 'translateX(0)';
        } else {
            // Auf Mobile: Wenn Menü nicht aktiv ist, ausblenden
            if (!mainNav.classList.contains('aktiv')) {
                mainNav.style.display = 'none';
            }
        }
    }
    
    window.addEventListener('resize', handleResize);
    
    // Initialisiere Menü-Status
    function initMenu() {
        console.log('Initialisiere Menü');
        
        if (isMobile()) {
            mainNav.style.display = 'none';
            mainNav.style.opacity = '0';
            mainNav.style.transform = 'translateX(-100%)';
        } else {
            mainNav.style.display = 'flex';
            mainNav.style.opacity = '1';
            mainNav.style.transform = 'translateX(0)';
        }
        
        // ARIA-Attribute setzen
        burgerButton.setAttribute('aria-expanded', 'false');
        burgerButton.setAttribute('aria-label', 'Hauptmenü öffnen');
    }
    
    // Initialisierung
    initMenu();
    
    console.log('Mobile Menü erfolgreich initialisiert');
});
