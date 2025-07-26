
// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get all elements with the 'animate' class
    const animatedElements = document.querySelectorAll('.animate');
    
    // Function to add the animation class
    function startAnimations() {
        animatedElements.forEach(element => {
            element.style.animationName = 'fadeInUp';
            element.style.opacity = 1;
        });
    }
    
    // Start animations after a short delay to allow for rendering
    setTimeout(startAnimations, 300);
    
    ]
    
    // For the contact page form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
    }
});