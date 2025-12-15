window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");

  // exakt nach Ende der CSS-Animation
  setTimeout(() => {
    preloader.classList.add("fade-out");

    preloader.addEventListener("animationend", () => {
      preloader.remove();
    });
  }, 2000); // muss exakt zur bestehenden Animation passen
});

// Burger-Menü
const burger = document.getElementById("burger");
const navigation = document.getElementById("navigation");

if (burger && navigation) {
  burger.addEventListener("click", () => {
    navigation.classList.toggle("aktiv");
  });
}

// Jahr im Footer
const jahr = document.getElementById("jahr");
if (jahr) {
  jahr.textContent = new Date().getFullYear();
}
