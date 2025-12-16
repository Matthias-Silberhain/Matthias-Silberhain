// Preloader mit fortschrittlicher Typewriter-Animation
document.addEventListener('DOMContentLoaded', function() {
    const preloader = document.getElementById('enhanced-preloader');
    const typewriter = document.getElementById('silber-typewriter-text');
    const progressFill = document.querySelector('.progress-fill');
    
    if (!preloader || !typewriter) return;
    
    const texts = [
        "MATTHIAS SILBERHAIN",
        "AUTOR & DENKER",
        "STIMME DER WAHRHEIT"
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;
    
    function typeEffect() {
        const currentText = texts[textIndex];
        
        if (!isDeleting && charIndex <= currentText.length) {
            typewriter.textContent = currentText.substring(0, charIndex);
            charIndex++;
            typeSpeed = 100;
            
            // Fortschritt synchronisieren
            if (progressFill) {
                const progress = (charIndex / currentText.length) * 100;
                progressFill.style.width = Math.min(progress, 100) + '%';
            }
        } else if (isDeleting && charIndex >= 0) {
            typewriter.textContent = currentText.substring(0, charIndex);
            charIndex--;
            typeSpeed = 50;
        }
        
        // Text komplett? Dann löschen oder nächster Text
        if (!isDeleting && charIndex === currentText.length + 1) {
            isDeleting = true;
            typeSpeed = 1500; // Pause
        } else if (isDeleting && charIndex === -1) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500; // Pause zwischen Texten
        }
        
        // Letzter Durchlauf? Preloader ausblenden
        if (textIndex === texts.length - 1 && 
            !isDeleting && 
            charIndex === texts[texts.length - 1].length + 1) {
            
            setTimeout(() => {
                preloader.style.opacity = '0';
                setTimeout(() => {
                    preloader.style.display = 'none';
                    document.body.style.overflow = 'auto';
                    
                    // Hero-Animation starten
                    animateHeroElements();
                }, 800);
            }, 1000);
            return;
        }
        
        setTimeout(typeEffect, typeSpeed);
    }
    
    // Hero-Animation nach Preloader
    function animateHeroElements() {
        const headlines = document.querySelectorAll('.headline-word');
        const introTexts = document.querySelectorAll('.intro-text');
        
        headlines.forEach((word, index) => {
            word.style.opacity = '0';
            word.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                word.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                word.style.opacity = '1';
                word.style.transform = 'translateY(0)';
            }, 100 * index);
        });
        
        introTexts.forEach((text, index) => {
            text.style.opacity = '0';
            
            setTimeout(() => {
                text.style.transition = 'opacity 1s ease';
                text.style.opacity = '1';
            }, 600 + (300 * index));
        });
    }
    
    // Mobile Navigation
    const mobileToggle = document.getElementById('mobileToggle');
    const mobileNav = document.getElementById('mobileNav');
    
    if (mobileToggle && mobileNav) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            mobileNav.classList.toggle('active');
            document.body.style.overflow = 
                mobileNav.classList.contains('active') ? 'hidden' : 'auto';
        });
        
        // Menü schließen bei Klick auf Link
        document.querySelectorAll('.mobile-nav-item').forEach(item => {
            item.addEventListener('click', () => {
                mobileToggle.classList.remove('active');
                mobileNav.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });
    }
    
    // Aktuelles Jahr im Footer
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
    
    // Start Typewriter-Effekt
    setTimeout(typeEffect, 500);
});
