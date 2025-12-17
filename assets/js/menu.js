// ============================================================================
// MATTHIAS SILBERHAIN - HAUPT JAVASCRIPT (ERWEITERTE VERSION)
// ============================================================================

document.addEventListener("DOMContentLoaded", function() {
  
  // ========================================================================
  // PRELOADER MIT TYPEWRITER-EFFEKT
  // ========================================================================
  
  const preloader = document.getElementById("preloader");
  const typeText = document.getElementById("type-text");
  const cursor = document.querySelector(".cursor");
  
  // Prüfen ob Preloader-Elemente existieren
  if (preloader && typeText && cursor) {
    
    const text = "MATTHIAS SILBERHAIN";
    let charIndex = 0;
    const typingSpeed = 90;
    const minDisplayTime = 2000;
    
    const startTime = Date.now();
    
    function typeWriter() {
      if (charIndex < text.length) {
        typeText.textContent += text.charAt(charIndex);
        charIndex++;
        setTimeout(typeWriter, typingSpeed);
      } else {
        cursor.style.animation = "none";
        cursor.style.opacity = "0";
        
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(0, minDisplayTime - elapsedTime);
        
        setTimeout(function() {
          preloader.style.opacity = "0";
          preloader.style.transition = "opacity 0.6s ease";
          
          setTimeout(function() {
            preloader.style.display = "none";
            window.dispatchEvent(new CustomEvent("preloaderComplete"));
          }, 600);
          
        }, remainingTime + 500);
      }
    }
    
    setTimeout(typeWriter, 400);
    
  } else {
    console.warn("Preloader-Elemente nicht gefunden");
    if (preloader) {
      preloader.style.display = "none";
    }
  }
  
  // ========================================================================
  // BURGER-MENÜ FUNKTIONALITÄT
  // ========================================================================
  
  const burgerButton = document.getElementById("burger");
  const navigation = document.getElementById("navigation");
  
  if (burgerButton && navigation) {
    
    let isMenuOpen = false;
    
    burgerButton.addEventListener("click", function(event) {
      event.stopPropagation();
      
      isMenuOpen = !isMenuOpen;
      navigation.classList.toggle("aktiv");
      
      const spans = burgerButton.querySelectorAll("span");
      if (isMenuOpen) {
        spans[0].style.transform = "rotate(45deg) translate(6px, 6px)";
        spans[1].style.opacity = "0";
        spans[2].style.transform = "rotate(-45deg) translate(6px, -6px)";
        document.body.style.overflow = "hidden";
      } else {
        spans[0].style.transform = "none";
        spans[1].style.opacity = "1";
        spans[2].style.transform = "none";
        document.body.style.overflow = "";
      }
      
      burgerButton.setAttribute("aria-expanded", isMenuOpen);
    });
    
    const navLinks = navigation.querySelectorAll("a");
    navLinks.forEach(function(link) {
      link.addEventListener("click", function() {
        if (window.innerWidth <= 768) {
          navigation.classList.remove("aktiv");
          const spans = burgerButton.querySelectorAll("span");
          spans[0].style.transform = "none";
          spans[1].style.opacity = "1";
          spans[2].style.transform = "none";
          isMenuOpen = false;
          burgerButton.setAttribute("aria-expanded", "false");
          document.body.style.overflow = "";
        }
      });
    });
    
    document.addEventListener("click", function(event) {
      if (isMenuOpen && 
          !navigation.contains(event.target) && 
          !burgerButton.contains(event.target)) {
        
        navigation.classList.remove("aktiv");
        const spans = burgerButton.querySelectorAll("span");
        spans[0].style.transform = "none";
        spans[1].style.opacity = "1";
        spans[2].style.transform = "none";
        isMenuOpen = false;
        burgerButton.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      }
    });
    
    document.addEventListener("keydown", function(event) {
      if (isMenuOpen && event.key === "Escape") {
        navigation.classList.remove("aktiv");
        const spans = burgerButton.querySelectorAll("span");
        spans[0].style.transform = "none";
        spans[1].style.opacity = "1";
        spans[2].style.transform = "none";
        isMenuOpen = false;
        burgerButton.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      }
    });
    
    window.addEventListener("resize", function() {
      if (window.innerWidth > 768 && isMenuOpen) {
        navigation.classList.remove("aktiv");
        const spans = burgerButton.querySelectorAll("span");
        spans[0].style.transform = "none";
        spans[1].style.opacity = "1";
        spans[2].style.transform = "none";
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
  // THEME SWITCH FUNKTIONALITÄT
  // ========================================================================
  
  const themeSwitch = document.getElementById("theme-checkbox");
  const themeLabel = document.querySelector(".theme-label");
  const body = document.body;
  
  if (themeSwitch && themeLabel) {
    // Gespeichertes Theme laden
    const savedTheme = localStorage.getItem("mts-theme");
    if (savedTheme === "light") {
      document.documentElement.setAttribute("data-theme", "light");
      themeSwitch.checked = true;
      themeLabel.textContent = "Light Mode";
    } else {
      themeLabel.textContent = "Dark Mode";
    }
    
    // Theme umschalten
    themeSwitch.addEventListener("change", function() {
      if (this.checked) {
        document.documentElement.setAttribute("data-theme", "light");
        localStorage.setItem("mts-theme", "light");
        themeLabel.textContent = "Light Mode";
      } else {
        document.documentElement.removeAttribute("data-theme");
        localStorage.setItem("mts-theme", "dark");
        themeLabel.textContent = "Dark Mode";
      }
    });
  }
  
  // ========================================================================
  // BACK TO TOP BUTTON FUNKTIONALITÄT
  // ========================================================================
  
  const backToTopButton = document.getElementById("backToTop");
  
  if (backToTopButton) {
    // Button anzeigen/verstecken basierend auf Scroll-Position
    function toggleBackToTop() {
      if (window.pageYOffset > 300) {
        backToTopButton.classList.add("show");
      } else {
        backToTopButton.classList.remove("show");
      }
    }
    
    // Beim Scrollen prüfen
    window.addEventListener("scroll", toggleBackToTop);
    
    // Beim Laden prüfen (falls schon gescrollt)
    toggleBackToTop();
    
    // Smooth Scroll nach oben
    backToTopButton.addEventListener("click", function() {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
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
  // PERFORMANCE OPTIMIERUNGEN
  // ========================================================================
  
  if ("fonts" in document) {
    document.fonts.ready.then(function() {
      document.documentElement.classList.add("fonts-loaded");
    });
  }
  
  let resizeTimeout;
  window.addEventListener("resize", function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function() {
      // Resize-abhängige Funktionen hier
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
  
  console.log("Matthias Silberhain Website erfolgreich geladen");
});

// ============================================================================
// WINDOW LOAD EVENT
// ============================================================================

window.addEventListener("load", function() {
  console.log("Alle Ressourcen geladen");
  
  // Optional: Service Worker für PWA
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
