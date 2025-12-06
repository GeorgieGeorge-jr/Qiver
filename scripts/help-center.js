// Help Center JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Search functionality
    const searchInput = document.getElementById('help-search');
    const searchBtn = document.querySelector('.search-btn');
    const articles = document.querySelectorAll('.article-card');
    const categories = document.querySelectorAll('.help-category');
    
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        
        if (searchTerm.length < 2) {
            // Show all content
            categories.forEach(category => category.style.display = 'block');
            articles.forEach(article => {
                article.style.display = 'flex';
                article.classList.remove('highlight');
            });
            return;
        }
        
        let hasResults = false;
        
        categories.forEach(category => {
            let categoryHasResults = false;
            const categoryArticles = category.querySelectorAll('.article-card');
            
            categoryArticles.forEach(article => {
                const title = article.querySelector('h3').textContent.toLowerCase();
                const description = article.querySelector('p').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || description.includes(searchTerm)) {
                    article.style.display = 'flex';
                    categoryHasResults = true;
                    
                    // Highlight search term
                    const titleElement = article.querySelector('h3');
                    const descElement = article.querySelector('p');
                    
                    titleElement.innerHTML = highlightText(titleElement.textContent, searchTerm);
                    descElement.innerHTML = highlightText(descElement.textContent, searchTerm);
                    article.classList.add('highlight');
                } else {
                    article.style.display = 'none';
                }
            });
            
            if (categoryHasResults) {
                category.style.display = 'block';
                hasResults = true;
            } else {
                category.style.display = 'none';
            }
        });
        
        if (!hasResults) {
            // Show no results message
            const noResults = document.createElement('div');
            noResults.className = 'no-results';
            noResults.innerHTML = `
                <h3>No results found for "${searchTerm}"</h3>
                <p>Try searching with different keywords or browse our categories.</p>
            `;
            
            const contentSection = document.querySelector('.help-content');
            const existingNoResults = document.querySelector('.no-results');
            if (existingNoResults) {
                existingNoResults.remove();
            }
            contentSection.insertBefore(noResults, contentSection.firstChild);
        } else {
            const existingNoResults = document.querySelector('.no-results');
            if (existingNoResults) {
                existingNoResults.remove();
            }
        }
    }
    
    function highlightText(text, term) {
        const regex = new RegExp(`(${term})`, 'gi');
        return text.replace(regex, '<mark class="search-highlight">$1</mark>');
    }
    
    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    // Tab functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Update active tab button
            tabBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Show active tab content
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === tabId) {
                    content.classList.add('active');
                }
            });
        });
    });
    
    // Quick actions smooth scroll
    const actionCards = document.querySelectorAll('.action-card');
    
    actionCards.forEach(card => {
        card.addEventListener('click', function(e) {
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
    
    // Search suggestions click
    const suggestions = document.querySelectorAll('.search-suggestions a');
    
    suggestions.forEach(suggestion => {
        suggestion.addEventListener('click', function(e) {
            e.preventDefault();
            const suggestionText = this.textContent;
            searchInput.value = suggestionText;
            performSearch();
        });
    });
    
    // Add search highlight style
    const style = document.createElement('style');
    style.textContent = `
        .search-highlight {
            background-color: #fff3cd;
            padding: 2px 4px;
            border-radius: 3px;
        }
        
        .no-results {
            text-align: center;
            padding: 60px 20px;
            background: #f8fafc;
            border-radius: 15px;
            margin-bottom: 40px;
        }
        
        .no-results h3 {
            margin-bottom: 15px;
            color: var(--text-color);
        }
        
        .no-results p {
            color: var(--text-light);
        }
        
        .article-card.highlight {
            border-color: var(--primary-color);
            background: #f0f9ff;
        }
    `;
    document.head.appendChild(style);
});