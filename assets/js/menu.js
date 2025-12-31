// assets/js/menu.js
document.addEventListener('DOMContentLoaded', function() {
    console.log('Menu JS Version 2 geladen');
    
    const burger = document.getElementById('burger');
    const navigation = document.getElementById('navigation');
    const menuOverlay = document.getElementById('menuOverlay');
    
    if (!burger || !navigation) {
        console.error('Menü-Elemente nicht gefunden!');
        return;
    }
    
    console.log('Burger:', burger);
    console.log('Navigation:', navigation);
    console.log('Overlay:', menuOverlay);
    
    // Einfache Toggle-Funktion
    function toggleMenu() {
        console.log('Toggle Menu aufgerufen');
        
        const isActive = navigation.classList.contains('aktiv');
        console.log('Aktueller Status:', isActive ? 'geöffnet' : 'geschlossen');
        
        if (isActive) {
            // Menü schließen
            burger.classList.remove('aktiv');
            navigation.classList.remove('aktiv');
            if (menuOverlay) menuOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
            document.body.classList.remove('menu-open');
            burger.setAttribute('aria-expanded', 'false');
            console.log('Menü geschlossen');
        } else {
            // Menü öffnen
            burger.classList.add('aktiv');
            navigation.classList.add('aktiv');
            if (menuOverlay) menuOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
            document.body.classList.add('menu-open');
            burger.setAttribute('aria-expanded', 'true');
            console.log('Menü geöffnet');
        }
    }
    
    // Menü schließen Funktion
    function closeMenu() {
        console.log('Close Menu aufgerufen');
        burger.classList.remove('aktiv');
        navigation.classList.remove('aktiv');
        if (menuOverlay) menuOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
        document.body.classList.remove('menu-open');
        burger.setAttribute('aria-expanded', 'false');
    }
    
    // Event Listener
    burger.addEventListener('click', function(e) {
        e.stopPropagation();
        e.preventDefault();
        toggleMenu();
    });
    
    // Overlay schließt Menü
    if (menuOverlay) {
        menuOverlay.addEventListener('click', closeMenu);
    }
    
    // Menü-Links schließen Menü
    const navLinks = navigation.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            console.log('Link geklickt:', this.href);
            if (window.innerWidth <= 768) {
                setTimeout(closeMenu, 300);
            }
        });
    });
    
    // ESC zum Schließen
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navigation.classList.contains('aktiv')) {
            closeMenu();
        }
    });
    
    // Bei Resize: Menü zurücksetzen auf Desktop
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && navigation.classList.contains('aktiv')) {
            closeMenu();
        }
    });
    
    // ARIA-Attribute setzen
    burger.setAttribute('aria-label', 'Hauptmenü öffnen oder schließen');
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-controls', 'navigation');
    
    // Touch-Optimierung
    burger.style.cursor = 'pointer';
    
    console.log('Menu JS erfolgreich initialisiert');
});
