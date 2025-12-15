// Menu Functionality
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const preloader = document.getElementById('preloader');
    const burgerMenu = document.getElementById('burgerMenu');
    const mainNavigation = document.getElementById('mainNavigation');
    const navLinks = document.querySelectorAll('.nav-link');
    const currentYear = document.getElementById('currentYear');
    const mainContent = document.getElementById('mainContent');
    
    // ============================================
    // PRELOADER TYPEWRITER ANIMATION
    // ============================================
    if (preloader) {
        // Start typewriter effect immediately
        const typewriterText = document.querySelector('.typewriter-text');
        const typewriterCursor = document.querySelector('.typewriter-cursor');
        
        if (typewriterText && typewriterCursor) {
            const text = 'MATTHIAS SILBERHAIN';
            let index = 0;
            
            function typeWriter() {
                if (index < text.length) {
                    typewriterText.textContent += text.charAt(index);
                    index++;
                    setTimeout(typeWriter, 100); // Adjust speed here
                } else {
                    // Text complete, wait 500ms then fade out
                    setTimeout(() => {
                        preloader.classList.add('fade-out');
                        
                        // After fade out animation completes, hide preloader
                        setTimeout(() => {
                            preloader.style.display = 'none';
                            document.body.style.overflow = 'auto';
                        }, 500);
                    }, 500);
                }
            }
            
            // Start typewriter effect
            setTimeout(typeWriter, 300);
        } else {
            // Fallback if elements not found
            setTimeout(() => {
                preloader.classList.add('fade-out');
                setTimeout(() => {
                    preloader.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }, 500);
            }, 1500);
        }
    }
    
    // ============================================
    // BURGER MENU TOGGLE
    // ============================================
    if (burgerMenu && mainNavigation) {
        burgerMenu.addEventListener('click', function() {
            // Toggle burger menu animation
            this.classList.toggle('active');
            
            // Toggle navigation visibility
            mainNavigation.classList.toggle('active');
            
            // Toggle body scroll lock
            if (mainNavigation.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'auto';
            }
            
            // Update aria-expanded attribute
            const isExpanded = this.classList.contains('active');
            this.setAttribute('aria-expanded', isExpanded);
        });
        
        // Close menu when clicking on a link (for mobile)
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 1024) {
                    burgerMenu.classList.remove('active');
                    mainNavigation.classList.remove('active');
                    document.body.style.overflow = 'auto';
                    burgerMenu.setAttribute('aria-expanded', 'false');
                }
            });
        });
        
        // Close menu when clicking outside (for mobile)
        document.addEventListener('click', function(event) {
            if (window.innerWidth <= 1024 && 
                mainNavigation.classList.contains('active') &&
                !mainNavigation.contains(event.target) &&
                !burgerMenu.contains(event.target)) {
                burgerMenu.classList.remove('active');
                mainNavigation.classList.remove('active');
                document.body.style.overflow = 'auto';
                burgerMenu.setAttribute('aria-expanded', 'false');
            }
        });
        
        // Close menu on escape key
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && mainNavigation.classList.contains('active')) {
                burgerMenu.classList.remove('active');
                mainNavigation.classList.remove('active');
                document.body.style.overflow = 'auto';
                burgerMenu.setAttribute('aria-expanded', 'false');
            }
        });
        
        // Auto-close menu on window resize to desktop
        window.addEventListener('resize', function() {
            if (window.innerWidth > 1024 && mainNavigation.classList.contains('active')) {
                burgerMenu.classList.remove('active');
                mainNavigation.classList.remove('active');
                document.body.style.overflow = 'auto';
                burgerMenu.setAttribute('aria-expanded', 'false');
            }
        });
    }
    
    // ============================================
    // CURRENT YEAR IN FOOTER
    // ============================================
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }
    
    // ============================================
    // SILBER HOVER EFFECTS FOR ALL LINKS
    // ============================================
    const allLinks = document.querySelectorAll('a');
    
    allLinks.forEach(link => {
        // Add hover effect
        link.addEventListener('mouseenter', function() {
            this.style.color = 'var(--silber-bright)';
            this.style.textShadow = '0 0 15px var(--silber-glow)';
        });
        
        link.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.color = '';
                this.style.textShadow = '';
            }
        });
    });
    
    // ============================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only process internal anchor links
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                    
                    window.scrollTo({
                        top: targetPosition - headerHeight - 20,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // ==========================================================================
    // SILBER GLOW EFFECT FOR INTERACTIVE ELEMENTS
    // ==========================================================================
    function addSilverGlow() {
        // Add to cards
        const cards = document.querySelectorAll('.highlight-card, .work-item');
        cards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.boxShadow = '0 0 30px var(--silber-glow)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.boxShadow = '';
            });
        });
        
        // Add to buttons (if any)
        const buttons = document.querySelectorAll('button:not(.burger-menu)');
        buttons.forEach(button => {
            button.addEventListener('mouseenter', function() {
                this.style.boxShadow = '0 0 20px var(--silber-glow)';
                this.style.borderColor = 'var(--silber-primary)';
            });
            
            button.addEventListener('mouseleave', function() {
                this.style.boxShadow = '';
                this.style.borderColor = '';
            });
        });
    }
    
    // Initialize glow effects
    addSilverGlow();
    
    // ==========================================================================
    // RESPONSIVE IMAGE HANDLING
    // ==========================================================================
    function handleResponsiveImages() {
        const images = document.querySelectorAll('img');
        
        images.forEach(img => {
            // Ensure images don't exceed container width
            if (!img.classList.contains('preloader-logo') && 
                !img.classList.contains('header-logo')) {
                img.style.maxWidth = '100%';
                img.style.height = 'auto';
            }
        });
    }
    
    handleResponsiveImages();
    
    // Re-run on window resize
    window.addEventListener('resize', function() {
        handleResponsiveImages();
    });
    
    // ==========================================================================
    // PERFORMANCE OPTIMIZATIONS
    // ==========================================================================
    
    // Debounce function for scroll events
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Optimize scroll performance
    const optimizedScroll = debounce(function() {
        // Add any scroll-based effects here
    }, 100);
    
    window.addEventListener('scroll', optimizedScroll);
});
