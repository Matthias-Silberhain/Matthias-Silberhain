/* =====================================
   PRELOADER – sicher & browserstabil
===================================== */

window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");

  if (!preloader) return;

  // kleine dramaturgische Pause nach Animation
  setTimeout(() => {
    preloader.classList.add("fade-out");

    // Preloader wirklich entfernen (wichtig!)
    setTimeout(() => {
      preloader.style.display = "none";
    }, 1400);

  }, 3600);
});


/* =====================================
   MOBILES MENÜ
===================================== */

document.addEventListener("DOMContentLoaded", () => {
  const burger = document.getElementById("burger");
  const nav = document.getElementById("navigation");

  if (!burger || !nav) return;

  burger.addEventListener("click", () => {
    burger.classList.toggle("aktiv");
    nav.classList.toggle("offen");
  });
});


/* =====================================
   COPYRIGHT JAHR
===================================== */

document.addEventListener("DOMContentLoaded", () => {
  const jahr = document.getElementById("jahr");
  if (jahr) {
    jahr.textContent = new Date().getFullYear();
  }
});
