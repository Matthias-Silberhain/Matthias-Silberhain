/* =========================================================
   Matthias Silberhain – Script
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =====================================================
     FOOTER JAHR
  ===================================================== */

  const yearElement = document.getElementById("jahr");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }


  /* =====================================================
     BURGER MENU (MOBILE)
  ===================================================== */

  const burger = document.getElementById("burger");
  const navigation = document.getElementById("navigation");

  if (burger && navigation) {
    burger.addEventListener("click", () => {
      const isOpen = navigation.classList.toggle("aktiv");
      burger.setAttribute("aria-expanded", isOpen);
    });
  }


  /* =====================================================
     PRELOADER
  ===================================================== */

  const preloader = document.getElementById("preloader");

  if (preloader) {
    window.addEventListener("load", () => {

      // Dauer der Schreibanimation + kleiner Puffer
     const PRELOADER_DURATION = 3200;

      setTimeout(() => {
        preloader.classList.add("fade-out");

        // Nach Fade-Out komplett entfernen
        setTimeout(() => {
          preloader.remove();
        }, 600);

      }, PRELOADER_DURATION);

    });
  }

});
