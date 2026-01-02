/**
 * GLOBAL FUNKTIONEN - Matthias Silberhain Website
 * Zentrale Funktionen für alle Seiten
 * Version 3.0 - Komplett überarbeitet mit korrigiertem Preloader
 */

// Mobile Device Detection
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

// Optimierung für mobile Geräte
if (isMobile) {
    document.documentElement.classList.add('mobile-device');
}
if (isIOS) {
    document.documentElement.classList.add('ios-device');
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('🌐 Global.js geladen - Matthias Silberhain');
    
    // ================= VARIABLEN =================
    const preloader = document.getElementById('preloader');
    const typeTextElement = document.getElementById('type-text');
    const preloaderLine = document.getElementById('preloaderLine');
    const body = document.body;
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // ================= INITIALER ZUSTAND =================
    // Stelle sicher dass der Inhalt initial versteckt ist
    const contentElements = document.querySelectorAll('.inhalt, .social-section, .footer');
    contentElements.forEach(el => {
        if (el) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
        }
    });
    
    // Logo auch verstecken
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.style.opacity = '0';
        logo.style.transform = 'translateY(20px)';
    }
    
    // ================= PRELOADER ANIMATION =================
    if (preloader) {
        console.log('Preloader gefunden, starte Animation...');
        
        // Preloader sichtbar machen
        preloader.style.display = 'flex';
        preloader.style.opacity = '1';
        preloader.style.visibility = 'visible';
        
        // 1. Typewriter starten
        if (typeTextElement) {
            console.log('Starte Typewriter...');
            const text = "MATTHIAS SILBERHAIN";
            let index = 0;
            const typingSpeed = 80; // ms pro Buchstabe
            
            // Typewriter Funktion
            function typeWriter() {
                if (index < text.length) {
                    typeTextElement.textContent += text.charAt(index);
                    index++;
                    setTimeout(typeWriter, typingSpeed);
                } else {
                    // Typewriter fertig - silberne Line starten
                    console.log('Typewriter fertig, starte silberne Line...');
                    startSilverLine();
                }
            }
            
            // Starte Typewriter nach kurzer Verzögerung
            setTimeout(() => {
                typeTextElement.textContent = ''; // Clear
                typeWriter();
            }, 500);
        } else {
            // Kein Typewriter - direkt Line starten
            console.log('Kein Typewriter, starte direkt silberne Line...');
            setTimeout(startSilverLine, 1000);
        }
        
        // SILBERNE LINE FUNKTION
        function startSilverLine() {
            console.log('Starte silberne Line Animation...');
            
            if (preloaderLine) {
                console.log('Preloader Line gefunden, aktiviere...');
                preloaderLine.classList.add('active');
                
                // Nach der Line-Animation Preloader ausblenden
                setTimeout(() => {
                    console.log('Blende Preloader aus...');
                    hidePreloader();
                }, 2500); // Dauer der Line-Animation
            } else {
                console.warn('Preloader Line nicht gefunden!');
                // Fallback ohne Line
                setTimeout(() => {
                    hidePreloader();
                }, 2000);
            }
        }
        
        // PRELOADER AUSBLENDEN FUNKTION
        function hidePreloader() {
            console.log('Verstecke Preloader...');
            
            // 1. Preloader ausblenden
            preloader.classList.add('loaded');
            body.classList.add('loaded');
            
            // 2. Nach Fade-Out Preloader komplett entfernen
            setTimeout(() => {
                preloader.style.display = 'none';
                console.log('Preloader komplett versteckt');
                
                // 3. Inhalt sichtbar machen
                makeContentVisible();
            }, 600);
        }
    } else {
        console.log('Kein Preloader gefunden, mache Inhalt sofort sichtbar');
        body.classList.add('loaded');
        makeContentVisible();
    }
    
    // INHALT SICHTBAR MACHEN FUNKTION
    function makeContentVisible() {
        console.log('Mache Inhalt sichtbar...');
        
        // Logo sichtbar machen
        const logo = document.querySelector('.logo');
        if (logo) {
            setTimeout(() => {
                logo.style.opacity = '1';
                logo.style.transform = 'translateY(0)';
                logo.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            }, 200);
        }
        
        // Hauptinhalt sichtbar machen
        const mainContent = document.querySelector('.inhalt');
        if (mainContent) {
            setTimeout(() => {
                mainContent.style.opacity = '1';
                mainContent.style.transform = 'translateY(0)';
                mainContent.style.transition = 'opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s';
            }, 400);
        }
        
        // Social Section sichtbar machen
        const socialSection = document.querySelector('.social-section');
        if (socialSection) {
            setTimeout(() => {
                socialSection.style.opacity = '1';
                socialSection.style.transform = 'translateY(0)';
                socialSection.style.transition = 'opacity 0.6s ease 0.4s, transform 0.6s ease 0.4s';
            }, 600);
        }
        
        // Footer sichtbar machen
        const footer = document.querySelector('.footer');
        if (footer) {
            setTimeout(() => {
                footer.style.opacity = '1';
                footer.style.transform = 'translateY(0)';
                footer.style.transition = 'opacity 0.6s ease 0.6s, transform 0.6s ease 0.6s';
            }, 800);
        }
        
        console.log('Inhalt sichtbar gemacht');
    }
    
    // SICHERHEITS-TIMEOUT (max. 8 Sekunden)
    setTimeout(() => {
        const preloader = document.getElementById('preloader');
        if (preloader && !preloader.classList.contains('loaded')) {
            console.warn('Sicherheits-Timeout: Erzwinge Preloader-Ausblendung');
            if (preloader) {
                preloader.classList.add('loaded');
                body.classList.add('loaded');
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
    
    // ================= ERROR HANDLING =================
    window.addEventListener('error', function(e) {
        console.error('JavaScript Fehler:', e.message, 'in', e.filename, 'Zeile:', e.lineno);
    });
    
    console.log(`✅ Global.js initialisiert für: ${currentPage}`);
});
