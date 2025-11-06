// Bootstrap Learning Interactive JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Hide loading spinner after page load
    const loadingSpinner = document.getElementById('loadingSpinner');
    if (loadingSpinner) {
        setTimeout(() => {
            loadingSpinner.classList.add('hidden');
            setTimeout(() => {
                loadingSpinner.style.display = 'none';
            }, 300);
        }, 1000);
    }

    // Smooth scrolling for navigation links
    initSmoothScrolling();
    
    // Initialize interactive grid demo
    initGridDemo();
    
    // Initialize navbar scroll effect
    initNavbarScrollEffect();
    
    // Initialize animations on scroll
    initScrollAnimations();
    
    // Initialize interactive examples
    initInteractiveExamples();
});

// Smooth scrolling function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = section.offsetTop - navbarHeight - 20;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// Initialize smooth scrolling for all navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            if (targetId) {
                scrollToSection(targetId);
            }
        });
    });
}

// Interactive grid demo
function initGridDemo() {
    const gridRadios = document.querySelectorAll('input[name="gridBreakpoint"]');
    const gridDemo = document.getElementById('grid-demo');
    
    if (!gridDemo) return;
    
    gridRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.checked) {
                updateGridDemo(this.value);
            }
        });
    });
}

function updateGridDemo(breakpoint) {
    const gridDemo = document.getElementById('grid-demo');
    const columns = gridDemo.querySelectorAll('[class*="col-"]');
    
    columns.forEach(col => {
        // Remove existing classes
        col.className = col.className.replace(/col-\w*-?\d*/g, '').trim();
        
        // Add new classes based on breakpoint
        switch (breakpoint) {
            case 'col':
                if (col.parentElement.children.length === 2) {
                    col.classList.add('col-12');
                } else {
                    col.classList.add('col-12');
                }
                break;
            case 'col-sm':
                if (col.parentElement.children.length === 2) {
                    col.classList.add('col-12', 'col-sm-6');
                } else {
                    col.classList.add('col-12', 'col-sm-4');
                }
                break;
            case 'col-md':
                if (col.parentElement.children.length === 2) {
                    col.classList.add('col-12', 'col-md-6');
                } else {
                    col.classList.add('col-12', 'col-md-4');
                }
                break;
            case 'col-lg':
                if (col.parentElement.children.length === 2) {
                    col.classList.add('col-12', 'col-lg-6');
                } else {
                    col.classList.add('col-12', 'col-lg-4');
                }
                break;
        }
    });
    
    // Add visual feedback
    gridDemo.style.transform = 'scale(0.98)';
    setTimeout(() => {
        gridDemo.style.transform = 'scale(1)';
    }, 150);
}

// Navbar scroll effect
function initNavbarScrollEffect() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('shadow-lg');
            navbar.style.backgroundColor = 'rgba(13, 110, 253, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.classList.remove('shadow-lg');
            navbar.style.backgroundColor = '';
            navbar.style.backdropFilter = '';
        }
    });
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe cards, features, and other elements
    const animatedElements = document.querySelectorAll('.card, .feature-icon, .hero-visual');
    animatedElements.forEach(el => {
        el.classList.add('animate-ready');
        observer.observe(el);
    });
    
    // Add CSS for animations
    addAnimationStyles();
}

function addAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .animate-ready {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .animate-ready.feature-icon {
            transform: translateY(30px) scale(0.9);
        }
        
        .animate-in.feature-icon {
            transform: translateY(0) scale(1);
        }
    `;
    document.head.appendChild(style);
}

// Interactive examples
function initInteractiveExamples() {
    // Add hover effects to code examples
    const codeExamples = document.querySelectorAll('.code-example');
    codeExamples.forEach(example => {
        example.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
        });
        
        example.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Add click to copy functionality
    addCopyToClipboard();
    
    // Add interactive button demos
    initButtonDemos();
    
    // Add form validation example
    initFormValidation();
}

function addCopyToClipboard() {
    const codeBlocks = document.querySelectorAll('.code-example pre');
    
    codeBlocks.forEach(block => {
        const copyButton = document.createElement('button');
        copyButton.className = 'btn btn-sm btn-outline-light position-absolute top-0 end-0 m-2';
        copyButton.innerHTML = '<i class="fas fa-copy"></i>';
        copyButton.title = 'Copy code';
        
        block.parentElement.style.position = 'relative';
        block.parentElement.appendChild(copyButton);
        
        copyButton.addEventListener('click', function() {
            const code = block.textContent;
            navigator.clipboard.writeText(code).then(() => {
                copyButton.innerHTML = '<i class="fas fa-check"></i>';
                copyButton.classList.remove('btn-outline-light');
                copyButton.classList.add('btn-success');
                
                setTimeout(() => {
                    copyButton.innerHTML = '<i class="fas fa-copy"></i>';
                    copyButton.classList.remove('btn-success');
                    copyButton.classList.add('btn-outline-light');
                }, 2000);
            });
        });
    });
}

function initButtonDemos() {
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add ripple animation CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

function initFormValidation() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const inputs = this.querySelectorAll('input[required], select[required], textarea[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                input.classList.remove('is-invalid', 'is-valid');
                
                if (!input.value.trim()) {
                    input.classList.add('is-invalid');
                    isValid = false;
                } else {
                    input.classList.add('is-valid');
                }
            });
            
            if (isValid) {
                showToast('Form submitted successfully!', 'success');
            } else {
                showToast('Please fill in all required fields.', 'danger');
            }
        });
    });
}

// Toast notification system
function showToast(message, type = 'info') {
    const toastContainer = getOrCreateToastContainer();
    
    const toast = document.createElement('div');
    toast.className = `toast align-items-center text-white bg-${type} border-0`;
    toast.setAttribute('role', 'alert');
    toast.innerHTML = `
        <div class="d-flex">
            <div class="toast-body">
                ${message}
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
        </div>
    `;
    
    toastContainer.appendChild(toast);
    
    const bsToast = new bootstrap.Toast(toast);
    bsToast.show();
    
    // Remove toast after it's hidden
    toast.addEventListener('hidden.bs.toast', function() {
        this.remove();
    });
}

function getOrCreateToastContainer() {
    let container = document.querySelector('.toast-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container position-fixed bottom-0 end-0 p-3';
        container.style.zIndex = '1060';
        document.body.appendChild(container);
    }
    return container;
}

// Utility functions
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

// Progress bar demo
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar');
    progressBars.forEach(bar => {
        const width = bar.style.width || bar.getAttribute('style')?.match(/width:\s*(\d+%)/)?.[1] || '0%';
        bar.style.width = '0%';
        setTimeout(() => {
            bar.style.width = width;
        }, 100);
    });
}

// Initialize progress bar animation when they come into view
const progressObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateProgressBars();
            progressObserver.unobserve(entry.target);
        }
    });
});

document.querySelectorAll('.progress').forEach(progress => {
    progressObserver.observe(progress);
});

// Theme toggle (optional enhancement)
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;
    
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-bs-theme', currentTheme);
    
    themeToggle.addEventListener('click', function() {
        const theme = document.documentElement.getAttribute('data-bs-theme');
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-bs-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        this.innerHTML = newTheme === 'dark' 
            ? '<i class="fas fa-sun"></i>' 
            : '<i class="fas fa-moon"></i>';
    });
}

// Initialize theme toggle if button exists
document.addEventListener('DOMContentLoaded', initThemeToggle);

// Export functions for global use
window.scrollToSection = scrollToSection;
window.showToast = showToast;