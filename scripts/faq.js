// FAQ Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // FAQ Accordion functionality
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        question.addEventListener('click', function() {
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-answer').style.maxHeight = '0';
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
            
            if (item.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
            } else {
                answer.style.maxHeight = '0';
            }
        });
    });
    
    // Category filtering
    const categoryButtons = document.querySelectorAll('.category-btn');
    const faqCategories = document.querySelectorAll('.faq-category');
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const category = this.getAttribute('data-category');
            
            // Show/hide categories
            faqCategories.forEach(categoryElement => {
                if (category === 'all' || categoryElement.getAttribute('data-category') === category) {
                    categoryElement.style.display = 'block';
                    setTimeout(() => {
                        categoryElement.style.opacity = '1';
                    }, 10);
                } else {
                    categoryElement.style.opacity = '0';
                    setTimeout(() => {
                        categoryElement.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Search functionality
    const searchInput = document.getElementById('faq-search');
    const searchBtn = document.querySelector('.search-btn');
    
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        
        if (searchTerm.length < 2) {
            // Reset all items
            faqItems.forEach(item => {
                item.style.display = 'block';
                item.classList.remove('highlighted');
                
                // Remove highlights from text
                const question = item.querySelector('.faq-question h3');
                const answer = item.querySelector('.faq-answer');
                
                question.innerHTML = question.textContent;
                answer.innerHTML = answer.innerHTML.replace(/<mark class="highlight">|<\/mark>/g, '');
            });
            return;
        }
        
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question h3');
            const answer = item.querySelector('.faq-answer p');
            const questionText = question.textContent.toLowerCase();
            const answerText = answer.textContent.toLowerCase();
            
            // Highlight matching text
            const highlightedQuestion = questionText.replace(
                new RegExp(`(${searchTerm})`, 'gi'),
                '<mark class="highlight">$1</mark>'
            );
            
            const highlightedAnswer = answerText.replace(
                new RegExp(`(${searchTerm})`, 'gi'),
                '<mark class="highlight">$1</mark>'
            );
            
            question.innerHTML = questionText.replace(
                new RegExp(`(${searchTerm})`, 'gi'),
                '<mark class="highlight">$1</mark>'
            );
            answer.innerHTML = answerText.replace(
                new RegExp(`(${searchTerm})`, 'gi'),
                '<mark class="highlight">$1</mark>'
            );
            
            // Show/hide item based on match
            if (questionText.includes(searchTerm) || answerText.includes(searchTerm)) {
                item.style.display = 'block';
                item.classList.add('highlighted');
                
                // Open the FAQ item if it contains the search term
                if (!item.classList.contains('active')) {
                    item.classList.add('active');
                    const answerElement = item.querySelector('.faq-answer');
                    answerElement.style.maxHeight = answerElement.scrollHeight + 'px';
                }
            } else {
                item.style.display = 'none';
                item.classList.remove('highlighted');
            }
        });
    }
    
    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    // Smooth scroll for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 120,
                    behavior: 'smooth'
                });
            }
        });
    });
});