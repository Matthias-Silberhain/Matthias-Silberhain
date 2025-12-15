window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");

  preloader.classList.add("fade-out");

  setTimeout(() => {
    preloader.style.display = "none";
  }, 600); // deutlich kürzer
});

// Mobile Menü
const burger = document.getElementById("burger");
const navigation = document.getElementById("navigation");

burger.addEventListener("click", () => {
  navigation.classList.toggle("aktiv");
  burger.classList.toggle("aktiv");
});

// Jahr im Footer
document.getElementById("jahr").textContent = new Date().getFullYear();
