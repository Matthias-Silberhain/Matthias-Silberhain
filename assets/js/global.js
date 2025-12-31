/**
 * global.js - Hauptskript für Mathias Silberhain Website
 * @version 1.0.0
 * @description Mobile Navigation, Funktionalität, Fehlerbehandlung
 */

(function() {
    'use strict';

    // ===== DOM ELEMENTE =====
    const hamburger = document.getElementById('hamburger');
    const nav = document.getElementById('nav');
    const navOverlay = document.getElementById('navOverlay');
    const body = document.body;
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPage = window.location.pathname;

    // ===== MOBILE NAVIGATION =====
    function initNavigation() {
        if (!hamburger || !nav || !navOverlay) {
            console.warn('Navigation-Elemente nicht gefunden.');
            return;
        }

        // Menü umschalten
        function toggleMenu() {
            const isActive = nav.classList.contains('active');
            
            hamburger.classList.toggle('active');
            nav.classList.toggle('active');
            navOverlay.classList.toggle('active');
            body.classList.toggle('no-scroll');
            
            // ARIA-Attribute
            hamburger.setAttribute('aria-expanded', !isActive);
            nav.setAttribute('aria-hidden', isActive);
            
            // Fokus ins Menü setzen, wenn geöffnet
            if (!isActive) {
                setTimeout(() => {
                    const firstLink = nav.querySelector('.nav-link');
                    if (firstLink) firstLink.focus();
                }, 300);
            }
        }

        // Menü schließen
        function closeMenu() {
            hamburger.classList.remove('active');
            nav.classList.remove('active');
            navOverlay.classList.remove('active');
            body.classList.remove('no-scroll');
            hamburger.setAttribute('aria-expanded', 'false');
            nav.setAttribute('aria-hidden', 'true');
        }

        // Event Listeners
        hamburger.addEventListener('click', toggleMenu);
        navOverlay.addEventListener('click', closeMenu);

        // Menü schließen bei Link-Klick (Mobile)
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth < 768) {
                    closeMenu();
                }
            });
        });

        // ESC zum Schließen
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && nav.classList.contains('active')) {
                closeMenu();
            }
        });

        // Aktive Seite markieren
        navLinks.forEach(link => {
            const linkPath = link.getAttribute('href');
            if (currentPage.endsWith(linkPath) || 
                (linkPath === 'index.html' && currentPage.endsWith('/'))) {
                link.classList.add('active');
                link.setAttribute('aria-current', 'page');
            }
        });
    }

    // ===== RESPONSIVE HANDLING =====
    function handleResize() {
        if (window.innerWidth >= 768) {
            // Auf Desktop: Menü immer zurücksetzen
            hamburger?.classList.remove('active');
            nav?.classList.remove('active');
            navOverlay?.classList.remove('active');
            body.classList.remove('no-scroll');
            hamburger?.setAttribute('aria-expanded', 'false');
            nav?.setAttribute('aria-hidden', 'false');
        }
    }

    // ===== FEHLERBEHANDLUNG =====
    function handleErrors() {
        // Bilder ohne alt-Attribut warnen
        document.querySelectorAll('img:not([alt])').forEach(img => {
            console.warn('Bild ohne alt-Attribut:', img.src);
        });

        // Broken Links abfangen
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a');
            if (link && link.getAttribute('href') === '#') {
                e.preventDefault();
                console.warn('Link mit # href wurde blockiert.');
            }
        });

        // Global error handler
        window.addEventListener('error', (e) => {
            console.error('Globaler Fehler:', e.error);
        });
    }

    // ===== INITIALISIERUNG =====
    function init() {
        console.log('🚀 Website initialisiert – Mathias Silberhain');
        
        // Navigation
        initNavigation();
        
        // Fehlerbehandlung
        handleErrors();
        
        // Resize Listener
        window.addEventListener('resize', handleResize);
        
        // Load Event
        window.addEventListener('load', () => {
            document.body.classList.add('loaded');
        });
    }

    // DOM Ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
