/**
 * GLOBAL FUNKTIONEN - Matthias Silberhain Website
 * Version 3.1 - Vollständig korrigierte Preloader-Logik mit sichtbarem Inhalt
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('🌐 Global.js geladen - Starte Initialisierung');
    
    // ================= VARIABLEN =================
    const preloader = document.getElementById('preloader');
    const typeTextElement = document.getElementById('type-text');
    const preloaderLine = document.getElementById('preloaderLine');
    const body = document.body;
    
    // ================= INITIALE VORBEREITUNG =================
    // Verstecke NUR die Inhaltselemente die animiert werden sollen
    // NICHT den Header oder Menü-Elemente!
    console.log('Bereite Seite vor...');
    
    // ================= PRELOADER LOGIK =================
    if (preloader) {
        console.log('Preloader gefunden - Starte Animation');
        
        // Stelle sicher dass Preloader sichtbar ist
        preloader.style.display = 'flex';
        preloader.style.opacity = '1';
        preloader.style.visibility = 'visible';
        preloader.classList.remove('loaded');
        
        // Verstecke nur bestimmte Inhaltselemente für die Animation
        const contentElements = document.querySelectorAll('.inhalt, .social-section, .footer');
        contentElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });
        
        // Typewriter starten
        if (typeTextElement) {
            console.log('Starte Typewriter-Effekt...');
            const text = "MATTHIAS SILBERHAIN";
            let index = 0;
            const typingSpeed = 80; // ms pro Buchstabe
            
            // Lösche vorhandenen Text
            typeTextElement.textContent = '';
            
            function typeWriter() {
                if (index < text.length) {
                    typeTextElement.textContent += text.charAt(index);
                    index++;
                    setTimeout(typeWriter, typingSpeed);
                } else {
                    console.log('Typewriter fertig - Starte silberne Line');
                    // Verzögerung vor Line-Animation
                    setTimeout(startSilverLine, 500);
                }
            }
            
            // Starte Typewriter nach kurzer Verzögerung
            setTimeout(() => {
                typeWriter();
            }, 300);
        } else {
            console.log('Kein Typewriter-Element - Starte direkt Line');
            setTimeout(startSilverLine, 1000);
        }
    } else {
        console.log('Kein Preloader - Mache Inhalt sofort sichtbar');
        makeContentVisible();
    }
    
    // ================= SILBERNE LINE FUNKTION =================
    function startSilverLine() {
        console.log('Starte silberne Line Animation...');
        
        if (preloaderLine) {
            console.log('Preloader Line gefunden, aktiviere Animation');
            preloaderLine.classList.add('active');
            
            // Nach der Line-Animation Preloader ausblenden
            setTimeout(() => {
                console.log('Line Animation fertig - Blende Preloader aus');
                hidePreloader();
            }, 2500); // Dauer der Line-Animation
        } else {
            console.warn('Preloader Line nicht gefunden - Überspringe');
            setTimeout(hidePreloader, 2000);
        }
    }
    
    // ================= PRELOADER AUSBLENDEN =================
    function hidePreloader() {
        console.log('Verstecke Preloader...');
        
        // 1. Preloader ausblenden
        preloader.classList.add('loaded');
        body.classList.add('loaded');
        
        // 2. Nach Fade-Animation Preloader komplett verstecken
        setTimeout(() => {
            preloader.style.display = 'none';
            console.log('Preloader komplett versteckt');
            
            // 3. Inhalt sichtbar machen
            makeContentVisible();
        }, 600);
    }
    
    // ================= INHALT SICHTBAR MACHEN - KORRIGIERT =================
    function makeContentVisible() {
        console.log('🚀 Mache Inhalt sichtbar...');
        
        // 1. Wichtig: Setze loaded-Klasse auf body für CSS-Transitions
        document.body.classList.add('loaded');
        
        // 2. Zeige alle Inhaltselemente mit Verzögerungen für schönes Fade-In
        const elements = [
            { selector: '.inhalt', delay: 200 },
            { selector: '.social-section', delay: 400 },
            { selector: '.footer', delay: 600 }
        ];
        
        elements.forEach(item => {
            setTimeout(() => {
                const element = document.querySelector(item.selector);
                if (element) {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                    element.style.transition = `opacity 0.6s ease, transform 0.6s ease`;
                    console.log(`✅ ${item.selector} sichtbar gemacht`);
                }
            }, item.delay);
        });
        
        // 3. Debug-Ausgabe
        setTimeout(() => {
            const hiddenElements = document.querySelectorAll('.inhalt[style*="opacity: 0"], .social-section[style*="opacity: 0"], .footer[style*="opacity: 0"]');
            if (hiddenElements.length > 0) {
                console.warn(`⚠️ Noch ${hiddenElements.length} Elemente versteckt`);
                
                // Notfall: Force sichtbar machen
                hiddenElements.forEach(el => {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                });
            } else {
                console.log('🎉 Alle Inhaltselemente sind sichtbar!');
            }
        }, 1000);
    }
    
    // ================= SICHERHEITS-TIMEOUT =================
    setTimeout(() => {
        if (preloader && !preloader.classList.contains('loaded')) {
            console.warn('Sicherheits-Timeout: Erzwinge Preloader-Ausblendung');
            if (preloader) {
                preloader.classList.add('loaded');
                setTimeout(() => {
                    preloader.style.display = 'none';
                    makeContentVisible();
                }, 600);
            }
        }
    }, 8000);
    
    // ================= AKTUELLES JAHR IM FOOTER =================
    const currentYearElement = document.getElementById('currentYear');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
    
    // ================= SCROLL EVENT FÜR MENÜ-HINTERGRUND =================
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 50) {
            document.body.classList.add('scrolled');
        } else {
            document.body.classList.remove('scrolled');
        }
    });
    
    // ================= SMOOTH SCROLLING =================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href !== '#' && href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    // Schließe Mobile Menu wenn offen
                    const burger = document.getElementById('burgerButton');
                    const nav = document.getElementById('mainNav');
                    const overlay = document.querySelector('.menu-overlay');
                    
                    if (burger && nav && burger.classList.contains('aktiv')) {
                        burger.classList.remove('aktiv');
                        nav.classList.remove('aktiv');
                        if (overlay) overlay.classList.remove('active');
                        document.body.classList.remove('menu-open');
                    }
                    
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // ================= ACTIVE NAV LINK HIGHLIGHT =================
    function highlightActiveNavLink() {
        const navLinks = document.querySelectorAll('.hauptnavigation a');
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const linkHref = link.getAttribute('href');
            
            if (linkHref === currentPage || 
                (currentPage === 'index.html' && linkHref === 'index.html')) {
                link.classList.add('active');
            }
        });
    }
    
    highlightActiveNavLink();
    window.addEventListener('hashchange', highlightActiveNavLink);
    
    // ================= LAZY LOADING =================
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    imageObserver.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // ================= WINDOW RESIZE HANDLER =================
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            if (window.innerWidth > 768) {
                const burger = document.getElementById('burgerButton');
                const nav = document.getElementById('mainNav');
                const overlay = document.querySelector('.menu-overlay');
                
                if (burger && nav && burger.classList.contains('aktiv')) {
                    burger.classList.remove('aktiv');
                    nav.classList.remove('aktiv');
                    if (overlay) overlay.classList.remove('active');
                    document.body.classList.remove('menu-open');
                }
            }
        }, 250);
    });
    
    console.log('✅ Global.js erfolgreich initialisiert');
});

// ================= GLOBAL FUNKTIONEN =================
function debugPage() {
    console.log('=== DEBUG INFORMATION ===');
    console.log('Preloader:', document.getElementById('preloader') ? 'Gefunden' : 'Nicht gefunden');
    console.log('Inhalt:', document.querySelector('.inhalt') ? 'Gefunden' : 'Nicht gefunden');
    console.log('Body Klassen:', document.body.className);
    console.log('Preloader Klassen:', document.getElementById('preloader')?.className || 'N/A');
    
    // Zeige alle Elemente die noch versteckt sind
    const hiddenElements = document.querySelectorAll('[style*="opacity: 0"], [style*="transform: translateY(20px)"]');
    console.log('Versteckte Elemente:', hiddenElements.length);
    hiddenElements.forEach(el => console.log(' - ', el.className || el.tagName));
}

// Für manuelles Debugging in der Konsole: debugPage() aufrufen
