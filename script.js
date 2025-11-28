// Initialize Lenis for smooth scrolling
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// ==========================================
// CUSTOM CURSOR
// ==========================================
const cursor = document.querySelector('.custom-cursor');
const cursorDot = document.querySelector('.custom-cursor-dot');

if (cursor && cursorDot) {
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Dot follows immediately
        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';
    });

    // Smooth cursor animation
    function animateCursor() {
        // Lerp for smooth following
        cursorX += (mouseX - cursorX) * 0.15;
        cursorY += (mouseY - cursorY) * 0.15;
        
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hover effect on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, .faq-question, .testimonial-btn, .dot, .feature-card, .problem-card, .glass-card');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
        });
    });

    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
        cursorDot.style.opacity = '0';
    });

    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
        cursorDot.style.opacity = '1';
    });
}

document.addEventListener('DOMContentLoaded', () => {

    // Animate Section Titles
    const titles = document.querySelectorAll('.section-title');
    titles.forEach(title => {
        gsap.from(title, {
            scrollTrigger: {
                trigger: title,
                start: "top 80%",
                toggleActions: "play none none reverse"
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        });
    });

    // Problem Cards Stagger
    gsap.from('.problem-card', {
        scrollTrigger: {
            trigger: '.problem-grid',
            start: "top 75%",
        },
        y: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "back.out(1.7)"
    });

    // Feature Rows Animation
    const featureRows = document.querySelectorAll('.feature-row');
    featureRows.forEach(row => {
        const text = row.querySelector('.feature-text');
        const visual = row.querySelector('.feature-visual');

        gsap.from(text, {
            scrollTrigger: {
                trigger: row,
                start: "top 70%",
            },
            x: -50,
            opacity: 0,
            duration: 1,
            ease: "power2.out"
        });

        gsap.from(visual, {
            scrollTrigger: {
                trigger: row,
                start: "top 70%",
            },
            x: 50,
            opacity: 0,
            duration: 1,
            delay: 0.2,
            ease: "power2.out"
        });
    });

    // Parallax Effect for Visuals
    document.querySelectorAll('[data-speed]').forEach(el => {
        const speed = el.getAttribute('data-speed');
        gsap.to(el, {
            scrollTrigger: {
                trigger: el,
                start: "top bottom",
                end: "bottom top",
                scrub: 1
            },
            y: (i, target) => -100 * speed,
            ease: "none"
        });
    });

    // CTA Button Pulse
    gsap.to('.cta-button.large', {
        scale: 1.05,
        duration: 0.8,
        yoyo: true,
        repeat: -1,
        ease: "power1.inOut"
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.glass-nav');
    ScrollTrigger.create({
        trigger: 'body',
        start: '100vh', // When scroll position passes 100vh (end of spacer-section)
        onEnter: () => navbar.classList.add('scrolled'),
        onLeaveBack: () => navbar.classList.remove('scrolled'),
    });

    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuToggle && navLinks) {
        mobileMenuToggle.addEventListener('click', () => {
            mobileMenuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
            const isExpanded = mobileMenuToggle.getAttribute('aria-expanded') === 'true';
            mobileMenuToggle.setAttribute('aria-expanded', !isExpanded);
        });

        // Close menu when a link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuToggle.classList.remove('active');
                navLinks.classList.remove('active');
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // Stats Counter Animation
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        
        ScrollTrigger.create({
            trigger: stat,
            start: 'top 80%',
            onEnter: () => {
                animateCounter(stat, target);
            },
            once: true
        });
    });

    function animateCounter(element, target) {
        let current = 0;
        const increment = target / 60; // Complete in ~60 frames
        const duration = 2000; // 2 seconds
        const stepTime = duration / 60;

        const counter = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target.toLocaleString();
                clearInterval(counter);
            } else {
                element.textContent = Math.floor(current).toLocaleString();
            }
        }, stepTime);
    }

    // Contact Form Animation
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        gsap.from('.contact-item', {
            scrollTrigger: {
                trigger: '.contact-section',
                start: 'top 70%',
            },
            x: -50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power2.out'
        });

        gsap.from('.contact-form', {
            scrollTrigger: {
                trigger: '.contact-section',
                start: 'top 70%',
            },
            x: 50,
            opacity: 0,
            duration: 0.8,
            delay: 0.3,
            ease: 'power2.out'
        });

        // Form submission handler
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const button = contactForm.querySelector('button[type="submit"]');
            const originalText = button.textContent;
            button.textContent = 'Sending...';
            button.disabled = true;

            // Simulate form submission
            setTimeout(() => {
                button.textContent = 'Message Sent!';
                button.style.background = '#22c55e';
                contactForm.reset();

                setTimeout(() => {
                    button.textContent = originalText;
                    button.style.background = '';
                    button.disabled = false;
                }, 3000);
            }, 1500);
        });
    }

    // Footer Animation
    gsap.from('.footer-grid > div', {
        scrollTrigger: {
            trigger: '.site-footer',
            start: 'top 85%',
        },
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out'
    });

    // ==========================================
    // HOW IT WORKS SECTION ANIMATIONS
    // ==========================================
    gsap.from('.process-step', {
        scrollTrigger: {
            trigger: '.how-it-works-section',
            start: 'top 70%',
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out'
    });

    gsap.from('.process-connector', {
        scrollTrigger: {
            trigger: '.how-it-works-section',
            start: 'top 70%',
        },
        scaleX: 0,
        opacity: 0,
        duration: 0.6,
        stagger: 0.2,
        delay: 0.3,
        ease: 'power2.out'
    });

    // ==========================================
    // FEATURES GRID ANIMATIONS
    // ==========================================
    gsap.from('.feature-card', {
        scrollTrigger: {
            trigger: '.features-section',
            start: 'top 70%',
        },
        y: 80,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power2.out'
    });

    // ==========================================
    // TESTIMONIALS SLIDER
    // ==========================================
    const testimonialTrack = document.querySelector('.testimonial-track');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.querySelector('.testimonial-btn.prev');
    const nextBtn = document.querySelector('.testimonial-btn.next');
    const dots = document.querySelectorAll('.testimonial-dots .dot');
    
    if (testimonialTrack && testimonialCards.length > 0) {
        let currentSlide = 0;
        const totalSlides = testimonialCards.length;

        function updateSlider() {
            // For desktop: show 3 cards, move by 1
            const cardWidth = testimonialCards[0].offsetWidth + 32; // width + gap
            testimonialTrack.style.transform = `translateX(-${currentSlide * cardWidth}px)`;

            // Update dots
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentSlide);
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                currentSlide = currentSlide > 0 ? currentSlide - 1 : totalSlides - 1;
                updateSlider();
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                currentSlide = currentSlide < totalSlides - 1 ? currentSlide + 1 : 0;
                updateSlider();
            });
        }

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentSlide = index;
                updateSlider();
            });
        });

        // Auto-advance testimonials
        setInterval(() => {
            if (window.innerWidth > 768) {
                currentSlide = currentSlide < totalSlides - 1 ? currentSlide + 1 : 0;
                updateSlider();
            }
        }, 5000);

        // Animate testimonials on scroll
        gsap.from('.testimonial-card', {
            scrollTrigger: {
                trigger: '.testimonials-section',
                start: 'top 70%',
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power2.out'
        });
    }

    // ==========================================
    // PARTNERS SECTION ANIMATION
    // ==========================================
    gsap.from('.partner-logo', {
        scrollTrigger: {
            trigger: '.partners-section',
            start: 'top 80%',
        },
        y: 30,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power2.out'
    });

    // ==========================================
    // FAQ ACCORDION
    // ==========================================
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
                }
            });

            // Toggle current item
            item.classList.toggle('active');
            question.setAttribute('aria-expanded', !isActive);
        });
    });

    // Animate FAQ items on scroll
    gsap.from('.faq-item', {
        scrollTrigger: {
            trigger: '.faq-section',
            start: 'top 70%',
        },
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out'
    });

});
