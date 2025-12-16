document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     TYPEWRITER PRELOADER - LOGO GETRENNT
  ========================= */

  const text = "MATTHIAS SILBERHAIN";
  const textEl = document.getElementById("type-text");
  const cursor = document.querySelector(".cursor");
  const preloader = document.getElementById("preloader");
  const preloaderLogo = document.querySelector(".preloader-logo");

  // Prüfen ob Elemente existieren
  if (!textEl || !cursor || !preloader || !preloaderLogo) {
    console.error("Preloader Elemente fehlen!");
    return;
  }

  // Logo SOFORT sichtbar machen (bleibt stehen)
  preloaderLogo.style.opacity = "1";
  
  let index = 0;
  const speed = 80;

  function typeWriter() {
    if (index < text.length) {
      textEl.textContent += text.charAt(index);
      index++;
      setTimeout(typeWriter, speed);
    } else {
      // Cursor ausblenden
      cursor.style.display = "none";
      
      // Kurz warten dann Preloader ausblenden
      setTimeout(() => {
        preloader.style.opacity = "0";
      }, 800);
      
      // Preloader komplett entfernen
      setTimeout(() => {
        preloader.style.display = "none";
      }, 1200);
    }
  }

  // Start Typewriter mit kurzer Verzögerung (Logo ist schon da)
  setTimeout(typeWriter, 300);

  /* =========================
     BURGER MENÜ
  ========================= */

  const burger = document.getElementById("burger");
  const navigation = document.getElementById("navigation");

  if (burger && navigation) {
    burger.addEventListener("click", () => {
      navigation.classList.toggle("aktiv");
    });
  }

  /* =========================
     FOOTER JAHR
  ========================= */

  const year = document.getElementById("jahr");
  if (year) {
    year.textContent = new Date().getFullYear();
  }

});
