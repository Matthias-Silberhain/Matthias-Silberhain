/**
 * MOBILE MENU - Matthias Silberhain Website
 * Version 2.4 - Fix für Mobile Schließen-Problem
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('🍔 Menu.js geladen - Mobile-Fix');
    
    // Defensive Prüfung aller Elemente
    const burgerButton = document.getElementById('burgerButton');
    const mainNav = document.getElementById('mainNav');
    const menuOverlay = document.querySelector('.menu-overlay');
    
    // Warnung wenn Elemente fehlen
    if (!burgerButton) {
        console.warn('Menu.js: Burger Button fehlt!');
        return;
    }
    
    if (!mainNav) {
        console.warn('Menu.js: Navigation fehlt!');
        return;
    }
    
    const navLinks = mainNav.querySelectorAll('a');
    let isMenuOpen = false;
    
    // ================= MENÜ FUNKTIONEN =================
    function toggleMenu(event) {
        if (event) {
            event.preventDefault();
            event.stopPropagation();
        }
        
        if (!isMenuOpen) {
            openMenu();
        } else {
            closeMenu();
        }
    }
    
    function openMenu() {
        burgerButton.classList.add('aktiv');
        mainNav.classList.add('aktiv');
        
        if (menuOverlay) {
            menuOverlay.classList.add('active');
        }
        
        document.body.classList.add('menu-open');
        
        // Verhindere Scrollen im Hintergrund (Mobile-Fix)
        document.body.style.overflow = 'hidden';
        document.body.style.height = '100%';
        document.body.style.position = 'fixed';
        document.body.style.width = '100%';
        
        // Fokus für Accessibility
        setTimeout(() => {
            if (navLinks.length > 0) {
                navLinks[0].focus();
            }
        }, 100);
        
        isMenuOpen = true;
        updateAriaAttributes();
        
        console.log('📱 Menü geöffnet');
    }
    
    function closeMenu() {
        burgerButton.classList.remove('aktiv');
        mainNav.classList.remove('aktiv');
        
        if (menuOverlay) {
            menuOverlay.classList.remove('active');
        }
        
        document.body.classList.remove('menu-open');
        
        // Erlaube Scrollen wieder (Mobile-Fix)
        document.body.style.overflow = '';
        document.body.style.height = '';
        document.body.style.position = '';
        document.body.style.width = '';
        
        // Setze Fokus zurück zum Burger Button
        burgerButton.focus();
        
        isMenuOpen = false;
        updateAriaAttributes();
        
        console.log('📱 Menü geschlossen');
    }
    
    // ================= EVENT LISTENERS =================
    // Burger Button
    burgerButton.addEventListener('click', toggleMenu);
    burgerButton.addEventListener('touchend', toggleMenu, { passive: true });
    
    // Overlay zum Schließen
    if (menuOverlay) {
        menuOverlay.addEventListener('click', closeMenu);
        menuOverlay.addEventListener('touchend', closeMenu, { passive: true });
    }
    
    // Menü schließen bei Link-Klick (MOBILE-FIX: Sofort schließen)
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Nur auf Mobile schließen oder wenn Menü offen ist
            if (window.innerWidth < 768 || isMenuOpen) {
                e.stopPropagation();
                setTimeout(closeMenu, 100);
            }
        });
        
        link.addEventListener('touchend', (e) => {
            if (window.innerWidth < 768 || isMenuOpen) {
                e.stopPropagation();
                setTimeout(closeMenu, 100);
            }
        }, { passive: true });
    });
    
    // ESC Taste zum Schließen
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isMenuOpen) {
            closeMenu();
        }
    });
    
    // Touch-Gesten für Swipe-to-Close
    let touchStartX = 0;
    let touchStartY = 0;
    
    document.addEventListener('touchstart', (e) => {
        if (!isMenuOpen) return;
        
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
    }, { passive: true });
    
    document.addEventListener('touchend', (e) => {
        if (!isMenuOpen) return;
        
        const touchEndX = e.changedTouches[0].clientX;
        const touchEndY = e.changedTouches[0].clientY;
        
        const deltaX = touchEndX - touchStartX;
        const deltaY = touchEndY - touchStartY;
        
        // Swipe von rechts nach links (mindestens 50px) um Menü zu schließen
        if (deltaX < -50 && Math.abs(deltaY) < 50) {
            closeMenu();
        }
    }, { passive: true });
    
    // ================= RESPONSIVE HANDLING =================
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (window.innerWidth > 768 && isMenuOpen) {
                closeMenu();
            }
        }, 150);
    });
    
    // ================= ACCESSIBILITY =================
    function updateAriaAttributes() {
        burgerButton.setAttribute('aria-expanded', isMenuOpen.toString());
        burgerButton.setAttribute('aria-label', 
            isMenuOpen ? 'Hauptmenü schließen' : 'Hauptmenü öffnen'
        );
        
        if (mainNav) {
            mainNav.setAttribute('aria-hidden', (!isMenuOpen).toString());
        }
    }
    
    // Initiale ARIA Attribute setzen
    burgerButton.setAttribute('aria-controls', 'mainNav');
    burgerButton.setAttribute('aria-haspopup', 'true');
    updateAriaAttributes();
    
    console.log('✅ Menu.js erfolgreich initialisiert mit Mobile-Fixes');
});
