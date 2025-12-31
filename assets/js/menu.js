document.addEventListener('DOMContentLoaded', () => {

  const body = document.body;
  const toggle = document.getElementById('darkModeToggle');

  function apply(theme) {
    body.classList.toggle('dark-mode', theme === 'dark');
    document.documentElement.classList.toggle('dark-mode', theme === 'dark');
    localStorage.setItem('silberhain-theme', theme);
  }

  apply(localStorage.getItem('silberhain-theme') || 'light');

  toggle.addEventListener('click', () => {
    apply(body.classList.contains('dark-mode') ? 'light' : 'dark');
  });
});
