// Mobile Navigation
document.addEventListener('DOMContentLoaded', function() {
    const burgerButton = document.getElementById('burgerButton');
    const mainNav = document.getElementById('mainNav');
    const menuOverlay = document.querySelector('.menu-overlay');
    const body = document.body;
    
    if (!burgerButton || !mainNav || !menuOverlay) return;
    
    // Toggle Menu
    function toggleMenu() {
        const isActive = mainNav.classList.contains('active');
        
        burgerButton.classList.toggle('active');
        mainNav.classList.toggle('active');
        menuOverlay.classList.toggle('active');
        
        if (!isActive) {
            body.classList.add('no-scroll');
            burgerButton.setAttribute('aria-expanded', 'true');
        } else {
            body.classList.remove('no-scroll');
            burgerButton.setAttribute('aria-expanded', 'false');
        }
    }
    
    // Close Menu
    function closeMenu() {
        burgerButton.classList.remove('active');
        mainNav.classList.remove('active');
        menuOverlay.classList.remove('active');
        body.classList.remove('no-scroll');
        burgerButton.setAttribute('aria-expanded', 'false');
    }
    
    // Event Listeners
    burgerButton.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleMenu();
    });
    
    menuOverlay.addEventListener('click', closeMenu);
    
    // Close on link click (mobile)
    document.querySelectorAll('.hauptnavigation a').forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth < 768) {
                setTimeout(closeMenu, 300);
            }
        });
    });
    
    // ESC key to close
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mainNav.classList.contains('active')) {
            closeMenu();
        }
    });
    
    // Auto-close on resize to desktop
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 768) {
            closeMenu();
        }
    });
});
