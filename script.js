document.addEventListener('DOMContentLoaded', () => {

    // ========================================
    // SHADOW FIGHTER PRELOADER
    // ========================================

    const preloader = document.getElementById('preloader');
    const percentageNumber = document.querySelector('.percentage-number');

    // Animate percentage counter
    let count = 0;
    const countInterval = setInterval(() => {
        count += Math.floor(Math.random() * 15) + 5; // Random increment for realism
        if (count > 100) count = 100;
        if (percentageNumber) {
            percentageNumber.textContent = count;
        }
        if (count >= 100) {
            clearInterval(countInterval);
        }
    }, 200);

    // Show preloader for 4.5 seconds to allow full animation
    setTimeout(() => {
        if (preloader) {
            preloader.classList.add('fade-out');
            // Remove from DOM after fade completes
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 800);
        }
    }, 4500);

    // --- CUSTOM CURSOR ---
    const cursorDot = document.querySelector('[data-cursor-dot]');
    const cursorOutline = document.querySelector('[data-cursor-outline]');
    const isTouch = window.matchMedia('(hover: none)').matches;

    if (cursorDot && cursorOutline && !isTouch) {
        document.body.classList.add('custom-cursor-active');

        // Mouse move listener
        let cursorRAF;
        window.addEventListener('mousemove', function (e) {
            const posX = e.clientX;
            const posY = e.clientY;

            if (cursorRAF) cancelAnimationFrame(cursorRAF);
            cursorRAF = requestAnimationFrame(() => {
                cursorDot.style.left = `${posX}px`;
                cursorDot.style.top = `${posY}px`;

                cursorOutline.animate({
                    left: `${posX}px`,
                    top: `${posY}px`
                }, { duration: 500, fill: "forwards" });
            });
        });
    } else {
        document.body.classList.remove('custom-cursor-active');
        // Hide cursor elements explicitly if needed, though CSS handles display:none on touch
        if (cursorDot) cursorDot.style.display = 'none';
        if (cursorOutline) cursorOutline.style.display = 'none';
    }

    // Hover Effects for Cursor
    const hoverables = document.querySelectorAll('a, button, .project-card, .service-card');
    if (!isTouch) {
        hoverables.forEach(el => {
            el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
            el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
        });

        // Click Feedback
        document.addEventListener('mousedown', () => document.body.classList.add('cursor-clicking'));
        document.addEventListener('mouseup', () => document.body.classList.remove('cursor-clicking'));
    }

    // --- MAGNETIC BUTTONS ---
    const magnets = document.querySelectorAll('.magnetic');
    magnets.forEach((magnet) => {
        let magnetRAF;
        magnet.addEventListener('mousemove', (e) => {
            if (magnetRAF) cancelAnimationFrame(magnetRAF);
            magnetRAF = requestAnimationFrame(() => {
                const position = magnet.getBoundingClientRect();
                const x = e.clientX - position.left - position.width / 2;
                const y = e.clientY - position.top - position.height / 2;

                magnet.style.transform = `translate(${x * 0.3}px, ${y * 0.5}px)`;
                if (magnet.children[0]) {
                    magnet.children[0].style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
                }
            });
        });

        magnet.addEventListener('mouseleave', () => {
            magnet.style.transform = 'translate(0px, 0px)';
            magnet.children[0].style.transform = 'translate(0px, 0px)';
        });
    });

    // --- 3D TILT EFFECT ---
    if (!isTouch) {
        const tiltCards = document.querySelectorAll('.tilt-card');
        tiltCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = ((y - centerY) / centerY) * -10; // Max rotation deg
                const rotateY = ((x - centerX) / centerX) * 10;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            });
        });
    }

    // --- NAVBAR SCROLL EFFECT ---
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- NAV MENU TOGGLE ---
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navOverlay = document.getElementById('nav-overlay');

    const closeMenu = () => {
        navMenu.classList.remove('active');
        navOverlay.classList.remove('active');
        navToggle.classList.remove('active'); // Add this
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    };

    const openMenu = () => {
        navMenu.classList.add('active');
        navOverlay.classList.add('active');
        navToggle.classList.add('active'); // Add this
        navToggle.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
    };

    if (navToggle && navMenu && navOverlay) {
        navToggle.addEventListener('click', () => {
            const expanded = navToggle.getAttribute('aria-expanded') === 'true';
            if (expanded) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        navOverlay.addEventListener('click', closeMenu);
        navMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
    }

    // --- RANDOM PROFILE IMAGE ---
    const profileImg = document.querySelector('.profile-img');
    if (profileImg) {
        const images = [
            'Images/Eugene at the national theatre.jpg',
            'Images/Eugene in flared Jeans.jpg',
            'Images/Mirror Selfie.jpg'
        ];

        // Select random image
        const randomImage = images[Math.floor(Math.random() * images.length)];
        profileImg.src = randomImage;

        // Update alt text based on image for better accessibility
        if (randomImage.includes('theatre')) {
            profileImg.alt = 'Eugene at the National Theatre';
        } else if (randomImage.includes('Jeans')) {
            profileImg.alt = 'Eugene in flared jeans';
        } else {
            profileImg.alt = 'Eugene mirror selfie';
        }
    }

    // --- RESUME TABS ---
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            // Add active class to clicked
            btn.classList.add('active');
            const tabId = btn.getAttribute('data-tab');
            const activeContent = document.getElementById(tabId);
            activeContent.classList.add('active');

            // Trigger animations if skills tab is active
            if (tabId === 'skills') {
                animateSkills();
            }
        });
    });

    // --- SKILL BAR ANIMATION ---
    const animateSkills = () => {
        const skillBars = document.querySelectorAll('.skill-progress');
        skillBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0'; // Reset to 0
            setTimeout(() => {
                bar.style.width = width; // Animate to target
            }, 100);
        });
    };

    // Initial check for skills animation
    const skillsSection = document.getElementById('skills');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && skillsSection.classList.contains('active')) {
                animateSkills();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    if (skillsSection) {
        observer.observe(skillsSection);
    }

    // --- FORM SUBMISSION ---
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(contactForm);
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerText;

            submitBtn.innerText = 'Sending...';
            submitBtn.disabled = true;
            formStatus.className = 'form-status';
            formStatus.innerText = '';

            try {
                const response = await fetch(contactForm.action, {
                    method: contactForm.method,
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    formStatus.classList.add('success');
                    formStatus.innerText = "Thanks for your message! I'll get back to you soon.";
                    contactForm.reset();
                } else {
                    const data = await response.json();
                    if (Object.hasOwnProperty.call(data, 'errors')) {
                        formStatus.classList.add('error');
                        formStatus.innerText = data.errors.map(error => error.message).join(", ");
                    } else {
                        formStatus.classList.add('error');
                        formStatus.innerText = "Oops! There was a problem submitting your form.";
                    }
                }
            } catch (error) {
                formStatus.classList.add('error');
                formStatus.innerText = "Oops! There was a problem submitting your form.";
            } finally {
                submitBtn.innerText = originalBtnText;
                submitBtn.disabled = false;
            }
        });
    }
});
