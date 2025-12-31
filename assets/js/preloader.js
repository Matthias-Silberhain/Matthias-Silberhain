/**
 * PRELOADER - KORRIGIERTE VERSION
 */

document.addEventListener('DOMContentLoaded', function() {
    const preloader = document.getElementById('preloader');
    
    if (!preloader) return;
    
    // Preloader sofort interaktiv machen
    preloader.style.pointerEvents = 'auto';
    
    function hidePreloader() {
        if (!preloader) return;
        
        console.log('Preloader wird ausgeblendet');
        
        // 1. Preloader ausblenden
        preloader.classList.add('hidden');
        
        // 2. Pointer-events nach der Animation deaktivieren
        setTimeout(() => {
            preloader.style.pointerEvents = 'none';
            preloader.style.display = 'none';
            console.log('Preloader komplett entfernt');
        }, 600);
        
        // 3. Body wieder klickbar machen
        document.body.style.pointerEvents = 'auto';
    }
    
    // Warte auf alle Ressourcen
    window.addEventListener('load', function() {
        setTimeout(hidePreloader, 1500); // Mindestanzeigezeit
    });
    
    // Fallback nach 5 Sekunden
    setTimeout(hidePreloader, 5000);
});
