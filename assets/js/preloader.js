/* ==========================================================================
   PRELOADER ANIMATION - VOICE OF SILENCE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function() {
    console.log('🔤 Preloader Typing Animation gestartet');
    
    const preloader = document.getElementById('preloader');
    const preloaderText = document.querySelector('.preloader-text');
    
    if (!preloader || !preloaderText) {
        console.warn('Preloader Elemente nicht gefunden');
        return;
    }
    
    // Korrekter Text für den Preloader
    const fullText = "VOICE OF SILENCE";
    let currentIndex = 0;
    
    // Ersetze den statischen Text durch leeren Container
    preloaderText.textContent = '';
    
    // Typing Animation Funktion
    function typeNextCharacter() {
        if (currentIndex < fullText.length) {
            const nextChar = fullText.charAt(currentIndex);
            preloaderText.textContent += nextChar;
            currentIndex++;
            
            // Verschiedene Geschwindigkeiten für bessere Animation
            let delay = 120; // Standardgeschwindigkeit
            
            // Langsamere Geschwindigkeit für Leerzeichen
            if (nextChar === ' ') {
                delay = 80;
            }
            // Etwas schneller für Vokale
            else if ('AEIOU'.includes(nextChar)) {
                delay = 90;
            }
            // Etwas langsamer für Konsonanten
            else {
                delay = 130;
            }
            
            setTimeout(typeNextCharacter, delay);
        } else {
            // Animation abgeschlossen
            console.log('✅ Typing Animation abgeschlossen');
            
            // Warte kurz und verstecke Preloader
            setTimeout(function() {
                preloader.classList.add('hidden');
                
                // Optional: Nach Transition entfernen
                setTimeout(function() {
                    preloader.style.display = 'none';
                }, 600);
            }, 1500); // 1.5 Sekunden Pause
        }
    }
    
    // Starte Animation nach kurzer Verzögerung
    setTimeout(typeNextCharacter, 500);
});

// Fallback: Preloader nach 5 Sekunden ausblenden, falls Animation hängt
setTimeout(function() {
    const preloader = document.getElementById('preloader');
    if (preloader && !preloader.classList.contains('hidden')) {
        console.log('⚠️ Preloader-Fallback aktiviert');
        preloader.classList.add('hidden');
        setTimeout(function() {
            preloader.style.display = 'none';
        }, 600);
    }
}, 5000);
