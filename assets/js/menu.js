// assets/js/menu.js
document.addEventListener('DOMContentLoaded', function() {
    console.log('Menu JS geladen');
    
    const burger = document.getElementById('burger');
    const navigation = document.getElementById('navigation');
    const menuOverlay = document.getElementById('menuOverlay');
    
    if (!burger || !navigation) {
        console.warn('Menü-Elemente nicht gefunden');
        return;
    }
    
    // Mobile/Desktop Check
    function isMobile() {
        return window.innerWidth <= 768;
    }
    
    // Initialzustand setzen
    function initMenuState() {
        if (isMobile()) {
            navigation.style.display = 'none';
            navigation.style.opacity = '0';
            navigation.style.transform = 'translateX(-100%)';
        } else {
            navigation.style.display = 'flex';
            navigation.style.opacity = '1';
            navigation.style.transform = 'translateX(0)';
        }
    }
    
    // Menü öffnen
    function openMenu() {
        console.log('Öffne Menü');
        burger.classList.add('aktiv');
        navigation.classList.add('aktiv');
        navigation.style.display = 'flex';
        
        // Kurze Verzögerung für Transition
        setTimeout(() => {
            navigation.style.opacity = '1';
            navigation.style.transform = 'translateX(0)';
        }, 10);
        
        if (menuOverlay) {
            menuOverlay.classList.add('active');
            menuOverlay.style.display = 'block';
            setTimeout(() => {
                menuOverlay.style.opacity = '1';
            }, 10);
        }
        
        document.body.style.overflow = 'hidden';
        burger.setAttribute('aria-expanded', 'true');
    }
    
    // Menü schließen
    function closeMenu() {
        console.log('Schließe Menü');
        burger.classList.remove('aktiv');
        navigation.style.opacity = '0';
        navigation.style.transform = 'translateX(-100%)';
        
        if (menuOverlay) {
            menuOverlay.style.opacity = '0';
            setTimeout(() => {
                menuOverlay.style.display = 'none';
                menuOverlay.classList.remove('active');
            }, 300);
        }
        
        setTimeout(() => {
            navigation.classList.remove('aktiv');
            if (isMobile()) {
                navigation.style.display = 'none';
            }
            document.body.style.overflow = '';
        }, 300);
        
        burger.setAttribute('aria-expanded', 'false');
    }
    
    // Menü toggle
    function toggleMenu(event) {
        if (event) event.stopPropagation();
        
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
    
    // Menü-Links schließen Menü
    document.querySelectorAll('#navigation a').forEach(link => {
        link.addEventListener('click', () => {
            if (isMobile()) {
                setTimeout(closeMenu, 100);
            }
        });
    });
    
    // ESC-Taste schließt Menü
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navigation.classList.contains('aktiv')) {
            closeMenu();
        }
    });
    
    // Bei Resize
    window.addEventListener('resize', () => {
        if (!isMobile() && navigation.classList.contains('aktiv')) {
            closeMenu();
        }
        initMenuState();
    });
    
    // Initialisierung
    initMenuState();
    burger.setAttribute('aria-label', 'Menü öffnen/schließen');
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-controls', 'navigation');
    
    // Touch-Optimierung
    if ('ontouchstart' in window) {
        burger.style.cursor = 'pointer';
    }
    
    console.log('Menu JS initialisiert');
});
