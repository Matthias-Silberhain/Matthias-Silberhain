// ============================================================================
// MENU.JS - KOMPLETTE LÖSUNG FÜR ALLES
// ============================================================================

(function() {
    'use strict';
    
    console.log('🚀 MENU.JS - Komplette Lösung geladen');
    
    // ============================================================================
    // 1. PRELOADER MIT "MATTHIAS SILBERHAIN"
    // ============================================================================
    
    function initPreloader() {
        const preloader = document.getElementById('preloader');
        const preloaderText = document.querySelector('.preloader-text');
        const cursor = document.querySelector('.cursor');
        
        console.log('🌀 Initialisiere Preloader...');
        
        if (!preloader) {
            console.warn('⚠️ Preloader nicht gefunden');
            return;
        }
        
        // Preloader sofort sichtbar machen
        preloader.style.display = 'flex';
        preloader.style.opacity = '1';
        preloader.style.visibility = 'visible';
        
        if (!preloaderText) {
            // Fallback: Preloader nach 2 Sekunden ausblenden
            setTimeout(() => {
                preloader.classList.add('hidden');
                setTimeout(() => preloader.style.display = 'none', 600);
            }, 2000);
            return;
        }
        
        // Text für die Typing Animation
        const fullText = "MATTHIAS SILBERHAIN";
        let charIndex = 0;
        const typingSpeed = 100;
        const cursorBlinkSpeed = 530;
        
        // Cursor blinken lassen
        let cursorVisible = true;
        let cursorInterval;
        
        if (cursor) {
            cursorInterval = setInterval(() => {
                cursorVisible = !cursorVisible;
                cursor.style.opacity = cursorVisible ? '1' : '0.3';
            }, cursorBlinkSpeed);
        }
        
        // Typing Animation
        function typeCharacter() {
            if (charIndex < fullText.length) {
                preloaderText.textContent += fullText.charAt(charIndex);
                charIndex++;
                
                // Variable Geschwindigkeit für natürlicheres Gefühl
                let delay = typingSpeed;
                if (fullText.charAt(charIndex - 1) === ' ') {
                    delay = 70; // Kürzere Pause bei Leerzeichen
                } else if ('AEIOU'.includes(fullText.charAt(charIndex - 1).toUpperCase())) {
                    delay = 85; // Etwas schneller bei Vokalen
                }
                
                setTimeout(typeCharacter, delay);
            } else {
                // Animation abgeschlossen
                console.log('✅ Typing Animation abgeschlossen');
                
                // Cursor blinken stoppen und ausblenden
                if (cursor) {
                    clearInterval(cursorInterval);
                    cursor.style.opacity = '0';
                    cursor.style.transition = 'opacity 0.5s ease';
                }
                
                // Kurze Pause, dann Preloader ausblenden
                setTimeout(() => {
                    preloader.classList.add('hidden');
                    
                    setTimeout(() => {
                        preloader.style.display = 'none';
                        console.log('✅ Preloader ausgeblendet');
                        
                        // Nach Preloader: Menu und Dark Mode final aktivieren
                        setTimeout(() => {
                            initMobileMenuFinal();
                            initDarkModeFinal();
                            enableAllInteractiveElements();
                        }, 100);
                    }, 600);
                }, 1200); // 1.2 Sekunden Pause nach Typing
            }
        }
        
        // Starte Typing Animation
        setTimeout(() => {
            console.log('⌨️ Starte Typing Animation: "' + fullText + '"');
            preloaderText.textContent = '';
            typeCharacter();
        }, 500);
        
        // Fallback: Preloader nach 8 Sekunden erzwingen
        setTimeout(() => {
            if (!preloader.classList.contains('hidden')) {
                console.log('⚠️ Preloader-Fallback aktiviert');
                if (cursor) clearInterval(cursorInterval);
                preloader.classList.add('hidden');
                setTimeout(() => {
                    preloader.style.display = 'none';
                    initMobileMenuFinal();
                    initDarkModeFinal();
                }, 600);
            }
        }, 8000);
    }
    
    // ============================================================================
    // 2. MOBILE MENU - VOLL FUNKTIONIERT
    // ============================================================================
    
    let mobileMenuInitialized = false;
    
    function initMobileMenuFinal() {
        if (mobileMenuInitialized) return;
        
        const burger = document.querySelector('.burger');
        const navigation = document.querySelector('.hauptnavigation');
        
        console.log('📱 Initialisiere Mobile Menu...');
        
        if (!burger || !navigation) {
            console.warn('⚠️ Mobile Menu Elemente nicht gefunden');
            return;
        }
        
        // Menu Overlay erstellen falls nicht vorhanden
        let overlay = document.querySelector('.menu-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.className = 'menu-overlay';
            document.body.appendChild(overlay);
            console.log('✅ Menu Overlay erstellt');
        }
        
        // Elemente klickbar machen
        burger.style.pointerEvents = 'auto';
        burger.style.cursor = 'pointer';
        burger.setAttribute('tabindex', '0');
        burger.setAttribute('aria-label', 'Menü öffnen/schließen');
        
        // Zustandsvariable
        let isMenuOpen = false;
        
        // Funktion zum Öffnen des Menüs
        function openMenu() {
            burger.classList.add('aktiv');
            navigation.classList.add('aktiv');
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
            isMenuOpen = true;
            burger.setAttribute('aria-expanded', 'true');
            console.log('✅ Mobile Menu geöffnet');
        }
        
        // Funktion zum Schließen des Menüs
        function closeMenu() {
            burger.classList.remove('aktiv');
            navigation.classList.remove('aktiv');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
            isMenuOpen = false;
            burger.setAttribute('aria-expanded', 'false');
            console.log('✅ Mobile Menu geschlossen');
        }
        
        // Burger Click Event
        burger.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            if (!isMenuOpen) {
                openMenu();
            } else {
                closeMenu();
            }
        });
        
        // Overlay Click Event
        overlay.addEventListener('click', function(e) {
            if (isMenuOpen) {
                e.stopPropagation();
                closeMenu();
            }
        });
        
        // Navigation Links schließen Menü
        const navLinks = navigation.querySelectorAll('a');
        navLinks.forEach(link => {
            link.style.pointerEvents = 'auto';
            link.style.cursor = 'pointer';
            
            link.addEventListener('click', function() {
                if (isMenuOpen) {
                    closeMenu();
                }
            });
        });
        
        // ESC Taste schließt Menü
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && isMenuOpen) {
                closeMenu();
            }
        });
        
        // Bei Resize auf Desktop: Menü schließen
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768 && isMenuOpen) {
                closeMenu();
            }
        });
        
        mobileMenuInitialized = true;
        console.log('✅ Mobile Menu vollständig initialisiert');
    }
    
    // ============================================================================
    // 3. DARK MODE - VOLL FUNKTIONIERT
    // ============================================================================
    
    let darkModeInitialized = false;
    
    function initDarkModeFinal() {
        if (darkModeInitialized) return;
        
        const toggleBtn = document.getElementById('darkModeToggle');
        console.log('🌓 Initialisiere Dark Mode...');
        
        if (!toggleBtn) {
            console.error('❌ Dark Mode Toggle Button nicht gefunden!');
            return;
        }
        
        console.log('✅ Dark Mode Toggle gefunden');
        
        // Button sofort klickbar machen
        toggleBtn.style.pointerEvents = 'auto';
        toggleBtn.style.cursor = 'pointer';
        toggleBtn.style.opacity = '1';
        toggleBtn.style.visibility = 'visible';
        toggleBtn.setAttribute('tabindex', '0');
        toggleBtn.setAttribute('aria-label', 'Dark Mode umschalten');
        
        // Icons
        const moonIcon = toggleBtn.querySelector('.moon-icon');
        const sunIcon = toggleBtn.querySelector('.sun-icon');
        
        // Gespeichertes Theme laden
        function getSavedTheme() {
            try {
                return localStorage.getItem('silberhain-theme');
            } catch (e) {
                return null;
            }
        }
        
        // Systempräferenz
        function getSystemPreference() {
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                return 'dark';
            }
            return 'light';
        }
        
        // Theme anwenden
        function applyTheme(theme) {
            const body = document.body;
            
            if (theme === 'dark') {
                body.classList.add('dark-mode');
                if (moonIcon && sunIcon) {
                    moonIcon.style.display = 'none';
                    sunIcon.style.display = 'block';
                }
                toggleBtn.setAttribute('aria-label', 'Zu Light Mode wechseln');
                toggleBtn.title = 'Zu Light Mode wechseln';
                console.log('🌙 Dark Mode aktiviert');
            } else {
                body.classList.remove('dark-mode');
                if (moonIcon && sunIcon) {
                    moonIcon.style.display = 'block';
                    sunIcon.style.display = 'none';
                }
                toggleBtn.setAttribute('aria-label', 'Zu Dark Mode wechseln');
                toggleBtn.title = 'Zu Dark Mode wechseln';
                console.log('☀️ Light Mode aktiviert');
            }
        }
        
        // Dark Mode umschalten
        function toggleDarkMode() {
            const body = document.body;
            const isDark = body.classList.contains('dark-mode');
            
            console.log('🔄 Wechsle Theme:', isDark ? 'Dark → Light' : 'Light → Dark');
            
            if (isDark) {
                // Zu Light wechseln
                body.classList.remove('dark-mode');
                localStorage.setItem('silberhain-theme', 'light');
                if (moonIcon && sunIcon) {
                    moonIcon.style.display = 'block';
                    sunIcon.style.display = 'none';
                }
                toggleBtn.setAttribute('aria-label', 'Zu Dark Mode wechseln');
            } else {
                // Zu Dark wechseln
                body.classList.add('dark-mode');
                localStorage.setItem('silberhain-theme', 'dark');
                if (moonIcon && sunIcon) {
                    moonIcon.style.display = 'none';
                    sunIcon.style.display = 'block';
                }
                toggleBtn.setAttribute('aria-label', 'Zu Light Mode wechseln');
            }
            
            // Animation für Feedback
            toggleBtn.style.transform = 'scale(1.2)';
            setTimeout(() => {
                toggleBtn.style.transform = 'scale(1)';
            }, 200);
        }
        
        // Initiales Theme setzen
        const savedTheme = getSavedTheme();
        const systemTheme = getSystemPreference();
        const initialTheme = savedTheme || systemTheme;
        
        applyTheme(initialTheme);
        
        // Click Event
        toggleBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            toggleDarkMode();
        });
        
        // Keyboard Support
        toggleBtn.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleDarkMode();
            }
        });
        
        // System Theme Änderungen überwachen
        if (window.matchMedia) {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            mediaQuery.addEventListener('change', function(e) {
                if (!getSavedTheme()) {
                    console.log('🖥️ System Theme geändert:', e.matches ? 'dark' : 'light');
                    applyTheme(e.matches ? 'dark' : 'light');
                }
            });
        }
        
        darkModeInitialized = true;
        console.log('✅ Dark Mode vollständig initialisiert');
    }
    
    // ============================================================================
    // 4. ALLE INTERAKTIVEN ELEMENTE AKTIVIEREN
    // ============================================================================
    
    function enableAllInteractiveElements() {
        console.log('🖱️ Aktiviere alle interaktiven Elemente...');
        
        const selectors = [
            'button',
            'a',
            '.burger',
            '.dark-mode-toggle',
            '.silber-button',
            '.social-link',
            '.hauptnavigation a'
        ];
        
        selectors.forEach(selector => {
            document.querySelectorAll(selector).forEach(element => {
                element.style.pointerEvents = 'auto';
                element.style.cursor = 'pointer';
                element.removeAttribute('disabled');
            });
        });
        
        console.log('✅ Alle interaktiven Elemente aktiviert');
    }
    
    // ============================================================================
    // 5. FOOTER UND KLEINE HELFER
    // ============================================================================
    
    function initHelpers() {
        // Jahreszahl im Footer
        const yearElement = document.getElementById('jahr');
        if (yearElement && !yearElement.textContent) {
            yearElement.textContent = new Date().getFullYear();
            console.log('📅 Jahreszahl aktualisiert:', yearElement.textContent);
        }
        
        // Impressum/Datenschutz Links
        document.querySelectorAll('.footer-links a').forEach(link => {
            link.style.pointerEvents = 'auto';
            link.style.cursor = 'pointer';
        });
    }
    
    // ============================================================================
    // 6. HAUPINITIALISIERUNG
    // ============================================================================
    
    function initEverything() {
        console.log('🚀 Starte komplette Initialisierung...');
        
        // 1. Hilfsfunktionen zuerst (schnell)
        initHelpers();
        
        // 2. Preloader starten (blockiert UI bis fertig)
        initPreloader();
        
        // 3. Mobile Menu und Dark Mode vorläufig initialisieren
        // (werden nach Preloader fertiggestellt)
        const burger = document.querySelector('.burger');
        const toggleBtn = document.getElementById('darkModeToggle');
        
        if (burger) {
            burger.style.pointerEvents = 'auto';
            burger.style.cursor = 'pointer';
        }
        
        if (toggleBtn) {
            toggleBtn.style.pointerEvents = 'auto';
            toggleBtn.style.cursor = 'pointer';
        }
        
        console.log('✅ Initialisierung gestartet');
    }
    
    // ============================================================================
    // 7. STARTE ALLES
    // ============================================================================
    
    // Bei DOM Ready starten
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            console.log('📄 DOM vollständig geladen');
            setTimeout(initEverything, 50);
        });
    } else {
        // DOM bereits geladen
        console.log('📄 DOM bereits geladen');
        setTimeout(initEverything, 50);
    }
    
    // ============================================================================
    // 8. GLOBALE FUNKTIONEN FÜR EXTERNE NUTZUNG
    // ============================================================================
    
    window.toggleDarkMode = function() {
        const toggleBtn = document.getElementById('darkModeToggle');
        if (toggleBtn) {
            toggleBtn.click();
        }
    };
    
    window.toggleMobileMenu = function() {
        const burger = document.querySelector('.burger');
        if (burger) {
            burger.click();
        }
    };
    
    console.log('✅ MENU.JS bereit');
    
})();
