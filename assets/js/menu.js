// ====== KORRIGIERTE menu.js - EINZIGE VERSION ======
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ DOM geladen - Menu JS startet');
    
    // PRELOADER LOGIK ZUERST
    function initPreloader() {
        const preloader = document.getElementById('preloader');
        if (!preloader) return;
        
        console.log('⏳ Initialisiere Preloader...');
        
        // 1. Sofort alle interaktiven Elemente klickbar machen
        document.body.style.pointerEvents = 'auto';
        
        // 2. Preloader nach kurzer Verzögerung ausblenden
        setTimeout(() => {
            preloader.classList.add('hidden');
            console.log('✅ Preloader ausgeblendet');
            
            // 3. Nach Fade-Out komplett entfernen
            setTimeout(() => {
                preloader.style.display = 'none';
                document.body.style.overflow = 'auto';
            }, 600);
            
        }, 1500); // 1.5 statt 2.5 Sekunden
        
        // 4. Notfall: Wenn Seite komplett geladen ist
        window.addEventListener('load', function() {
            console.log('📦 Seite komplett geladen');
            if (preloader.style.display !== 'none') {
                preloader.classList.add('hidden');
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 600);
            }
        });
    }
    
    // BURGER-MENÜ LOGIK
    function initBurgerMenu() {
        console.log('🍔 Initialisiere Burger-Menü...');
        
        const burger = document.getElementById('burger');
        const navigation = document.getElementById('navigation');
        const menuOverlay = document.getElementById('menuOverlay');
        const links = navigation ? navigation.querySelectorAll('a') : [];
        
        // Debug-Info
        console.log('Burger gefunden:', !!burger);
        console.log('Navigation gefunden:', !!navigation);
        console.log('MenuOverlay gefunden:', !!menuOverlay);
        console.log('Links gefunden:', links.length);
        
        if (!burger || !navigation || !menuOverlay) {
            console.error('❌ Kritische Elemente für Burger-Menü nicht gefunden!');
            return;
        }
        
        // SICHERSTELLEN: Burger ist immer klickbar
        burger.style.pointerEvents = 'auto';
        burger.style.zIndex = '9999';
        burger.style.cursor = 'pointer';
        
        // BURGER KLICK
        burger.addEventListener('click', function(e) {
            e.stopPropagation();
            e.preventDefault();
            console.log('🍔 Burger geklickt - Menü umschalten');
            
            const isOpen = navigation.classList.contains('active');
            
            if (!isOpen) {
                // MENÜ ÖFFNEN
                navigation.classList.add('active');
                menuOverlay.classList.add('active');
                burger.classList.add('aktiv'); // WICHTIG: CSS-Klasse 'aktiv'
                document.body.style.overflow = 'hidden';
                console.log('📱 Menü geöffnet');
            } else {
                // MENÜ SCHLIEẞEN
                closeMenu();
                console.log('📱 Menü geschlossen');
            }
        });
        
        // OVERLAY KLICK
        menuOverlay.addEventListener('click', closeMenu);
        
        // LINKS KLICK
        links.forEach(link => {
            link.addEventListener('click', closeMenu);
        });
        
        // ESCAPE-TASTE
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navigation.classList.contains('active')) {
                closeMenu();
            }
        });
        
        // Funktion zum Menü schließen
        function closeMenu() {
            navigation.classList.remove('active');
            menuOverlay.classList.remove('active');
            burger.classList.remove('aktiv');
            document.body.style.overflow = 'auto';
        }
        
        // TOUCH OPTIMIERUNG
        burger.addEventListener('touchstart', function(e) {
            e.preventDefault();
            this.style.transform = 'scale(0.95)';
        }, { passive: false });
        
        burger.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
        });
    }
    
    // DARK MODE TOGGLE (falls existiert)
    function initDarkMode() {
        const darkModeToggle = document.getElementById('darkModeToggle');
        if (!darkModeToggle) return;
        
        darkModeToggle.addEventListener('click', function() {
            console.log('🌙 Dark Mode Toggle geklickt');
            const isDark = document.body.classList.toggle('dark-mode');
            document.documentElement.classList.toggle('dark-mode', isDark);
            
            // Speichern
            localStorage.setItem('silberhain-theme', isDark ? 'dark' : 'light');
        });
    }
    
    // INITIALISIERUNG STARTEN
    console.log('🚀 Starte Initialisierung...');
    initPreloader();
    initBurgerMenu();
    initDarkMode();
    console.log('✅ Menu JS erfolgreich initialisiert');
});
