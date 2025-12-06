// Privacy Policy JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Table of Contents smooth scroll
    const tocLinks = document.querySelectorAll('.toc-link');
    
    tocLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Cookie Modal functionality
    const cookieModal = document.getElementById('cookieModal');
    const cookieSettingsBtn = document.getElementById('cookie-settings');
    const closeModalBtn = document.querySelector('.close-modal');
    const saveCookiesBtn = document.getElementById('saveCookies');
    const acceptAllBtn = document.getElementById('acceptAll');
    
    // Open modal
    cookieSettingsBtn.addEventListener('click', function() {
        cookieModal.classList.add('active');
    });
    
    // Close modal
    closeModalBtn.addEventListener('click', function() {
        cookieModal.classList.remove('active');
    });
    
    // Save preferences
    saveCookiesBtn.addEventListener('click', function() {
        const analytics = document.getElementById('analytics').checked;
        const preferences = document.getElementById('preferences').checked;
        const marketing = document.getElementById('marketing').checked;
        
        // Save to localStorage
        localStorage.setItem('cookiePrefs', JSON.stringify({
            analytics,
            preferences,
            marketing,
            timestamp: new Date().toISOString()
        }));
        
        // Show confirmation
        alert('Cookie preferences saved successfully!');
        cookieModal.classList.remove('active');
    });
    
    // Accept all cookies
    acceptAllBtn.addEventListener('click', function() {
        document.getElementById('analytics').checked = true;
        document.getElementById('preferences').checked = true;
        document.getElementById('marketing').checked = true;
        
        localStorage.setItem('cookiePrefs', JSON.stringify({
            analytics: true,
            preferences: true,
            marketing: true,
            timestamp: new Date().toISOString()
        }));
        
        alert('All cookies accepted!');
        cookieModal.classList.remove('active');
    });
    
    // Load saved preferences
    function loadCookiePreferences() {
        const savedPrefs = localStorage.getItem('cookiePrefs');
        if (savedPrefs) {
            const prefs = JSON.parse(savedPrefs);
            document.getElementById('analytics').checked = prefs.analytics;
            document.getElementById('preferences').checked = prefs.preferences;
            document.getElementById('marketing').checked = prefs.marketing;
        }
    }
    
    loadCookiePreferences();
    
    // Highlight current section in TOC
    const sections = document.querySelectorAll('.policy-section');
    const observerOptions = {
        root: null,
        rootMargin: '-100px 0px -50% 0px',
        threshold: 0
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                tocLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        observer.observe(section);
    });
});