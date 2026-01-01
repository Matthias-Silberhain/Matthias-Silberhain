// assets/js/animations.js
// Extravagante Silber-Animationen für Matthias Silberhain

// GSAP Plugins registrieren
if (typeof gsap !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger, TextPlugin);
}

// Warten bis DOM vollständig geladen ist
document.addEventListener('DOMContentLoaded', function() {
    console.log('Silber-Animationen werden geladen...');
    
    // Preloader Animation
    initPreloader();
    
    // Navigation Effects
    initNavigation();
    
    // Button Animations
    initButtons();
    
    // Scroll Animations
    initScrollAnimations();
    
    // Social Media Effects
    initSocialMedia();
    
    // Special Effects
    initSilberEffects();
    
    // Footer Jahr aktualisieren
    updateFooterYear();
});

// ==================== 1. SPEKTAKULÄRER SILBER-PRELOADER ====================
function initPreloader() {
    const preloader = document.getElementById('preloader');
    const typeText = document.getElementById('type-text');
    const logo = document.querySelector('.preloader-logo');
    
    if (!preloader || !typeText) {
        console.warn('Preloader Elemente nicht gefunden');
        // Wenn kein Preloader, direkt Content anzeigen
        setTimeout(() => {
            if (typeof gsap !== 'undefined') {
                gsap.from('main', {
                    duration: 1.2,
                    opacity: 0,
                    y: 30,
                    ease: "power3.out"
                });
            }
        }, 500);
        return;
    }
    
    // Preloader sofort anzeigen
    gsap.set(preloader, { display: 'flex', opacity: 1 });
    
    // Silberne Partikel erstellen
    createSilberParticles(preloader);
    
    // Texte für Preloader
    const texts = [
        "MATTHIAS SILBERHAIN",
        "AUTOR & DENKER",
        "WILLKOMMEN"
    ];
    
    // Logo Animation
    if (logo) {
        // Logo zunächst verstecken
        gsap.set(logo, { 
            opacity: 0,
            scale: 0.8,
            filter: "drop-shadow(0 0 0px rgba(192, 192, 192, 0))"
        });
        
        // Logo erscheinen lassen
        gsap.to(logo, {
            duration: 1.5,
            opacity: 1,
            scale: 1,
            filter: "drop-shadow(0 0 20px rgba(192, 192, 192, 0.7))",
            ease: "back.out(1.7)"
        });
        
        // Pulsierender Glow-Effekt
        gsap.to(logo, {
            duration: 2,
            scale: 1.05,
            filter: "drop-shadow(0 0 30px rgba(192, 192, 192, 0.9))",
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: 1
        });
    }
    
    // Text-Animation (Text-Wechsel mit Fade)
    let currentText = 0;
    const textDuration = 1800; // Dauer pro Text in ms
    
    function showNextText() {
        if (currentText >= texts.length) {
            // Alle Texte durch, Preloader entfernen
            removePreloader();
            return;
        }
        
        // Text setzen
        typeText.textContent = texts[currentText];
        
        // Text erscheinen lassen
        gsap.fromTo(typeText, 
            { 
                opacity: 0, 
                y: 20, 
                filter: "blur(10px)",
                textShadow: "0 0 0px rgba(192, 192, 192, 0)"
            },
            {
                duration: 0.8,
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                textShadow: "0 0 15px rgba(192, 192, 192, 0.6)",
                ease: "power2.out",
                onComplete: () => {
                    // Text leuchten lassen
                    gsap.to(typeText, {
                        duration: 0.6,
                        textShadow: "0 0 25px rgba(192, 192, 192, 0.9)",
                        yoyo: true,
                        repeat: 1,
                        ease: "sine.inOut",
                        onComplete: () => {
                            // Text verschwinden lassen
                            gsap.to(typeText, {
                                duration: 0.5,
                                opacity: 0,
                                y: -15,
                                textShadow: "0 0 0px rgba(192, 192, 192, 0)",
                                ease: "power2.in",
                                onComplete: () => {
                                    currentText++;
                                    setTimeout(showNextText, 200);
                                }
                            });
                        }
                    });
                }
            }
        );
    }
    
    // Starte Text-Animation nach kurzer Verzögerung
    setTimeout(showNextText, 1000);
    
    // Progress Bar erstellen und animieren
    const progressBar = createProgressBar();
    
    if (progressBar) {
        gsap.to(progressBar, {
            duration: 4.5,
            width: "100%",
            ease: "power2.inOut",
            onComplete: removePreloader
        });
    }
    
    // Fallback: Preloader nach 6 Sekunden entfernen
    const fallbackTimeout = setTimeout(removePreloader, 6000);
    
    // Hilfsfunktion für Progress Bar
    function createProgressBar() {
        const textContainer = document.querySelector('.text-container');
        if (!textContainer) return null;
        
        // Prüfen ob bereits eine Progress Bar existiert
        if (document.querySelector('.silber-progress-bar')) {
            return document.querySelector('.silber-progress-bar');
        }
        
        const progressBar = document.createElement('div');
        progressBar.className = 'silber-progress-bar';
        progressBar.style.cssText = `
            width: 0%;
            height: 2px;
            background: linear-gradient(90deg, transparent, #c0c0c0, #f0f0f0, #c0c0c0, transparent);
            margin: 30px auto 0;
            position: relative;
            overflow: hidden;
            border-radius: 1px;
            max-width: 300px;
        `;
        
        const glow = document.createElement('div');
        glow.className = 'progress-glow';
        glow.style.cssText = `
            position: absolute;
            top: 0;
            left: -100px;
            width: 100px;
            height: 100%;
            background: linear-gradient(90deg, 
                transparent, 
                rgba(240, 240, 240, 0.8), 
                rgba(192, 192, 192, 1), 
                rgba(240, 240, 240, 0.8), 
                transparent);
            filter: blur(3px);
        `;
        
        progressBar.appendChild(glow);
        textContainer.appendChild(progressBar);
        
        // Glow Animation
        gsap.to(glow, {
            duration: 2,
            x: '400px',
            repeat: -1,
            ease: "none"
        });
        
        return progressBar;
    }
    
    function removePreloader() {
        // Fallback Timeout löschen
        clearTimeout(fallbackTimeout);
        
        // Stop alle laufenden Animationen
        gsap.killTweensOf([logo, typeText, preloader]);
        
        // Preloader ausblenden
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
                    
                    // Header und Footer erscheinen lassen
                    gsap.from(['header', 'footer'], {
                        duration: 0.8,
                        opacity: 0,
                        y: 15,
                        stagger: 0.1,
                        ease: "power2.out"
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
        // Initialer State
        gsap.set(link, { opacity: 0, y: -10 });
        
        // Links nacheinander erscheinen lassen
        gsap.to(link, {
            duration: 0.6,
            opacity: 1,
            y: 0,
            delay: Array.from(navLinks).indexOf(link) * 0.1,
            ease: "power2.out"
        });
        
        // Hover Effekt
        link.addEventListener('mouseenter', (e) => {
            const target = e.target;
            
            gsap.to(target, {
                duration: 0.3,
                color: '#c0c0c0',
                letterSpacing: '2px',
                textShadow: '0 0 12px rgba(192, 192, 192, 0.7)',
                ease: "power2.out"
            });
            
            // Silberne Linie erstellen
            createSilberLine(target);
        });
        
        link.addEventListener('mouseleave', (e) => {
            const target = e.target;
            
            gsap.to(target, {
                duration: 0.4,
                color: '#ffffff',
                letterSpacing: 'normal',
                textShadow: 'none',
                ease: "power2.in"
            });
        });
        
        // Active State
        if (link.classList.contains('active')) {
            gsap.to(link, {
                duration: 1,
                color: '#c0c0c0',
                textShadow: '0 0 8px rgba(192, 192, 192, 0.5)',
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });
        }
    });
    
    // Burger Menu Animation
    const burgerButton = document.getElementById('burgerButton');
    if (burgerButton) {
        burgerButton.addEventListener('click', () => {
            const spans = burgerButton.querySelectorAll('span');
            spans.forEach((span, index) => {
                gsap.to(span, {
                    duration: 0.3,
                    backgroundColor: index === 1 ? 'transparent' : '#c0c0c0',
                    y: index === 0 ? '8px' : index === 2 ? '-8px' : '0px',
                    rotate: index === 0 ? '45deg' : index === 2 ? '-45deg' : '0deg',
                    ease: "power2.out"
                });
            });
        });
    }
}

// ==================== 3. BUTTON ANIMATIONEN ====================
function initButtons() {
    const buttons = document.querySelectorAll('.silber-button');
    
    if (!buttons.length) return;
    
    // Buttons erscheinen lassen
    gsap.from(buttons, {
        scrollTrigger: {
            trigger: '.cta-container',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        duration: 0.8,
        opacity: 0,
        y: 20,
        stagger: 0.2,
        ease: "back.out(1.7)"
    });
    
    buttons.forEach(button => {
        // Hover Animation
        button.addEventListener('mouseenter', (e) => {
            const target = e.currentTarget;
            
            gsap.to(target, {
                duration: 0.4,
                scale: 1.05,
                boxShadow: '0 10px 25px rgba(192, 192, 192, 0.3)',
                borderColor: '#f0f0f0',
                ease: "back.out(1.7)"
            });
            
            // Pfeil Animation
            const arrow = target.querySelector('.button-arrow');
            if (arrow) {
                gsap.to(arrow, {
                    duration: 0.3,
                    x: 8,
                    ease: "power2.out"
                });
            }
            
            // Silberner Shine Effekt
            createButtonShine(target);
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
        
        // Click Effect
        button.addEventListener('click', (e) => {
            const target = e.currentTarget;
            
            // Klick Animation
            gsap.to(target, {
                duration: 0.1,
                scale: 0.95,
                boxShadow: '0 0 20px rgba(192, 192, 192, 0.5)',
                ease: "power2.in",
                onComplete: () => {
                    gsap.to(target, {
                        duration: 0.2,
                        scale: 1,
                        boxShadow: '0 10px 25px rgba(192, 192, 192, 0.3)',
                        ease: "back.out(1.7)"
                    });
                }
            });
            
            // Ripple Effect
            createRipple(e);
        });
    });
}

// ==================== 4. SCROLL ANIMATIONEN ====================
function initScrollAnimations() {
    // Nur ausführen wenn GSAP geladen ist
    if (typeof ScrollTrigger === 'undefined') return;
    
    // Header Scroll Effect
    const header = document.querySelector('.header');
    if (header) {
        ScrollTrigger.create({
            start: 'top top',
            end: '+=100',
            onUpdate: (self) => {
                if (self.progress > 0) {
                    gsap.to(header, {
                        duration: 0.3,
                        backdropFilter: 'blur(10px)',
                        backgroundColor: 'rgba(10, 10, 10, 0.9)',
                        boxShadow: '0 5px 20px rgba(192, 192, 192, 0.1)'
                    });
                } else {
                    gsap.to(header, {
                        duration: 0.3,
                        backdropFilter: 'none',
                        backgroundColor: 'transparent',
                        boxShadow: 'none'
                    });
                }
            }
        });
    }
    
    // Credo Text Animation
    const credoText = document.querySelector('.kalligrafie-text');
    if (credoText) {
        gsap.from(credoText, {
            scrollTrigger: {
                trigger: credoText,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            duration: 1.5,
            opacity: 0,
            y: 40,
            scale: 0.9,
            ease: "power3.out"
        });
        
        // Silberner Glow beim Scrollen
        ScrollTrigger.create({
            trigger: credoText,
            start: 'top 60%',
            onEnter: () => {
                gsap.to(credoText, {
                    duration: 1,
                    textShadow: '0 0 25px rgba(192, 192, 192, 0.8)',
                    ease: "power2.out"
                });
            },
            onLeaveBack: () => {
                gsap.to(credoText, {
                    duration: 0.5,
                    textShadow: 'none',
                    ease: "power2.in"
                });
            }
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
            duration: 1,
            opacity: 0,
            y: 30,
            ease: "power3.out",
            delay: i * 0.1
        });
    });
    
    // Zitat Animation
    const zitat = document.querySelector('.zitat');
    if (zitat) {
        gsap.from(zitat, {
            scrollTrigger: {
                trigger: zitat,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            duration: 1.2,
            opacity: 0,
            x: -30,
            borderLeftWidth: 8,
            ease: "power3.out"
        });
    }
    
    // Social Section Animation
    const socialSection = document.querySelector('.social-section');
    if (socialSection) {
        gsap.from(socialSection, {
            scrollTrigger: {
                trigger: socialSection,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            duration: 1,
            opacity: 0,
            y: 40,
            ease: "power3.out"
        });
    }
}

// ==================== 5. SOCIAL MEDIA EFFECTS ====================
function initSocialMedia() {
    const socialLinks = document.querySelectorAll('.social-link');
    
    if (!socialLinks.length) return;
    
    // Staggered Appearance
    socialLinks.forEach((link, index) => {
        gsap.from(link, {
            scrollTrigger: {
                trigger: '.social-section',
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            duration: 0.6,
            opacity: 0,
            y: 20,
            scale: 0.8,
            delay: index * 0.08,
            ease: "back.out(1.7)"
        });
        
        // Hover Animation
        link.addEventListener('mouseenter', (e) => {
            const target = e.currentTarget;
            const icon = target.querySelector('.social-icon-wrapper');
            const name = target.querySelector('.social-name');
            
            if (icon) {
                gsap.to(icon, {
                    duration: 0.3,
                    scale: 1.2,
                    rotate: 10,
                    filter: 'drop-shadow(0 0 15px rgba(192, 192, 192, 0.6))',
                    ease: "back.out(1.7)"
                });
            }
            
            if (name) {
                gsap.to(name, {
                    duration: 0.3,
                    color: '#c0c0c0',
                    textShadow: '0 0 8px rgba(192, 192, 192, 0.5)',
                    ease: "power2.out"
                });
            }
            
            // Silberner Glow um das gesamte Icon
            createSocialGlow(target);
        });
        
        link.addEventListener('mouseleave', (e) => {
            const target = e.currentTarget;
            const icon = target.querySelector('.social-icon-wrapper');
            const name = target.querySelector('.social-name');
            
            if (icon) {
                gsap.to(icon, {
                    duration: 0.3,
                    scale: 1,
                    rotate: 0,
                    filter: 'drop-shadow(0 0 0px rgba(192, 192, 192, 0))',
                    ease: "power2.in"
                });
            }
            
            if (name) {
                gsap.to(name, {
                    duration: 0.3,
                    color: '#ffffff',
                    textShadow: 'none',
                    ease: "power2.in"
                });
            }
        });
    });
}

// ==================== 6. SPEZIALEFFEKTE ====================
function initSilberEffects() {
    // Lichtkante Animation
    const lichtkanten = document.querySelectorAll('.lichtkante');
    lichtkanten.forEach(kante => {
        if (kante) {
            gsap.to(kante, {
                duration: 3,
                backgroundPosition: '200% 0',
                repeat: -1,
                ease: "none"
            });
        }
    });
    
    // Silberne Schimmer-Effekte auf Text-Elementen
    const highlightTexts = document.querySelectorAll('.highlight, .lead-text, .sub-lead-text');
    highlightTexts.forEach(text => {
        gsap.to(text, {
            duration: 2,
            textShadow: '0 0 10px rgba(192, 192, 192, 0.4)',
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: Math.random() * 2
        });
    });
    
    // CTA Container Glow
    const ctaContainer = document.querySelector('.cta-container');
    if (ctaContainer) {
        gsap.to(ctaContainer, {
            scrollTrigger: {
                trigger: ctaContainer,
                start: 'top 70%',
                toggleActions: 'play none none reverse'
            },
            duration: 1,
            boxShadow: '0 0 40px rgba(192, 192, 192, 0.1)',
            ease: "power2.out"
        });
    }
}

// ==================== 7. HILFSFUNKTIONEN ====================
function createSilberParticles(container) {
    const particleCount = 25;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'silber-particle';
        
        // Zufällige Größe und Position
        const size = Math.random() * 4 + 1;
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: radial-gradient(circle at center, 
                rgba(240, 240, 240, ${Math.random() * 0.6 + 0.2}) 0%, 
                rgba(192, 192, 192, ${Math.random() * 0.3 + 0.1}) 100%);
            border-radius: 50%;
            pointer-events: none;
            left: ${left}%;
            top: ${top}%;
            z-index: 1;
            filter: blur(${Math.random() * 2 + 0.5}px);
        `;
        
        container.appendChild(particle);
        
        // Sanfte Bewegung
        gsap.to(particle, {
            duration: Math.random() * 5 + 3,
            x: Math.random() * 200 - 100,
            y: Math.random() * 200 - 100,
            opacity: 0,
            scale: 0,
            repeat: -1,
            delay: Math.random() * 3,
            ease: "sine.inOut"
        });
    }
}

function createSilberLine(element) {
    // Prüfen ob bereits eine Linie existiert
    if (element.querySelector('.silber-line')) return;
    
    const line = document.createElement('div');
    line.className = 'silber-line';
    line.style.cssText = `
        position: absolute;
        bottom: -2px;
        left: 0;
        width: 0;
        height: 1px;
        background: linear-gradient(90deg, transparent, #c0c0c0, #f0f0f0, #c0c0c0, transparent);
        z-index: 1;
    `;
    
    element.appendChild(line);
    
    // Animation
    gsap.to(line, {
        duration: 0.4,
        width: '100%',
        ease: "power3.out",
        onComplete: () => {
            gsap.to(line, {
                duration: 0.3,
                opacity: 0,
                delay: 0.1,
                onComplete: () => {
                    if (line.parentElement) {
                        line.parentElement.removeChild(line);
                    }
                }
            });
        }
    });
}

function createButtonShine(button) {
    // Prüfen ob bereits ein Shine existiert
    if (button.querySelector('.button-shine')) return;
    
    const shine = document.createElement('div');
    shine.className = 'button-shine';
    shine.style.cssText = `
        position: absolute;
        top: 0;
        left: -100%;
        width: 60%;
        height: 100%;
        background: linear-gradient(90deg, 
            transparent, 
            rgba(255, 255, 255, 0.2), 
            rgba(255, 255, 255, 0.4), 
            rgba(255, 255, 255, 0.2), 
            transparent);
        transform: skewX(-20deg);
        pointer-events: none;
        z-index: 1;
    `;
    
    button.appendChild(shine);
    
    // Animation
    gsap.to(shine, {
        duration: 0.8,
        left: '150%',
        ease: "power2.inOut",
        onComplete: () => {
            if (shine.parentElement) {
                shine.parentElement.removeChild(shine);
            }
        }
    });
}

function createRipple(event) {
    const button = event.currentTarget;
    
    // Prüfen ob bereits ein Ripple läuft
    if (button.querySelector('.silber-ripple')) return;
    
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(192, 192, 192, 0.4) 0%, transparent 70%);
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        z-index: 1;
    `;
    
    button.appendChild(ripple);
    
    // Animation
    gsap.to(ripple, {
        duration: 0.6,
        scale: 2,
        opacity: 0,
        ease: "power2.out",
        onComplete: () => {
            if (ripple.parentElement) {
                ripple.parentElement.removeChild(ripple);
            }
        }
    });
}

function createSocialGlow(element) {
    // Prüfen ob bereits ein Glow existiert
    if (element.querySelector('.social-glow')) return;
    
    const glow = document.createElement('div');
    glow.className = 'social-glow';
    glow.style.cssText = `
        position: absolute;
        top: -10px;
        left: -10px;
        right: -10px;
        bottom: -10px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(192, 192, 192, 0.2) 0%, transparent 70%);
        pointer-events: none;
        z-index: 0;
        opacity: 0;
    `;
    
    element.style.position = 'relative';
    element.appendChild(glow);
    
    // Animation
    gsap.to(glow, {
        duration: 0.3,
        opacity: 1,
        scale: 1.1,
        ease: "power2.out",
        onComplete: () => {
            gsap.to(glow, {
                duration: 0.3,
                opacity: 0,
                scale: 1,
                delay: 0.1,
                ease: "power2.in",
                onComplete: () => {
                    if (glow.parentElement) {
                        glow.parentElement.removeChild(glow);
                    }
                }
            });
        }
    });
}

function updateFooterYear() {
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// ==================== 8. ERROR HANDLING & FALLBACKS ====================
// GSAP Fehlerbehandlung
if (typeof gsap === 'undefined') {
    console.error('GSAP ist nicht geladen. Bitte binden Sie GSAP vor animations.js ein.');
    
    // Fallback: Einfache Preloader-Entfernung
    document.addEventListener('DOMContentLoaded', function() {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 2000);
        }
        
        // Footer Jahr aktualisieren
        const yearElement = document.getElementById('currentYear');
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }
    });
} else {
    console.log('GSAP erfolgreich geladen. Silber-Animationen bereit.');
    
    // Resize Handler für mobile Optimierung
    window.addEventListener('resize', function() {
        ScrollTrigger.refresh();
    });
}

// Performance Optimierung
if ('requestIdleCallback' in window) {
    window.requestIdleCallback(() => {
        // Nicht-kritische Animationen nachladen
        console.log('Performance-Optimierung aktiv');
    });
}

// Export für Modul-System (falls benötigt)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initPreloader,
        initNavigation,
        initButtons,
        initScrollAnimations,
        initSocialMedia,
        initSilberEffects
    };
}
