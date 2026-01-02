/**
 * GLOBAL FUNKTIONEN - Matthias Silberhain Website
 * Version 3.2 - Ultra-schneller Preloader mit parallelen Animationen
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Global.js geladen - Starte optimierte Initialisierung');
    
    // ================= VARIABLEN =================
    const preloader = document.getElementById('preloader');
    const typeTextElement = document.getElementById('type-text');
    const preloaderLine = document.getElementById('preloaderLine');
    const body = document.body;
    
    // ================= INITIALE VORBEREITUNG =================
    console.log('📱 Gerät erkannt:', isMobile() ? 'Mobile' : 'Desktop');
    
    // Verstecke nur die Inhaltselemente für die Animation
    const contentElements = document.querySelectorAll('.inhalt, .social-section, .footer');
    contentElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // ================= PRELOADER LOGIK =================
    if (preloader) {
        console.log('⚡ Starte ultra-schnellen Preloader');
        
        // Stelle sicher dass Preloader sichtbar ist
        preloader.style.display = 'flex';
        preloader.style.opacity = '1';
        preloader.style.visibility = 'visible';
        preloader.classList.remove('loaded');
        
        // Starte Typewriter und Line GLEICHZEITIG
        setTimeout(() => {
            // Starte beide Animationen parallel
            const typewriterPromise = startTypewriter();
            const linePromise = startSilverLine();
            
            // Warte bis BEIDE Animationen fertig sind
            Promise.all([typewriterPromise, linePromise])
                .then(() => {
                    console.log('✅ Beide Animationen fertig - Zeige Seite');
                    hidePreloader();
                })
                .catch(error => {
                    console.warn('⚠️ Animationen fehlgeschlagen:', error);
                    // Fallback: Trotzdem Seite zeigen
                    setTimeout(hidePreloader, 1500);
                });
        }, 300); // Kurze Startverzögerung
    } else {
        console.log('Kein Preloader - Mache Inhalt sofort sichtbar');
        makeContentVisible();
    }
    
    // ================= TYPEWRITER FUNKTION (mit Promise) =================
    function startTypewriter() {
        return new Promise((resolve) => {
            if (!typeTextElement) {
                console.log('Kein Typewriter-Element - überspringe');
                resolve();
                return;
            }
            
            console.log('⌨️ Starte Typewriter...');
            const text = "MATTHIAS SILBERHAIN";
            let index = 0;
            const typingSpeed = isMobile() ? 60 : 70; // Schneller auf Mobile
            
            // Lösche vorhandenen Text
            typeTextElement.textContent = '';
            
            function typeWriter() {
                if (index < text.length) {
                    typeTextElement.textContent += text.charAt(index);
                    index++;
                    
                    // Starte silberne Line, wenn Typewriter halb fertig ist
                    if (index === Math.floor(text.length / 2)) {
                        console.log('🔸 Typewriter halb fertig - starte Line');
                        startSilverLine(); // Starte Line früher!
                    }
                    
                    setTimeout(typeWriter, typingSpeed);
                } else {
                    console.log('✅ Typewriter fertig');
                    resolve();
                }
            }
            
            // Sofort starten
            typeWriter();
        });
    }
    
    // ================= SILBERNE LINE FUNKTION (mit Promise) =================
    function startSilverLine() {
        return new Promise((resolve) => {
            if (!preloaderLine) {
                console.warn('⚠️ Keine Preloader Line - überspringe');
                resolve();
                return;
            }
            
            // Prüfe ob Line bereits aktiv ist (falls schon durch Typewriter gestartet)
            if (preloaderLine.classList.contains('active')) {
                console.log('🔸 Line bereits aktiv - warte auf Fertigstellung');
                // Warte auf die Animation
                setTimeout(resolve, 2000);
                return;
            }
            
            console.log('⚡ Starte silberne Line...');
            preloaderLine.classList.add('active');
            
            // Line-Animation dauert 2 Sekunden
            setTimeout(() => {
                console.log('✅ Line Animation fertig');
                resolve();
            }, 2000);
        });
    }
    
    // ================= PRELOADER AUSBLENDEN =================
    function hidePreloader() {
        console.log('🎬 Blende Preloader aus...');
        
        // Sofort: Preloader ausblenden
        preloader.classList.add('loaded');
        body.classList.add('loaded');
        
        // Sehr kurze Verzögerung, dann komplett verstecken
        setTimeout(() => {
            preloader.style.display = 'none';
            console.log('✅ Preloader versteckt');
            
            // Inhalt SOFORT sichtbar machen
            makeContentVisible();
        }, 300); // Sehr kurz für flüssigen Übergang
    }
    
    // ================= INHALT SICHTBAR MACHEN - OPTIMIERT =================
    function makeContentVisible() {
        console.log('🌟 Mache Inhalt sichtbar...');
        
        // Alle Inhaltselemente SOFORT sichtbar machen
        contentElements.forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        });
        
        // Entferne Scroll-Sperre
        body.style.overflow = 'auto';
        body.style.position = 'static';
        
        console.log('✅ Inhalt sichtbar gemacht');
    }
    
    // ================= MOBILE DETECTION =================
    function isMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }
    
    // ================= SICHERHEITS-TIMEOUT (SEHR KURZ) =================
    setTimeout(() => {
        if (preloader && !preloader.classList.contains('loaded')) {
            console.warn('⏰ Sicherheits-Timeout: Erzwinge Seitenanzeige');
            if (preloader) {
                preloader.classList.add('loaded');
                setTimeout(() => {
                    preloader.style.display = 'none';
                    makeContentVisible();
                }, 300);
            }
        }
    }, 4000); // Nur 4 Sekunden Timeout für schnelle Seite
    
    // ================= AKTUELLES JAHR IM FOOTER =================
    const currentYearElement = document.getElementById('currentYear');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
    
    // ================= SCROLL EVENT FÜR MENÜ-HINTERGRUND =================
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            if (window.pageYOffset > 50) {
                document.body.classList.add('scrolled');
            } else {
                document.body.classList.remove('scrolled');
            }
        }, 10);
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
                        top: targetElement.offsetTop - 80,
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
    
    console.log('✅ Global.js erfolgreich initialisiert');
});

// ================= GLOBALE HELFER FUNKTIONEN =================
function debugForceShowContent() {
    console.log('🔧 DEBUG: Erzwinge Inhaltsanzeige');
    document.body.classList.add('loaded');
    document.querySelectorAll('.inhalt, .social-section, .footer').forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
    });
    const preloader = document.getElementById('preloader');
    if (preloader) preloader.style.display = 'none';
}
