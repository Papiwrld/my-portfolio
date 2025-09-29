// Modern Portfolio JavaScript with Enhanced Functionality
// Author: Awagah Eugene Kwesi

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initializeApp();
});

// Main App Initialization
function initializeApp() {
    // Core functionality
    initializeLoadingScreen();
    initializeNavigation();
    initializeThemeToggle();
    initializeScrollEffects();
    initializeAnimations();
    initializePortfolio();
    initializeContactForm();
    initializeModals();
    initializeBackToTop();
    initializeServiceWorker();
    
    // Performance optimizations
    initializeLazyLoading();
    initializeIntersectionObserver();
    initializePerformanceOptimizations();
    
    console.log('Portfolio initialized successfully');
}

// Loading Screen Management
function initializeLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    
    if (loadingScreen) {
        // Hide loading screen after page load
        window.addEventListener('load', function() {
            setTimeout(() => {
                loadingScreen.style.opacity = '0';
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                    document.body.classList.add('loaded');
                }, 300);
            }, 1000);
        });
    }
}

// Navigation Management
function initializeNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.getElementById('navbar');
    
    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
    }
    
    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (navMenu && navToggle && 
            !navMenu.contains(e.target) && 
            !navToggle.contains(e.target) && 
            navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });
    
    // Navbar scroll effect
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
    
    // Active navigation link highlighting
    window.addEventListener('scroll', updateActiveNavLink);
    updateActiveNavLink();
}

// Update active navigation link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Theme Toggle Functionality
function initializeThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'dark';
    body.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const currentTheme = body.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            body.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
            
            // Announce theme change to screen readers
            announceToScreenReader(`Theme changed to ${newTheme} mode`);
        });
    }
}

// Update theme toggle icon
function updateThemeIcon(theme) {
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        const icon = themeToggle.querySelector('i');
        if (icon) {
            icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }
    }
}

// Scroll Effects
function initializeScrollEffects() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Animation Management
function initializeAnimations() {
    // Animate counters
    animateCounters();
    
    // Animate skill bars
    animateSkillBars();
    
    // Initialize AOS-like animations
    initializeScrollAnimations();
}

// Animate counters
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            counter.textContent = Math.floor(current);
            
            if (current >= target) {
                counter.textContent = target;
                clearInterval(timer);
            }
        }, 16);
    };
    
    // Intersection Observer for counters
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// Animate skill bars
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const animateSkillBar = (bar) => {
        const width = bar.getAttribute('data-width');
        bar.style.width = width + '%';
    };
    
    // Intersection Observer for skill bars
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBar(entry.target);
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });
}

// Initialize scroll animations
function initializeScrollAnimations() {
    const animatedElements = document.querySelectorAll('[data-aos]');
    
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(element => {
        animationObserver.observe(element);
    });
}

// Portfolio Management
function initializePortfolio() {
    // Portfolio filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter portfolio items
            portfolioItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeInUp 0.5s ease';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// Contact Form Management
function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmission(this);
        });
        
        // Real-time validation
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                clearFieldError(this);
            });
        });
    }
}

// Handle form submission
function handleFormSubmission(form) {
    const submitButton = form.querySelector('button[type="submit"]');
    const btnText = submitButton.querySelector('.btn-text');
    const btnLoading = submitButton.querySelector('.btn-loading');
    
    // Show loading state
    submitButton.disabled = true;
    btnText.style.display = 'none';
    btnLoading.style.display = 'inline-flex';
    
    // Simulate form submission (replace with actual endpoint)
    setTimeout(() => {
        // Reset form
        form.reset();
        
        // Hide loading state
        submitButton.disabled = false;
        btnText.style.display = 'inline-flex';
        btnLoading.style.display = 'none';
        
        // Show success message
        showNotification('Message sent successfully!', 'success');
        
        // Announce success to screen readers
        announceToScreenReader('Message sent successfully');
    }, 2000);
}

// Validate form field
function validateField(field) {
    const value = field.value.trim();
    const fieldType = field.type;
    const isRequired = field.hasAttribute('required');
    const errorMessage = field.parentNode.querySelector('.error-message');
    
    let isValid = true;
    let message = '';
    
    if (isRequired && !value) {
        isValid = false;
        message = 'This field is required';
    } else if (fieldType === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            message = 'Please enter a valid email address';
        }
    }
    
    if (isValid) {
        field.parentNode.classList.remove('error');
        if (errorMessage) errorMessage.textContent = '';
    } else {
        field.parentNode.classList.add('error');
        if (errorMessage) errorMessage.textContent = message;
    }
    
    return isValid;
}

// Clear field error
function clearFieldError(field) {
    field.parentNode.classList.remove('error');
    const errorMessage = field.parentNode.querySelector('.error-message');
    if (errorMessage) errorMessage.textContent = '';
}

// Modal Management
function initializeModals() {
    const modal = document.getElementById('project-modal');
    const closeModal = document.querySelector('.close-modal');
    
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            closeProjectModal();
        });
    }
    
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeProjectModal();
            }
        });
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal && modal.classList.contains('show')) {
            closeProjectModal();
        }
    });
}

// Open project modal
function openProjectModal(projectId) {
    const modal = document.getElementById('project-modal');
    const modalContent = document.getElementById('modal-content');
    
    if (modal && modalContent) {
        const projectData = getProjectData(projectId);
        
        modalContent.innerHTML = `
            <div class="project-modal-content">
                <div class="project-image">
                    <img src="${projectData.image}" alt="${projectData.title}">
                </div>
                <div class="project-details">
                    <h2>${projectData.title}</h2>
                    <p>${projectData.description}</p>
                    <div class="project-tech">
                        <h4>Technologies Used</h4>
                        <div class="tech-tags">
                            ${projectData.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                        </div>
                    </div>
                    <div class="project-features">
                        <h4>Key Features</h4>
                        <ul>
                            ${projectData.features.map(feature => `<li>${feature}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            </div>
        `;
        
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
        
        // Focus management for accessibility
        const firstFocusable = modal.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (firstFocusable) firstFocusable.focus();
    }
}

// Close project modal
function closeProjectModal() {
    const modal = document.getElementById('project-modal');
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }
}

// Get project data
function getProjectData(projectId) {
    const projects = {
        pinterest: {
            title: 'Pinterest Affiliate Marketing',
            description: 'Fashion-focused affiliate marketing content on Pinterest with strategic pinning and engagement strategies.',
            image: 'Images/Work.jpg',
            technologies: ['Pinterest Marketing', 'Content Creation', 'Affiliate Marketing', 'Social Media'],
            features: [
                'Strategic pinning schedule',
                'High-quality visual content',
                'Affiliate link optimization',
                'Engagement tracking',
                'Brand consistency'
            ]
        },
        calculator: {
            title: 'Java GUI Calculator',
            description: 'A desktop calculator application built with Java Swing featuring arithmetic operations and a clean interface.',
            image: 'Images/Work 1.png',
            technologies: ['Java', 'Swing', 'GUI', 'Desktop Application'],
            features: [
                'Basic arithmetic operations',
                'Clean user interface',
                'Error handling',
                'Cross-platform compatibility',
                'Modular code structure'
            ]
        },
        fashion: {
            title: 'Fashion Finesse E-commerce',
            description: 'Modern fashion e-commerce website with AI chatbot integration, responsive design, and affiliate marketing features.',
            image: 'Images/Fashion finesse deployed.png',
            technologies: ['HTML5', 'CSS3', 'JavaScript', 'AI Chatbot', 'Responsive Design'],
            features: [
                'Responsive design',
                'AI-powered chatbot',
                'Product catalog',
                'Affiliate integration',
                'Modern UI/UX'
            ]
        },
        weather: {
            title: 'Weather Application',
            description: 'Real-time weather information application with location-based forecasts and interactive user interface.',
            image: 'Images/Weather App (2).png',
            technologies: ['JavaScript', 'API Integration', 'Responsive Design', 'Weather API'],
            features: [
                'Real-time weather data',
                'Location-based forecasts',
                'Interactive UI',
                'Responsive design',
                'API integration'
            ]
        },
        dafco: {
            title: 'Great Dafco SHS Website',
            description: 'Professional frontend website for Great Dafco Senior High School with modern design and responsive layout.',
            image: 'Images/Great Dafco.png',
            technologies: ['HTML5', 'CSS3', 'JavaScript', 'Education', 'Responsive Design'],
            features: [
                'School information display',
                'Responsive design',
                'Modern UI/UX',
                'Educational content',
                'Professional layout'
            ]
        }
    };
    
    return projects[projectId] || {
        title: 'Project Not Found',
        description: 'Project information not available.',
        image: 'Images/Work.jpg',
        technologies: [],
        features: []
    };
}

// Back to Top Button
function initializeBackToTop() {
    const backToTopButton = document.getElementById('back-to-top');
    
    if (backToTopButton) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTopButton.classList.add('show');
            } else {
                backToTopButton.classList.remove('show');
            }
        });
        
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Service Worker Registration
function initializeServiceWorker() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
            navigator.serviceWorker.register('/sw.js')
                .then(function(registration) {
                    console.log('ServiceWorker registration successful');
                })
                .catch(function(error) {
                    console.log('ServiceWorker registration failed');
                });
        });
    }
}

// Lazy Loading
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Intersection Observer for general animations
function initializeIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements with animation classes
    const animatedElements = document.querySelectorAll('.service-card, .portfolio-item, .contact-item');
    animatedElements.forEach(el => observer.observe(el));
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 300);
    }, 5000);
}

// Screen Reader Announcements
function announceToScreenReader(message) {
    const liveRegion = document.getElementById('live-region');
    if (liveRegion) {
        liveRegion.textContent = message;
        setTimeout(() => {
            liveRegion.textContent = '';
        }, 1000);
    }
}

// Tab Management for About Section
function initializeTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Update active button
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Update active content
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === targetTab) {
                    content.classList.add('active');
                }
            });
        });
    });
}

// Initialize tabs when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initializeTabs();
});

// Keyboard Navigation Support
document.addEventListener('keydown', function(e) {
    // Tab navigation for modals
    if (e.key === 'Tab' && document.getElementById('project-modal').classList.contains('show')) {
        const modal = document.getElementById('project-modal');
        const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        if (e.shiftKey) {
            if (document.activeElement === firstElement) {
                lastElement.focus();
                e.preventDefault();
            }
        } else {
            if (document.activeElement === lastElement) {
                firstElement.focus();
                e.preventDefault();
            }
        }
    }
});

// Performance Monitoring
function initializePerformanceMonitoring() {
    // Monitor page load time
    window.addEventListener('load', function() {
        const loadTime = performance.now();
        console.log(`Page loaded in ${loadTime.toFixed(2)}ms`);
        
        // Report to analytics if available
        if (typeof gtag !== 'undefined') {
            gtag('event', 'page_load_time', {
                'value': Math.round(loadTime)
            });
        }
    });
}

// Initialize performance monitoring
initializePerformanceMonitoring();

// Performance Optimizations
function initializePerformanceOptimizations() {
    // Debounce scroll events
    let scrollTimeout;
    const originalScrollHandler = window.onscroll;
    
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(function() {
            if (originalScrollHandler) {
                originalScrollHandler();
            }
        }, 16); // ~60fps
    });
    
    // Optimize resize events
    let resizeTimeout;
    window.addEventListener('resize', function() {
        if (resizeTimeout) {
            clearTimeout(resizeTimeout);
        }
        resizeTimeout = setTimeout(function() {
            // Handle resize optimizations
            updateLayoutForViewport();
        }, 250);
    });
    
    // Preload critical resources
    preloadCriticalResources();
}

// Update layout for viewport changes
function updateLayoutForViewport() {
    // Update any layout-dependent calculations
    const hero = document.querySelector('.hero');
    if (hero && window.innerWidth < 768) {
        // Mobile-specific optimizations
        hero.style.minHeight = '100vh';
    }
}

// Preload critical resources
function preloadCriticalResources() {
    const criticalImages = [
        'Images/user.jpg',
        'Images/Logo.png',
        'Images/background.jpg'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Export functions for global access
window.openProjectModal = openProjectModal;
window.closeProjectModal = closeProjectModal;
