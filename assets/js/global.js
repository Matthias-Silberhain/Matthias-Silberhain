// ============================================================================
// GLOBAL.JS - MIT PRELOADER & DARK MODE
// ============================================================================

console.log('🚀 global.js wird geladen...');

// ============================================================================
// 1. PRELOADER ANIMATION - MIT MATTHIAS SILBERHAIN
// ============================================================================

(function() {
    'use strict';
    
    console.log('🌀 Preloader initialisiert');
    
    function initPreloader() {
        const preloader = document.getElementById('preloader');
        const typeText = document.querySelector('.preloader-text');
        
        if (!preloader) {
            console.warn('⚠️ Preloader Element nicht gefunden');
            return;
        }
        
        if (!typeText) {
            console.warn('⚠️ Preloader-Text-Element nicht gefunden');
            return;
        }
        
        console.log('✅ Preloader gefunden');
        
        // Preloader sichtbar machen
        preloader.style.display = 'flex';
        preloader.style.opacity = '1';
        preloader.style.visibility = 'visible';
        
        // NEU: Text für die Typing Animation - MATTHIAS SILBERHAIN
        const fullText = "MATTHIAS SILBERHAIN";
        let charIndex = 0;
        const typingSpeed = 100; // ms pro Buchstabe
        let typingComplete = false;
        
        function typeCharacter() {
            if (charIndex < fullText.length) {
                const nextChar = fullText.charAt(charIndex);
                
                // Füge Buchstaben hinzu
                typeText.textContent += nextChar;
                charIndex++;
                
                // Nächsten Buchstaben nach kurzer Pause
                setTimeout(typeCharacter, typingSpeed);
            } else {
                // Animation beendet
                typingComplete = true;
                console.log('✅ Typing Animation für MATTHIAS SILBERHAIN abgeschlossen');
                
                // Warte kurz und verstecke Preloader
                setTimeout(() => {
                    preloader.classList.add('hidden');
                    
                    // Nach Transition entfernen
                    setTimeout(() => {
                        preloader.style.display = 'none';
                        console.log('✅ Preloader ausgeblendet');
                    }, 600);
                }, 1000); // 1 Sekunde Pause
            }
        }
        
        // Starte Typing Animation nach kurzer Verzögerung
        setTimeout(() => {
            console.log('⌨️ Starte Typing Animation für: "' + fullText + '"');
            typeText.textContent = ''; // Leeren für sauberen Start
            typeCharacter();
        }, 300);
    }
    
    // Starte Preloader Initialisierung
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            setTimeout(initPreloader, 100);
        });
    } else {
        setTimeout(initPreloader, 100);
    }
    
})();

// ============================================================================
// 2. DARK MODE - UNVERÄNDERT
// ============================================================================

(function() {
    'use strict';
    
    console.log('🌓 Dark Mode Script geladen');
    
    // [Dark Mode Code bleibt gleich - nicht geändert]
    // ... restlicher Dark Mode Code ...
    
})();

// ============================================================================
// 3. INTERAKTIVE ELEMENTE AKTIVIEREN
// ============================================================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('📄 DOM geladen');
    
    // Aktiviere interaktive Elemente nach Preloader
    setTimeout(function() {
        console.log('🖱️ Aktiviere interaktive Elemente...');
        
        const interactiveElements = ['button', 'a', '.burger', '.dark-mode-toggle', '.silber-button', '.social-link'];
        
        interactiveElements.forEach(selector => {
            document.querySelectorAll(selector).forEach(el => {
                el.style.pointerEvents = 'auto';
                el.style.cursor = 'pointer';
            });
        });
        
        console.log('✅ Website ist jetzt voll klickbar!');
    }, 3000);
});

// ============================================================================
// 4. JAHRESZAHL IM FOOTER
// ============================================================================

document.addEventListener('DOMContentLoaded', function() {
    const yearElement = document.getElementById('jahr');
    if (yearElement && !yearElement.textContent) {
        yearElement.textContent = new Date().getFullYear();
        console.log('📅 Jahreszahl aktualisiert');
    }
});

// ============================================================================
// 5. FALLBACK: WENN PRELOADER NICHT FUNKTIONIERT
// ============================================================================

// Sicherheits-Fallback: Nach 10 Sekunden Preloader erzwingen
setTimeout(function() {
    const preloader = document.getElementById('preloader');
    if (preloader && preloader.style.display !== 'none') {
        console.log('⚠️ Preloader hängt, erzwinge Ausblendung...');
        preloader.style.display = 'none';
        preloader.classList.add('hidden');
    }
}, 10000);
