// Mobile Menu Funktionalität
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Funktionalität
    const burgerButton = document.getElementById('burger');
    const navigation = document.getElementById('navigation');
    const menuOverlay = document.getElementById('menuOverlay');
    let isMenuOpen = false;
    
    if (burgerButton && navigation && menuOverlay) {
        burgerButton.addEventListener('click', function(event) {
            event.stopPropagation();
            isMenuOpen = !isMenuOpen;
            
            // Navigation anzeigen/verstecken
            navigation.classList.toggle('aktiv');
            
            // Burger-Animation
            burgerButton.classList.toggle('aktiv');
            
            // Overlay anzeigen/verstecken
            menuOverlay.classList.toggle('aktiv');
            
            // Body Scroll verhindern/erlauben
            if (isMenuOpen) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        
        // Menü schließen bei Klick auf Overlay
        menuOverlay.addEventListener('click', function() {
            navigation.classList.remove('aktiv');
            burgerButton.classList.remove('aktiv');
            menuOverlay.classList.remove('aktiv');
            document.body.style.overflow = '';
            isMenuOpen = false;
        });
        
        // Menü schließen bei Klick auf Link
        const navLinks = navigation.querySelectorAll('a');
        navLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    navigation.classList.remove('aktiv');
                    burgerButton.classList.remove('aktiv');
                    menuOverlay.classList.remove('aktiv');
                    document.body.style.overflow = '';
                    isMenuOpen = false;
                }
            });
        });
        
        // Menü schließen bei Fenstergrößenänderung
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768 && isMenuOpen) {
                navigation.classList.remove('aktiv');
                burgerButton.classList.remove('aktiv');
                menuOverlay.classList.remove('aktiv');
                document.body.style.overflow = '';
                isMenuOpen = false;
            }
        });
    }
    
    // Footer Jahr aktualisieren auf ALLEN Seiten
    const yearElement = document.getElementById('jahr');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
    
    // Preloader nur für index.html
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', function() {
            setTimeout(function() {
                preloader.style.opacity = '0';
                preloader.style.visibility = 'hidden';
            }, 800);
        });
    }
});
