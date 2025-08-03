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
    // Clear validation errors on input
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            this.style.borderColor = '';
        });
    });

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        let isValid = true;

        // Validate required fields
        const requiredFields = contactForm.querySelectorAll('[required]');
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                field.style.borderColor = 'red';
                isValid = false;
            }
        });

        if (isValid) {
            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            // Create FormData and append form-name
            const formData = new FormData(contactForm);
            formData.append('form-name', 'contact');

            // Submit form
            fetch('/', {
                method: 'POST',
                body: formData,
            })
            .then(response => {
                if (response.ok) {
                    // Show success message
                    const successMsg = document.createElement('div');
                    successMsg.className = 'form-success';
                    successMsg.textContent = 'Thank you! Your message has been sent.';
                    contactForm.parentNode.insertBefore(successMsg, contactForm.nextSibling);
                    contactForm.reset();
                } else {
                    throw new Error('Network response was not ok');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('There was a problem sending your message. Please try again.');
            })
            .finally(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            });
        }
    });
}});

// Animate stats counting
function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    if (stats) {
        stats.forEach(stat => {
            const target = parseInt(stat.textContent.replace(/[^0-9]/g, ''));
            const suffix = stat.textContent.replace(/[0-9]/g, '');
            let count = 0;
            const increment = target / 30;
            
            const timer = setInterval(() => {
                count += increment;
                stat.textContent = Math.floor(count) + suffix;
                if (count >= target) clearInterval(timer);
            }, 50);
        });
    }
}

// Initialize everything
document.addEventListener('DOMContentLoaded', function() {
    // Your existing code
    
    // Add these new initializations
    animateStats();
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});