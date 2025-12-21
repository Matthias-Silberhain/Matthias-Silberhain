// ============================================================================
// KARUSSELL UND BEWERTUNG FÜR WERKE.HTML
// ============================================================================

(function() {
  'use strict';

  console.log('📚 Werke Script geladen');

  // 1. KARUSSELL
  function initKarussell() {
    const karussell = document.querySelector('.karussell');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.karussell-btn.prev');
    const nextBtn = document.querySelector('.karussell-btn.next');
    const dots = document.querySelectorAll('.dot');

    if (!karussell || slides.length === 0) {
      console.log('⚠️ Kein Karussell gefunden');
      return;
    }

    let currentSlide = 0;
    const totalSlides = slides.length;

    function updateKarussell() {
      karussell.style.transform = `translateX(-${currentSlide * 100}%)`;

      // Dots aktualisieren
      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
      });
    }

    // Vorheriger Button
    if (prevBtn) {
      prevBtn.addEventListener('click', function() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateKarussell();
      });
    }

    // Nächster Button
    if (nextBtn) {
      nextBtn.addEventListener('click', function() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateKarussell();
      });
    }

    // Dots
    dots.forEach((dot, index) => {
      dot.addEventListener('click', function() {
        currentSlide = index;
        updateKarussell();
      });
    });

    // Auto-Play (optional)
    let autoplay = setInterval(() => {
      currentSlide = (currentSlide + 1) % totalSlides;
      updateKarussell();
    }, 5000);

    // Pause bei Hover
    karussell.addEventListener('mouseenter', () => {
      clearInterval(autoplay);
    });

    karussell.addEventListener('mouseleave', () => {
      autoplay = setInterval(() => {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateKarussell();
      }, 5000);
    });

    console.log('✅ Karussell initialisiert');
  }

  // 2. BEWERTUNG (Sterne)
  function initBewertung() {
    const sterneContainer = document.querySelector('.sterne');
    const sterne = document.querySelectorAll('.stern');
    const bewertungWert = document.querySelector('.bewertung-wert');

    if (!sterneContainer) {
      console.log('⚠️ Kein Bewertungselement gefunden');
      return;
    }

    // Lade gespeicherte Bewertung
    let currentBewertung = localStorage.getItem('leseprobe-bewertung') || 0;
    updateSterne(currentBewertung);

    // Sterne anklickbar
    sterne.forEach(star => {
      star.addEventListener('click', function() {
        const value = this.getAttribute('data-value');
        currentBewertung = value;
        updateSterne(value);
        localStorage.setItem('leseprobe-bewertung', value);
      });
    });

    function updateSterne(value) {
      sterne.forEach(star => {
        if (star.getAttribute('data-value') <= value) {
          star.classList.add('active');
        } else {
          star.classList.remove('active');
        }
      });

      if (bewertungWert) {
        bewertungWert.textContent = value;
      }
    }

    console.log('✅ Bewertung initialisiert');
  }

  // 3. INITIALISIERE ALLES
  function initAll() {
    initKarussell();
    initBewertung();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }

})();
