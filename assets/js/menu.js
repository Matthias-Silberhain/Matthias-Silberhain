document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     PRELOADER / LOGO
  ========================= */

  const preloader = document.getElementById("preloader");
  const logo = document.querySelector(".preloader-logo");
  const textContainer = document.querySelector(".preloader-text");
  const textEl = document.getElementById("type-text");
  const cursor = document.querySelector(".cursor");

  /* Logo „zeichnen“ starten */
  if (logo) {
    logo.classList.add("draw");
  }

  /* =========================
     TYPEWRITER TEXT
  ========================= */

  // Desktop: einzeilig | Mobile: zweizeilig
  const text = window.innerWidth <= 600
    ? "MATTHIAS\nSILBERHAIN"
    : "MATTHIAS SILBERHAIN";

  let index = 0;
  const speed = 110;

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

      /* Silberner Licht-Hauch */
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

  /* Typewriter leicht verzögert starten,
     damit Logo zuerst „gemalt“ wird */
  setTimeout(typeWriter, 600);

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
