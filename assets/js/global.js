// ============================================================================
// GLOBAL.JS - VEREINFACHTE VERSION FÜR ANIMATED-STATS.JS
// ============================================================================

console.log('🚀 global.js wird geladen...');

// ============================================================================
// 1. PRELOADER ANIMATION
// ============================================================================

(function() {
    'use strict';
    
    console.log('🌀 Preloader initialisiert');
    
    function initPreloader() {
        const preloader = document.getElementById('preloader');
        const typeText = document.getElementById('type-text');
        
        if (!preloader || !typeText) {
            console.warn('⚠️ Preloader Elemente nicht gefunden');
            return;
        }
        
        console.log('✅ Preloader Elemente gefunden');
        
        const fullText = "MATTHIAS SILBERHAIN";
        let charIndex = 0;
        const typingSpeed = 120;
        
        function typeCharacter() {
            if (charIndex < fullText.length) {
                const currentText = typeText.textContent || '';
                const nextChar = fullText.charAt(charIndex);
                
                if (nextChar === ' ') {
                    typeText.innerHTML = currentText + '&nbsp;';
                } else {
                    typeText.textContent = currentText + nextChar;
                }
                
                charIndex++;
                setTimeout(typeCharacter, typingSpeed);
            } else {
                setTimeout(() => {
                    preloader.classList.add('hidden');
                    setTimeout(() => {
                        preloader.style.display = 'none';
                        console.log('✅ Preloader ausgeblendet');
                        enableInteractiveElements();
                    }, 600);
                }, 800);
            }
        }
        
        setTimeout(() => {
            console.log('⌨️ Starte Typing Animation');
            typeCharacter();
        }, 300);
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            setTimeout(initPreloader, 100);
        });
    } else {
        setTimeout(initPreloader, 100);
    }
})();

// ============================================================================
// 2. DARK MODE - OPTIMIERT
// ============================================================================

(function() {
    'use strict';
    
    function initDarkMode() {
        const toggleBtn = document.getElementById('darkModeToggle');
        if (!toggleBtn) {
            setTimeout(initDarkMode, 500);
            return;
        }
        
        // Theme aus localStorage oder System
        const savedTheme = localStorage.getItem('ms-theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
        
        // Theme anwenden
        if (initialTheme === 'dark') {
            document.documentElement.classList.add('dark-mode');
            document.body.classList.add('dark-mode');
        }
        
        // Toggle-Funktion
        function toggleTheme() {
            const isDark = document.body.classList.contains('dark-mode');
            
            if (isDark) {
                document.documentElement.classList.remove('dark-mode');
                document.body.classList.remove('dark-mode');
                localStorage.setItem('ms-theme', 'light');
            } else {
                document.documentElement.classList.add('dark-mode');
                document.body.classList.add('dark-mode');
                localStorage.setItem('ms-theme', 'dark');
            }
            
            // Button-Animation
            toggleBtn.style.transform = 'scale(1.2)';
            setTimeout(() => {
                toggleBtn.style.transform = 'scale(1)';
            }, 200);
        }
        
        // Event Listener
        toggleBtn.addEventListener('click', toggleTheme);
        toggleBtn.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleTheme();
            }
        });
        
        // System-Änderungen überwachen
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
            if (!localStorage.getItem('ms-theme')) {
                if (e.matches) {
                    document.documentElement.classList.add('dark-mode');
                    document.body.classList.add('dark-mode');
                } else {
                    document.documentElement.classList.remove('dark-mode');
                    document.body.classList.remove('dark-mode');
                }
            }
        });
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initDarkMode);
    } else {
        initDarkMode();
    }
})();

// ============================================================================
// 3. INTERAKTIVE ELEMENTE & BASIS FUNKTIONEN
// ============================================================================

function enableInteractiveElements() {
    ['button', 'a', '.burger', '.dark-mode-toggle', '.silber-button', '.social-link'].forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
            el.style.pointerEvents = 'auto';
            el.style.cursor = 'pointer';
        });
    });
}

function updateYear() {
    const yearElement = document.getElementById('jahr');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// ============================================================================
// 4. ECHTZEIT-TRACKING FÜR STATISTIKEN
// ============================================================================

function setupRealTracking() {
    console.log('📊 Setup Real Tracking...');
    
    // Warte bis animated-stats.js geladen ist
    if (!window.silberhainStats) {
        console.log('⏳ Warte auf Statistik-System...');
        setTimeout(setupRealTracking, 500);
        return;
    }
    
    console.log('✅ Statistik-System gefunden');
    
    // ECHTE DOWNLOAD-LINKS
    const downloadSelectors = [
        'a[href*="download"]',
        'a[href*=".pdf"]', 
        'a[href*=".epub"]',
        '.download-btn'
    ];
    
    downloadSelectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(link => {
            link.addEventListener('click', function() {
                setTimeout(() => {
                    window.silberhainStats.incrementDownloads();
                    console.log('📥 Download gezählt:', this.href);
                }, 300);
            });
        });
    });
    
    // ECHTE LESEPROBE-LINKS
    const sampleSelectors = [
        'a[href*="leseprobe"]',
        'a[href*="sample"]',
        '.read-sample-btn'
    ];
    
    sampleSelectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(link => {
            link.addEventListener('click', function() {
                window.silberhainStats.incrementBookSamples();
                console.log('📖 Leseprobe gezählt:', this.href);
            });
        });
    });
    
    // DEMO-BUTTONS (wenn vorhanden)
    ['incrementSamples', 'incrementReviews', 'incrementDownloads'].forEach(id => {
        const btn = document.getElementById(id);
        if (btn) {
            btn.addEventListener('click', function() {
                if (id === 'incrementReviews') {
                    window.silberhainStats.incrementReviews(Math.floor(Math.random() * 3) + 3);
                } else if (id === 'incrementSamples') {
                    window.silberhainStats.incrementBookSamples();
                } else if (id === 'incrementDownloads') {
                    window.silberhainStats.incrementDownloads();
                }
                console.log('🎮 Demo-Button:', id);
            });
        }
    });
    
    console.log('✅ Real Tracking aktiviert');
}

// ============================================================================
// 5. HAUPTHAUPT-INITIALISIERUNG
// ============================================================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('📄 DOM geladen');
    
    // Einfache Initialisierungen
    updateYear();
    enableInteractiveElements();
    
    // Statistik-Tracking mit Verzögerung starten
    setTimeout(setupRealTracking, 1000);
    
    console.log('✅ Website initialisiert');
});

// ============================================================================
// 6. HELPER FUNCTIONS
// ============================================================================

// Sanftes Scrollen
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        }
    });
});

console.log('✅ global.js bereit');
