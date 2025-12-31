// assets/js/menu.js
document.addEventListener('DOMContentLoaded', function() {
    console.log('Mobile Menü JS gestartet');
    
    // Elemente mit NEUEN IDs auswählen
    const burger = document.getElementById('burgerMenu');
    const navigation = document.getElementById('mainNavigation');
    const menuOverlay = document.getElementById('menuOverlay');
    
    if (!burger || !navigation) {
        console.error('Menü-Elemente nicht gefunden!');
        return;
    }
    
    console.log('✅ Burger gefunden:', burger);
    console.log('✅ Navigation gefunden:', navigation);
    console.log('✅ Overlay gefunden:', menuOverlay);
    
    // Prüfe ob Mobile
    function isMobile() {
        return window.innerWidth <= 768;
    }
    
    // Initialzustand setzen
    function initMenu() {
        if (isMobile()) {
            navigation.style.display = 'none';
            navigation.style.opacity = '0';
            burger.style.display = 'flex';
        } else {
            navigation.style.display = 'flex';
            navigation.style.opacity = '1';
            burger.style.display = 'none';
        }
    }
    
    // Menü öffnen
    function openMenu() {
        console.log('🟢 Öffne Menü');
        burger.classList.add('aktiv');
        navigation.classList.add('aktiv');
        navigation.style.display = 'flex';
        
        // Kurze Verzögerung für Transition
        setTimeout(() => {
            navigation.style.opacity = '1';
        }, 10);
        
        if (menuOverlay) {
            menuOverlay.classList.add('active');
        }
        
        // Scrollen sperren
        document.body.style.overflow = 'hidden';
        document.body.classList.add('menu-open');
        burger.setAttribute('aria-expanded', 'true');
    }
    
    // Menü schließen
    function closeMenu() {
        console.log('🔴 Schließe Menü');
        burger.classList.remove('aktiv');
        navigation.style.opacity = '0';
        
        setTimeout(() => {
            navigation.classList.remove('aktiv');
            if (isMobile()) {
                navigation.style.display = 'none';
            }
        }, 300);
        
        if (menuOverlay) {
            menuOverlay.classList.remove('active');
        }
        
        // Scrollen erlauben
        document.body.style.overflow = '';
        document.body.classList.remove('menu-open');
        burger.setAttribute('aria-expanded', 'false');
    }
    
    // Menü umschalten
    function toggleMenu(event) {
        if (event) {
            event.preventDefault();
            event.stopPropagation();
        }
        
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
        link.addEventListener('click', function(e) {
            if (isMobile()) {
                console.log('🔗 Link geklickt:', this.href);
                setTimeout(closeMenu, 200);
            }
        });
    });
    
    // ESC-Taste schließt Menü
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && navigation.classList.contains('aktiv')) {
            closeMenu();
        }
    });
    
    // Bei Resize
    function handleResize() {
        if (!isMobile() && navigation.classList.contains('aktiv')) {
            closeMenu();
        }
        initMenu();
    }
    
    window.addEventListener('resize', handleResize);
    
    // Initialisierung
    initMenu();
    burger.setAttribute('aria-label', 'Hauptmenü öffnen oder schließen');
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-controls', 'mainNavigation');
    
    // Touch-Optimierung
    burger.style.cursor = 'pointer';
    
    console.log('✅ Mobile Menü erfolgreich initialisiert');
});
