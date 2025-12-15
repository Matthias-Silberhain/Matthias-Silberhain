document.addEventListener("DOMContentLoaded", () => {

  const text = "MATTHIAS SILBERHAIN";
  const target = document.getElementById("type-text");
  const preloader = document.getElementById("preloader");
  let i = 0;

  function type() {
    if (i < text.length) {
      target.textContent += text.charAt(i);
      i++;
      setTimeout(type, 70);
    } else {
      setTimeout(() => {
        preloader.style.opacity = "0";
        setTimeout(() => preloader.remove(), 400);
      }, 600);
    }
  }

  type();

  const year = document.getElementById("jahr");
  if (year) year.textContent = new Date().getFullYear();
});
