/* ============================================================
   CADBURY v. NEERAJ — INTERACTIVE CASE STUDY PRESENTATION
   JavaScript — Animations, Scroll Effects, Interactivity
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ===== PRELOADER =====
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('hidden');
            document.body.style.overflow = 'auto';
            initHeroAnimations();
        }, 2200);
    });
    // Fallback if load event already fired
    if (document.readyState === 'complete') {
        setTimeout(() => {
            preloader.classList.add('hidden');
            document.body.style.overflow = 'auto';
            initHeroAnimations();
        }, 2200);
    }

    // ===== NAVIGATION =====
    const nav = document.getElementById('main-nav');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    const sections = document.querySelectorAll('.section');
    const allNavLinks = document.querySelectorAll('.nav-link');

    // Scroll-based nav styling
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;
        
        // Nav background
        if (currentScroll > 80) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;

        // Active section tracking
        updateActiveNav();
        
        // Back to top visibility
        updateBackToTop();
    });

    // Mobile nav toggle
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('open');
    });

    // Smooth scroll for nav links
    allNavLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                navLinks.classList.remove('open');
            }
        });
    });

    function updateActiveNav() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 200;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        allNavLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === current) {
                link.classList.add('active');
            }
        });
    }

    // ===== BACK TO TOP =====
    const backToTop = document.getElementById('backToTop');
    
    function updateBackToTop() {
        if (window.scrollY > 600) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ===== SCROLL REVEAL ANIMATIONS =====
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                // Don't unobserve — keeps it simple
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -60px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // ===== HERO PARTICLES =====
    function initHeroAnimations() {
        createParticles();
        // Trigger hero reveals
        document.querySelectorAll('.hero-content .reveal-up').forEach((el, i) => {
            setTimeout(() => {
                el.classList.add('revealed');
            }, 200 + i * 200);
        });
    }

    function createParticles() {
        const container = document.getElementById('heroParticles');
        if (!container) return;
        
        const particleCount = 30;
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.width = (Math.random() * 3 + 1) + 'px';
            particle.style.height = particle.style.width;
            particle.style.animationDuration = (Math.random() * 8 + 6) + 's';
            particle.style.animationDelay = (Math.random() * 10) + 's';
            particle.style.opacity = Math.random() * 0.4 + 0.1;
            container.appendChild(particle);
        }
    }

    // ===== ANIMATED TIMELINE =====
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineProgress = document.getElementById('timelineProgress');
    
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateTimeline();
                timelineObserver.disconnect();
            }
        });
    }, { threshold: 0.2 });

    const timelineContainer = document.querySelector('.timeline-container');
    if (timelineContainer) {
        timelineObserver.observe(timelineContainer);
    }

    function animateTimeline() {
        const timeline = document.querySelector('.timeline');
        if (!timeline) return;
        
        // Animate timeline progress
        if (timelineProgress) {
            setTimeout(() => {
                timelineProgress.style.height = '100%';
            }, 300);
        }

        // Animate each item sequentially
        timelineItems.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('visible');
            }, 500 + index * 500);
        });
    }

    // ===== SALES BAR ANIMATION =====
    const salesBars = document.querySelectorAll('.sales-bar');
    
    const salesObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSalesBars();
                salesObserver.disconnect();
            }
        });
    }, { threshold: 0.3 });

    const salesInfographic = document.querySelector('.sales-infographic');
    if (salesInfographic) {
        salesObserver.observe(salesInfographic);
    }

    function animateSalesBars() {
        salesBars.forEach((bar, index) => {
            const targetWidth = bar.getAttribute('data-width');
            setTimeout(() => {
                bar.style.setProperty('--bar-width', targetWidth + '%');
                bar.classList.add('animated');
            }, 200 + index * 200);
        });
    }

    // ===== OBSERVATION CARD HOVER EFFECTS =====
    const observationCards = document.querySelectorAll('.observation-card');
    observationCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateX(6px)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateX(0)';
        });
    });

    // ===== CONFLICT POINT INTERACTION =====
    const conflictPoints = document.querySelectorAll('.conflict-point');
    conflictPoints.forEach(point => {
        point.addEventListener('mouseenter', () => {
            point.style.borderColor = 'rgba(192, 57, 43, 0.4)';
            point.style.background = 'rgba(192, 57, 43, 0.08)';
        });
        point.addEventListener('mouseleave', () => {
            point.style.borderColor = 'rgba(192, 57, 43, 0.1)';
            point.style.background = 'rgba(10, 14, 26, 0.5)';
        });
    });

    // ===== COUNTER ANIMATION FOR DAMAGE VALUES =====
    function animateCounter(element, target, prefix = '', suffix = '') {
        const duration = 2000;
        const start = 0;
        const startTime = performance.now();
        
        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(start + (target - start) * eased);
            element.textContent = prefix + current.toLocaleString('en-IN') + suffix;
            
            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }
        requestAnimationFrame(update);
    }

    // Counter for damage values when they come into view
    const damageValues = document.querySelectorAll('.damage-value');
    const damageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const text = el.textContent.trim();
                // Only animate numeric values
                if (text.includes('₹') && !el.dataset.animated) {
                    el.dataset.animated = 'true';
                    const numStr = text.replace(/[₹,]/g, '');
                    const num = parseInt(numStr);
                    if (!isNaN(num)) {
                        animateCounter(el, num, '₹');
                    }
                }
            }
        });
    }, { threshold: 0.5 });

    damageValues.forEach(val => damageObserver.observe(val));

    // ===== SMOOTH SECTION TRANSITIONS =====
    // Add subtle parallax effect to section headers
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const sectionNumbers = document.querySelectorAll('.section-number');
        
        sectionNumbers.forEach(num => {
            const rect = num.getBoundingClientRect();
            if (rect.top > -200 && rect.top < window.innerHeight + 200) {
                const offset = (rect.top - window.innerHeight / 2) * 0.05;
                num.style.transform = `translateY(${offset}px)`;
            }
        });
    });

    // ===== KEYBOARD NAVIGATION =====
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown' || e.key === 'PageDown') {
            e.preventDefault();
            navigateSection(1);
        } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
            e.preventDefault();
            navigateSection(-1);
        } else if (e.key === 'Home') {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });

    function navigateSection(direction) {
        const sectionArray = Array.from(sections);
        let currentIndex = -1;
        
        sectionArray.forEach((section, index) => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= 100 && rect.bottom > 100) {
                currentIndex = index;
            }
        });

        const nextIndex = Math.max(0, Math.min(sectionArray.length - 1, currentIndex + direction));
        sectionArray[nextIndex].scrollIntoView({ behavior: 'smooth' });
    }

    // ===== DOWNLOAD REPORT =====
    const downloadBtn = document.getElementById('downloadReportBtn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
            const btnText = downloadBtn.querySelector('.download-btn-text');
            const originalText = btnText.textContent;
            btnText.textContent = 'Downloading...';
            setTimeout(function() {
                btnText.textContent = 'Downloaded ✓';
                setTimeout(function() {
                    btnText.textContent = originalText;
                }, 2500);
            }, 1000);
        });
    }

    // ===== INITIAL SETUP =====
    document.body.style.overflow = 'hidden'; // Prevent scroll during preloader
    updateActiveNav();

    // Force reveal hero content if preloader is already gone
    setTimeout(() => {
        if (preloader.classList.contains('hidden')) {
            initHeroAnimations();
        }
    }, 3000);
});
