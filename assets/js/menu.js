// ============================================================================
// MATTHIAS SILBERHAIN - HAUPT JAVASCRIPT
// ============================================================================

document.addEventListener("DOMContentLoaded", function() {
  
  // ========================================================================
  // PRELOADER MIT TYPEWRITER-EFFEKT
  // ========================================================================
  
  const preloader = document.getElementById("preloader");
  const typeText = document.getElementById("type-text");
  
  function hidePreloader() {
    // Fade-out Effekt hinzufügen
    preloader.classList.add('fade-out');
    
    // Nach Fade-out komplett ausblenden
    setTimeout(() => {
      preloader.style.display = 'none';
      document.body.style.overflow = 'visible';
    }, 500); // Gleiche Zeit wie CSS transition
    
    // Event für andere Scripts
    window.dispatchEvent(new CustomEvent("preloaderComplete"));
  }
  
  // Prüfen ob Preloader-Elemente existieren
  if (preloader && typeText) {
    
    // Standard: Preloader anzeigen
    preloader.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    const text = "MATTHIAS SILBERHAIN";
    let charIndex = 0;
    const typingSpeed = 100; // Geschwindigkeit in Millisekunden
    const minDisplayTime = 1500; // Mindestzeit in ms
    
    // Startzeit speichern für Mindest-Anzeigezeit
    const startTime = Date.now();
    
    // Typewriter-Funktion
    function typeWriter() {
      if (charIndex < text.length) {
        // Zeichen für Zeichen hinzufügen
        typeText.textContent += text.charAt(charIndex);
        charIndex++;
        
        // Nächstes Zeichen mit Verzögerung
        setTimeout(typeWriter, typingSpeed);
      } else {
        // Text vollständig - Mindest-Anzeigezeit berechnen
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(0, minDisplayTime - elapsedTime);
        
        // Preloader nach Mindestzeit ausblenden
        setTimeout(function() {
          hidePreloader();
        }, remainingTime);
      }
    }
    
    // Typewriter mit kurzer Verzögerung starten
    setTimeout(typeWriter, 300);
    
  } else {
    // Fallback: Preloader sofort ausblenden wenn Elemente fehlen
    console.warn("Preloader-Elemente nicht gefunden");
    if (preloader) {
      preloader.style.display = 'none';
    }
    document.body.style.overflow = 'visible';
  }
  
  // ========================================================================
  // BURGER-MENÜ FUNKTIONALITÄT
  // ========================================================================
  
  const burgerButton = document.getElementById("burger");
  const navigation = document.getElementById("navigation");
  
  if (burgerButton && navigation) {
    
    let isMenuOpen = false;
    
    // Burger-Menü Toggle
    burgerButton.addEventListener("click", function(event) {
      event.stopPropagation();
      
      isMenuOpen = !isMenuOpen;
      
      // Navigation ein-/ausblenden
      navigation.classList.toggle("aktiv");
      burgerButton.classList.toggle("aktiv");
      
      if (isMenuOpen) {
        // Body-Scroll sperren
        document.body.style.overflow = "hidden";
      } else {
        // Body-Scroll freigeben
        document.body.style.overflow = "";
      }
      
      // ARIA-Attribute aktualisieren
      burgerButton.setAttribute("aria-expanded", isMenuOpen);
    });
    
    // Menü schließen bei Klick auf Nav-Link
    const navLinks = navigation.querySelectorAll("a");
    navLinks.forEach(function(link) {
      link.addEventListener("click", function() {
        if (window.innerWidth <= 768) {
          navigation.classList.remove("aktiv");
          burgerButton.classList.remove("aktiv");
          
          isMenuOpen = false;
          burgerButton.setAttribute("aria-expanded", "false");
          document.body.style.overflow = "";
        }
      });
    });
    
    // Menü schließen bei Klick außerhalb
    document.addEventListener("click", function(event) {
      if (isMenuOpen && 
          !navigation.contains(event.target) && 
          !burgerButton.contains(event.target)) {
        
        navigation.classList.remove("aktiv");
        burgerButton.classList.remove("aktiv");
        
        isMenuOpen = false;
        burgerButton.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      }
    });
    
    // Menü schließen mit ESC-Taste
    document.addEventListener("keydown", function(event) {
      if (isMenuOpen && event.key === "Escape") {
        navigation.classList.remove("aktiv");
        burgerButton.classList.remove("aktiv");
        
        isMenuOpen = false;
        burgerButton.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      }
    });
    
    // Menü automatisch schließen bei Resize zu Desktop
    window.addEventListener("resize", function() {
      if (window.innerWidth > 768 && isMenuOpen) {
        navigation.classList.remove("aktiv");
        burgerButton.classList.remove("aktiv");
        
        isMenuOpen = false;
        burgerButton.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      }
    });
  }
  
  // ========================================================================
  // FOOTER JAHR AKTUALISIEREN
  // ========================================================================
  
  const yearElement = document.getElementById("jahr");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
  
  // ========================================================================
  // SMOOTH SCROLL FÜR INTERNE LINKS
  // ========================================================================
  
  const internalLinks = document.querySelectorAll('a[href^="#"]');
  internalLinks.forEach(function(link) {
    link.addEventListener("click", function(event) {
      const targetId = this.getAttribute("href");
      
      // Nur interne Links verarbeiten (nicht # allein)
      if (targetId !== "#" && targetId.length > 1) {
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          event.preventDefault();
          
          // Header-Höhe berücksichtigen
          const headerHeight = document.querySelector(".header").offsetHeight || 0;
          const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
          
          // Smooth Scroll
          window.scrollTo({
            top: targetPosition - headerHeight - 20,
            behavior: "smooth"
          });
        }
      }
    });
  });
  
  // ========================================================================
  // PERFORMANCE OPTIMIERUNGEN
  // ========================================================================
  
  // Font Loading Optimierung
  if ("fonts" in document) {
    document.fonts.ready.then(function() {
      document.documentElement.classList.add("fonts-loaded");
    });
  }
  
  // Resize Debounce für Performance
  let resizeTimeout;
  window.addEventListener("resize", function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function() {
      // Hier könnten Resize-abhängige Funktionen hin
    }, 250);
  });
  
  // ========================================================================
  // FEHLERBEHANDLUNG
  // ========================================================================
  
  window.addEventListener("error", function(event) {
    console.error("JavaScript Fehler:", event.error);
  });
  
  window.addEventListener("unhandledrejection", function(event) {
    console.error("Unbehandelte Promise-Ablehnung:", event.reason);
  });
  
  // ========================================================================
  // INITIALISIERUNGS-KONSOLE LOG
  // ========================================================================
  
  console.log("Matthias Silberhain Website erfolgreich geladen");
});

// ============================================================================
// WINDOW LOAD EVENT (NACH ALLEN RESSOURCEN)
// ============================================================================

window.addEventListener("load", function() {
  // Zusätzliche Initialisierung nach vollständigem Laden
  console.log("Alle Ressourcen geladen");
  
  // Fallback: Falls Preloader noch sichtbar ist, nach 4 Sekunden ausblenden
  setTimeout(() => {
    const preloader = document.getElementById('preloader');
    if (preloader && preloader.style.display !== 'none') {
      console.log('Fallback: Preloader manuell ausgeblendet');
      preloader.classList.add('fade-out');
      setTimeout(() => {
        preloader.style.display = 'none';
        document.body.style.overflow = 'visible';
      }, 500);
    }
  }, 4000);
  
  // Service Worker Registrierung (optional für PWA)
  if ("serviceWorker" in navigator && window.location.protocol === "https:") {
    navigator.serviceWorker.register("/service-worker.js")
      .then(function(registration) {
        console.log("ServiceWorker registriert:", registration.scope);
      })
      .catch(function(error) {
        console.log("ServiceWorker Registrierung fehlgeschlagen:", error);
      });
  }
});
