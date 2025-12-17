// ============================================================================
// MATTHIAS SILBERHAIN - HAUPT JAVASCRIPT
// ============================================================================

document.addEventListener("DOMContentLoaded", function() {
  
  // ========================================================================
  // PRELOADER MIT TYPEWRITER-EFFEKT
  // ========================================================================
  
  const preloader = document.getElementById("preloader");
  const typeText = document.getElementById("type-text");
  
  if (preloader && typeText) {
    const text = "MATTHIAS SILBERHAIN";
    let charIndex = 0;
    const typingSpeed = 100;
    const minDisplayTime = 2000;
    const startTime = Date.now();
    
    function typeWriter() {
      if (charIndex < text.length) {
        typeText.textContent += text.charAt(charIndex);
        charIndex++;
        setTimeout(typeWriter, typingSpeed);
      } else {
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(0, minDisplayTime - elapsedTime);
        
        setTimeout(function() {
          preloader.style.opacity = "0";
          preloader.style.transition = "opacity 0.6s ease";
          
          setTimeout(function() {
            preloader.style.display = "none";
            document.body.style.overflow = "auto";
          }, 600);
        }, remainingTime);
      }
    }
    
    setTimeout(typeWriter, 300);
  } else {
    if (preloader) preloader.style.display = "none";
    document.body.style.overflow = "auto";
  }
  
  // ========================================================================
  // BURGER-MENÜ FUNKTIONALITÄT
  // ========================================================================
  
  const burgerButton = document.getElementById("burger");
  const navigation = document.getElementById("navigation");
  
  if (burgerButton && navigation) {
    
    burgerButton.addEventListener("click", function() {
      burgerButton.classList.toggle("aktiv");
      navigation.classList.toggle("aktiv");
      
      if (navigation.classList.contains("aktiv")) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }
    });
    
    // Menü schließen bei Klick auf Nav-Link
    const navLinks = navigation.querySelectorAll("a");
    navLinks.forEach(function(link) {
      link.addEventListener("click", function() {
        burgerButton.classList.remove("aktiv");
        navigation.classList.remove("aktiv");
        document.body.style.overflow = "auto";
      });
    });
    
    // Menü schließen bei Klick außerhalb
    document.addEventListener("click", function(event) {
      if (navigation.classList.contains("aktiv") && 
          !navigation.contains(event.target) && 
          !burgerButton.contains(event.target)) {
        burgerButton.classList.remove("aktiv");
        navigation.classList.remove("aktiv");
        document.body.style.overflow = "auto";
      }
    });
    
    // Menü schließen mit ESC-Taste
    document.addEventListener("keydown", function(event) {
      if (event.key === "Escape" && navigation.classList.contains("aktiv")) {
        burgerButton.classList.remove("aktiv");
        navigation.classList.remove("aktiv");
        document.body.style.overflow = "auto";
      }
    });
    
    // Menü automatisch schließen bei Resize zu Desktop
    window.addEventListener("resize", function() {
      if (window.innerWidth > 768 && navigation.classList.contains("aktiv")) {
        burgerButton.classList.remove("aktiv");
        navigation.classList.remove("aktiv");
        document.body.style.overflow = "auto";
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
      
      if (targetId !== "#" && targetId.length > 1) {
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          event.preventDefault();
          
          const headerHeight = document.querySelector(".header").offsetHeight || 0;
          const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
          
          window.scrollTo({
            top: targetPosition - headerHeight - 20,
            behavior: "smooth"
          });
          
          if (history.pushState) {
            history.pushState(null, null, targetId);
          }
        }
      }
    });
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
  
  console.log("Matthias Silberhain Website erfolgreich initialisiert");
});

// ============================================================================
// WINDOW LOAD EVENT (NACH ALLEN RESSOURCEN)
// ============================================================================

window.addEventListener("load", function() {
  console.log("Alle Ressourcen geladen");
});
