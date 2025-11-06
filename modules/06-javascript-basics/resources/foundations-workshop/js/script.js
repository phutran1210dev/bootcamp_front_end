/**
 * Frontend Academy - Bài 5: JavaScript & Web Development
 * Advanced JavaScript Learning Platform
 * 
 * Author: Frontend Academy Team
 * Version: 1.0.0
 * Created: November 2025
 */

// ===== APPLICATION STATE =====
const AppState = {
    currentTab: 'html',
    isNavOpen: false,
    currentTopicModal: null,
    currentExerciseLevel: 'beginner',
    loadingProgress: 0,
    scrollProgress: 0,
    
    // Statistics counters
    stats: {
        chapters: 10,
        examples: 50,
        exercises: 20
    }
};

// ===== UTILITY FUNCTIONS =====
const Utils = {
    // Debounce function for performance optimization
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Throttle function for scroll events
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    // Animate number counters
    animateCounter(element, target, duration = 2000) {
        const start = parseInt(element.textContent) || 0;
        const increment = (target - start) / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if ((increment > 0 && current >= target) || (increment < 0 && current <= target)) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
        }, 16);
    },

    // Smooth scroll to element
    scrollToElement(selector, offset = 0) {
        const element = document.querySelector(selector);
        if (element) {
            const elementTop = element.getBoundingClientRect().top + window.pageYOffset;
            window.scrollTo({
                top: elementTop - offset,
                behavior: 'smooth'
            });
        }
    },

    // Local storage helpers
    storage: {
        set(key, value) {
            try {
                localStorage.setItem(key, JSON.stringify(value));
            } catch (e) {
                console.warn('localStorage not available:', e);
            }
        },
        
        get(key, defaultValue = null) {
            try {
                const item = localStorage.getItem(key);
                return item ? JSON.parse(item) : defaultValue;
            } catch (e) {
                console.warn('localStorage not available:', e);
                return defaultValue;
            }
        },
        
        remove(key) {
            try {
                localStorage.removeItem(key);
            } catch (e) {
                console.warn('localStorage not available:', e);
            }
        }
    },

    // Generate random ID
    generateId() {
        return Math.random().toString(36).substr(2, 9);
    },

    // Format date
    formatDate(date) {
        return new Intl.DateTimeFormat('vi-VN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }).format(date);
    }
};

// ===== LOADING MANAGER =====
const LoadingManager = {
    init() {
        this.showLoading();
        this.simulateLoading();
    },

    showLoading() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.style.display = 'flex';
        }
    },

    hideLoading() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.classList.add('fade-out');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }
    },

    simulateLoading() {
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 30;
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
                setTimeout(() => this.hideLoading(), 500);
                // Initialize app after loading
                setTimeout(() => App.init(), 800);
            }
            AppState.loadingProgress = progress;
        }, 200);
    }
};

// ===== NAVIGATION MANAGER =====
const Navigation = {
    init() {
        this.bindEvents();
        this.updateActiveLink();
        this.handleScroll();
    },

    bindEvents() {
        // Mobile menu toggle
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                AppState.isNavOpen = !AppState.isNavOpen;
                navToggle.classList.toggle('active', AppState.isNavOpen);
                navMenu.classList.toggle('active', AppState.isNavOpen);
            });
        }

        // Navigation links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                Utils.scrollToElement(targetId, 80);
                
                // Close mobile menu
                if (AppState.isNavOpen) {
                    navToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                    AppState.isNavOpen = false;
                }
            });
        });

        // Scroll event for navbar style
        window.addEventListener('scroll', Utils.throttle(() => {
            this.handleScroll();
            this.updateScrollProgress();
        }, 16));
    },

    handleScroll() {
        const navbar = document.getElementById('navbar');
        if (navbar) {
            const scrolled = window.scrollY > 50;
            navbar.classList.toggle('scrolled', scrolled);
        }
    },

    updateScrollProgress() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        AppState.scrollProgress = scrollPercent;
        
        const progressBar = document.getElementById('progress-bar');
        if (progressBar) {
            progressBar.style.width = `${scrollPercent}%`;
        }
    },

    updateActiveLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${id}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, {
            threshold: 0.3,
            rootMargin: '-80px 0px'
        });

        sections.forEach(section => observer.observe(section));
    }
};

// ===== HERO SECTION MANAGER =====
const HeroManager = {
    init() {
        this.animateCounters();
        this.bindEvents();
        this.startCodeAnimation();
    },

    animateCounters() {
        const observerOptions = {
            threshold: 0.5,
            triggerOnce: true
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const statNumbers = entry.target.querySelectorAll('.stat-number');
                    statNumbers.forEach(stat => {
                        const target = parseInt(stat.getAttribute('data-target'));
                        Utils.animateCounter(stat, target, 2000);
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        const heroStats = document.querySelector('.hero-stats');
        if (heroStats) {
            observer.observe(heroStats);
        }
    },

    bindEvents() {
        const startLearningBtn = document.getElementById('start-learning');
        const viewDemoBtn = document.getElementById('view-demo');

        if (startLearningBtn) {
            startLearningBtn.addEventListener('click', () => {
                Utils.scrollToElement('#javascript', 80);
                this.showWelcomeMessage();
            });
        }

        if (viewDemoBtn) {
            viewDemoBtn.addEventListener('click', () => {
                Utils.scrollToElement('.demo-section', 80);
            });
        }
    },

    startCodeAnimation() {
        const typingLine = document.querySelector('.typing');
        if (typingLine) {
            setInterval(() => {
                typingLine.style.animation = 'none';
                setTimeout(() => {
                    typingLine.style.animation = 'typewriter 3s steps(20)';
                }, 100);
            }, 4000);
        }
    },

    showWelcomeMessage() {
        this.showNotification('Chào mừng bạn đến với JavaScript! 🚀', 'success');
    },

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span>${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => notification.classList.add('show'), 100);
        
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        });
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 5000);
    }
};

// ===== TOPICS MANAGER =====
const TopicsManager = {
    topics: {
        variables: {
            title: 'Variables & Data Types',
            content: `
                <h4>🔧 Biến trong JavaScript</h4>
                <p>JavaScript có 3 cách khai báo biến: <code>var</code>, <code>let</code>, và <code>const</code></p>
                
                <h5>1. Let và Const (ES6+)</h5>
                <pre><code>let userName = "Frontend Developer";
const PI = 3.14159;
let age = 25;
let isActive = true;</code></pre>
                
                <h5>2. Kiểu dữ liệu cơ bản</h5>
                <ul>
                    <li><strong>String:</strong> <code>"Hello World"</code></li>
                    <li><strong>Number:</strong> <code>42</code>, <code>3.14</code></li>
                    <li><strong>Boolean:</strong> <code>true</code>, <code>false</code></li>
                    <li><strong>Null:</strong> <code>null</code></li>
                    <li><strong>Undefined:</strong> <code>undefined</code></li>
                </ul>
                
                <h5>3. Scope và Hoisting</h5>
                <pre><code>// Block scope với let
if (true) {
    let blockVar = "Chỉ trong block này";
}

// Function scope với var
function example() {
    var functionVar = "Trong function";
}</code></pre>
            `
        },
        functions: {
            title: 'Functions & Arrow Functions',
            content: `
                <h4>⚡ Hàm trong JavaScript</h4>
                
                <h5>1. Function Declaration</h5>
                <pre><code>function greet(name) {
    return "Xin chào, " + name + "!";
}

console.log(greet("Frontend Developer"));</code></pre>
                
                <h5>2. Arrow Functions (ES6)</h5>
                <pre><code>const greet = (name) => {
    return \`Xin chào, \${name}!\`;
};

// Ngắn gọn hơn
const add = (a, b) => a + b;
const square = x => x * x;</code></pre>
                
                <h5>3. Higher Order Functions</h5>
                <pre><code>const numbers = [1, 2, 3, 4, 5];

// Map
const doubled = numbers.map(n => n * 2);

// Filter
const evens = numbers.filter(n => n % 2 === 0);

// Reduce
const sum = numbers.reduce((acc, n) => acc + n, 0);</code></pre>
            `
        },
        dom: {
            title: 'DOM Manipulation',
            content: `
                <h4>🌐 DOM (Document Object Model)</h4>
                
                <h5>1. Selecting Elements</h5>
                <pre><code>// Query selectors
const element = document.querySelector('.my-class');
const elements = document.querySelectorAll('p');

// By ID
const header = document.getElementById('header');

// By Class
const items = document.getElementsByClassName('item');</code></pre>
                
                <h5>2. Modifying Elements</h5>
                <pre><code>// Thay đổi nội dung
element.textContent = 'Nội dung mới';
element.innerHTML = '<strong>HTML mới</strong>';

// Thay đổi attributes
element.setAttribute('data-id', '123');
element.classList.add('active');
element.style.color = 'blue';</code></pre>
                
                <h5>3. Event Handling</h5>
                <pre><code>button.addEventListener('click', function(e) {
    e.preventDefault();
    console.log('Button clicked!');
});

// Arrow function
button.addEventListener('click', (e) => {
    console.log('Clicked with arrow function');
});</code></pre>
            `
        },
        async: {
            title: 'Async JavaScript',
            content: `
                <h4>⏰ Lập trình bất đồng bộ</h4>
                
                <h5>1. Promises</h5>
                <pre><code>const fetchData = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('Data loaded!');
        }, 2000);
    });
};

fetchData()
    .then(data => console.log(data))
    .catch(error => console.error(error));</code></pre>
                
                <h5>2. Async/Await</h5>
                <pre><code>async function loadUserData() {
    try {
        const response = await fetch('/api/user');
        const userData = await response.json();
        console.log(userData);
    } catch (error) {
        console.error('Error:', error);
    }
}</code></pre>
                
                <h5>3. Fetch API</h5>
                <pre><code>// GET request
fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(posts => console.log(posts));

// POST request
fetch('/api/users', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        name: 'John Doe',
        email: 'john@example.com'
    })
});</code></pre>
            `
        },
        es6: {
            title: 'ES6+ Modern Features',
            content: `
                <h4>✨ Tính năng ES6+ hiện đại</h4>
                
                <h5>1. Destructuring</h5>
                <pre><code>// Array destructuring
const [first, second, ...rest] = [1, 2, 3, 4, 5];

// Object destructuring
const {name, age, email} = user;
const {name: userName, age: userAge} = user;</code></pre>
                
                <h5>2. Template Literals</h5>
                <pre><code>const name = 'Frontend';
const message = \`Xin chào \${name}!
Đây là multi-line string
với embedded expressions.\`;</code></pre>
                
                <h5>3. Modules</h5>
                <pre><code>// utils.js
export const formatDate = (date) => {
    return date.toLocaleDateString('vi-VN');
};

export default class User {
    constructor(name) {
        this.name = name;
    }
}

// main.js
import User, {formatDate} from './utils.js';</code></pre>
                
                <h5>4. Classes</h5>
                <pre><code>class Student {
    constructor(name, grade) {
        this.name = name;
        this.grade = grade;
    }
    
    study() {
        console.log(\`\${this.name} đang học bài\`);
    }
    
    static getSchoolName() {
        return 'Frontend Academy';
    }
}</code></pre>
            `
        },
        apis: {
            title: 'APIs & JSON',
            content: `
                <h4>🔌 APIs và JSON</h4>
                
                <h5>1. JSON Basics</h5>
                <pre><code>// JSON object
const userData = {
    "id": 1,
    "name": "Nguyễn Văn A",
    "email": "nguyenvana@example.com",
    "skills": ["HTML", "CSS", "JavaScript"]
};

// Convert to JSON string
const jsonString = JSON.stringify(userData);

// Parse JSON
const parsedData = JSON.parse(jsonString);</code></pre>
                
                <h5>2. REST API Example</h5>
                <pre><code>class ApiService {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }
    
    async get(endpoint) {
        const response = await fetch(\`\${this.baseUrl}\${endpoint}\`);
        return response.json();
    }
    
    async post(endpoint, data) {
        const response = await fetch(\`\${this.baseUrl}\${endpoint}\`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        return response.json();
    }
}

const api = new ApiService('https://api.example.com');
const users = await api.get('/users');</code></pre>
                
                <h5>3. Error Handling</h5>
                <pre><code>async function fetchWithErrorHandling() {
    try {
        const response = await fetch('/api/data');
        
        if (!response.ok) {
            throw new Error(\`HTTP \${response.status}: \${response.statusText}\`);
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}</code></pre>
            `
        }
    },

    init() {
        this.bindEvents();
    },

    bindEvents() {
        const topicCards = document.querySelectorAll('.topic-card');
        const exploreButtons = document.querySelectorAll('.btn-explore');

        topicCards.forEach(card => {
            card.addEventListener('click', () => {
                const topic = card.getAttribute('data-topic');
                this.openTopicModal(topic);
            });
        });

        exploreButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const topic = btn.closest('.topic-card').getAttribute('data-topic');
                this.openTopicModal(topic);
            });
        });
    },

    openTopicModal(topicKey) {
        const topic = this.topics[topicKey];
        if (!topic) return;

        const modal = document.getElementById('topic-modal');
        const modalTitle = document.getElementById('modal-title');
        const modalBody = document.getElementById('modal-body');

        modalTitle.textContent = topic.title;
        modalBody.innerHTML = topic.content;

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';

        AppState.currentTopicModal = topicKey;
        
        // Highlight code blocks
        this.highlightCode();
    },

    closeModal() {
        const modal = document.getElementById('topic-modal');
        modal.classList.remove('active');
        document.body.style.overflow = '';
        AppState.currentTopicModal = null;
    },

    highlightCode() {
        // Simple code highlighting
        const codeBlocks = document.querySelectorAll('pre code');
        codeBlocks.forEach(block => {
            let html = block.innerHTML;
            
            // Keywords
            html = html.replace(/\b(const|let|var|function|return|if|else|for|while|class|async|await|try|catch|import|export|default)\b/g, 
                '<span style="color: #c678dd;">$1</span>');
            
            // Strings
            html = html.replace(/(["'`])([^"'`]*)\1/g, 
                '<span style="color: #98c379;">$1$2$1</span>');
            
            // Comments
            html = html.replace(/\/\/(.*)/g, 
                '<span style="color: #5c6370;">// $1</span>');
            
            block.innerHTML = html;
        });
    }
};

// ===== DEMO EDITOR MANAGER =====
const DemoEditor = {
    editors: {
        html: '',
        css: '',
        js: ''
    },

    init() {
        this.loadDefaultCode();
        this.bindEvents();
        this.runCode();
    },

    loadDefaultCode() {
        const htmlEditor = document.getElementById('html-editor');
        const cssEditor = document.getElementById('css-editor');
        const jsEditor = document.getElementById('js-editor');

        if (htmlEditor) this.editors.html = htmlEditor.value;
        if (cssEditor) this.editors.css = cssEditor.value;
        if (jsEditor) this.editors.js = jsEditor.value;
    },

    bindEvents() {
        // Tab switching
        const tabs = document.querySelectorAll('.demo-editor .tab');
        const editors = document.querySelectorAll('.code-editor');

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const tabType = tab.getAttribute('data-tab');
                this.switchTab(tabType);
            });
        });

        // Code input
        editors.forEach(editor => {
            editor.addEventListener('input', (e) => {
                const editorType = e.target.id.replace('-editor', '');
                this.editors[editorType] = e.target.value;
            });
        });

        // Run button
        const runBtn = document.getElementById('run-code');
        if (runBtn) {
            runBtn.addEventListener('click', () => {
                this.runCode();
            });
        }

        // Refresh button
        const refreshBtn = document.getElementById('refresh-preview');
        if (refreshBtn) {
            refreshBtn.addEventListener('click', () => {
                this.runCode();
            });
        }

        // Auto-run after changes (debounced)
        const debouncedRun = Utils.debounce(() => this.runCode(), 1000);
        editors.forEach(editor => {
            editor.addEventListener('input', debouncedRun);
        });
    },

    switchTab(tabType) {
        AppState.currentTab = tabType;

        // Update tab buttons
        const tabs = document.querySelectorAll('.demo-editor .tab');
        tabs.forEach(tab => {
            tab.classList.toggle('active', tab.getAttribute('data-tab') === tabType);
        });

        // Update editors
        const editors = document.querySelectorAll('.code-editor');
        editors.forEach(editor => {
            const editorType = editor.id.replace('-editor', '');
            editor.classList.toggle('active', editorType === tabType);
        });
    },

    runCode() {
        const preview = document.getElementById('preview-frame');
        if (!preview) return;

        // Update editors content
        this.loadDefaultCode();

        const htmlCode = this.editors.html;
        const cssCode = this.editors.css;
        const jsCode = this.editors.js;

        const fullHTML = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <style>
                    body {
                        font-family: system-ui, -apple-system, sans-serif;
                        margin: 20px;
                        line-height: 1.6;
                    }
                    ${cssCode}
                </style>
            </head>
            <body>
                ${htmlCode}
                <script>
                    try {
                        ${jsCode}
                    } catch (error) {
                        document.body.innerHTML += '<div style="color: red; background: #ffe6e6; padding: 10px; margin: 10px 0; border-radius: 4px; border: 1px solid #ffcccc;"><strong>Error:</strong> ' + error.message + '</div>';
                    }
                </script>
            </body>
            </html>
        `;

        // Create blob URL for iframe
        const blob = new Blob([fullHTML], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        preview.src = url;

        // Clean up previous URL
        setTimeout(() => URL.revokeObjectURL(url), 1000);
    }
};

// ===== PRACTICE MANAGER =====
const PracticeManager = {
    init() {
        this.bindEvents();
        this.loadProgress();
    },

    bindEvents() {
        // Level tabs
        const tabBtns = document.querySelectorAll('.tab-btn');
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const level = btn.getAttribute('data-level');
                this.switchLevel(level);
            });
        });

        // Exercise buttons
        const exerciseBtns = document.querySelectorAll('.exercise-card .btn');
        exerciseBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const card = e.target.closest('.exercise-card');
                const exerciseTitle = card.querySelector('h4').textContent;
                this.startExercise(exerciseTitle);
            });
        });
    },

    switchLevel(level) {
        AppState.currentExerciseLevel = level;

        // Update tab buttons
        const tabBtns = document.querySelectorAll('.tab-btn');
        tabBtns.forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-level') === level);
        });

        // Update tab panes
        const tabPanes = document.querySelectorAll('.tab-pane');
        tabPanes.forEach(pane => {
            pane.classList.toggle('active', pane.id === level);
        });

        Utils.storage.set('currentExerciseLevel', level);
    },

    startExercise(title) {
        HeroManager.showNotification(`Bắt đầu bài tập: "${title}"`, 'info');
        
        // Simulate opening exercise
        setTimeout(() => {
            HeroManager.showNotification('Tính năng này sẽ được phát triển trong tương lai! 🚧', 'warning');
        }, 1000);
    },

    loadProgress() {
        const savedLevel = Utils.storage.get('currentExerciseLevel', 'beginner');
        this.switchLevel(savedLevel);
    }
};

// ===== MODAL MANAGER =====
const ModalManager = {
    init() {
        this.bindEvents();
    },

    bindEvents() {
        // Modal close buttons
        const modalCloses = document.querySelectorAll('.modal-close');
        modalCloses.forEach(close => {
            close.addEventListener('click', () => {
                this.closeAllModals();
            });
        });

        // Click outside modal to close
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeAllModals();
                }
            });
        });

        // Escape key to close modal
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeAllModals();
            }
        });
    },

    closeAllModals() {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            modal.classList.remove('active');
        });
        document.body.style.overflow = '';
        TopicsManager.closeModal();
    }
};

// ===== BACK TO TOP MANAGER =====
const BackToTopManager = {
    init() {
        this.createButton();
        this.bindEvents();
    },

    createButton() {
        const button = document.getElementById('back-to-top');
        if (button) {
            this.updateVisibility();
        }
    },

    bindEvents() {
        const button = document.getElementById('back-to-top');
        if (button) {
            button.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }

        window.addEventListener('scroll', Utils.throttle(() => {
            this.updateVisibility();
        }, 100));
    },

    updateVisibility() {
        const button = document.getElementById('back-to-top');
        if (button) {
            const shouldShow = window.pageYOffset > 300;
            button.classList.toggle('visible', shouldShow);
        }
    }
};

// ===== ACCESSIBILITY MANAGER =====
const AccessibilityManager = {
    init() {
        this.setupKeyboardNavigation();
        this.setupFocusManagement();
        this.setupScreenReaderSupport();
    },

    setupKeyboardNavigation() {
        // Skip to main content link
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.textContent = 'Chuyển đến nội dung chính';
        skipLink.className = 'skip-link';
        document.body.insertBefore(skipLink, document.body.firstChild);

        // Tab navigation for modals
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                this.handleTabNavigation(e);
            }
        });
    },

    setupFocusManagement() {
        // Focus trap for modals
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            modal.addEventListener('keydown', (e) => {
                if (e.key === 'Tab') {
                    this.trapFocus(e, modal);
                }
            });
        });
    },

    setupScreenReaderSupport() {
        // Add aria-labels and roles where needed
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            if (!link.getAttribute('aria-label')) {
                link.setAttribute('aria-label', link.textContent);
            }
        });

        // Live region for notifications
        const liveRegion = document.createElement('div');
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.className = 'sr-only';
        liveRegion.id = 'live-region';
        document.body.appendChild(liveRegion);
    },

    trapFocus(e, container) {
        const focusableElements = container.querySelectorAll(
            'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
        }
    },

    announceToScreenReader(message) {
        const liveRegion = document.getElementById('live-region');
        if (liveRegion) {
            liveRegion.textContent = message;
        }
    }
};

// ===== PERFORMANCE MANAGER =====
const PerformanceManager = {
    init() {
        this.setupLazyLoading();
        this.setupIntersectionObserver();
        this.monitorPerformance();
    },

    setupLazyLoading() {
        // Lazy load images
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    },

    setupIntersectionObserver() {
        // Animate elements on scroll
        const animatedElements = document.querySelectorAll('.topic-card, .project-card, .exercise-card');
        
        const animationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        animatedElements.forEach(el => {
            el.style.animationPlayState = 'paused';
            animationObserver.observe(el);
        });
    },

    monitorPerformance() {
        // Monitor page load performance
        window.addEventListener('load', () => {
            const perfData = performance.getEntriesByType('navigation')[0];
            const loadTime = perfData.loadEventEnd - perfData.loadEventStart;
            
            console.log(`Page load time: ${loadTime}ms`);
            
            // Report slow loads
            if (loadTime > 3000) {
                console.warn('Slow page load detected');
            }
        });
    }
};

// ===== MAIN APPLICATION =====
const App = {
    init() {
        console.log('🚀 Frontend Academy - Bài 5 initialized!');
        
        try {
            // Initialize all managers
            Navigation.init();
            HeroManager.init();
            TopicsManager.init();
            DemoEditor.init();
            PracticeManager.init();
            ModalManager.init();
            BackToTopManager.init();
            AccessibilityManager.init();
            PerformanceManager.init();

            // Set up global error handling
            this.setupErrorHandling();
            
            // Analytics (placeholder)
            this.initAnalytics();
            
            console.log('✅ All modules initialized successfully');
            
        } catch (error) {
            console.error('❌ Error initializing app:', error);
            this.handleInitError(error);
        }
    },

    setupErrorHandling() {
        window.addEventListener('error', (e) => {
            console.error('Global error:', e.error);
            HeroManager.showNotification('Đã xảy ra lỗi. Vui lòng thử lại!', 'error');
        });

        window.addEventListener('unhandledrejection', (e) => {
            console.error('Unhandled promise rejection:', e.reason);
            HeroManager.showNotification('Đã xảy ra lỗi bất đồng bộ!', 'error');
        });
    },

    handleInitError(error) {
        const errorDiv = document.createElement('div');
        errorDiv.innerHTML = `
            <div style="
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: #ef4444;
                color: white;
                padding: 2rem;
                border-radius: 8px;
                text-align: center;
                z-index: 9999;
            ">
                <h3>Lỗi khởi tạo ứng dụng</h3>
                <p>Vui lòng tải lại trang</p>
                <button onclick="location.reload()" style="
                    background: white;
                    color: #ef4444;
                    border: none;
                    padding: 0.5rem 1rem;
                    border-radius: 4px;
                    cursor: pointer;
                    margin-top: 1rem;
                ">Tải lại</button>
            </div>
        `;
        document.body.appendChild(errorDiv);
    },

    initAnalytics() {
        // Placeholder for analytics initialization
        console.log('📊 Analytics initialized (placeholder)');
        
        // Track page view
        this.trackEvent('page_view', {
            page: 'bai5-javascript',
            timestamp: new Date().toISOString()
        });
    },

    trackEvent(eventName, data = {}) {
        // Placeholder for event tracking
        console.log(`📈 Event: ${eventName}`, data);
        
        // In a real app, this would send data to analytics service
        // Example: gtag('event', eventName, data);
    }
};

// ===== EVENT LISTENERS =====
document.addEventListener('DOMContentLoaded', () => {
    LoadingManager.init();
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        App,
        Utils,
        Navigation,
        HeroManager,
        TopicsManager,
        DemoEditor,
        PracticeManager
    };
}

// Add notification styles dynamically
const notificationStyles = `
    .notification {
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--bg-card);
        border: 1px solid var(--border);
        border-radius: 8px;
        padding: 1rem;
        box-shadow: var(--shadow-lg);
        z-index: var(--z-tooltip);
        transform: translateX(400px);
        transition: transform 0.3s ease-in-out;
        max-width: 400px;
    }
    
    .notification.show {
        transform: translateX(0);
    }
    
    .notification-success {
        border-left: 4px solid var(--success);
    }
    
    .notification-error {
        border-left: 4px solid var(--danger);
    }
    
    .notification-warning {
        border-left: 4px solid var(--warning);
    }
    
    .notification-info {
        border-left: 4px solid var(--primary);
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: var(--text-secondary);
        cursor: pointer;
        font-size: 1.2rem;
        padding: 0;
        line-height: 1;
    }
    
    .skip-link {
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--primary);
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 0 0 4px 4px;
        z-index: 9999;
        transition: top 0.3s;
    }
    
    .skip-link:focus {
        top: 0;
    }
    
    .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
    }
`;

// Inject styles
const styleSheet = document.createElement('style');
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet);