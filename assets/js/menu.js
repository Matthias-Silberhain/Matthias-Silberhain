document.addEventListener("DOMContentLoaded", () => {

  /* PRELOADER TYPEWRITER */
  const text = "MATTHIAS SILBERHAIN";
  const textEl = document.getElementById("type-text");
  const cursor = document.querySelector(".cursor");
  const preloader = document.getElementById("preloader");

  let i = 0;
  const speed = 90;

  const typing = setInterval(() => {
    textEl.textContent += text.charAt(i);
    i++;

    if (i === text.length) {
      clearInterval(typing);
      cursor.classList.add("stop");

      setTimeout(() => {
        preloader.style.opacity = "0";
      }, 600);

      setTimeout(() => {
        preloader.style.display = "none";
        document.body.classList.remove("preloader-active");
      }, 1200);
    }
  }, speed);

  /* BURGER MENÜ */
  const burger = document.getElementById("burger");
  const navigation = document.getElementById("navigation");

  burger.addEventListener("click", () => {
    navigation.classList.toggle("aktiv");
  });

  /* FOOTER JAHR */
  document.getElementById("jahr").textContent =
    new Date().getFullYear();
});
