document.addEventListener("DOMContentLoaded", () => {

  /* PRELOADER – GARANTIERTES ENDE */
  const text = "MATTHIAS SILBERHAIN";
  const el = document.getElementById("type-text");
  const preloader = document.getElementById("preloader");

  let i = 0;
  const speed = 80;

  const typing = setInterval(() => {
    el.textContent += text.charAt(i);
    i++;

    if (i >= text.length) {
      clearInterval(typing);
      setTimeout(() => {
        preloader.style.display = "none";
      }, 400);
    }
  }, speed);

  /* BURGER */
  const burger = document.getElementById("burger");
  const nav = document.getElementById("navigation");

  if (burger && nav) {
    burger.addEventListener("click", () => {
      nav.classList.toggle("aktiv");
    });
  }

  /* FOOTER JAHR */
  const jahr = document.getElementById("jahr");
  if (jahr) {
    jahr.textContent = new Date().getFullYear();
  }

});
