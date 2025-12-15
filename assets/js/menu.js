document.addEventListener("DOMContentLoaded", () => {

  /* Body sperren */
  document.body.classList.add("preloader-active");

  const preloader = document.getElementById("preloader");
  const logoWrapper = document.querySelector(".preloader-logo-wrapper");
  const textContainer = document.querySelector(".preloader-text");
  const textEl = document.getElementById("type-text");
  const cursor = document.querySelector(".cursor");

  /* Logo Silber-Sweep */
  setTimeout(() => {
    logoWrapper.classList.add("silver-sweep");
  }, 400);

  /* Typewriter Text */
  const text = window.innerWidth <= 600
    ? "MATTHIAS\nSILBERHAIN"
    : "MATTHIAS SILBERHAIN";

  let i = 0;
  const speed = 120;

  function typeWriter() {
    if (i < text.length) {
      if (text[i] === "\n") {
        textEl.innerHTML += "<br>";
      } else {
        textEl.innerHTML += text[i];
      }
      i++;
      setTimeout(typeWriter, speed);
    } else {
      cursor.style.display = "none";
      textContainer.classList.add("silver-glow");

      setTimeout(() => {
        preloader.style.opacity = "0";
      }, 1200);

      setTimeout(() => {
        preloader.style.display = "none";
        document.body.classList.remove("preloader-active");
      }, 1800);
    }
  }

  setTimeout(typeWriter, 900);

  /* Burger Menü */
  const burger = document.getElementById("burger");
  const navigation = document.getElementById("navigation");

  if (burger) {
    burger.addEventListener("click", () => {
      navigation.classList.toggle("aktiv");
    });
  }

  /* Footer Jahr */
  document.getElementById("jahr").textContent =
    new Date().getFullYear();

});
