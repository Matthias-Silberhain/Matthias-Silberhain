/* ==========================================================================
   MENU.JS - MOBILE NAVIGATION & DARK MODE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function() {
    
    console.log('✅ menu.js gestartet');
    
    // ================= ELEMENTE DEFINIEREN =================
    const burger = document.getElementById('burger');
    const navigation = document.getElementById('navigation');
    const menuOverlay = document.getElementById('menuOverlay');
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;
    
    // ================= MOBILE MENÜ FUNKTIONALITÄT =================
    if (burger && navigation) {
        console.log('✅ Navigation Elemente gefunden');
        
        burger.addEventListener('click', function(e) {
            e.stopPropagation();
            
            const isActive = burger.classList.toggle('aktiv');
            navigation.classList.toggle('aktiv');
            
            if (menuOverlay) {
                menuOverlay.classList.toggle('active');
            }
            
            document.body.style.overflow = isActive ? 'hidden' : '';
            
            console.log(isActive ? '✅ Menü geöffnet' : '✅ Menü geschlossen');
        });
        
        if (menuOverlay) {
            menuOverlay.addEventListener('click', function() {
                burger.classList.remove('aktiv');
                navigation.classList.remove('aktiv');
                this.classList.remove('active');
                document.body.style.overflow = '';
                console.log('✅ Menü via Overlay geschlossen');
            });
        }
        
        const navLinks = navigation.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                setTimeout(() => {
                    burger.classList.remove('aktiv');
                    navigation.classList.remove('aktiv');
                    if (menuOverlay) {
                        menuOverlay.classList.remove('active');
                    }
                    document.body.style.overflow = '';
                    console.log('✅ Menü via Link geschlossen');
                }, 300);
            });
        });
        
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navigation.classList.contains('aktiv')) {
                burger.classList.remove('aktiv');
                navigation.classList.remove('aktiv');
                if (menuOverlay) {
                    menuOverlay.classList.remove('active');
                }
                document.body.style.overflow = '';
                console.log('✅ Menü via ESC geschlossen');
            }
        });
        
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768 && navigation.classList.contains('aktiv')) {
                burger.classList.remove('aktiv');
                navigation.classList.remove('aktiv');
                if (menuOverlay) {
                    menuOverlay.classList.remove('active');
                }
                document.body.style.overflow = '';
                console.log('✅ Menü via Resize geschlossen');
            }
        });
    }
    
    // ================= DARK MODE FUNKTIONALITÄT =================
    if (darkModeToggle) {
        console.log('✅ Dark Mode Toggle gefunden');
        
        function getCurrentTheme() {
            try {
                const savedTheme = localStorage.getItem('silberhain-theme');
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                
                return savedTheme || (prefersDark ? 'dark' : 'light');
            } catch (e) {
                return 'light';
            }
        }
        
        function applyTheme(theme) {
            const isDark = theme === 'dark';
            
            if (isDark) {
                body.classList.add('dark-mode');
                document.documentElement.classList.add('dark-mode');
            } else {
                body.classList.remove('dark-mode');
                document.documentElement.classList.remove('dark-mode');
            }
            
            try {
                localStorage.setItem('silberhain-theme', theme);
            } catch (e) {
                console.warn('LocalStorage nicht verfügbar');
            }
            
            console.log('✅ Theme angewendet:', theme);
            return isDark;
        }
        
        const currentTheme = getCurrentTheme();
        const isDarkMode = applyTheme(currentTheme);
        console.log('✅ Initiales Theme:', currentTheme, 'Dark Mode:', isDarkMode);
        
        darkModeToggle.addEventListener('click', function() {
            const isCurrentlyDark = body.classList.contains('dark-mode');
            const newTheme = isCurrentlyDark ? 'light' : 'dark';
            
            applyTheme(newTheme);
            this.blur();
            
            console.log('✅ Dark Mode geändert zu:', newTheme);
        });
        
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        mediaQuery.addEventListener('change', function(e) {
            if (!localStorage.getItem('silberhain-theme')) {
                applyTheme(e.matches ? 'dark' : 'light');
                console.log('✅ System Theme geändert:', e.matches ? 'dark' : 'light');
            }
        });
    }
    
    // ================= ACTIVE LINK HIGHLIGHTING =================
    function setActiveLink() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.hauptnavigation a');
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            
            const linkHref = link.getAttribute('href');
            if (linkHref === currentPage || 
                (currentPage === '' && linkHref === 'index.html')) {
                link.classList.add('active');
            }
        });
        
        console.log('✅ Aktive Links gesetzt für:', currentPage);
    }
    
    setActiveLink();
    
    console.log('✅ menu.js erfolgreich geladen');
    
    // ================= EXPORT =================
    window.MenuManager = {
        toggleMenu: function() {
            if (burger) burger.click();
        },
        toggleDarkMode: function() {
            if (darkModeToggle) darkModeToggle.click();
        },
        isMenuOpen: function() {
            return burger ? burger.classList.contains('aktiv') : false;
        },
        isDarkMode: function() {
            return body.classList.contains('dark-mode');
        }
    };
});
