// ============================================================================
// GLOBAL DARK MODE - OPTIMIERT FÜR PC & MOBILE
// ============================================================================

(function() {
  'use strict';
  
  // Prüfe ob localStorage verfügbar ist
  function isLocalStorageAvailable() {
    try {
      const test = '__test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      console.warn('⚠️ LocalStorage nicht verfügbar:', e.message);
      return false;
    }
  }
  
  // Theme auf Body anwenden - MIT VERBESSERTER SPEZIFIKATION
  function applyTheme(theme) {
    const body = document.body;
    const toggleButton = document.getElementById('darkModeToggle');
    
    console.log('🎨 Apply Theme:', theme);
    
    if (theme === 'dark') {
      body.classList.add('dark-mode');
      // Zusätzliche Klasse für html Tag für bessere Kontrolle
      document.documentElement.classList.add('dark-mode-html');
      console.log('🌙 Dark Mode aktiviert');
      
      // Füge Dark Mode Klasse zu allen Hauptcontainern hinzu (sicherheitshalber)
      const containers = [
        '.header', '.inhalt', '.social-section', '.footer', 
        'main', 'section', 'article', '.startseite', '.ueber-mich'
      ];
      
      containers.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
          el.classList.add('dark-mode-element');
        });
      });
      
    } else {
      body.classList.remove('dark-mode');
      document.documentElement.classList.remove('dark-mode-html');
      console.log('☀️ Light Mode aktiviert');
      
      // Entferne Dark Mode Klassen
      const darkElements = document.querySelectorAll('.dark-mode-element');
      darkElements.forEach(el => {
        el.classList.remove('dark-mode-element');
      });
    }
    
    // Toggle Button aktualisieren
    if (toggleButton) {
      const moonIcon = toggleButton.querySelector('.moon-icon');
      const sunIcon = toggleButton.querySelector('.sun-icon');
      
      if (moonIcon && sunIcon) {
        if (theme === 'dark') {
          moonIcon.style.display = 'none';
          sunIcon.style.display = 'block';
          toggleButton.setAttribute('aria-label', 'Zum Light Mode wechseln');
          toggleButton.classList.add('dark-mode-active');
        } else {
          moonIcon.style.display = 'block';
          sunIcon.style.display = 'none';
          toggleButton.setAttribute('aria-label', 'Zum Dark Mode wechseln');
          toggleButton.classList.remove('dark-mode-active');
        }
      }
    }
    
    // Dispatch Event mit Verzögerung, damit CSS angewendet werden kann
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('themeChanged', { detail: theme }));
    }, 50);
  }
  
  // Dark Mode umschalten - MIT VERBESSERTER FEHLERBEHANDLUNG
  function toggleDarkMode() {
    const body = document.body;
    let newTheme;
    
    if (body.classList.contains('dark-mode')) {
      newTheme = 'light';
    } else {
      newTheme = 'dark';
    }
    
    console.log('🔄 Wechsle zu Theme:', newTheme);
    
    // Theme anwenden
    applyTheme(newTheme);
    
    // In localStorage speichern
    if (isLocalStorageAvailable()) {
      try {
        localStorage.setItem('ms-theme', newTheme);
        console.log('💾 Theme gespeichert:', newTheme);
      } catch (error) {
        console.warn('❌ Konnte Theme nicht speichern:', error);
      }
    }
    
    return newTheme;
  }
  
  // Initialisierung - MIT VERBESSERTER LOGIK
  function initGlobalDarkMode() {
    console.log('🌓 Global Dark Mode wird initialisiert...');
    console.log('🖥️ User Agent:', navigator.userAgent);
    
    const body = document.body;
    const darkModeToggle = document.getElementById('darkModeToggle');
    
    if (!darkModeToggle) {
      console.error('❌ Dark Mode Toggle nicht gefunden!');
      // Versuche alternativ zu finden
      const alternativeToggle = document.querySelector('.dark-mode-toggle');
      if (alternativeToggle) {
        console.log('✅ Alternative Toggle gefunden');
        alternativeToggle.id = 'darkModeToggle';
      } else {
        console.warn('⚠️ Kein Dark Mode Toggle auf dieser Seite');
        return;
      }
    }
    
    // Lade gespeichertes Theme mit Standard auf "light"
    let currentTheme = 'light';
    
    if (isLocalStorageAvailable()) {
      try {
        const savedTheme = localStorage.getItem('ms-theme');
        console.log('📂 Gespeichertes Theme:', savedTheme);
        
        if (savedTheme === 'dark' || savedTheme === 'light') {
          currentTheme = savedTheme;
        } else {
          // Kein gespeichertes Theme, setze Standard basierend auf System
          if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            currentTheme = 'dark';
          }
        }
      } catch (error) {
        console.warn('❌ Konnte Theme nicht laden:', error);
      }
    }
    
    console.log('🎨 Aktuelles Theme:', currentTheme);
    
    // Theme SOFORT anwenden (verhindert Flackern)
    applyTheme(currentTheme);
    
    // Event Listener mit verbessertem Handling
    const toggleElement = document.getElementById('darkModeToggle');
    
    if (toggleElement) {
      // Click Event
      toggleElement.addEventListener('click', function(event) {
        event.preventDefault();
        event.stopPropagation();
        toggleDarkMode();
      });
      
      // Touch Event für Mobile
      toggleElement.addEventListener('touchstart', function(event) {
        event.preventDefault();
        event.stopPropagation();
        toggleDarkMode();
      }, { passive: false });
      
      // Keyboard Event
      toggleElement.addEventListener('keydown', function(event) {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          toggleDarkMode();
        }
      });
      
      console.log('✅ Dark Mode Toggle Event Listener registriert');
    }
    
    // Debug: Zeige alle Container, die Dark Mode erhalten sollten
    setTimeout(() => {
      const darkModeActive = body.classList.contains('dark-mode');
      console.log('🔍 Dark Mode aktiv:', darkModeActive);
      console.log('📊 Dokument Struktur geladen');
    }, 1000);
  }
  
  // Starte Initialisierung so früh wie möglich
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGlobalDarkMode);
  } else {
    // DOM ist bereits geladen
    setTimeout(initGlobalDarkMode, 10);
  }
  
  // FALLBACK: Wenn Seite vollständig geladen ist, nochmals prüfen
  window.addEventListener('load', function() {
    console.log('📦 Seite vollständig geladen, Dark Mode final prüfen');
    const body = document.body;
    if (body.classList.contains('dark-mode')) {
      // Erzwinge erneutes Anwenden der Styles
      body.classList.remove('dark-mode');
      setTimeout(() => {
        body.classList.add('dark-mode');
      }, 10);
    }
  });
  
})();
