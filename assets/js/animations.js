/**
 * EXTRAGAVANTE SILBER ANIMATIONEN - Matthias Silberhain
 * Spektakuläre Effekte in Silber/Weiß statt Gold
 * Version 2.0 - Silber Edition
 */

class SilberAnimations {
    constructor() {
        this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        this.init();
    }

    init() {
        document.addEventListener('DOMContentLoaded', () => {
            // GSAP verfügbar prüfen
            if (typeof gsap === 'undefined') {
                this.loadGSAP();
            } else {
                this.startSilberShow();
            }
        });
    }

    loadGSAP() {
        const gsapScript = document.createElement('script');
        gsapScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.4/gsap.min.js';
        gsapScript.onload = () => {
            const scrollScript = document.createElement('script');
            scrollScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.4/ScrollTrigger.min.js';
            scrollScript.onload = () => this.startSilberShow();
            document.head.appendChild(scrollScript);
        };
        document.head.appendChild(gsapScript);
    }

    startSilberShow() {
        console.log('✨ Silber-Animationen starten');
        
        // 1. Preloader Spektakel (HAUPT-EFFEKT)
        this.createPreloaderSpectacle();
        
        // 2. Haupt-Animationen nach Preloader
        setTimeout(() => {
            this.createMainAnimations();
        }, 4000); // Nach Preloader-Ende
    }

    // ================= PRELOADER SPEKTAKEL =================
    createPreloaderSpectacle() {
        const preloader = document.getElementById('preloader');
        const typeText = document.getElementById('type-text');
        const preloaderLogo = document.querySelector('.preloader-logo');
        
        if (!preloader || !typeText || !preloaderLogo) {
            console.error('Preloader-Elemente nicht gefunden');
            return;
        }
        
        console.log('Preloader-Animation startet');
        
        // 1. LOGO ENTSTEHUNG (Silber-Effekt)
        gsap.set(preloaderLogo, { 
            scale: 0, 
            rotation: -180, 
            opacity: 0,
            filter: 'blur(20px) brightness(0)'
        });
        
        gsap.to(preloaderLogo, {
            scale: 1,
            rotation: 0,
            opacity: 1,
            filter: 'blur(0px) brightness(1.5)',
            duration: 2,
            ease: 'elastic.out(1, 0.5)',
            delay: 0.5,
            onComplete: () => {
                console.log('Logo-Animation komplett');
            }
        });

        // 2. SILBERNE STRAHLEN um Logo
        this.createSilberStrahlen(preloaderLogo);
        
        // 3. TYPING EFFEKT (Wichtigste Animation)
        this.createTypingEffect(typeText);
        
        // 4. PRELOADER AUSBLENDUNG
        setTimeout(() => {
            this.dramaticPreloaderExit(preloader, preloaderLogo, typeText);
        }, 4500);
    }

    createSilberStrahlen(logo) {
        // Silberne Strahlen statt goldene
        for (let i = 0; i < 12; i++) {
            const ray = document.createElement('div');
            ray.className = 'silber-ray';
            ray.style.cssText = `
                position: absolute;
                width: 2px;
                height: 0;
                background: linear-gradient(to top, 
                    transparent, 
                    rgba(192, 192, 192, 0.9),
                    rgba(255, 255, 255, 1),
                    transparent);
                transform-origin: bottom center;
                transform: rotate(${i * 30}deg) translateY(-50px);
                opacity: 0;
                z-index: -1;
                filter: blur(1px);
            `;
            
            if (logo.parentNode) {
                logo.parentNode.appendChild(ray);
                
                // Strahlen wachsen lassen
                gsap.to(ray, {
                    opacity: 0.8,
                    height: 120,
                    duration: 1.5,
                    delay: 1 + (i * 0.05),
                    ease: 'power2.out'
                });
                
                // Pulsierende Animation
                gsap.to(ray, {
                    opacity: 0.3,
                    height: 150,
                    duration: 1.5,
                    delay: 2.5,
                    repeat: -1,
                    yoyo: true,
                    ease: 'sine.inOut'
                });
            }
        }
    }

    createTypingEffect(typeText) {
        const text = "MATTHIAS SILBERHAIN";
        typeText.innerHTML = '';
        
        // Jeden Buchstaben einzeln animieren
        text.split('').forEach((char, i) => {
            const span = document.createElement('span');
            span.className = 'silber-char';
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.cssText = `
                display: inline-block;
                opacity: 0;
                transform: translateY(30px) rotateX(90deg);
                filter: blur(5px);
                color: #FFFFFF;
                text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
            `;
            typeText.appendChild(span);
            
            // Verzögerte Animation für jeden Buchstaben
            gsap.to(span, {
                opacity: 1,
                y: 0,
                rotationX: 0,
                filter: 'blur(0px)',
                duration: 0.6,
                delay: 1.5 + (i * 0.08),
                ease: 'back.out(2)',
                onStart: () => {
                    // Visuelles Feedback für jeden Buchstaben
                    this.createLetterSparkle(span);
                }
            });
            
            // Buchstaben pulsiert nach Erscheinen
            setTimeout(() => {
                gsap.to(span, {
                    scale: 1.1,
                    color: '#E0E0E0',
                    textShadow: '0 0 15px rgba(255, 255, 255, 0.8)',
                    duration: 0.3,
                    yoyo: true,
                    repeat: 1
                });
            }, 1500 + (i * 80) + 600);
        });
        
        // Text komplett - Glitzer-Effekt
        setTimeout(() => {
            this.createSilberGlitzer(typeText);
        }, 1500 + (text.length * 80) + 500);
    }

    createLetterSparkle(letter) {
        // Silberne Funken bei jedem Buchstaben
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                const spark = document.createElement('div');
                const rect = letter.getBoundingClientRect();
                
                spark.style.cssText = `
                    position: fixed;
                    width: 3px;
                    height: 3px;
                    background: #FFFFFF;
                    border-radius: 50%;
                    left: ${rect.left + Math.random() * rect.width}px;
                    top: ${rect.top + Math.random() * rect.height}px;
                    pointer-events: none;
                    z-index: 9998;
                    filter: blur(1px);
                    box-shadow: 0 0 5px #FFFFFF;
                `;
                
                document.body.appendChild(spark);
                
                // Funken-Animation
                gsap.to(spark, {
                    x: (Math.random() - 0.5) * 30,
                    y: (Math.random() - 0.5) * 30,
                    opacity: 0,
                    scale: 0,
                    duration: 0.6,
                    ease: 'power2.out',
                    onComplete: () => spark.remove()
                });
            }, i * 100);
        }
    }

    createSilberGlitzer(textElement) {
        // Opulenter Glitzer-Effekt für gesamten Text
        const chars = textElement.querySelectorAll('.silber-char');
        
        // Jeder Buchstabe bekommt Glitzer
        chars.forEach((char, i) => {
            setTimeout(() => {
                // Glitzer-Partikel um Buchstaben
                for (let j = 0; j < 5; j++) {
                    setTimeout(() => {
                        const glitter = document.createElement('div');
                        const rect = char.getBoundingClientRect();
                        
                        glitter.style.cssText = `
                            position: fixed;
                            width: ${Math.random() * 4 + 2}px;
                            height: ${Math.random() * 4 + 2}px;
                            background: #FFFFFF;
                            border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
                            left: ${rect.left + Math.random() * rect.width}px;
                            top: ${rect.top + Math.random() * rect.height}px;
                            pointer-events: none;
                            z-index: 9998;
                            filter: blur(${Math.random() * 2}px);
                            box-shadow: 0 0 8px #FFFFFF;
                        `;
                        
                        document.body.appendChild(glitter);
                        
                        // Glitzer fliegt weg
                        gsap.to(glitter, {
                            x: (Math.random() - 0.5) * 100,
                            y: (Math.random() - 0.5) * 100,
                            rotation: Math.random() * 360,
                            opacity: 0,
                            scale: 0,
                            duration: 1.2,
                            ease: 'power2.out',
                            onComplete: () => glitter.remove()
                        });
                    }, j * 80);
                }
                
                // Buchstabe pulsiert stark
                gsap.to(char, {
                    scale: 1.3,
                    color: '#FFFFFF',
                    textShadow: '0 0 20px #FFFFFF, 0 0 30px rgba(255, 255, 255, 0.7)',
                    duration: 0.4,
                    yoyo: true,
                    repeat: 1,
                    ease: 'power2.inOut'
                });
            }, i * 100);
        });
        
        // SILBER REGEN nach Text-Glitzer
        setTimeout(() => {
            this.createSilberRegen();
        }, chars.length * 100 + 500);
    }

    createSilberRegen() {
        // Eleganter Silber-Regen
        for (let i = 0; i < 80; i++) {
            setTimeout(() => {
                const drop = document.createElement('div');
                drop.style.cssText = `
                    position: fixed;
                    width: 1px;
                    height: ${Math.random() * 20 + 10}px;
                    background: linear-gradient(to bottom, 
                        transparent, 
                        rgba(255, 255, 255, 0.8),
                        transparent);
                    top: -50px;
                    left: ${Math.random() * 100}vw;
                    opacity: 0.7;
                    z-index: 9997;
                    filter: blur(1px);
                `;
                
                document.body.appendChild(drop);
                
                // Regentropfen fallen
                gsap.to(drop, {
                    y: window.innerHeight + 100,
                    duration: Math.random() * 2 + 1,
                    ease: 'power1.in',
                    opacity: 0,
                    onComplete: () => drop.remove()
                });
            }, i * 30);
        }
    }

    dramaticPreloaderExit(preloader, logo, textElement) {
        console.log('Preloader-Ausblendung startet');
        
        // 1. Strahlen verschwinden
        document.querySelectorAll('.silber-ray').forEach(ray => {
            gsap.to(ray, {
                opacity: 0,
                height: 0,
                duration: 0.8,
                ease: 'power2.in'
            });
        });
        
        // 2. Text verschwindet spektakulär
        const chars = textElement.querySelectorAll('.silber-char');
        chars.forEach((char, i) => {
            gsap.to(char, {
                y: -100,
                opacity: 0,
                rotationX: 180,
                filter: 'blur(10px)',
                color: '#FFFFFF',
                duration: 0.6,
                delay: i * 0.02,
                ease: 'power2.in'
            });
        });
        
        // 3. Logo implodiert
        gsap.to(logo, {
            scale: 0,
            opacity: 0,
            rotation: 180,
            filter: 'blur(15px) brightness(0)',
            duration: 1,
            ease: 'power2.in',
            delay: 0.5
        });
        
        // 4. Preloader selbst ausblenden
        setTimeout(() => {
            gsap.to(preloader, {
                opacity: 0,
                duration: 1,
                ease: 'power2.inOut',
                onComplete: () => {
                    preloader.style.display = 'none';
                    console.log('✨ Preloader komplett ausgeblendet');
                }
            });
        }, 1000);
    }

    // ================= HAUPT-ANIMATIONEN =================
    createMainAnimations() {
        console.log('Haupt-Animationen starten');
        
        // Logo auf Startseite animieren
        this.animateMainLogo();
        
        // Text-Animationen
        this.animateTextElements();
        
        // Hintergrund-Effekte
        this.createSilberHintergrund();
        
        // Interaktive Effekte
        this.createInteraktionen();
    }

    animateMainLogo() {
        const logo = document.querySelector('.logo');
        if (!logo) return;
        
        // Schwebe-Animation
        gsap.to(logo, {
            y: -15,
            duration: 3,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        });
        
        // Periodischer Glanz
        setInterval(() => {
            gsap.to(logo, {
                filter: 'brightness(1.4) drop-shadow(0 0 15px rgba(255, 255, 255, 0.4))',
                duration: 0.8,
                yoyo: true,
                repeat: 1
            });
        }, 7000);
    }

    animateTextElements() {
        // Kalligrafie-Text spektakulär
        const kalligrafie = document.querySelector('.kalligrafie-text');
        if (kalligrafie) {
            // Pulsierender Text-Shadow
            gsap.to(kalligrafie, {
                textShadow: '0 0 15px rgba(255, 255, 255, 0.6), 0 0 25px rgba(255, 255, 255, 0.3)',
                duration: 2,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut'
            });
        }
        
        // Alle Inhalte nacheinander einblenden
        gsap.utils.toArray('.inhalt > *').forEach((section, i) => {
            gsap.from(section, {
                opacity: 0,
                y: 50,
                duration: 1,
                delay: i * 0.2,
                ease: 'power3.out'
            });
        });
    }

    createSilberHintergrund() {
        // Schwebende Silber-Partikel
        const container = document.createElement('div');
        container.id = 'silber-particles';
        container.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
            overflow: hidden;
        `;
        document.body.appendChild(container);
        
        // Partikel erstellen
        for (let i = 0; i < 60; i++) {
            const particle = document.createElement('div');
            particle.className = 'silber-particle';
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 3 + 1}px;
                height: ${Math.random() * 3 + 1}px;
                background: rgba(255, 255, 255, ${Math.random() * 0.2 + 0.05});
                border-radius: 50%;
                top: ${Math.random() * 100}vh;
                left: ${Math.random() * 100}vw;
                filter: blur(${Math.random()}px);
            `;
            
            container.appendChild(particle);
            
            // Schwebe-Animation
            gsap.to(particle, {
                x: (Math.random() - 0.5) * 150,
                y: (Math.random() - 0.5) * 150,
                duration: Math.random() * 15 + 10,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
                delay: Math.random() * 5
            });
        }
    }

    createInteraktionen() {
        // Navigation Hover-Effekte
        document.querySelectorAll('.hauptnavigation a').forEach(link => {
            link.addEventListener('mouseenter', () => {
                gsap.to(link, {
                    scale: 1.1,
                    color: '#FFFFFF',
                    textShadow: '0 0 10px #FFFFFF',
                    duration: 0.3,
                    ease: 'back.out(1.7)'
                });
            });
            
            link.addEventListener('mouseleave', () => {
                gsap.to(link, {
                    scale: 1,
                    color: '',
                    textShadow: '',
                    duration: 0.3
                });
            });
        });
        
        // Social Media Icons
        document.querySelectorAll('.social-link').forEach(icon => {
            icon.addEventListener('mouseenter', () => {
                gsap.to(icon, {
                    y: -8,
                    scale: 1.15,
                    rotation: 15,
                    duration: 0.4,
                    ease: 'back.out(1.7)'
                });
                
                // Icon weiß färben
                const svg = icon.querySelector('svg');
                if (svg) {
                    gsap.to(svg, {
                        fill: '#FFFFFF',
                        duration: 0.3
                    });
                }
            });
            
            icon.addEventListener('mouseleave', () => {
                gsap.to(icon, {
                    y: 0,
                    scale: 1,
                    rotation: 0,
                    duration: 0.3
                });
                
                const svg = icon.querySelector('svg');
                if (svg) {
                    gsap.to(svg, {
                        fill: '',
                        duration: 0.3
                    });
                }
            });
        });
    }
}

// Initialisierung
document.addEventListener('DOMContentLoaded', () => {
    new SilberAnimations();
});
