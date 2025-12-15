/* PRELOADER */
document.addEventListener("DOMContentLoaded", () => {
  const text = "MATTHIAS SILBERHAIN";
  const el = document.getElementById("type-text");
  let i = 0;

  const typing = setInterval(() => {
    el.textContent += text[i];
    i++;
    if (i === text.length) {
      clearInterval(typing);
      setTimeout(() => {
        document.getElementById("preloader").style.display = "none";
      }, 500);
    }
  }, 80);

  document.getElementById("jahr").textContent =
    new Date().getFullYear();
});

/* BURGER */
const burger = document.getElementById("burger");
const nav = document.getElementById("navigation");

burger.addEventListener("click", () => {
  nav.classList.toggle("aktiv");
});
