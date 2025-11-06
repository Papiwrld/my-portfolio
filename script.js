// Modern Portfolio JavaScript with Enhanced Functionality
// Author: Awagah Eugene Kwesi
// Version: 2.0 - Enhanced with modern features and better performance


// Enhanced DOM Content Loaded Event with advanced error handling
document.addEventListener('DOMContentLoaded', function() {
    try {
        performance.mark('app-init-start');
        
        // Initialize app with error boundaries
        initializeApp();
        
        performance.mark('app-init-end');
        performance.measure('app-initialization', 'app-init-start', 'app-init-end');
        
        // Report performance metrics
        reportPerformanceMetrics();
        
    } catch (error) {
        console.error('Failed to initialize app:', error);
        handleInitializationError(error);
    }
});

// Advanced error handling
function handleInitializationError(error) {
    // Log error details
    console.error('Initialization Error:', {
        message: error.message,
        stack: error.stack,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        url: window.location.href
    });
    
    // Show user-friendly error message
    showNotification('Some features may not work properly. Please refresh the page if you experience issues.', 'error');
    
    
    // Report error to analytics if available
    if (typeof gtag !== 'undefined') {
        gtag('event', 'exception', {
            'description': error.message,
            'fatal': false
        });
    }
}


// Report performance metrics
function reportPerformanceMetrics() {
    const perfData = performance.getEntriesByType('measure');
    const initTime = perfData.find(entry => entry.name === 'app-initialization');
    
    if (initTime) {
        console.log(`🚀 App initialized in ${initTime.duration.toFixed(2)}ms`);
        
        // Report to analytics if available
        if (typeof gtag !== 'undefined') {
            gtag('event', 'timing_complete', {
                'name': 'app-initialization',
                'value': Math.round(initTime.duration)
            });
        }
    }
}

// Enhanced form validation with modern features
class FormValidator {
    constructor(form) {
        this.form = form;
        this.rules = {
            name: { required: true, minLength: 2, maxLength: 100 },
            email: { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
            subject: { required: true, minLength: 5, maxLength: 200 },
            message: { required: true, minLength: 10, maxLength: 1000 }
        };
    }

    validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        const rules = this.rules[fieldName];
        
        if (!rules) return true;

        // Required validation
        if (rules.required && !value) {
            return { isValid: false, message: 'This field is required' };
        }

        // Length validation
        if (rules.minLength && value.length < rules.minLength) {
            return { isValid: false, message: `Minimum ${rules.minLength} characters required` };
        }

        if (rules.maxLength && value.length > rules.maxLength) {
            return { isValid: false, message: `Maximum ${rules.maxLength} characters allowed` };
        }

        // Pattern validation
        if (rules.pattern && !rules.pattern.test(value)) {
            return { isValid: false, message: 'Invalid format' };
        }

        return { isValid: true };
    }

    validateForm() {
        const fields = this.form.querySelectorAll('input, textarea');
        let isValid = true;

        fields.forEach(field => {
            const result = this.validateField(field);
            this.updateFieldError(field, result);
            if (!result.isValid) isValid = false;
        });

        return isValid;
    }

    updateFieldError(field, result) {
        const errorElement = field.parentNode.querySelector('.error-message');
        const formGroup = field.parentNode;

        if (result.isValid) {
            formGroup.classList.remove('error');
            if (errorElement) errorElement.textContent = '';
        } else {
            formGroup.classList.add('error');
            if (errorElement) errorElement.textContent = result.message;
        }
    }
}

// Portfolio Loader Management - Optimized for Performance & Accessibility
function initializePortfolioLoader() {
    const portfolioLoader = document.getElementById('portfolio-loader');
    const skipLink = portfolioLoader?.querySelector('.skip-link');
    const loadingBar = portfolioLoader?.querySelector('.loading-bar');
    
    if (!portfolioLoader) return;
    
    // Lock body scroll when loader is active
    document.body.classList.add('loader-active');
    
    // Update progress bar for screen readers
    let progress = 0;
    const progressInterval = setInterval(() => {
        progress += 2;
        if (loadingBar) {
            loadingBar.setAttribute('aria-valuenow', progress);
        }
        if (progress >= 100) {
            clearInterval(progressInterval);
        }
    }, 60); // Update every 60ms for smooth progress
    
    // Automatic fade out after 5 seconds
    const autoFadeTimeout = setTimeout(() => {
        fadeOutLoader();
    }, 5000);
    
    // Enhanced skip functionality with proper event handling
    if (skipLink) {
        // Use proper event listener with cleanup
        const skipHandler = function(e) {
            e.preventDefault();
            clearTimeout(autoFadeTimeout);
            clearInterval(progressInterval);
            fadeOutLoader();
        };
        
        skipLink.addEventListener('click', skipHandler);
        
        // Keyboard accessibility
        skipLink.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                skipHandler(e);
            }
        });
    }
    
    // Optimized fade out function with proper cleanup
    function fadeOutLoader() {
        // Unlock body scroll before fade-out starts
        document.body.classList.remove('loader-active');
        
        // Announce completion to screen readers
        const liveRegion = document.getElementById('live-region');
        if (liveRegion) {
            liveRegion.textContent = 'Portfolio loading complete';
        }
        
        // Use requestAnimationFrame for smooth animation
        requestAnimationFrame(() => {
            portfolioLoader.style.opacity = '0';
            portfolioLoader.style.transition = 'opacity 0.5s ease';
            
            // Clean up after animation
            setTimeout(() => {
                portfolioLoader.style.display = 'none';
                // Remove from DOM to free memory
                portfolioLoader.remove();
            }, 500);
        });
    }
    
    // Cleanup function for memory management
    return function cleanup() {
        clearTimeout(autoFadeTimeout);
        clearInterval(progressInterval);
        if (skipLink) {
            skipLink.removeEventListener('click', skipHandler);
        }
    };
}


function initializeApp() {
    // Core functionality
    initializePortfolioLoader();
    initializeLoadingScreen();
    initializeNavigation();
    initializeThemeToggle();
    initializeScrollEffects();
    initializeAnimations();
    initializePortfolio();
    initializeContactForm();
    initializeModals();
    initializeBackToTop();
    
    // Enhanced functionality
    initializeOfflineSupport();
    initializeServiceWorker();
    
    // Performance optimizations
    initializeLazyLoading();
    initializeIntersectionObserver();
    initializePerformanceOptimizations();
    
    console.log('✅ Portfolio initialized successfully with enhanced features');
}

// Clean Loading Screen Management
function initializeLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    const progressFill = document.querySelector('.progress-fill');
    const progressText = document.querySelector('.progress-text');
    
    if (loadingScreen) {
        // Simple progress animation
        let progress = 0;
        const progressInterval = setInterval(() => {
            progress += 2;
            if (progress > 100) progress = 100;
            
            if (progressFill) {
                progressFill.style.width = progress + '%';
            }
            
            if (progress >= 100) {
                clearInterval(progressInterval);
            setTimeout(() => {
                    hideLoadingScreen();
                }, 300);
            }
        }, 50);
        
        // Hide loading screen with clean animation
        function hideLoadingScreen() {
                loadingScreen.style.opacity = '0';
            loadingScreen.style.transition = 'opacity 0.6s ease';
            
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                    document.body.classList.add('loaded');
                
                // Trigger clean entrance animations
                triggerCleanEntranceAnimations();
            }, 600);
        }
        
        // Fallback timeout
        setTimeout(() => {
            if (loadingScreen.style.display !== 'none') {
                hideLoadingScreen();
            }
        }, 3000);
    }
}

// Clean entrance animations
function triggerCleanEntranceAnimations() {
    // Animate hero elements with staggered timing
    const heroElements = document.querySelectorAll('.hero-title, .hero-description, .hero-actions, .hero-stats');
    heroElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.5s ease';
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 150);
    });
    
    // Animate service cards with clean timing
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.5s ease';
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 600 + (index * 150));
    });
    
    // Animate background elements subtly
    const bgElements = document.querySelectorAll('.bg-shape');
    bgElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transition = 'opacity 1s ease';
        
        setTimeout(() => {
            element.style.opacity = '1';
        }, 1200 + (index * 300));
    });
}

// Navigation Management
function initializeNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navClose = document.getElementById('nav-close');
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
    
    // Mobile menu close
    if (navClose && navMenu) {
        navClose.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.classList.remove('menu-open');
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
    
    // Enhanced Navbar scroll effect with smooth transitions
    if (navbar) {
        let lastScroll = 0;
        window.addEventListener('scroll', function() {
            const currentScroll = window.scrollY;
            if (currentScroll > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            lastScroll = currentScroll;
        }, { passive: true });
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

// Theme Toggle with System Preference Detection
function initializeThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    // Check for system theme preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Get saved theme or use system preference
    let savedTheme = localStorage.getItem('theme');
    if (!savedTheme) {
        savedTheme = prefersDark.matches ? 'dark' : 'light';
        console.log(`🎨 Using system theme preference: ${savedTheme}`);
    }
    
    body.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    // Listen for system theme changes
    prefersDark.addEventListener('change', (e) => {
        // Only auto-switch if user hasn't manually set a preference
        if (!localStorage.getItem('theme-manual')) {
            const newTheme = e.matches ? 'dark' : 'light';
            body.setAttribute('data-theme', newTheme);
            updateThemeIcon(newTheme);
            console.log(`🎨 System theme changed to: ${newTheme}`);
            announceToScreenReader(`Theme automatically changed to ${newTheme} mode based on system preferences`);
        }
    });
    
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const currentTheme = body.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            // Smooth transition
            body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
            body.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            localStorage.setItem('theme-manual', 'true'); // Mark as manually set
            updateThemeIcon(newTheme);
            
            console.log(`🎨 Theme manually changed to: ${newTheme}`);
            
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
        // Update aria-label for better accessibility
        themeToggle.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`);
        themeToggle.setAttribute('aria-pressed', theme === 'light');
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

// Contact Form Management - Enhanced with security and better UX
function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        const formValidator = new FormValidator(contactForm);
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Honeypot spam protection
            const honeypot = document.getElementById('website');
            if (honeypot && honeypot.value) {
                console.log('Spam detected - honeypot filled');
                return;
            }
            
            // Validate form before submission
            if (!formValidator.validateForm()) {
                showNotification('Please fix the errors in the form before submitting.', 'error');
                return;
            }
            
            handleFormSubmission(this);
        });
        
        // Real-time validation with debouncing
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            let debounceTimer;
            
            input.addEventListener('blur', function() {
                const result = formValidator.validateField(this);
                formValidator.updateFieldError(this, result);
            });
            
            input.addEventListener('input', function() {
                clearTimeout(debounceTimer);
                debounceTimer = setTimeout(() => {
                    const result = formValidator.validateField(this);
                    formValidator.updateFieldError(this, result);
                }, 300);
            });
        });
        
        // Character count for message field
        const messageField = contactForm.querySelector('#message');
        if (messageField) {
            const maxLength = 1000;
            const updateCharCount = () => {
                const remaining = maxLength - messageField.value.length;
                const charCountElement = document.getElementById('char-count') || createCharCountElement();
                charCountElement.textContent = `${remaining} characters remaining`;
                charCountElement.style.color = remaining < 100 ? 'var(--error-color)' : 'var(--text-secondary)';
            };
            
            messageField.addEventListener('input', updateCharCount);
            updateCharCount();
        }
    }
}

// Create character count element
function createCharCountElement() {
    const charCount = document.createElement('div');
    charCount.id = 'char-count';
    charCount.className = 'char-count';
    charCount.style.cssText = 'font-size: 0.8rem; margin-top: 0.5rem; color: var(--text-secondary);';
    
    const messageField = document.getElementById('message');
    messageField.parentNode.appendChild(charCount);
    return charCount;
}

// Handle form submission with enhanced security and UX
function handleFormSubmission(form) {
    console.log('🚀 Form submission started');
    
    const submitButton = form.querySelector('button[type="submit"]');
    const btnText = submitButton.querySelector('.btn-text');
    const btnLoading = submitButton.querySelector('.btn-loading');
    const submitStatus = document.getElementById('submit-status');
    
    // Show loading state
    submitButton.disabled = true;
    btnText.style.display = 'none';
    btnLoading.style.display = 'inline-flex';
    
    // Update status for screen readers
    if (submitStatus) {
        submitStatus.textContent = 'Sending message, please wait...';
    }
    
    // Google Apps Script Web App URL - Connected! ✅
    const scriptURL = 'https://script.google.com/macros/s/AKfycbz8O6Tm_ICoIvs-COg5gtNtqDfXox67kor7I2fM7w/exec';
    
    // Collect and sanitize form data
    const formData = {
        name: sanitizeInput(form.querySelector('#name').value.trim()),
        email: sanitizeInput(form.querySelector('#email').value.trim()),
        subject: sanitizeInput(form.querySelector('#subject').value.trim()),
        message: sanitizeInput(form.querySelector('#message').value.trim()),
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        referrer: document.referrer
    };
    
    console.log('📝 Form data collected:', formData);
    
    // Enhanced validation
    const validationResult = validateFormData(formData);
    if (!validationResult.isValid) {
        console.error('❌ Form validation failed:', validationResult.errors);
        showNotification(validationResult.errors.join(', '), 'error');
        resetFormState();
        return;
    }
    
    console.log('✅ Form validation passed, sending to Google Sheets...');
    
    // Create AbortController for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
    
    // Send to Google Sheets with enhanced error handling
    fetch(scriptURL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        signal: controller.signal
    })
    .then(response => {
        clearTimeout(timeoutId);
        console.log('📤 Response received:', response);
        
        // Reset form
        form.reset();
        
        // Hide loading state
        resetFormState();
        
        // Show success message
        showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
        
        // Announce success to screen readers
        announceToScreenReader('Message sent successfully');
        
        // Update status
        if (submitStatus) {
            submitStatus.textContent = 'Message sent successfully';
        }
        
        console.log('✅ Form submitted successfully');
    })
    .catch(error => {
        clearTimeout(timeoutId);
        console.error('❌ Form submission error:', error);
        
        // Hide loading state
        resetFormState();
        
        // Determine error type and show appropriate message
        let errorMessage = 'Failed to send message. Please try again.';
        if (error.name === 'AbortError') {
            errorMessage = 'Request timed out. Please check your connection and try again.';
        } else if (!navigator.onLine) {
            errorMessage = 'You appear to be offline. Please check your connection.';
        }
        
        showNotification(errorMessage + ' You can also email me directly at kwesieugene77@gmail.com', 'error');
        
        // Update status
        if (submitStatus) {
            submitStatus.textContent = 'Failed to send message';
        }
        
        // Log additional debugging info
        console.error('Error details:', {
            name: error.name,
            message: error.message,
            formData: formData,
            scriptURL: scriptURL,
            online: navigator.onLine
        });
    });
    
    function resetFormState() {
        submitButton.disabled = false;
        btnText.style.display = 'inline-flex';
        btnLoading.style.display = 'none';
    }
}

// Sanitize input to prevent XSS
function sanitizeInput(input) {
    if (typeof input !== 'string') return '';
    return input
        .replace(/[<>]/g, '') // Remove potential HTML tags
        .replace(/javascript:/gi, '') // Remove javascript: protocol
        .trim();
}

// Enhanced form data validation
function validateFormData(data) {
    const errors = [];
    
    // Required field validation
    if (!data.name || data.name.length < 2) {
        errors.push('Name must be at least 2 characters');
    }
    
    if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        errors.push('Please enter a valid email address');
    }
    
    if (!data.subject || data.subject.length < 5) {
        errors.push('Subject must be at least 5 characters');
    }
    
    if (!data.message || data.message.length < 10) {
        errors.push('Message must be at least 10 characters');
    }
    
    // Length validation
    if (data.name && data.name.length > 100) {
        errors.push('Name is too long (max 100 characters)');
    }
    
    if (data.email && data.email.length > 255) {
        errors.push('Email is too long (max 255 characters)');
    }
    
    if (data.subject && data.subject.length > 200) {
        errors.push('Subject is too long (max 200 characters)');
    }
    
    if (data.message && data.message.length > 1000) {
        errors.push('Message is too long (max 1000 characters)');
    }
    
    return {
        isValid: errors.length === 0,
        errors: errors
    };
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
            image: 'Images/Great Dafco shs.png',
            technologies: ['HTML5', 'CSS3', 'JavaScript', 'Education', 'Responsive Design'],
            features: [
                'School information display',
                'Responsive design',
                'Modern UI/UX',
                'Educational content',
                'Professional layout'
            ]
        },
        'recipe-finder': {
            title: 'Recipe Finder',
            description: 'A modern, comprehensive Recipe & Cocktail Finder built with Next.js and TypeScript. Discover recipes and cocktails from around the world, powered by 3 completely public APIs (no API keys required!). Features smart multi-API search, Ghanaian & Nigerian dish support, dark/light theme, PWA support, and advanced filtering.',
            image: 'Images/Reciper Finder.png',
            technologies: ['Next.js', 'TypeScript', 'React', 'Tailwind CSS', 'React Query', 'PWA', 'API Integration'],
            features: [
                'Multi-API search (TheMealDB, TheCocktailDB, RecipePuppy)',
                'Advanced search with autocomplete suggestions',
                'Dark/Light theme with beautiful UI',
                'PWA support - installable as app',
                'Cook mode with step-by-step instructions',
                'Favorites system with local storage',
                'Smart filtering by cuisine, cook time, diet',
                'YouTube video integration for tutorials',
                'Mobile-optimized responsive design',
                'Ghanaian & Nigerian dish support'
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
        let ticking = false;
        
        // Throttled scroll handler for better performance
        const handleScroll = () => {
            if (window.scrollY > 300) {
                backToTopButton.classList.add('show');
            } else {
                backToTopButton.classList.remove('show');
            }
            ticking = false;
        };
        
        window.addEventListener('scroll', function() {
            if (!ticking) {
                window.requestAnimationFrame(handleScroll);
                ticking = true;
            }
        }, { passive: true });
        
        // Smooth scroll to top
        backToTopButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // Also update on initial load
        handleScroll();
    }
}

// Enhanced Service Worker Registration with Offline Support
function initializeServiceWorker() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
            navigator.serviceWorker.register('/sw.js')
                .then(function(registration) {
                    console.log('✅ ServiceWorker registration successful');
                    
                    // Handle updates
                    registration.addEventListener('updatefound', () => {
                        const newWorker = registration.installing;
                        newWorker.addEventListener('statechange', () => {
                            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                                showNotification('New version available! Refresh to update.', 'info');
                            }
                        });
                    });
                })
                .catch(function(error) {
                    console.error('❌ ServiceWorker registration failed:', error);
                });
        });
    }
}

// Simple Offline Detection
function initializeOfflineSupport() {
    // Monitor online/offline status
    function updateOnlineStatus() {
        const isOnline = navigator.onLine;
        
        // Show notification for offline status
        if (!isOnline) {
            showNotification('You are offline. Some features may be limited.', 'warning');
        }
    }
    
    // Listen for online/offline events
    window.addEventListener('online', () => showNotification('You are back online!', 'success'));
    window.addEventListener('offline', updateOnlineStatus);
    
    // Initial status check
    updateOnlineStatus();
}

// Enhanced Lazy Loading with better performance
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                    }
                    img.classList.remove('lazy');
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px', // Start loading 50px before image comes into view
            threshold: 0.01
        });
        
        images.forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // Fallback for browsers without IntersectionObserver
        images.forEach(img => {
            if (img.dataset.src) {
                img.src = img.dataset.src;
            }
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

// Enhanced Keyboard Navigation Support
document.addEventListener('keydown', function(e) {
    // Enhanced Tab navigation for modals
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
    
    // Enhanced keyboard shortcuts
    if (e.ctrlKey || e.metaKey) {
        switch(e.key) {
            case 'k':
                e.preventDefault();
                document.getElementById('theme-toggle').focus();
                break;
            case '/':
                e.preventDefault();
                document.querySelector('.nav-link[href="#home"]').focus();
                break;
        }
    }
    
    // Escape key handling
    if (e.key === 'Escape') {
        // Close any open modals
        const modal = document.getElementById('project-modal');
        if (modal && modal.classList.contains('show')) {
            closeProjectModal();
        }
        
        // Close mobile menu
        const navMenu = document.getElementById('nav-menu');
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            document.getElementById('nav-toggle').classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    }
    
    // Arrow key navigation for portfolio filters
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        const activeFilter = document.querySelector('.filter-btn.active');
        if (activeFilter) {
            const filters = Array.from(document.querySelectorAll('.filter-btn'));
            const currentIndex = filters.indexOf(activeFilter);
            let nextIndex;
            
            if (e.key === 'ArrowLeft') {
                nextIndex = currentIndex > 0 ? currentIndex - 1 : filters.length - 1;
            } else {
                nextIndex = currentIndex < filters.length - 1 ? currentIndex + 1 : 0;
            }
            
            filters[nextIndex].click();
            filters[nextIndex].focus();
            e.preventDefault();
        }
    }
});

// Simple focus management
function manageFocus() {
    // Add focus indicators for keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });
}

// Initialize focus management
manageFocus();


// Performance Optimizations
function initializePerformanceOptimizations() {
    // Optimized scroll handler with RAF
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                updateScrollEffects();
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
    
    // Optimize resize events
    let resizeTimeout;
    window.addEventListener('resize', function() {
        if (resizeTimeout) {
            clearTimeout(resizeTimeout);
        }
        resizeTimeout = setTimeout(function() {
            updateLayoutForViewport();
        }, 250);
    }, { passive: true });
    
    // Preload critical resources
    preloadCriticalResources();
    
    // Initialize Web Vitals monitoring
    initializeWebVitals();
    
    // Initialize performance monitoring
    initializePerformanceMonitoring();
}

// Update scroll effects efficiently
function updateScrollEffects() {
    const scrollY = window.scrollY;
    const navbar = document.getElementById('navbar');
    const backToTop = document.getElementById('back-to-top');
    
    // Update navbar
    if (navbar) {
        if (scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    // Update back to top button
    if (backToTop) {
        if (scrollY > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    }
    
    // Update active nav link
    updateActiveNavLink();
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
        'Images/Logo.png',
        'Images/Eugene at the national theatre.jpg'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Web Vitals Monitoring
function initializeWebVitals() {
    // Only initialize if the browser supports the required APIs
    if (!('PerformanceObserver' in window) || !('getEntriesByType' in performance)) {
        return;
    }
    
    // Monitor Core Web Vitals
    const vitals = {
        lcp: null,
        fid: null,
        cls: null,
        fcp: null,
        ttfb: null
    };
    
    // Largest Contentful Paint (LCP)
    try {
        const lcpObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1];
            vitals.lcp = lastEntry.startTime;
            console.log('🎯 LCP:', vitals.lcp.toFixed(2), 'ms');
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
    } catch (e) {
        console.warn('LCP monitoring not supported');
    }
    
    // First Input Delay (FID)
    try {
        const fidObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach((entry) => {
                vitals.fid = entry.processingStart - entry.startTime;
                console.log('🎯 FID:', vitals.fid.toFixed(2), 'ms');
            });
        });
        fidObserver.observe({ entryTypes: ['first-input'] });
    } catch (e) {
        console.warn('FID monitoring not supported');
    }
    
    // Cumulative Layout Shift (CLS)
    try {
        let clsValue = 0;
        const clsObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach((entry) => {
                if (!entry.hadRecentInput) {
                    clsValue += entry.value;
                }
            });
            vitals.cls = clsValue;
            console.log('🎯 CLS:', vitals.cls.toFixed(4));
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });
    } catch (e) {
        console.warn('CLS monitoring not supported');
    }
    
    // First Contentful Paint (FCP)
    try {
        const fcpObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach((entry) => {
                vitals.fcp = entry.startTime;
                console.log('🎯 FCP:', vitals.fcp.toFixed(2), 'ms');
            });
        });
        fcpObserver.observe({ entryTypes: ['paint'] });
    } catch (e) {
        console.warn('FCP monitoring not supported');
    }
    
    // Time to First Byte (TTFB)
    try {
        const navigationEntry = performance.getEntriesByType('navigation')[0];
        if (navigationEntry) {
            vitals.ttfb = navigationEntry.responseStart - navigationEntry.requestStart;
            console.log('🎯 TTFB:', vitals.ttfb.toFixed(2), 'ms');
        }
    } catch (e) {
        console.warn('TTFB monitoring not supported');
    }
    
    // Report vitals after page load
    window.addEventListener('load', () => {
        setTimeout(() => {
            console.log('📊 Core Web Vitals Summary:', vitals);
            
            // Send to analytics if available
            if (typeof gtag !== 'undefined') {
                Object.entries(vitals).forEach(([metric, value]) => {
                    if (value !== null) {
                        gtag('event', 'web_vitals', {
                            'metric_name': metric,
                            'metric_value': Math.round(value),
                            'event_category': 'Performance'
                        });
                    }
                });
            }
        }, 1000);
    });
}

// Performance Monitoring
function initializePerformanceMonitoring() {
    // Monitor resource loading times
    if ('PerformanceObserver' in window) {
        try {
            const resourceObserver = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach((entry) => {
                    if (entry.duration > 1000) { // Log resources taking more than 1 second
                        console.warn('🐌 Slow resource:', entry.name, entry.duration.toFixed(2), 'ms');
                    }
                });
            });
            resourceObserver.observe({ entryTypes: ['resource'] });
        } catch (e) {
            console.warn('Resource monitoring not supported');
        }
    }
    
    // Monitor long tasks
    if ('PerformanceObserver' in window) {
        try {
            const longTaskObserver = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach((entry) => {
                    console.warn('⚠️ Long task detected:', entry.duration.toFixed(2), 'ms');
                });
            });
            longTaskObserver.observe({ entryTypes: ['longtask'] });
        } catch (e) {
            console.warn('Long task monitoring not supported');
        }
    }
    
    // Monitor memory usage (if available)
    if ('memory' in performance) {
        const logMemoryUsage = () => {
            const memory = performance.memory;
            console.log('💾 Memory usage:', {
                used: Math.round(memory.usedJSHeapSize / 1024 / 1024) + ' MB',
                total: Math.round(memory.totalJSHeapSize / 1024 / 1024) + ' MB',
                limit: Math.round(memory.jsHeapSizeLimit / 1024 / 1024) + ' MB'
            });
        };
        
        // Log memory usage every 30 seconds
        setInterval(logMemoryUsage, 30000);
    }
}

// Enhanced error handling with better reporting
function initializeErrorHandling() {
    // Global error handler
    window.addEventListener('error', (event) => {
        console.error('🚨 Global error:', {
            message: event.message,
            filename: event.filename,
            lineno: event.lineno,
            colno: event.colno,
            error: event.error
        });
        
        // Send to analytics if available
        if (typeof gtag !== 'undefined') {
            gtag('event', 'exception', {
                'description': event.message,
                'fatal': false
            });
        }
    });
    
    // Unhandled promise rejection handler
    window.addEventListener('unhandledrejection', (event) => {
        console.error('🚨 Unhandled promise rejection:', event.reason);
        
        // Send to analytics if available
        if (typeof gtag !== 'undefined') {
            gtag('event', 'exception', {
                'description': event.reason.toString(),
                'fatal': false
            });
        }
    });
}

// Initialize error handling
initializeErrorHandling();

// Export functions for global access
window.openProjectModal = openProjectModal;
window.closeProjectModal = closeProjectModal;
