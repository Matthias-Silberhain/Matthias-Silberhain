document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     TYPEWRITER PRELOADER
  ========================= */

  const text = "MATTHIAS SILBERHAIN";
  const textEl = document.getElementById("type-text");
  const cursor = document.querySelector(".cursor");
  const preloader = document.getElementById("preloader");

  let index = 0;

  /* SCHREIBGESCHWINDIGKEIT */
  const speed = 110; // vorher 70 → jetzt ruhiger

  function typeWriter() {
    if (index < text.length) {
      textEl.textContent += text.charAt(index);
      index++;
      setTimeout(typeWriter, speed);
    } else {
      /* CURSOR STOPPEN */
      cursor.style.display = "none";

      /* KURZE WIRKUNGSPAUSE */
      setTimeout(() => {
        preloader.style.opacity = "0";
      }, 900); // vorher 200

      /* PRELOADER ENTFERNEN */
      setTimeout(() => {
        preloader.remove();
      }, 1400); // vorher 600
    }
  }

  typeWriter();

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
