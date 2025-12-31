/**
 * ENHANCEMENTS & PERFORMANCE OPTIMIERUNGEN
 */

document.addEventListener('DOMContentLoaded', function() {
    // Smooth Scrolling für interne Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Nur für echte Anchor-Links
            if (href === '#') return;
            
            const targetElement = document.querySelector(href);
            
            if (targetElement) {
                e.preventDefault();
                
                // Mobile Menü schließen falls offen
                const burger = document.querySelector('.burger');
                if (burger && burger.classList.contains('aktiv')) {
                    burger.click();
                }
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Lazy Loading für Bilder
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // Performance: Lade wichtige Ressourcen vor
    function preloadCriticalResources() {
        const links = [
            'https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600&family=EB+Garamond:wght@400;500;600&display=swap'
        ];
        
        links.forEach(href => {
            const link = document.createElement('link');
            link.rel = 'preconnect';
            link.href = href;
            document.head.appendChild(link);
        });
    }
    
    // Touch Device Detection
    function isTouchDevice() {
        return 'ontouchstart' in window || 
               navigator.maxTouchPoints > 0 || 
               navigator.msMaxTouchPoints > 0;
    }
    
    if (isTouchDevice()) {
        document.body.classList.add('touch-device');
    } else {
        document.body.classList.add('no-touch-device');
    }
});
