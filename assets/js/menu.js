// assets/js/menu.js
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Mobile Menü wird geladen');
    
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.hauptnavigation');
    const overlay = document.querySelector('.menu-overlay');
    
    if (!burger || !nav) {
        console.error('❌ Menü-Elemente nicht gefunden');
        return;
    }
    
    console.log('✅ Elemente gefunden:', { burger, nav, overlay });
    
    // Einfache Toggle-Funktion
    function toggleMenu() {
        console.log('🔄 Toggle Menü');
        
        const isActive = nav.classList.contains('aktiv');
        
        if (isActive) {
            // Menü schließen
            burger.classList.remove('aktiv');
            nav.classList.remove('aktiv');
            if (overlay) overlay.classList.remove('active');
            document.body.style.overflow = '';
        } else {
            // Menü öffnen
            burger.classList.add('aktiv');
            nav.classList.add('aktiv');
            if (overlay) overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }
    
    // Menü schließen
    function closeMenu() {
        burger.classList.remove('aktiv');
        nav.classList.remove('aktiv');
        if (overlay) overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Event Listener
    burger.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleMenu();
    });
    
    // Overlay schließt Menü
    if (overlay) {
        overlay.addEventListener('click', closeMenu);
    }
    
    // Links schließen Menü auf Mobile
    const navLinks = nav.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                setTimeout(closeMenu, 100);
            }
        });
    });
    
    // ESC-Taste schließt Menü
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && nav.classList.contains('aktiv')) {
            closeMenu();
        }
    });
    
    // Bei Resize: Menü zurücksetzen wenn auf Desktop
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && nav.classList.contains('aktiv')) {
            closeMenu();
        }
    });
    
    // Initialisierung
    burger.setAttribute('aria-label', 'Menü öffnen/schließen');
    
    console.log('✅ Mobile Menü bereit');
});
