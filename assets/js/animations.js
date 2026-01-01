// assets/js/animations.js
// Vereinfachte Silber-Animationen für Matthias Silberhain

// GSAP Plugins registrieren
if (typeof gsap !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

// Warten bis DOM vollständig geladen ist
document.addEventListener('DOMContentLoaded', function() {
    console.log('Silber-Animationen werden geladen...');
    
    // Preloader Animation
    initSimplePreloader();
    
    // Navigation Effects
    initNavigation();
    
    // Button Animations
    initButtons();
    
    // Scroll Animations
    initScrollAnimations();
    
    // Social Media Effects
    initSocialMedia();
    
    // Footer Jahr aktualisieren
    updateFooterYear();
});

// ==================== 1. EINFACHER PRELOADER ====================
function initSimplePreloader() {
    const preloader = document.getElementById('preloader');
    const typeText = document.getElementById('type-text');
    
    if (!preloader || !typeText) {
        console.warn('Preloader Elemente nicht gefunden');
        // Wenn kein Preloader, direkt Content anzeigen
        setTimeout(() => {
            if (typeof gsap !== 'undefined') {
                gsap.from('main', {
                    duration: 1,
                    opacity: 0,
                    ease: "power3.out"
                });
            }
        }, 100);
        return;
    }
    
    // Text sofort setzen
    typeText.textContent = "MATTHIAS SILBERHAIN";
    
    // Preloader anzeigen
    gsap.set(preloader, { 
        display: 'flex', 
        opacity: 1 
    });
    
    // Text erscheinen lassen
    gsap.from(typeText, {
        duration: 1.5,
        opacity: 0,
        y: 30,
        scale: 0.8,
        ease: "back.out(1.7)"
    });
    
    // Text leuchten lassen
    gsap.to(typeText, {
        duration: 1.5,
        textShadow: "0 0 25px rgba(192, 192, 192, 0.8)",
        repeat: 2,
        yoyo: true,
        ease: "sine.inOut"
    });
    
    // Logo Animation (falls vorhanden)
    const logo = document.querySelector('.preloader-logo');
    if (logo) {
        gsap.from(logo, {
            duration: 1.5,
            opacity: 0,
            scale: 0.5,
            rotate: -180,
            ease: "back.out(1.7)",
            delay: 0.2
        });
        
        gsap.to(logo, {
            duration: 2,
            scale: 1.1,
            filter: "drop-shadow(0 0 20px rgba(192, 192, 192, 0.7))",
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: 1
        });
    }
    
    // Preloader nach 3.5 Sekunden entfernen
    setTimeout(() => {
        removePreloader();
    }, 3500);
    
    function removePreloader() {
        gsap.to(preloader, {
            duration: 0.8,
            opacity: 0,
            ease: "power2.inOut",
            onComplete: () => {
                preloader.style.display = 'none';
                
                // Content erscheinen lassen
                if (typeof gsap !== 'undefined') {
                    gsap.from('main', {
                        duration: 1,
                        opacity: 0,
                        y: 20,
                        ease: "power3.out"
                    });
                    
                    // Header erscheinen lassen
                    gsap.from('header', {
                        duration: 0.8,
                        opacity: 0,
                        y: -10,
                        ease: "power2.out",
                        delay: 0.2
                    });
                }
            }
        });
    }
}

// ==================== 2. NAVIGATION ANIMATIONEN ====================
function initNavigation() {
    const navLinks = document.querySelectorAll('.hauptnavigation a');
    
    if (!navLinks.length) return;
    
    navLinks.forEach(link => {
        // Hover Effekt
        link.addEventListener('mouseenter', (e) => {
            gsap.to(e.target, {
                duration: 0.3,
                color: '#c0c0c0',
                textShadow: '0 0 10px rgba(192, 192, 192, 0.5)',
                ease: "power2.out"
            });
        });
        
        link.addEventListener('mouseleave', (e) => {
            if (!e.target.classList.contains('active')) {
                gsap.to(e.target, {
                    duration: 0.3,
                    color: '#ffffff',
                    textShadow: 'none',
                    ease: "power2.in"
                });
            }
        });
    });
}

// ==================== 3. BUTTON ANIMATIONEN ====================
function initButtons() {
    const buttons = document.querySelectorAll('.silber-button');
    
    if (!buttons.length) return;
    
    buttons.forEach(button => {
        // Hover Animation
        button.addEventListener('mouseenter', (e) => {
            const target = e.currentTarget;
            
            gsap.to(target, {
                duration: 0.3,
                scale: 1.05,
                boxShadow: '0 8px 20px rgba(192, 192, 192, 0.3)',
                borderColor: '#f0f0f0',
                ease: "power2.out"
            });
            
            // Pfeil Animation
            const arrow = target.querySelector('.button-arrow');
            if (arrow) {
                gsap.to(arrow, {
                    duration: 0.3,
                    x: 5,
                    ease: "power2.out"
                });
            }
        });
        
        button.addEventListener('mouseleave', (e) => {
            const target = e.currentTarget;
            
            gsap.to(target, {
                duration: 0.3,
                scale: 1,
                boxShadow: 'none',
                borderColor: '#c0c0c0',
                ease: "power2.in"
            });
            
            const arrow = target.querySelector('.button-arrow');
            if (arrow) {
                gsap.to(arrow, {
                    duration: 0.3,
                    x: 0,
                    ease: "power2.in"
                });
            }
        });
    });
}

// ==================== 4. SCROLL ANIMATIONEN ====================
function initScrollAnimations() {
    // Nur ausführen wenn GSAP geladen ist
    if (typeof ScrollTrigger === 'undefined') return;
    
    // Credo Text Animation
    const credoText = document.querySelector('.kalligrafie-text');
    if (credoText) {
        gsap.from(credoText, {
            scrollTrigger: {
                trigger: credoText,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            duration: 1,
            opacity: 0,
            y: 30,
            ease: "power3.out"
        });
    }
    
    // Text Absätze animieren
    const paragraphs = document.querySelectorAll('.kerninhalt p');
    paragraphs.forEach((paragraph, i) => {
        gsap.from(paragraph, {
            scrollTrigger: {
                trigger: paragraph,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            duration: 0.8,
            opacity: 0,
            y: 20,
            ease: "power2.out",
            delay: i * 0.05
        });
    });
}

// ==================== 5. SOCIAL MEDIA EFFECTS ====================
function initSocialMedia() {
    const socialLinks = document.querySelectorAll('.social-link');
    
    if (!socialLinks.length) return;
    
    socialLinks.forEach((link, index) => {
        gsap.from(link, {
            scrollTrigger: {
                trigger: '.social-section',
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            duration: 0.6,
            opacity: 0,
            y: 15,
            scale: 0.9,
            delay: index * 0.05,
            ease: "power2.out"
        });
        
        // Hover Animation
        link.addEventListener('mouseenter', (e) => {
            const target = e.currentTarget;
            const icon = target.querySelector('.social-icon-wrapper');
            
            if (icon) {
                gsap.to(icon, {
                    duration: 0.3,
                    scale: 1.1,
                    filter: 'drop-shadow(0 0 10px rgba(192, 192, 192, 0.4))',
                    ease: "power2.out"
                });
            }
        });
        
        link.addEventListener('mouseleave', (e) => {
            const target = e.currentTarget;
            const icon = target.querySelector('.social-icon-wrapper');
            
            if (icon) {
                gsap.to(icon, {
                    duration: 0.3,
                    scale: 1,
                    filter: 'drop-shadow(0 0 0px rgba(192, 192, 192, 0))',
                    ease: "power2.in"
                });
            }
        });
    });
}

// ==================== 6. HILFSFUNKTIONEN ====================
function updateFooterYear() {
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// ==================== 7. ERROR HANDLING ====================
if (typeof gsap === 'undefined') {
    console.warn('GSAP ist nicht geladen. Verwende vereinfachte Animationen.');
    
    // Fallback: Einfache Preloader-Entfernung
    document.addEventListener('DOMContentLoaded', function() {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            // Text setzen
            const typeText = document.getElementById('type-text');
            if (typeText) {
                typeText.textContent = "MATTHIAS SILBERHAIN";
            }
            
            // Preloader nach 3 Sekunden ausblenden
            setTimeout(() => {
                preloader.style.opacity = '0';
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 1000);
            }, 3000);
        }
        
        // Footer Jahr aktualisieren
        updateFooterYear();
    });
} else {
    console.log('GSAP erfolgreich geladen. Animationen aktiv.');
}
