// ============================================================================
// MOBILE MENU & PRELOADER - OPTIMIERT & KONFLIKTFREI
// ============================================================================

(function() {
    'use strict';
    
    // 1. PRELOADER - NON-BLOCKING
    window.initPreloader = function() {
        const preloader = document.getElementById('preloader');
        const typeText = document.getElementById('type-text');
        
        if (!preloader) return false;
        
        // Sofort nicht-blockierend machen
        preloader.style.pointerEvents = 'none';
        preloader.style.zIndex = '9990';
        
        // Wenn kein Type-Text, schneller ausblenden
        if (!typeText) {
            setTimeout(() => {
                preloader.classList.add('hidden');
                setTimeout(() => preloader.style.display = 'none', 600);
            }, 800);
            return true;
        }
        
        // Typewriter-Effekt
        const text = 'MATTHIAS SILBERHAIN';
        let index = 0;
        const startTime = Date.now();
        const minDisplayTime = 1800; // 1.8 Sekunden Minimum
        
        function typeNextChar() {
            if (index < text.length) {
                typeText.textContent += text.charAt(index);
                index++;
                setTimeout(typeNextChar, 90);
            } else {
                // Cursor stoppen
                const cursor = document.querySelector('.cursor');
                if (cursor) {
                    cursor.style.animation = 'none';
                    cursor.style.opacity = '0';
                }
                
                // Mindestzeit abwarten
                const elapsed = Date.now() - startTime;
                const waitTime = Math.max(0, minDisplayTime - elapsed);
                
                setTimeout(() => {
                    preloader.classList.add('hidden');
                    setTimeout(() => {
                        preloader.style.display = 'none';
                        console.log('✅ Preloader ausgeblendet');
                    }, 500);
                }, waitTime);
            }
        }
        
        // Start mit Verzögerung
        setTimeout(typeNextChar, 300);
        return true;
    };
    
    // 2. MOBILE MENU
    window.initMobileMenu = function() {
        const burger = document.getElementById('burger');
        const nav = document.getElementById('navigation');
        const overlay = document.getElementById('menuOverlay');
        
        if (!burger || !nav) {
            console.warn('⚠️ Menu-Elemente nicht gefunden (nicht auf dieser Seite)');
            return false;
        }
        
        let isMenuOpen = false;
        
        // TOGGLE FUNKTION
        function toggleMenu() {
            isMenuOpen = !isMenuOpen;
            nav.classList.toggle('aktiv', isMenuOpen);
            burger.classList.toggle('aktiv', isMenuOpen);
            
            if (overlay) {
                overlay.classList.toggle('active', isMenuOpen);
                overlay.style.pointerEvents = isMenuOpen ? 'auto' : 'none';
            }
            
            document.body.style.overflow = isMenuOpen ? 'hidden' : '';
            
            console.log(`📱 Menu ${isMenuOpen ? 'geöffnet' : 'geschlossen'}`);
        }
        
        // CLOSE FUNKTION
        function closeMenu() {
            if (isMenuOpen) {
                isMenuOpen = false;
                nav.classList.remove('aktiv');
                burger.classList.remove('aktiv');
                if (overlay) {
                    overlay.classList.remove('active');
                    overlay.style.pointerEvents = 'none';
                }
                document.body.style.overflow = '';
            }
        }
        
        // EVENT LISTENER
        burger.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleMenu();
        });
        
        if (overlay) {
            overlay.addEventListener('click', closeMenu);
        }
        
        // Nav-Links schließen Menu
        const navLinks = nav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', closeMenu);
        });
        
        // ESC schließt Menu
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeMenu();
        });
        
        // Click außerhalb schließt Menu
        document.addEventListener('click', (e) => {
            if (isMenuOpen && !nav.contains(e.target) && e.target !== burger) {
                closeMenu();
            }
        });
        
        console.log('✅ Mobile Menu initialisiert');
        return true;
    };
    
    // 3. FOOTER JAHR
    window.updateFooterYear = function() {
        const yearElement = document.getElementById('jahr');
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
            return true;
        }
        return false;
    };
    
})();
