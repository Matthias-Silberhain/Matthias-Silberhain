/**
 * MOBILE MENU - Matthias Silberhain Website
 * Version 3.0 - Vollständig konsistent für alle Browser
 */

// Warte bis DOM komplett geladen ist
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMenu);
} else {
    // DOM ist bereits geladen
    initMenu();
}

function initMenu() {
    console.log('🍔 Menu.js geladen - Browser-konsistent');
    
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
    let resizeTimer;
    
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
        
        // Verhindere Scrollen im Hintergrund
        disableBodyScroll();
        
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
        
        // Erlaube Scrollen wieder
        enableBodyScroll();
        
        // Setze Fokus zurück zum Burger Button
        burgerButton.focus();
        
        isMenuOpen = false;
        updateAriaAttributes();
        
        console.log('📱 Menü geschlossen');
    }
    
    // ================= SCROLL CONTROL =================
    function disableBodyScroll() {
        // Für moderne Browser
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.width = '100%';
        document.body.style.height = '100%';
        
        // Für iOS Safari
        document.body.style.top = `-${window.scrollY}px`;
    }
    
    function enableBodyScroll() {
        // Für moderne Browser
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.width = '';
        document.body.style.height = '';
        
        // Für iOS Safari - Setze Scroll-Position zurück
        const scrollY = document.body.style.top;
        if (scrollY) {
            document.body.style.top = '';
            window.scrollTo(0, parseInt(scrollY || '0') * -1);
        }
    }
    
    // ================= EVENT LISTENERS =================
    // Touch und Click Events
    burgerButton.addEventListener('click', toggleMenu);
    burgerButton.addEventListener('touchstart', toggleMenu, { passive: true });
    
    if (menuOverlay) {
        menuOverlay.addEventListener('click', closeMenu);
        menuOverlay.addEventListener('touchstart', closeMenu, { passive: true });
    }
    
    // Menü schließen bei Link-Klick (nur mobile)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 768) {
                setTimeout(closeMenu, 100);
            }
        });
        
        link.addEventListener('touchstart', () => {
            if (window.innerWidth < 768) {
                setTimeout(closeMenu, 100);
            }
        }, { passive: true });
        
        // Keyboard Navigation
        link.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                if (window.innerWidth < 768) {
                    setTimeout(closeMenu, 100);
                }
            }
        });
    });
    
    // ESC Taste zum Schließen
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isMenuOpen) {
            closeMenu();
        }
    });
    
    // Tab Navigation im Menü
    document.addEventListener('focusin', (e) => {
        if (isMenuOpen && mainNav.contains(e.target)) {
            // Tab bleibt innerhalb des Menüs
            const focusableElements = mainNav.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])');
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];
            
            if (e.target === lastElement && !e.shiftKey) {
                firstElement.focus();
                e.preventDefault();
            }
            
            if (e.target === firstElement && e.shiftKey) {
                lastElement.focus();
                e.preventDefault();
            }
        }
    });
    
    // ================= RESPONSIVE HANDLING =================
    function handleResize() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (window.innerWidth > 768 && isMenuOpen) {
                closeMenu();
            }
            
            // Update Menü-Position für iOS Safari
            if (window.innerWidth <= 768 && isMenuOpen) {
                mainNav.style.right = '0';
            }
        }, 150);
    }
    
    window.addEventListener('resize', handleResize, { passive: true });
    
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
    
    // Setze Tabindex für Menü wenn geschlossen
    if (window.innerWidth <= 768) {
        navLinks.forEach(link => {
            if (!isMenuOpen) {
                link.setAttribute('tabindex', '-1');
            }
        });
    }
    
    // Observer für Menü-Status Änderungen
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.attributeName === 'class') {
                updateAriaAttributes();
                
                // Update Tabindex für mobile
                if (window.innerWidth <= 768) {
                    navLinks.forEach(link => {
                        link.setAttribute('tabindex', isMenuOpen ? '0' : '-1');
                    });
                }
            }
        });
    });
    
    observer.observe(burgerButton, { attributes: true });
    observer.observe(mainNav, { attributes: true });
    
    // ================= TOUCH GESTURE SUPPORT =================
    let touchStartX = 0;
    let touchStartY = 0;
    
    document.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
    }, { passive: true });
    
    document.addEventListener('touchend', (e) => {
        const touchEndX = e.changedTouches[0].clientX;
        const touchEndY = e.changedTouches[0].clientY;
        
        const deltaX = touchEndX - touchStartX;
        const deltaY = touchEndY - touchStartY;
        
        // Swipe von rechts nach links um Menü zu schließen
        if (isMenuOpen && deltaX < -50 && Math.abs(deltaY) < 50) {
            closeMenu();
        }
    }, { passive: true });
    
    console.log('✅ Menu.js erfolgreich initialisiert');
}

// Fallback für alte Browser ohne MutationObserver
if (!window.MutationObserver) {
    console.warn('MutationObserver nicht unterstützt - einige Menu.js Features deaktiviert');
}
