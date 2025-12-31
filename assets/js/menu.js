/**
 * MOBILE MENU - Matthias Silberhain Website
 * Burger Menu für mobile Navigation
 * Version 2.1 - Robust, für alle Seiten
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('🍔 Menu.js geladen');
    
    // Defensive Prüfung aller Elemente
    const burgerButton = document.getElementById('burgerButton');
    const mainNav = document.getElementById('mainNav');
    const menuOverlay = document.querySelector('.menu-overlay');
    
    // Warnung wenn Elemente fehlen
    if (!burgerButton) {
        console.warn('Menu.js: Burger Button (id="burgerButton") fehlt auf dieser Seite!');
        return;
    }
    
    if (!mainNav) {
        console.warn('Menu.js: Navigation (id="mainNav") fehlt auf dieser Seite!');
        return;
    }
    
    const navLinks = mainNav.querySelectorAll('a');
    
    // Menü umschalten
    function toggleMenu() {
        const isOpen = burgerButton.classList.contains('aktiv');
        
        // Toggle mit Animation
        if (!isOpen) {
            openMenu();
        } else {
            closeMenu();
        }
    }
    
    // Menü öffnen
    function openMenu() {
        burgerButton.classList.add('aktiv');
        mainNav.classList.add('aktiv');
        
        if (menuOverlay) {
            menuOverlay.classList.add('active');
            setTimeout(() => {
                menuOverlay.style.opacity = '1';
            }, 10);
        }
        
        document.body.classList.add('menu-open');
        
        // Fokus auf ersten Link setzen für Accessibility
        setTimeout(() => {
            if (navLinks.length > 0) {
                navLinks[0].focus();
            }
        }, 300);
        
        console.log('Mobile Menu geöffnet');
    }
    
    // Menü schließen
    function closeMenu() {
        burgerButton.classList.remove('aktiv');
        mainNav.classList.remove('aktiv');
        
        if (menuOverlay) {
            menuOverlay.classList.remove('active');
            menuOverlay.style.opacity = '0';
        }
        
        document.body.classList.remove('menu-open');
        
        console.log('Mobile Menu geschlossen');
    }
    
    // Event Listeners
    burgerButton.addEventListener('click', toggleMenu);
    
    if (menuOverlay) {
        menuOverlay.addEventListener('click', closeMenu);
    }
    
    // Menü schließen bei Link-Klick (mobile)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 768) {
                setTimeout(closeMenu, 100);
            }
        });
    });
    
    // ESC Taste zum Schließen
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && burgerButton.classList.contains('aktiv')) {
            closeMenu();
            burgerButton.focus();
        }
    });
    
    // Menü auf Desktop automatisch schließen
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (window.innerWidth > 768 && burgerButton.classList.contains('aktiv')) {
                closeMenu();
            }
        }, 250);
    });
    
    // ARIA Attribute für Accessibility
    burgerButton.setAttribute('aria-expanded', 'false');
    burgerButton.setAttribute('aria-controls', 'mainNav');
    burgerButton.setAttribute('aria-label', 'Hauptmenü öffnen');
    
    // Update ARIA Attribute bei Zustandsänderung
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.attributeName === 'class') {
                const isExpanded = burgerButton.classList.contains('aktiv');
                burgerButton.setAttribute('aria-expanded', isExpanded.toString());
                burgerButton.setAttribute('aria-label', 
                    isExpanded ? 'Hauptmenü schließen' : 'Hauptmenü öffnen'
                );
            }
        });
    });
    
    observer.observe(burgerButton, { attributes: true });
    
    console.log('✅ Menu.js für alle Seiten initialisiert');
});
