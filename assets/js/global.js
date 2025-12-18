// ============================================================================
// GLOBAL DARK MODE - UNIVERSAL FÜR ALLE BROWSER
// ============================================================================

(function() {
  'use strict';
  
  // ========================================================================
  // 1. BROWSER ERKENNUNG FÜR DEBUGGING
  // ========================================================================
  function detectBrowser() {
    const userAgent = navigator.userAgent;
    let browser = "Unknown";
    
    if (userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("Edg") === -1) {
      browser = "Chrome";
    } else if (userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") === -1) {
      browser = "Safari";
    } else if (userAgent.indexOf("Firefox") > -1) {
      browser = "Firefox";
    } else if (userAgent.indexOf("Edg") > -1) {
      browser = "Edge";
    } else if (userAgent.indexOf("Opera") > -1 || userAgent.indexOf("OPR") > -1) {
      browser = "Opera";
    } else if (userAgent.indexOf("DuckDuckGo") > -1) {
      browser = "DuckDuckGo";
    }
    
    console.log(`🌐 Browser: ${browser}`);
    console.log(`🕵️ User Agent: ${userAgent}`);
    return browser;
  }
  
  // ========================================================================
  // 2. LOCALSTORAGE PRÜFUNG
  // ========================================================================
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
  
  // ========================================================================
  // 3. UNIVERSAL THEME ANWENDUNG (FÜR ALLE BROWSER)
  // ========================================================================
  function applyTheme(theme) {
    const html = document.documentElement;
    const body = document.body;
    const toggleButton = document.getElementById('darkModeToggle');
    
    console.log('🎨 Apply Theme:', theme);
    
    if (theme === 'dark') {
      // SETZE KLASSE AUF BOTH HTML UND BODY FÜR MAXIMALE SPEZIFIKATION
      html.classList.add('dark-mode');
      body.classList.add('dark-mode');
      
      // INLINE STYLES FÜR BROWSER DIE CSS KLASSEN IGNORIEREN
      setTimeout(() => {
        html.style.backgroundColor = '#1a1a1a';
        body.style.backgroundColor = '#1a1a1a';
        body.style.color = '#b0b5bc';
        
        // FORCE RE-PAINT FÜR SAFARI UND WEBKIT
        void html.offsetHeight;
        void body.offsetHeight;
      }, 10);
      
      console.log('🌙 Dark Mode aktiviert');
      
    } else {
      // ENTFERNE DARK MODE
      html.classList.remove('dark-mode');
      body.classList.remove('dark-mode');
      
      // ENTFERNE INLINE STYLES
      setTimeout(() => {
        html.style.backgroundColor = '';
        body.style.backgroundColor = '';
        body.style.color = '';
      }, 10);
      
      console.log('☀️ Light Mode aktiviert');
    }
    
    // TOGGLE BUTTON AKTUALISIEREN
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
    
    // DISPATCH EVENT FÜR ANDERE SCRIPTS
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('themeChanged', { 
        detail: { theme: theme, timestamp: Date.now() }
      }));
    }, 50);
  }
  
  // ========================================================================
  // 4. DARK MODE UMSCHALTEN
  // ========================================================================
  function toggleDarkMode() {
    const html = document.documentElement;
    const body = document.body;
    let newTheme;
    
    // PRÜFE OB DARK MODE AKTIV (AUF HTML ODER BODY)
    if (html.classList.contains('dark-mode') || body.classList.contains('dark-mode')) {
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
  
  // ========================================================================
  // 5. INITIALISIERUNG
  // ========================================================================
  function initGlobalDarkMode() {
    console.log('🌓 Global Dark Mode wird initialisiert...');
    
    // Browser erkennen
    detectBrowser();
    
    const html = document.documentElement;
    const body = document.body;
    let darkModeToggle = document.getElementById('darkModeToggle');
    
    // FALLBACK FÜR TOGGLE BUTTON
    if (!darkModeToggle) {
      console.warn('⚠️ Dark Mode Toggle nicht gefunden mit ID');
      // Versuche alternative Selektion
      darkModeToggle = document.querySelector('.dark-mode-toggle');
      if (darkModeToggle) {
        console.log('✅ Dark Mode Toggle über Klasse gefunden');
        darkModeToggle.id = 'darkModeToggle';
      }
    }
    
    if (!darkModeToggle) {
      console.error('❌ Kein Dark Mode Toggle auf dieser Seite gefunden');
      return;
    }
    
    // LADE GESPEICHERTES THEME
    let currentTheme = 'light'; // Standard
    
    if (isLocalStorageAvailable()) {
      try {
        const savedTheme = localStorage.getItem('ms-theme');
        console.log('📂 Gespeichertes Theme:', savedTheme);
        
        if (savedTheme === 'dark' || savedTheme === 'light') {
          currentTheme = savedTheme;
        } else {
          // KEIN GESPEICHERTES THEME, PRÜFE SYSTEM
          if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            currentTheme = 'dark';
          }
        }
      } catch (error) {
        console.warn('❌ Konnte Theme nicht laden:', error);
      }
    }
    
    console.log('🎨 Aktuelles Theme:', currentTheme);
    
    // THEME SOFORT ANWENDEN
    applyTheme(currentTheme);
    
    // ========================================================================
    // 6. EVENT LISTENER FÜR ALLE BROWSER
    // ========================================================================
    
    // CLICK EVENT (Desktop & Mobile)
    darkModeToggle.addEventListener('click', function(event) {
      event.preventDefault();
      event.stopPropagation();
      toggleDarkMode();
    });
    
    // TOUCH EVENT (Mobile/Safari)
    darkModeToggle.addEventListener('touchstart', function(event) {
      event.preventDefault();
      event.stopPropagation();
      toggleDarkMode();
    }, { passive: false });
    
    // KEYBOARD EVENT (Barrierefreiheit)
    darkModeToggle.addEventListener('keydown', function(event) {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        toggleDarkMode();
      }
    });
    
    // MOUSEENTER FÜR FEEDBACK
    darkModeToggle.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.05)';
    });
    
    darkModeToggle.addEventListener('mouseleave', function() {
      if (!this.classList.contains('dark-mode-active')) {
        this.style.transform = 'scale(1)';
      }
    });
    
    console.log('✅ Dark Mode Toggle Event Listener registriert');
    
    // ========================================================================
    // 7. SYSTEM THEME ÄNDERUNGEN VERFOLGEN
    // ========================================================================
    if (window.matchMedia) {
      const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      
      darkModeMediaQuery.addEventListener('change', function(e) {
        // NUR WENN KEIN THEME GESPEICHERT IST
        if (isLocalStorageAvailable()) {
          try {
            const savedTheme = localStorage.getItem('ms-theme');
            if (!savedTheme) {
              if (e.matches) {
                applyTheme('dark');
              } else {
                applyTheme('light');
              }
            }
          } catch (error) {
            // IGNORIERE FEHLER
          }
        }
      });
    }
    
    // ========================================================================
    // 8. DEBUG INFORMATIONEN
    // ========================================================================
    setTimeout(() => {
      const darkModeActive = html.classList.contains('dark-mode') || body.classList.contains('dark-mode');
      console.log('🔍 Dark Mode aktiv:', darkModeActive);
      console.log('📊 Dokument Struktur geladen');
    }, 1000);
  }
  
  // ========================================================================
  // 9. INITIALISIERUNG STARTEN
  // ========================================================================
  
  // SO FRÜH WIE MÖGLICH STARTEN
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGlobalDarkMode);
  } else {
    // DOM IST BEREITS GELADEN
    setTimeout(initGlobalDarkMode, 10);
  }
  
  // ========================================================================
  // 10. FALLBACK FÜR VOLLSTÄNDIG GELADENE SEITE
  // ========================================================================
  window.addEventListener('load', function() {
    console.log('📦 Seite vollständig geladen, Dark Mode final prüfen');
    
    // ERZWINGE ERNEUTES ANWENDEN DER STYLES FÜR SAFARI/DUCKDUCKGO
    const html = document.documentElement;
    const body = document.body;
    
    if (html.classList.contains('dark-mode') || body.classList.contains('dark-mode')) {
      // TEMPORÄR ENTFERNEN UND WIEDER HINZUFÜGEN FÜR RE-FLOW
      html.classList.remove('dark-mode');
      body.classList.remove('dark-mode');
      
      setTimeout(() => {
        html.classList.add('dark-mode');
        body.classList.add('dark-mode');
        
        // INLINE STYLES FÜR WEBKIT
        html.style.backgroundColor = '#1a1a1a';
        body.style.backgroundColor = '#1a1a1a';
      }, 10);
    }
  });
  
})();
