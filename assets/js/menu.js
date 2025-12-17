document.addEventListener("DOMContentLoaded", () => {

  /* ================= PRELOADER ================= */
  const preloader = document.getElementById("preloader");
  const typeText = document.getElementById("type-text");
  const cursor = document.querySelector(".cursor");

  if (preloader && typeText && cursor) {
    const text = "MATTHIAS SILBERHAIN";
    let index = 0;

    const type = () => {
      if (index < text.length) {
        typeText.textContent += text[index++];
        setTimeout(type, 90);
      } else {
        cursor.classList.add("done");
        setTimeout(() => preloader.classList.add("hidden"), 800);
      }
    };

    setTimeout(type, 400);
  }

  /* ================= BURGER MENU ================= */
  const burger = document.getElementById("burger");
  const nav = document.getElementById("navigation");

  if (burger && nav) {
    burger.addEventListener("click", () => {
      const open = burger.classList.toggle("open");
      nav.classList.toggle("aktiv", open);
      burger.setAttribute("aria-expanded", open);
      document.body.style.overflow = open ? "hidden" : "";
    });

    document.addEventListener("keydown", e => {
      if (e.key === "Escape") {
        burger.classList.remove("open");
        nav.classList.remove("aktiv");
        document.body.style.overflow = "";
      }
    });
  }

  /* ================= FOOTER YEAR ================= */
  const year = document.getElementById("jahr");
  if (year) year.textContent = new Date().getFullYear();
});
