// assets/js/menu.js
document.addEventListener('DOMContentLoaded', function() {
    console.log('Mobile Menü wird initialisiert');
    
    const burger = document.querySelector('.burger');
    const navigation = document.querySelector('.hauptnavigation');
    const menuOverlay = document.querySelector('.menu-overlay');
    
    if (!burger || !navigation) {
        console.error('Menü-Elemente nicht gefunden');
        return;
    }
    
    // Mobile/Desktop Check
    function isMobile() {
        return window.innerWidth <= 768;
    }
    
    // Menü öffnen
    function openMenu() {
        console.log('Menü öffnen');
        burger.classList.add('aktiv');
        navigation.classList.add('aktiv');
        navigation.style.display = 'flex';
        
        if (menuOverlay) {
            menuOverlay.classList.add('active');
        }
        
        document.body.classList.add('menu-open');
        burger.setAttribute('aria-expanded', 'true');
    }
    
    // Menü schließen
    function closeMenu() {
        console.log('Menü schließen');
        burger.classList.remove('aktiv');
        navigation.classList.remove('aktiv');
        
        if (menuOverlay) {
            menuOverlay.classList.remove('active');
        }
        
        document.body.classList.remove('menu-open');
        burger.setAttribute('aria-expanded', 'false');
        
        // Auf Mobile nach Animation ausblenden
        if (isMobile()) {
            setTimeout(() => {
                navigation.style.display = 'none';
            }, 300);
        }
    }
    
    // Menü umschalten
    function toggleMenu(event) {
        if (event) event.preventDefault();
        
        if (navigation.classList.contains('aktiv')) {
            closeMenu();
        } else {
            openMenu();
        }
    }
    
    // Event Listener
    burger.addEventListener('click', toggleMenu);
    
    // Overlay schließt Menü
    if (menuOverlay) {
        menuOverlay.addEventListener('click', closeMenu);
    }
    
    // Menü-Links schließen Menü auf Mobile
    const navLinks = navigation.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (isMobile()) {
                setTimeout(closeMenu, 100);
            }
        });
    });
    
    // ESC-Taste schließt Menü
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && navigation.classList.contains('aktiv')) {
            closeMenu();
        }
    });
    
    // Bei Resize: Menü zurücksetzen wenn auf Desktop
    function handleResize() {
        if (!isMobile()) {
            // Auf Desktop: Menü immer sichtbar
            navigation.style.display = 'flex';
            closeMenu();
        } else {
            // Auf Mobile: Wenn Menü nicht aktiv ist, ausblenden
            if (!navigation.classList.contains('aktiv')) {
                navigation.style.display = 'none';
            }
        }
    }
    
    window.addEventListener('resize', handleResize);
    
    // Initialisierung
    handleResize();
    burger.setAttribute('aria-label', 'Hauptmenü öffnen oder schließen');
    burger.setAttribute('aria-expanded', 'false');
    
    console.log('Mobile Menü erfolgreich initialisiert');
});
