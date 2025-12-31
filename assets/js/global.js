    // ================= PRELOADER (nur auf bestimmten Seiten) =================
    const preloader = document.getElementById('preloader');
    const typeTextElement = document.getElementById('type-text');
    
    if (preloader && pagesWithPreloader.includes(currentPage)) {
        // Preloader nur auf index.html, impressum.html und datenschutz.html
        if (typeTextElement) {
            const text = "Matthias Silberhain";
            let index = 0;
            const typingSpeed = 70; // Schneller: 70ms statt 100ms
            const delayBeforeRemove = 800; // Stark reduziert: 800ms statt 3000ms
            
            function typeWriter() {
                if (index < text.length) {
                    typeTextElement.innerHTML += text.charAt(index);
                    index++;
                    setTimeout(typeWriter, typingSpeed);
                } else {
                    // Kurze Pause, dann sofort ausblenden
                    setTimeout(() => {
                        preloader.classList.add('loaded');
                        setTimeout(() => {
                            preloader.style.display = 'none';
                        }, 400); // Schnelleres Fade-Out
                    }, delayBeforeRemove);
                }
            }
            
            // Schnellerer Start
            setTimeout(typeWriter, 300);
        } else {
            // Fallback ohne Typing-Effekt
            setTimeout(() => {
                preloader.classList.add('loaded');
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 400);
            }, 1200); // Stark reduziert
        }
    } else if (preloader) {
        // Auf anderen Seiten: Preloader sofort ausblenden
        preloader.style.display = 'none';
        
        // Spezielle Animation für andere Seiten
        if (pagesWithSpecialAnimations.includes(currentPage)) {
            // Sofortige Animation ohne Verzögerung
            body.style.opacity = '0';
            body.style.transition = 'opacity 0.6s ease-in-out';
            body.style.opacity = '1';
            
            // Sofortige Scroll-Animation für Abschnitte
            const sections = document.querySelectorAll('.inhalt > *');
            sections.forEach((section, index) => {
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
                section.style.transition = `opacity 0.5s ease ${index * 0.15}s, transform 0.5s ease ${index * 0.15}s`;
                
                setTimeout(() => {
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }, 50);
            });
        }
    }
