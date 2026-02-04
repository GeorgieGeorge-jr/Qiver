// Terms of Service JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Sidebar navigation
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    const sections = document.querySelectorAll('.term-section');
    
    // Smooth scroll for sidebar links
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Update active link
                sidebarLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
                
                // Scroll to section
                window.scrollTo({
                    top: targetSection.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Highlight current section in sidebar
    const observerOptions = {
        root: null,
        rootMargin: '-100px 0px -50% 0px',
        threshold: 0
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                sidebarLinks.forEach(link => {
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
    
    // Print functionality
    const printBtn = document.getElementById('printTerms');
    printBtn.addEventListener('click', function() {
        window.print();
    });
    
    // Download PDF functionality (simulated)
    const downloadBtn = document.getElementById('downloadTerms');
    downloadBtn.addEventListener('click', function() {
        const confirmDownload = confirm('This would download the Terms of Service as a PDF in a real implementation. Continue?');
        if (confirmDownload) {
            // In real implementation, this would download a PDF
            // For now, we'll show a success message
            this.innerHTML = '<i class="fas fa-check"></i><span>Download Started</span>';
            this.style.background = '#10b981';
            this.style.color = 'white';
            
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-download"></i><span>Download PDF</span>';
                this.style.background = '';
                this.style.color = '';
            }, 3000);
        }
    });
    
    // Terms acceptance
    const acceptCheckbox = document.getElementById('acceptTerms');
    const confirmBtn = document.getElementById('confirmAcceptance');
    
    acceptCheckbox.addEventListener('change', function() {
        confirmBtn.disabled = !this.checked;
        confirmBtn.style.opacity = this.checked ? '1' : '0.5';
        confirmBtn.style.cursor = this.checked ? 'pointer' : 'not-allowed';
    });
    
    confirmBtn.addEventListener('click', function() {
        if (acceptCheckbox.checked) {
            // In real implementation, this would send acceptance to server
            const modal = document.createElement('div');
            modal.className = 'acceptance-modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <h3><i class="fas fa-check-circle"></i> Terms Accepted</h3>
                    <p>You have successfully accepted the Terms of Service.</p>
                    <p>Your acceptance has been recorded.</p>
                    <button class="btn btn-primary" id="closeModal">Close</button>
                </div>
            `;
            
            // Add styles
            const style = document.createElement('style');
            style.textContent = `
                .acceptance-modal {
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
                #closeModal {
                    margin-top: 20px;
                }
            `;
            
            document.head.appendChild(style);
            document.body.appendChild(modal);
            
            // Close modal
            document.getElementById('closeModal').addEventListener('click', function() {
                document.body.removeChild(modal);
                document.head.removeChild(style);
            });
            
            // Auto-close after 5 seconds
            setTimeout(() => {
                if (document.body.contains(modal)) {
                    document.body.removeChild(modal);
                    document.head.removeChild(style);
                }
            }, 5000);
        }
    });
    
    // Initialize confirm button state
    confirmBtn.disabled = true;
    confirmBtn.style.opacity = '0.5';
    confirmBtn.style.cursor = 'not-allowed';
});