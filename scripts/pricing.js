// Pricing Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Billing toggle functionality
    const billingToggle = document.getElementById('billingToggle');
    const monthlyPrices = document.querySelectorAll('.price.monthly');
    const annualPrices = document.querySelectorAll('.price.annually');
    
    billingToggle.addEventListener('change', function() {
        if (this.checked) {
            // Switch to annual pricing
            monthlyPrices.forEach(price => {
                price.classList.add('hidden');
                price.classList.remove('active');
            });
            annualPrices.forEach(price => {
                price.classList.remove('hidden');
                price.classList.add('active');
            });
            
            // Update comparison table prices
            updateComparisonTablePrices(true);
        } else {
            // Switch to monthly pricing
            monthlyPrices.forEach(price => {
                price.classList.remove('hidden');
                price.classList.add('active');
            });
            annualPrices.forEach(price => {
                price.classList.add('hidden');
                price.classList.remove('active');
            });
            
            // Update comparison table prices
            updateComparisonTablePrices(false);
        }
    });
    
    function updateComparisonTablePrices(isAnnual) {
        const planPrices = document.querySelectorAll('.plan-header .price');
        
        if (isAnnual) {
            // Update to annual prices
            planPrices[0].textContent = '$95.90/year';
            planPrices[1].textContent = '$191.90/year';
            planPrices[2].textContent = 'Custom/year';
        } else {
            // Update to monthly prices
            planPrices[0].textContent = '$9.99/month';
            planPrices[1].textContent = '$19.99/month';
            planPrices[2].textContent = 'Custom';
        }
    }
    
    // FAQ accordion
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
    
    // Plan selection
    const planButtons = document.querySelectorAll('.pricing-card .btn');
    
    planButtons.forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.pricing-card');
            const planName = card.querySelector('.plan-name').textContent;
            const isAnnual = billingToggle.checked;
            
            // In real implementation, this would start signup process
            if (planName === 'Enterprise') {
                window.location.href = 'contact.html?plan=enterprise';
            } else {
                // Show plan confirmation
                const modal = document.createElement('div');
                modal.className = 'plan-selection-modal';
                modal.innerHTML = `
                    <div class="modal-content">
                        <h3><i class="fas fa-check-circle"></i> Plan Selected</h3>
                        <p>You selected the <strong>${planName}</strong> plan.</p>
                        <p>Billing: <strong>${isAnnual ? 'Annual (Save 20%)' : 'Monthly'}</strong></p>
                        <div class="modal-actions">
                            <button class="btn btn-outline" id="cancelSelection">Cancel</button>
                            <button class="btn btn-primary" id="confirmSelection">Continue to Signup</button>
                        </div>
                    </div>
                `;
                
                // Add styles
                const style = document.createElement('style');
                style.textContent = `
                    .plan-selection-modal {
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
                        text-align: center;
                        max-width: 500px;
                        width: 90%;
                    }
                    .modal-content h3 {
                        color: #10b981;
                        margin-bottom: 20px;
                        font-size: 1.5rem;
                    }
                    .modal-content p {
                        margin-bottom: 15px;
                        color: var(--text-light);
                    }
                    .modal-actions {
                        display: flex;
                        gap: 15px;
                        margin-top: 30px;
                        justify-content: center;
                    }
                `;
                
                document.head.appendChild(style);
                document.body.appendChild(modal);
                
                // Cancel selection
                document.getElementById('cancelSelection').addEventListener('click', function() {
                    document.body.removeChild(modal);
                    document.head.removeChild(style);
                });
                
                // Confirm selection
                document.getElementById('confirmSelection').addEventListener('click', function() {
                    // In real implementation, redirect to signup page
                    alert(`In a real implementation, this would redirect to the signup page for the ${planName} plan.`);
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
            }
        });
    });
    
    // Comparison table actions
    const comparisonButtons = document.querySelectorAll('.comparison-table .btn');
    comparisonButtons.forEach(button => {
        button.addEventListener('click', function() {
            const row = this.closest('tr');
            const plan = row.querySelector('.plan-column h4')?.textContent || 
                        this.closest('.plan-column').previousElementSibling.previousElementSibling.querySelector('h4').textContent;
            
            if (this.textContent.includes('Contact')) {
                window.location.href = 'contact.html?plan=' + plan.toLowerCase();
            } else {
                // Trigger plan selection for Starter/Professional
                const planName = plan === 'Starter' ? 'Starter' : 'Professional';
                const cardButton = document.querySelector(`.pricing-card .plan-name:contains("${planName}")`).closest('.pricing-card').querySelector('.btn');
                cardButton.click();
            }
        });
    });
    
    // Trust badges hover effect
    const badgeItems = document.querySelectorAll('.badge-item');
    badgeItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});