// script.js - Enhanced with animations and mobile menu
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const navToggle = document.querySelector('.navToggle');
    const navList = document.querySelector('.navList');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navList.classList.toggle('active');
        });
    }

    

    // Animate elements on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.slide-up, .animate');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Initial animation trigger
    window.addEventListener('load', function() {
        animateOnScroll();
        
        // Lazy load images
        const lazyImages = document.querySelectorAll('[loading="lazy"]');
        lazyImages.forEach(img => {
            img.src = img.dataset.src || img.src;
        });
    });

    // Scroll event listener
    window.addEventListener('scroll', animateOnScroll);

    // Netlify form handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Form validation
            const formData = new FormData(this);
            let isValid = true;
            
            formData.forEach((value, key) => {
                if (!value.trim() && key !== 'file') {
                    isValid = false;
                    const input = this.querySelector(`[name="${key}"]`);
                    input.style.borderColor = 'red';
                }
            });
            
            if (isValid) {
                this.submit();
                // Show success message
                const successMsg = document.createElement('div');
                successMsg.className = 'form-success';
                successMsg.textContent = 'Thank you! Your message has been sent.';
                this.parentNode.insertBefore(successMsg, this.nextSibling);
                this.reset();
            }
        });
    }
});