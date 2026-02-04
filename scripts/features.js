// Features Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Feature filtering
    const categoryButtons = document.querySelectorAll('.category-btn');
    const featureCards = document.querySelectorAll('.feature-card');
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const category = this.getAttribute('data-category');
            
            // Filter feature cards
            featureCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                if (category === 'all' || cardCategory === category) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Demo controls
    const demoControls = document.querySelectorAll('.control-btn');
    const demoFeatures = document.querySelectorAll('.demo-feature-item');
    
    demoControls.forEach(control => {
        control.addEventListener('click', function() {
            const demoType = this.getAttribute('data-demo');
            
            // Update active control
            demoControls.forEach(c => c.classList.remove('active'));
            this.classList.add('active');
            
            // Update active feature
            demoFeatures.forEach(feature => {
                feature.classList.remove('active');
                if (feature.getAttribute('data-demo') === demoType) {
                    feature.classList.add('active');
                }
            });
            
            // In real implementation, this would switch the video
            console.log(`Switch to ${demoType} demo`);
        });
    });
    
    // Video play functionality
    const videoPlaceholder = document.querySelector('.video-placeholder');
    videoPlaceholder.addEventListener('click', function() {
        // In real implementation, this would play the video
        // For now, we'll show a message
        const playBtn = this.querySelector('i');
        const originalClass = playBtn.className;
        
        playBtn.className = 'fas fa-play-circle';
        playBtn.style.transform = 'translate(-50%, -50%) scale(1.2)';
        
        setTimeout(() => {
            playBtn.className = originalClass;
            playBtn.style.transform = 'translate(-50%, -50%) scale(1)';
        }, 300);
        
        // Show video modal in real implementation
        alert('In a real implementation, this would play a video demo.');
    });
    
    // Learn more buttons
    const learnMoreButtons = document.querySelectorAll('.feature-learn-more');
    learnMoreButtons.forEach(button => {
        button.addEventListener('click', function() {
            const featureCard = this.closest('.feature-card');
            const featureTitle = featureCard.querySelector('h3').textContent;
            
            // In real implementation, this would navigate to detailed feature page
            // For now, show a modal with more details
            const modal = document.createElement('div');
            modal.className = 'feature-modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <h3>${featureTitle}</h3>
                    <p>This is where detailed information about the feature would be displayed in a real implementation.</p>
                    <p>You would typically include:</p>
                    <ul>
                        <li>Detailed feature description</li>
                        <li>Step-by-step usage guide</li>
                        <li>Screenshots or videos</li>
                        <li>User testimonials</li>
                        <li>Technical specifications</li>
                    </ul>
                    <button class="btn btn-primary" id="closeFeatureModal">Got it</button>
                </div>
            `;
            
            // Add styles
            const style = document.createElement('style');
            style.textContent = `
                .feature-modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.5);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 1000;
                }
                .modal-content {
                    background: white;
                    padding: 40px;
                    border-radius: 15px;
                    max-width: 600px;
                    width: 90%;
                    max-height: 80vh;
                    overflow-y: auto;
                }
                .modal-content h3 {
                    color: var(--primary-color);
                    margin-bottom: 20px;
                    font-size: 1.8rem;
                }
                .modal-content p {
                    margin-bottom: 15px;
                    color: var(--text-light);
                    line-height: 1.6;
                }
                .modal-content ul {
                    margin: 20px 0;
                    padding-left: 20px;
                }
                .modal-content li {
                    margin-bottom: 10px;
                    color: var(--text-light);
                }
                #closeFeatureModal {
                    margin-top: 20px;
                }
            `;
            
            document.head.appendChild(style);
            document.body.appendChild(modal);
            
            // Close modal
            document.getElementById('closeFeatureModal').addEventListener('click', function() {
                document.body.removeChild(modal);
                document.head.removeChild(style);
            });
            
            // Close on click outside
            modal.addEventListener('click', function(e) {
                if (e.target === this) {
                    document.body.removeChild(modal);
                    document.head.removeChild(style);
                }
            });
        });
    });
    
    // Comparison table button actions
    const comparisonButtons = document.querySelectorAll('.comparison-row .btn');
    comparisonButtons.forEach(button => {
        button.addEventListener('click', function() {
            const plan = this.closest('.comparison-cell').previousElementSibling.textContent.trim();
            const action = this.textContent.trim();
            
            // In real implementation, this would navigate to signup or contact page
            if (action.includes('Contact')) {
                window.location.href = 'contact.html';
            } else {
                // Show plan selection modal
                alert(`You selected the ${plan} plan. In a real implementation, this would start the signup process.`);
            }
        });
    });
    
    // CTA button actions
    const ctaButtons = document.querySelectorAll('.cta-buttons .btn');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.textContent.includes('Trial')) {
                // Start free trial
                alert('Starting 30-day free trial...');
            } else if (this.textContent.includes('Demo')) {
                // Schedule demo
                window.location.href = 'contact.html?action=demo';
            }
        });
    });
});