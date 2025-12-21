// ============================================================================
// WERKE.JS - Karussell und Bewertungssystem
// ============================================================================

(function() {
    'use strict';
    
    console.log('📚 Werke Script geladen');
    
    // 1. KARUSSELL FUNKTIONALITÄT
    function initKarussell() {
        const track = document.querySelector('.karussell-track');
        const items = document.querySelectorAll('.karussell-item');
        const dots = document.querySelectorAll('.dot');
        const prevBtn = document.querySelector('.karussell-btn.prev');
        const nextBtn = document.querySelector('.karussell-btn.next');
        
        if (!track || items.length === 0) {
            console.log('⚠️ Karussell Elemente nicht gefunden');
            return;
        }
        
        let currentIndex = 0;
        
        // Karussell aktualisieren
        function updateKarussell() {
            // Track position verschieben
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
            
            // Items aktivieren/deaktivieren
            items.forEach((item, index) => {
                item.classList.toggle('active', index === currentIndex);
            });
            
            // Dots aktualisieren
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
            
            console.log('🔄 Karussell aktualisiert auf Index:', currentIndex);
        }
        
        // Nächstes Buch
        function nextSlide() {
            currentIndex = (currentIndex + 1) % items.length;
            updateKarussell();
        }
        
        // Vorheriges Buch
        function prevSlide() {
            currentIndex = (currentIndex - 1 + items.length) % items.length;
            updateKarussell();
        }
        
        // Event Listener für Buttons
        if (prevBtn) prevBtn.addEventListener('click', prevSlide);
        if (nextBtn) nextBtn.addEventListener('click', nextSlide);
        
        // Event Listener für Dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentIndex = index;
                updateKarussell();
            });
        });
        
        // Auto-Rotate (optional)
        let autoRotateInterval = setInterval(nextSlide, 8000);
        
        // Auto-Rotate stoppen bei Hover
        track.addEventListener('mouseenter', () => {
            clearInterval(autoRotateInterval);
        });
        
        track.addEventListener('mouseleave', () => {
            clearInterval(autoRotateInterval);
            autoRotateInterval = setInterval(nextSlide, 8000);
        });
        
        console.log('✅ Karussell initialisiert');
    }
    
    // 2. BEWERTUNGSSYSTEM (Client-seitig mit localStorage)
    function initBewertungssystem() {
        const sterneContainer = document.querySelector('.sterne');
        const bewertungswert = document.querySelector('.bewertungs-wert');
        const anzahlBewertungen = document.querySelector('.anzahl-bewertungen');
        const kommentarTextarea = document.getElementById('leseprobeKommentar');
        const zeichenCount = document.querySelector('.zeichen-count');
        const sendenBtn = document.getElementById('kommentarSenden');
        
        if (!sterneContainer) {
            console.log('⚠️ Bewertungssystem nicht gefunden');
            return;
        }
        
        // Bewertung aus localStorage laden
        let bewertungen = JSON.parse(localStorage.getItem('ms-bewertungen')) || {
            durchschnitt: 0,
            anzahl: 0,
            kommentare: []
        };
        
        // Aktuelle Bewertung
        let aktuelleBewertung = 0;
        
        // Sterne aktualisieren
        function updateSterneAnzeige() {
            const sterne = sterneContainer.querySelectorAll('.stern');
            
            sterne.forEach((stern, index) => {
                if (index < aktuelleBewertung) {
                    stern.style.color = '#ffd700'; // Gold für aktive Sterne
                    stern.style.textShadow = '0 0 10px rgba(255, 215, 0, 0.5)';
                } else {
                    stern.style.color = '#666'; // Grau für inaktive Sterne
                    stern.style.textShadow = 'none';
                }
            });
            
            if (bewertungswert) {
                bewertungswert.textContent = aktuelleBewertung;
            }
            
            if (anzahlBewertungen) {
                anzahlBewertungen.textContent = bewertungen.anzahl;
            }
        }
        
        // Sterne Event Listener
        const sterne = sterneContainer.querySelectorAll('.stern');
        sterne.forEach(star => {
            star.addEventListener('click', (e) => {
                aktuelleBewertung = parseInt(e.target.dataset.value);
                updateSterneAnzeige();
                console.log('⭐ Bewertung:', aktuelleBewertung, 'Sterne');
            });
            
            star.addEventListener('mouseover', (e) => {
                const hoverValue = parseInt(e.target.dataset.value);
                const tempSterne = sterneContainer.querySelectorAll('.stern');
                
                tempSterne.forEach((s, index) => {
                    if (index < hoverValue) {
                        s.style.color = '#ffd700';
                        s.style.textShadow = '0 0 10px rgba(255, 215, 0, 0.5)';
                    } else {
                        s.style.color = '#666';
                        s.style.textShadow = 'none';
                    }
                });
            });
            
            star.addEventListener('mouseout', () => {
                updateSterneAnzeige();
            });
        });
        
        // Zeichenzähler für Kommentar
        if (kommentarTextarea && zeichenCount) {
            kommentarTextarea.addEventListener('input', () => {
                const length = kommentarTextarea.value.length;
                zeichenCount.textContent = `${length}/500 Zeichen`;
                
                if (length > 500) {
                    kommentarTextarea.value = kommentarTextarea.value.substring(0, 500);
                    zeichenCount.textContent = '500/500 Zeichen';
                    zeichenCount.style.color = '#ff6b6b';
                } else if (length > 450) {
                    zeichenCount.style.color = '#ffa726';
                } else {
                    zeichenCount.style.color = '#b0b5bc';
                }
            });
        }
        
        // Kommentar senden
        if (sendenBtn) {
            sendenBtn.addEventListener('click', () => {
                if (aktuelleBewertung === 0) {
                    alert('Bitte geben Sie zuerst eine Bewertung ab, indem Sie auf die Sterne klicken.');
                    return;
                }
                
                const kommentar = kommentarTextarea ? kommentarTextarea.value.trim() : '';
                
                // Neue Bewertung berechnen
                bewertungen.anzahl++;
                bewertungen.durchschnitt = (
                    (bewertungen.durchschnitt * (bewertungen.anzahl - 1) + aktuelleBewertung) / 
                    bewertungen.anzahl
                ).toFixed(1);
                
                if (kommentar) {
                    bewertungen.kommentare.push({
                        text: kommentar,
                        sterne: aktuelleBewertung,
                        datum: new Date().toISOString()
                    });
                }
                
                // In localStorage speichern
                localStorage.setItem('ms-bewertungen', JSON.stringify(bewertungen));
                
                // Erfolgsmeldung
                alert(`Vielen Dank für Ihre Bewertung!\n\nIhre Bewertung: ${aktuelleBewertung} Sterne\nGesamtdurchschnitt: ${bewertungen.durchschnitt} Sterne\nAnzahl Bewertungen: ${bewertungen.anzahl}`);
                
                // Zurücksetzen
                if (kommentarTextarea) {
                    kommentarTextarea.value = '';
                    zeichenCount.textContent = '0/500 Zeichen';
                    zeichenCount.style.color = '#b0b5bc';
                }
                
                aktuelleBewertung = 0;
                updateSterneAnzeige();
                
                console.log('✅ Bewertung gespeichert:', bewertungen);
            });
        }
        
        // Initiale Anzeige aktualisieren
        updateSterneAnzeige();
        
        console.log('✅ Bewertungssystem initialisiert');
    }
    
    // 3. DOWNLOAD BUTTON EVENT
    function initDownloadButton() {
        const downloadBtn = document.getElementById('leseprobeDownload');
        
        if (downloadBtn) {
            downloadBtn.addEventListener('click', (e) => {
                // Hier könnten Sie Analytics oder Download-Tracking einfügen
                console.log('⬇️ Leseprobe Download gestartet');
                
                // Optional: Erfolgsmeldung
                setTimeout(() => {
                    alert('Vielen Dank für Ihr Interesse! Der Download sollte beginnen.\n\nFalls der Download nicht startet, überprüfen Sie bitte Ihre Downloads.');
                }, 100);
            });
        }
    }
    
    // 4. HAUPTFUNKTION
    function initAll() {
        console.log('🚀 Starte Werke Initialisierung...');
        
        try {
            initKarussell();
            initBewertungssystem();
            initDownloadButton();
            
            console.log('✅ Werke komplett initialisiert');
        } catch (error) {
            console.error('❌ Fehler bei Werke Initialisierung:', error);
        }
    }
    
    // 5. STARTE INITIALISIERUNG
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAll);
    } else {
        setTimeout(initAll, 100);
    }
    
})();
