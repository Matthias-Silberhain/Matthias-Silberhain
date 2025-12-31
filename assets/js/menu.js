/* ==========================================================================
   MENU.JS - MOBILE NAVIGATION & DARK MODE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function() {
    // ================= ELEMENTE DEFINIEREN =================
    const burger = document.getElementById('burger');
    const navigation = document.getElementById('navigation');
    const menuOverlay = document.getElementById('menuOverlay');
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;
    
    // ================= MOBILE MENÜ FUNKTIONALITÄT =================
    if (burger && navigation) {
        // Menü öffnen/schließen
        burger.addEventListener('click', function(e) {
            e.stopPropagation(); // Verhindert Event-Bubbling
            
            // Burger Animation
            burger.classList.toggle('aktiv');
            
            // Navigation ein-/ausblenden
            navigation.classList.toggle('aktiv');
            
            // Overlay ein-/ausblenden
            if (menuOverlay) {
                menuOverlay.classList.toggle('active');
            }
            
            // Scrollen auf Body verhindern
            if (navigation.classList.contains('aktiv')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        
        // Menü schließen bei Klick auf Overlay
        if (menuOverlay) {
            menuOverlay.addEventListener('click', function() {
                burger.classList.remove('aktiv');
                navigation.classList.remove('aktiv');
                this.classList.remove('active');
                document.body.style.overflow = '';
            });
        }
        
        // Menü schließen bei Klick auf Navigation-Links
        const navLinks = navigation.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                // Kleine Verzögerung für bessere UX
                setTimeout(() => {
                    burger.classList.remove('aktiv');
                    navigation.classList.remove('aktiv');
                    if (menuOverlay) {
                        menuOverlay.classList.remove('active');
                    }
                    document.body.style.overflow = '';
                }, 300);
            });
        });
        
        // Menü schließen bei ESC-Taste
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navigation.classList.contains('aktiv')) {
                burger.classList.remove('aktiv');
                navigation.classList.remove('aktiv');
                if (menuOverlay) {
                    menuOverlay.classList.remove('active');
                }
                document.body.style.overflow = '';
            }
        });
        
        // Menü schließen bei Fenster-Resize (wenn zu Desktop gewechselt)
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                burger.classList.remove('aktiv');
                navigation.classList.remove('aktiv');
                if (menuOverlay) {
                    menuOverlay.classList.remove('active');
                }
                document.body.style.overflow = '';
            }
        });
    }
    
    // ================= DARK MODE FUNKTIONALITÄT =================
    if (darkModeToggle) {
        // Theme aus LocalStorage oder Systemeinstellung lesen
        function getCurrentTheme() {
            const savedTheme = localStorage.getItem('ms-theme');
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            
            return savedTheme || (prefersDark ? 'dark' : 'light');
        }
        
        // Theme anwenden
        function applyTheme(theme) {
            if (theme === 'dark') {
                body.classList.add('dark-mode');
                document.documentElement.classList.add('dark-mode');
            } else {
                body.classList.remove('dark-mode');
                document.documentElement.classList.remove('dark-mode');
            }
            
            // In LocalStorage speichern
            try {
                localStorage.setItem('ms-theme', theme);
            } catch (e) {
                console.warn('LocalStorage nicht verfügbar:', e);
            }
        }
        
        // Initiales Theme setzen
        const currentTheme = getCurrentTheme();
        applyTheme(currentTheme);
        
        // Dark Mode Toggle Event
        darkModeToggle.addEventListener('click', function() {
            const isDarkMode = body.classList.contains('dark-mode');
            
            if (isDarkMode) {
                // Zu Light Mode wechseln
                applyTheme('light');
            } else {
                // Zu Dark Mode wechseln
                applyTheme('dark');
            }
            
            // Button Focus für Accessibility
            this.blur();
        });
        
        // System Theme Änderungen überwachen
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        mediaQuery.addEventListener('change', function(e) {
            // Nur anwenden wenn kein manuelles Theme gesetzt ist
            if (!localStorage.getItem('ms-theme')) {
                applyTheme(e.matches ? 'dark' : 'light');
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
                (currentPage === '' && linkHref === 'index.html') ||
                (linkHref === 'index.html' && currentPage === '')) {
                link.classList.add('active');
            }
        });
    }
    
    // Initial setzen
    setActiveLink();
    
    // ================= COPYRIGHT JAHR =================
    function setCopyrightYear() {
        const yearElement = document.getElementById('jahr');
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }
    }
    
    setCopyrightYear();
    
    // ================= PRELOADER FUNKTIONALITÄT =================
    function handlePreloader() {
        const preloader = document.getElementById('preloader');
        const typeTextElement = document.getElementById('type-text');
        
        if (preloader && typeTextElement) {
            const text = "MATTHIAS SILBERHAIN";
            let index = 0;
            
            // Typing Animation
            function typeWriter() {
                if (index < text.length) {
                    typeTextElement.textContent += text.charAt(index);
                    index++;
                    setTimeout(typeWriter, 80);
                } else {
                    // Preloader nach Typing-Animation ausblenden
                    setTimeout(() => {
                        preloader.classList.add('hidden');
                        
                        // Preloader nach Animation komplett entfernen
                        setTimeout(() => {
                            preloader.style.display = 'none';
                        }, 600);
                    }, 500);
                }
            }
            
            // Starte Typing Animation
            setTimeout(typeWriter, 300);
        } else if (preloader) {
            // Fallback: Einfaches Ausblenden
            setTimeout(() => {
                preloader.classList.add('hidden');
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 600);
            }, 1500);
        }
    }
    
    // Preloader starten
    handlePreloader();
    
    // ================= SMOOTH SCROLL FÜR ANKER-LINKS =================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Nur wenn es ein echter Anker ist (nicht # alleine)
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    // Mobile Menü schließen falls offen
                    if (burger && burger.classList.contains('aktiv')) {
                        burger.classList.remove('aktiv');
                        navigation.classList.remove('aktiv');
                        if (menuOverlay) {
                            menuOverlay.classList.remove('active');
                        }
                        document.body.style.overflow = '';
                    }
                    
                    // Smooth Scroll
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // ================= ERROR HANDLING & FALLBACKS =================
    console.log('✅ menu.js erfolgreich geladen');
    
    // Fallback für fehlende Elemente
    if (!burger) console.warn('⚠️ Burger button nicht gefunden');
    if (!navigation) console.warn('⚠️ Navigation nicht gefunden');
    if (!darkModeToggle) console.warn('⚠️ Dark Mode Toggle nicht gefunden');
    
    // ================= EXPORT FÜR EVENTUELLE NUTZUNG =================
    window.MenuManager = {
        toggleMenu: function() {
            if (burger && navigation) {
                burger.click();
            }
        },
        toggleDarkMode: function() {
            if (darkModeToggle) {
                darkModeToggle.click();
            }
        },
        isMenuOpen: function() {
            return burger ? burger.classList.contains('aktiv') : false;
        },
        isDarkMode: function() {
            return body.classList.contains('dark-mode');
        }
    };
});

// ================= SERVICE WORKER FÜR OFFLINE FÄHIGKEIT (OPTIONAL) =================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js').then(function(registration) {
            console.log('✅ ServiceWorker registriert mit Scope:', registration.scope);
        }).catch(function(err) {
            console.log('⚠️ ServiceWorker Registrierung fehlgeschlagen:', err);
        });
    });
}

// ================= PERFORMANCE OPTIMIERUNGEN =================
// Lazy Loading für Bilder (falls verwendet)
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback für ältere Browser
        images.forEach(img => {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        });
    }
});

// ================= TOUCH DEVICE OPTIMIERUNGEN =================
// Verhindert Doppel-Tap-Zoom auf iOS
let lastTouchEnd = 0;
document.addEventListener('touchend', function(event) {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, false);

// ================= KEYBOARD NAVIGATION =================
// Verbesserte Tastatur-Navigation
document.addEventListener('keydown', function(e) {
    // Tab durch Navigation mit Pfeiltasten
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        const focusableElements = document.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const currentIndex = Array.from(focusableElements).indexOf(document.activeElement);
        
        if (currentIndex !== -1) {
            let nextIndex;
            if (e.key === 'ArrowRight') {
                nextIndex = (currentIndex + 1) % focusableElements.length;
            } else {
                nextIndex = (currentIndex - 1 + focusableElements.length) % focusableElements.length;
            }
            
            focusableElements[nextIndex].focus();
            e.preventDefault();
        }
    }
});
