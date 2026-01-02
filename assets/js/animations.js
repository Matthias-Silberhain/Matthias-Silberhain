// assets/js/animations.js
// Spektakuläre Silber-Animationen für Matthias Silberhain

// GSAP Plugins registrieren
if (typeof gsap !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger, TextPlugin);
}

// ==================== 1. BURGER MENÜ FUNKTIONALITÄT ====================
document.addEventListener('DOMContentLoaded', function() {
    console.log('Silber-Animationen werden geladen...');
    
    // Burger Menu initialisieren (MUSS als erstes passieren!)
    initBurgerMenu();
    
    // Preloader Animation
    initSpectacularPreloader();
    
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

function initBurgerMenu() {
    const burgerButton = document.getElementById('burgerButton');
    const mainNav = document.getElementById('mainNav');
    const menuOverlay = document.querySelector('.menu-overlay');
    
    if (!burgerButton || !mainNav) {
        console.warn('Burger Menu Elemente nicht gefunden');
        return;
    }
    
    console.log('Burger Menu wird initialisiert...');
    
    // Burger Button Animation
    burgerButton.addEventListener('click', function(e) {
        e.stopPropagation();
        
        const isActive = this.classList.contains('active');
        
        if (!isActive) {
            // Menu öffnen
            this.classList.add('active');
            mainNav.classList.add('active');
            if (menuOverlay) menuOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Burger zu X Animation
            const spans = this.querySelectorAll('span');
            gsap.to(spans[0], { duration: 0.3, y: 8, rotate: 45, backgroundColor: '#c0c0c0' });
            gsap.to(spans[1], { duration: 0.3, opacity: 0 });
            gsap.to(spans[2], { duration: 0.3, y: -8, rotate: -45, backgroundColor: '#c0c0c0' });
            
            // Navigation einblenden
            gsap.fromTo(mainNav, 
                { opacity: 0, y: -20 },
                { duration: 0.4, opacity: 1, y: 0, ease: "power2.out" }
            );
            
            // Menu Links nacheinander einblenden
            const navLinks = mainNav.querySelectorAll('a');
            navLinks.forEach((link, index) => {
                gsap.fromTo(link,
                    { opacity: 0, y: 10 },
                    { 
                        duration: 0.3, 
                        opacity: 1, 
                        y: 0, 
                        delay: 0.1 + (index * 0.05),
                        ease: "power2.out" 
                    }
                );
            });
            
        } else {
            // Menu schließen
            this.classList.remove('active');
            mainNav.classList.remove('active');
            if (menuOverlay) menuOverlay.classList.remove('active');
            document.body.style.overflow = '';
            
            // X zu Burger Animation
            const spans = this.querySelectorAll('span');
            gsap.to(spans[0], { duration: 0.3, y: 0, rotate: 0, backgroundColor: '#ffffff' });
            gsap.to(spans[1], { duration: 0.3, opacity: 1 });
            gsap.to(spans[2], { duration: 0.3, y: 0, rotate: 0, backgroundColor: '#ffffff' });
            
            // Navigation ausblenden
            gsap.to(mainNav, { duration: 0.3, opacity: 0, y: -10, ease: "power2.in" });
        }
    });
    
    // Menu Overlay schließt Menu
    if (menuOverlay) {
        menuOverlay.addEventListener('click', function() {
            burgerButton.classList.remove('active');
            mainNav.classList.remove('active');
            this.classList.remove('active');
            document.body.style.overflow = '';
            
            // Animation rückgängig
            const spans = burgerButton.querySelectorAll('span');
            gsap.to(spans[0], { duration: 0.3, y: 0, rotate: 0, backgroundColor: '#ffffff' });
            gsap.to(spans[1], { duration: 0.3, opacity: 1 });
            gsap.to(spans[2], { duration: 0.3, y: 0, rotate: 0, backgroundColor: '#ffffff' });
            
            gsap.to(mainNav, { duration: 0.3, opacity: 0, y: -10 });
        });
    }
    
    // Menu Links schließen Menu auf Mobile
    const navLinks = mainNav.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                burgerButton.classList.remove('active');
                mainNav.classList.remove('active');
                if (menuOverlay) menuOverlay.classList.remove('active');
                document.body.style.overflow = '';
                
                const spans = burgerButton.querySelectorAll('span');
                gsap.to(spans[0], { duration: 0.3, y: 0, rotate: 0, backgroundColor: '#ffffff' });
                gsap.to(spans[1], { duration: 0.3, opacity: 1 });
                gsap.to(spans[2], { duration: 0.3, y: 0, rotate: 0, backgroundColor: '#ffffff' });
            }
        });
    });
    
    // Responsive: Desktop Menu immer sichtbar, Mobile versteckt
    function handleResize() {
        if (window.innerWidth > 768) {
            // Desktop: Menu immer sichtbar
            mainNav.style.display = 'flex';
            mainNav.style.opacity = '1';
            mainNav.style.transform = 'none';
            if (menuOverlay) menuOverlay.classList.remove('active');
            burgerButton.classList.remove('active');
            document.body.style.overflow = '';
            
            // Burger Button zurücksetzen
            const spans = burgerButton.querySelectorAll('span');
            spans[0].style.transform = '';
            spans[1].style.opacity = '';
            spans[2].style.transform = '';
        } else {
            // Mobile: Menu versteckt (wenn nicht aktiv)
            if (!burgerButton.classList.contains('active')) {
                mainNav.style.display = 'none';
            }
        }
    }
    
    // Initial und bei Resize
    handleResize();
    window.addEventListener('resize', handleResize);
}

// ==================== 2. SPEKTAKULÄRER PRELOADER ====================
function initSpectacularPreloader() {
    const preloader = document.getElementById('preloader');
    const typeText = document.getElementById('type-text');
    
    if (!preloader || !typeText) {
        console.warn('Preloader Elemente nicht gefunden');
        setTimeout(() => revealContent(), 100);
        return;
    }
    
    // Preloader anzeigen
    gsap.set(preloader, { 
        display: 'flex', 
        opacity: 1 
    });
    
    // 1. Logo Animation
    const logo = document.querySelector('.preloader-logo');
    if (logo) {
        gsap.from(logo, {
            duration: 2,
            opacity: 0,
            scale: 0.5,
            rotation: 360,
            ease: "back.out(1.7)",
            filter: "drop-shadow(0 0 0px rgba(192,192,192,0))"
        });
        
        gsap.to(logo, {
            duration: 2.5,
            scale: 1.1,
            filter: "drop-shadow(0 0 30px rgba(192,192,192,0.8))",
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: 1
        });
    }
    
    // 2. Typing Effekt für "MATTHIAS SILBERHAIN"
    const fullText = "MATTHIAS SILBERHAIN";
    typeText.textContent = "";
    
    // Typing Animation
    const typingDuration = 2; // 2 Sekunden für komplettes Typing
    const letterDuration = typingDuration / fullText.length;
    
    let currentChar = 0;
    
    function typeNextCharacter() {
        if (currentChar >= fullText.length) {
            // Typing fertig, Unterstrich zeigen
            setTimeout(() => showSilverUnderline(), 300);
            return;
        }
        
        const charSpan = document.createElement('span');
        charSpan.textContent = fullText[currentChar];
        charSpan.style.cssText = `
            display: inline-block;
            opacity: 0;
            transform: translateY(10px);
        `;
        
        typeText.appendChild(charSpan);
        
        gsap.to(charSpan, {
            duration: letterDuration,
            opacity: 1,
            y: 0,
            color: '#c0c0c0',
            ease: "power2.out",
            onComplete: () => {
                currentChar++;
                setTimeout(typeNextCharacter, 50);
            }
        });
    }
    
    // Start Typing nach 1 Sekunde
    setTimeout(() => typeNextCharacter(), 1000);
}

// ==================== 3. SILBERNER UNTERSTRICH MIT EXPLOSION ====================
function showSilverUnderline() {
    const textContainer = document.querySelector('.text-container');
    if (!textContainer) return;
    
    // Unterstrich erstellen
    const underline = document.createElement('div');
    underline.className = 'silber-underline';
    underline.style.cssText = `
        position: absolute;
        bottom: -20px;
        left: 50%;
        width: 0;
        height: 4px;
        background: linear-gradient(90deg, 
            transparent, 
            #c0c0c0, 
            #f0f0f0, 
            #c0c0c0, 
            transparent);
        transform: translateX(-50%);
        border-radius: 2px;
        z-index: 2;
    `;
    
    textContainer.appendChild(underline);
    
    const tl = gsap.timeline();
    
    // 1. Unterstrich wächst von Mitte aus
    tl.to(underline, {
        duration: 1.5,
        width: '100%',
        ease: "power3.out"
    })
    // 2. Unterstrich glüht
    .to(underline, {
        duration: 1,
        boxShadow: '0 0 30px rgba(192, 192, 192, 0.8), 0 0 60px rgba(192, 192, 192, 0.4)',
        background: 'linear-gradient(90deg, transparent, #f0f0f0, #ffffff, #f0f0f0, transparent)',
        ease: "power2.inOut",
        repeat: 2,
        yoyo: true
    })
    // 3. Explosions-Effekt
    .to(underline, {
        duration: 0.8,
        scaleY: 3,
        opacity: 0.8,
        boxShadow: '0 0 100px rgba(255, 255, 255, 0.9)',
        ease: "power2.out",
        onComplete: () => createUnderlineExplosion(underline)
    })
    // 4. Preloader entfernen
    .to(underline, {
        duration: 0.5,
        opacity: 0,
        scale: 1.5,
        ease: "power2.in",
        onComplete: () => {
            const preloader = document.getElementById('preloader');
            if (preloader) {
                gsap.to(preloader, {
                    duration: 1,
                    opacity: 0,
                    ease: "power3.inOut",
                    onComplete: () => {
                        preloader.style.display = 'none';
                        revealContent();
                    }
                });
            }
        }
    });
}

// ==================== 4. UNTERSTRICH-EXPLOSION EFFEKT ====================
function createUnderlineExplosion(underlineElement) {
    const rect = underlineElement.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Explosions-Container
    const explosionContainer = document.createElement('div');
    explosionContainer.style.cssText = `
        position: fixed;
        top: ${centerY}px;
        left: ${centerX}px;
        pointer-events: none;
        z-index: 10000;
    `;
    
    document.body.appendChild(explosionContainer);
    
    // Anzahl der Explosionspartikel
    const particleCount = 40;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'silber-particle';
        
        const size = Math.random() * 6 + 2;
        const angle = (Math.PI * 2 / particleCount) * i;
        const distance = Math.random() * 200 + 100;
        const duration = Math.random() * 1 + 0.8;
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: radial-gradient(circle, 
                rgba(255, 255, 255, 0.9) 0%, 
                rgba(192, 192, 192, 0.7) 50%, 
                transparent 100%);
            border-radius: 50%;
            left: 0;
            top: 0;
            pointer-events: none;
            filter: blur(1px);
            box-shadow: 0 0 ${size * 2}px rgba(192, 192, 192, 0.8);
        `;
        
        explosionContainer.appendChild(particle);
        
        // Partikel-Animation
        gsap.to(particle, {
            duration: duration,
            x: Math.cos(angle) * distance,
            y: Math.sin(angle) * distance,
            opacity: 0,
            scale: 0.3,
            ease: "power2.out",
            delay: Math.random() * 0.3,
            onComplete: () => {
                if (particle.parentElement) {
                    particle.parentElement.removeChild(particle);
                }
            }
        });
    }
    
    // Container nach Animation entfernen
    setTimeout(() => {
        if (explosionContainer.parentElement) {
            explosionContainer.parentElement.removeChild(explosionContainer);
        }
    }, 1500);
}

// ==================== 5. CONTENT REVEAL ====================
function revealContent() {
    if (typeof gsap === 'undefined') return;
    
    // Header erscheinen lassen
    gsap.from('header', {
        duration: 1.2,
        y: -30,
        opacity: 0,
        ease: "power3.out",
        delay: 0.2
    });
    
    // Hauptinhalt erscheinen lassen
    gsap.from('main', {
        duration: 1.5,
        y: 40,
        opacity: 0,
        ease: "power3.out",
        delay: 0.3
    });
    
    // Social Section erscheinen lassen
    gsap.from('.social-section', {
        duration: 1.2,
        y: 30,
        opacity: 0,
        ease: "power3.out",
        delay: 0.5
    });
    
    // Footer erscheinen lassen
    gsap.from('footer', {
        duration: 1,
        y: 20,
        opacity: 0,
        ease: "power2.out",
        delay: 0.6
    });
    
    // Navigation Links nacheinander erscheinen lassen
    const navLinks = document.querySelectorAll('.hauptnavigation a');
    navLinks.forEach((link, index) => {
        gsap.from(link, {
            duration: 0.6,
            opacity: 0,
            x: -15,
            delay: 0.8 + (index * 0.1),
            ease: "power2.out"
        });
    });
}

// ==================== 6. NAVIGATION EFFECTS ====================
function initNavigation() {
    const navLinks = document.querySelectorAll('.hauptnavigation a');
    
    if (!navLinks.length) return;
    
    navLinks.forEach(link => {
        // Hover Effekt
        link.addEventListener('mouseenter', (e) => {
            gsap.to(e.target, {
                duration: 0.3,
                color: '#c0c0c0',
                textShadow: '0 0 10px rgba(192, 192, 192, 0.6)',
                ease: "power2.out"
            });
            
            createSilberLine(e.target);
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

// ==================== 7. BUTTON ANIMATIONEN ====================
function initButtons() {
    const buttons = document.querySelectorAll('.silber-button');
    
    if (!buttons.length) return;
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', (e) => {
            const target = e.currentTarget;
            
            gsap.to(target, {
                duration: 0.3,
                scale: 1.05,
                boxShadow: '0 10px 25px rgba(192, 192, 192, 0.4)',
                borderColor: '#f0f0f0',
                ease: "power2.out"
            });
            
            const arrow = target.querySelector('.button-arrow');
            if (arrow) {
                gsap.to(arrow, {
                    duration: 0.3,
                    x: 8,
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

// ==================== 8. SCROLL ANIMATIONEN ====================
function initScrollAnimations() {
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
            duration: 1.5,
            opacity: 0,
            y: 40,
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
            duration: 1,
            opacity: 0,
            y: 20,
            ease: "power2.out",
            delay: i * 0.05
        });
    });
}

// ==================== 9. SOCIAL MEDIA EFFECTS ====================
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
            delay: index * 0.05,
            ease: "power2.out"
        });
        
        link.addEventListener('mouseenter', (e) => {
            const icon = e.currentTarget.querySelector('.social-icon-wrapper');
            if (icon) {
                gsap.to(icon, {
                    duration: 0.3,
                    scale: 1.1,
                    filter: 'drop-shadow(0 0 10px rgba(192, 192, 192, 0.5))',
                    ease: "power2.out"
                });
            }
        });
        
        link.addEventListener('mouseleave', (e) => {
            const icon = e.currentTarget.querySelector('.social-icon-wrapper');
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

// ==================== 10. SPECIAL EFFECTS ====================
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
    
    // Zitat Effekt
    const zitat = document.querySelector('.zitat');
    if (zitat) {
        gsap.from(zitat, {
            scrollTrigger: {
                trigger: zitat,
                start: 'top 80%'
            },
            duration: 1.2,
            background: 'linear-gradient(90deg, rgba(192,192,192,0) 0%, rgba(192,192,192,0.1) 50%, rgba(192,192,192,0) 100%)',
            borderLeftWidth: 5,
            ease: "power2.out"
        });
    }
}

// ==================== 11. HILFSFUNKTIONEN ====================
function createSilberLine(element) {
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
    
    gsap.to(line, {
        duration: 0.5,
        width: '100%',
        ease: "power3.out",
        onComplete: () => {
            gsap.to(line, {
                duration: 0.3,
                opacity: 0,
                delay: 0.2,
                onComplete: () => {
                    if (line.parentElement) {
                        line.parentElement.removeChild(line);
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

// ==================== 12. ERROR HANDLING ====================
if (typeof gsap === 'undefined') {
    console.warn('GSAP ist nicht geladen. Verwende vereinfachte Animationen.');
    
    document.addEventListener('DOMContentLoaded', function() {
        // Burger Menu Fallback
        const burgerButton = document.getElementById('burgerButton');
        const mainNav = document.getElementById('mainNav');
        const menuOverlay = document.querySelector('.menu-overlay');
        
        if (burgerButton && mainNav) {
            burgerButton.addEventListener('click', function() {
                this.classList.toggle('active');
                mainNav.classList.toggle('active');
                if (menuOverlay) menuOverlay.classList.toggle('active');
                
                if (this.classList.contains('active')) {
                    document.body.style.overflow = 'hidden';
                } else {
                    document.body.style.overflow = '';
                }
            });
            
            if (menuOverlay) {
                menuOverlay.addEventListener('click', function() {
                    burgerButton.classList.remove('active');
                    mainNav.classList.remove('active');
                    this.classList.remove('active');
                    document.body.style.overflow = '';
                });
            }
        }
        
        // Preloader Fallback
        const preloader = document.getElementById('preloader');
        if (preloader) {
            setTimeout(() => {
                preloader.style.opacity = '0';
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 1000);
            }, 3000);
        }
        
        updateFooterYear();
    });
} else {
    console.log('GSAP erfolgreich geladen. Silber-Animationen aktiv!');
}
