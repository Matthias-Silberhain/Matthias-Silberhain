// ============================================================================
// EINFACHE MENU & PRELOADER IMPLEMENTATION
// ============================================================================

(function() {
    'use strict';

    // 1. Preloader mit Typewriter-Effekt
    function initPreloader() {
        const preloader = document.getElementById('preloader');
        const typeText = document.getElementById('type-text');
        const cursor = document.querySelector('.cursor');

        if (!preloader || !typeText || !cursor) {
            console.warn('Preloader-Elemente nicht gefunden');
            if (preloader) {
                preloader.style.display = 'none';
            }
            return;
        }

        const text = 'MATTHIAS SILBERHAIN';
        let index = 0;
        const typingSpeed = 90;
        const minDisplayTime = 2000;
        const startTime = Date.now();

        function typeWriter() {
            if (index < text.length) {
                typeText.textContent += text.charAt(index);
                index++;
                setTimeout(typeWriter, typingSpeed);
            } else {
                // Text vollständig - Cursor stoppen
                cursor.style.animation = 'none';
                cursor.style.opacity = '0';

                // Mindest-Anzeigezeit berechnen
                const elapsedTime = Date.now() - startTime;
                const remainingTime = Math.max(0, minDisplayTime - elapsedTime);

                // Preloader nach Mindestzeit ausblenden
                setTimeout(function() {
                    preloader.style.opacity = '0';
                    preloader.style.transition = 'opacity 0.6s ease';

                    setTimeout(function() {
                        preloader.style.display = 'none';
                        console.log('Preloader ausgeblendet');
                    }, 600);
                }, remainingTime + 500);
            }
        }

        // Typewriter mit Verzögerung starten
        setTimeout(typeWriter, 500);
    }

    // 2. Mobile Navigation (Burger-Menü)
    function initMobileMenu() {
        const burgerButton = document.getElementById('burger');
        const navigation = document.getElementById('navigation');
        const menuOverlay = document.getElementById('menuOverlay');

        if (!burgerButton || !navigation) {
            console.warn('Burger-Menü Elemente nicht gefunden');
            return;
        }

        let isMenuOpen = false;

        // Funktion zum Öffnen des Menüs
        function openMenu() {
            navigation.classList.add('aktiv');
            burgerButton.classList.add('aktiv');
            if (menuOverlay) {
                menuOverlay.classList.add('active');
            }
            document.body.style.overflow = 'hidden';
            isMenuOpen = true;
            burgerButton.setAttribute('aria-expanded', 'true');
        }

        // Funktion zum Schließen des Menüs
        function closeMenu() {
            navigation.classList.remove('aktiv');
            burgerButton.classList.remove('aktiv');
            if (menuOverlay) {
                menuOverlay.classList.remove('active');
            }
            document.body.style.overflow = '';
            isMenuOpen = false;
            burgerButton.setAttribute('aria-expanded', 'false');
        }

        // Event-Listener für den Burger-Button
        burgerButton.addEventListener('click', function(event) {
            event.stopPropagation();
            if (isMenuOpen) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        // Event-Listener für das Overlay (um das Menü zu schließen)
        if (menuOverlay) {
            menuOverlay.addEventListener('click', closeMenu);
        }

        // Event-Listener für die Navigation-Links (um das Menü zu schließen)
        const navLinks = navigation.querySelectorAll('a');
        navLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                if (isMenuOpen) {
                    closeMenu();
                }
            });
        });

        // Event-Listener für die ESC-Taste
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && isMenuOpen) {
                closeMenu();
            }
        });

        // Event-Listener für das Schließen des Menüs bei Fenster-Resize (wenn zu Desktop)
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768 && isMenuOpen) {
                closeMenu();
            }
        });
    }

    // 3. Footer-Jahr aktualisieren
    function updateFooterYear() {
        const yearElement = document.getElementById('jahr');
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }
    }

    // 4. Smooth Scroll für interne Links
    function initSmoothScroll() {
        const internalLinks = document.querySelectorAll('a[href^="#"]');
        internalLinks.forEach(function(link) {
            link.addEventListener('click', function(event) {
                const targetId = this.getAttribute('href');
                if (targetId !== '#' && targetId.length > 1) {
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        event.preventDefault();
                        const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
                        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                        window.scrollTo({
                            top: targetPosition - headerHeight - 20,
                            behavior: 'smooth'
                        });
                        if (history.pushState) {
                            history.pushState(null, null, targetId);
                        }
                    }
                }
            });
        });
    }

    // 5. Hauptinitialisierung
    function init() {
        initPreloader();
        initMobileMenu();
        updateFooterYear();
        initSmoothScroll();
    }

    // Initialisierung starten
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
