document.addEventListener("DOMContentLoaded", function () {
  var text = "MATTHIAS SILBERHAIN";
  var target = document.getElementById("type-text");
  var preloader = document.getElementById("preloader");
  var i = 0;

  function type() {
    if (!target) {
      preloader.style.display = "none";
      return;
    }

    if (i < text.length) {
      target.textContent += text.charAt(i);
      i++;
      setTimeout(type, 70);
    } else {
      setTimeout(function () {
        preloader.style.display = "none";
      }, 400);
    }
  }

  type();

  var year = document.getElementById("jahr");
  if (year) year.textContent = new Date().getFullYear();
});
