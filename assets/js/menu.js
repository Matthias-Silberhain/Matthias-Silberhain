document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     PRELOADER ELEMENTE
  ========================= */

  const preloader = document.getElementById("preloader");
  const logoWrapper = document.querySelector(".preloader-logo-wrapper");
  const textContainer = document.querySelector(".preloader-text");
  const textEl = document.getElementById("type-text");
  const cursor = document.querySelector(".cursor");

  /* Sicherheitscheck */
  if (!preloader || !logoWrapper || !textEl || !cursor) {
    return;
  }

  /* =========================
     LOGO SILBER-SWEEP
  ========================= */

  // kleiner Moment Ruhe, dann Licht über Logo
  setTimeout(() => {
    logoWrapper.classList.add("silver-sweep");
  }, 400);

  /* =========================
     TYPEWRITER TEXT
  ========================= */

  const text = window.innerWidth <= 600
    ? "MATTHIAS\nSILBERHAIN"
    : "MATTHIAS SILBERHAIN";

  let index = 0;
  const speed = 120;

  function typeWriter() {
    if (index < text.length) {

      if (text.charAt(index) === "\n") {
        textEl.innerHTML += "<br>";
      } else {
        textEl.innerHTML += text.charAt(index);
      }

      index++;
      setTimeout(typeWriter, speed);

    } else {

      /* Cursor stoppen */
      cursor.style.display = "none";

      /* Silber-Hauch über Text */
      textContainer.classList.add("silver-glow");

      /* Preloader ausblenden */
      setTimeout(() => {
        preloader.style.opacity = "0";
      }, 1400);

      /* Preloader entfernen */
      setTimeout(() => {
        preloader.remove();
      }, 2000);
    }
  }

  /* Schreiben startet leicht NACH Logo-Sweep */
  setTimeout(typeWriter, 900);

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
