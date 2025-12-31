/**
 * PRELOADER FUNKTIONALITÄT
 */

document.addEventListener('DOMContentLoaded', function() {
    const preloader = document.getElementById('preloader');
    
    // Text-Animation für Preloader
    function animatePreloaderText() {
        const text = "Erkunde die tiefsten Geheimnisse der Seele...";
        const textElement = document.querySelector('.preloader-text');
        const cursor = document.querySelector('.cursor');
        let index = 0;
        
        if (!textElement) return;
        
        textElement.textContent = '';
        
        function typeWriter() {
            if (index < text.length) {
                textElement.textContent += text.charAt(index);
                index++;
                setTimeout(typeWriter, 50); // Geschwindigkeit anpassen
            } else {
                // Text fertig, Cursor entfernen nach kurzer Zeit
                setTimeout(() => {
                    if (cursor) cursor.style.display = 'none';
                }, 1000);
            }
        }
        
        // Starte Animation nach kurzer Verzögerung
        setTimeout(typeWriter, 800);
    }
    
    // Preloader ausblenden
    function hidePreloader() {
        if (!preloader) return;
        
        // Warte bis Text-Animation fertig ist
        const minDisplayTime = 3000; // Mindestanzeigezeit in ms
        const startTime = Date.now();
        
        function removePreloader() {
            const elapsedTime = Date.now() - startTime;
            
            if (elapsedTime >= minDisplayTime) {
                preloader.classList.add('hidden');
                
                // Entferne Preloader aus DOM nach Animation
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 600);
            } else {
                setTimeout(removePreloader, minDisplayTime - elapsedTime);
            }
        }
        
        // Starte die Prüfung
        removePreloader();
    }
    
    // Initialisierung
    animatePreloaderText();
    
    // Preloader ausblenden wenn alles geladen ist
    window.addEventListener('load', hidePreloader);
    
    // Fallback: Maximal 5 Sekunden warten
    setTimeout(hidePreloader, 5000);
});
