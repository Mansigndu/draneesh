document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 850,
        offset: 120,
        once: true,
        easing: 'ease-out-cubic',
        mirror: false,
    });

    function animateCounter(element, target, duration = 1800) {
        let current = 0;
        const step = Math.max(target / (duration / 16), 1);

        const counter = setInterval(() => {
            current += step;
            if (current >= target) {
                element.textContent = target.toLocaleString();
                clearInterval(counter);
            } else {
                element.textContent = Math.floor(current).toLocaleString();
            }
        }, 16);
    }

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                entry.target.classList.add('animated');
                const target = parseInt(entry.target.getAttribute('data-target'), 10) || 0;
                animateCounter(entry.target, target);
            }
        });
    }, { threshold: 0.55 });

    document.querySelectorAll('.counter').forEach(counter => counterObserver.observe(counter));

    if (window.Swiper) {
        new Swiper('.testimonial-swiper', {
            slidesPerView: 1,
            spaceBetween: 24,
            loop: true,
            autoplay: {
                delay: 5200,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
                dynamicBullets: true,
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                    spaceBetween: 30,
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 32,
                },
            },
        });
    }

    const faqHeaders = document.querySelectorAll('.faq-header');
    faqHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const isActive = faqItem.classList.contains('active');

            document.querySelectorAll('.faq-item').forEach(item => item.classList.remove('active'));
            if (!isActive) faqItem.classList.add('active');
        });
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            const target = document.querySelector(href);
            if (href !== '#' && target) {
                e.preventDefault();
                const offsetTop = target.getBoundingClientRect().top + window.pageYOffset - 96;
                window.scrollTo({ top: offsetTop, behavior: 'smooth' });
            }
        });
    });

    if (window.gsap) {
        const tl = gsap.timeline({ defaults: { duration: 0.9, ease: 'power3.out' } });
        tl.from('.hero-title', { opacity: 0, y: 30 })
          .from('.badge-premium', { opacity: 0, scale: 0.92 }, '-=0.6')
          .from('.hero-actions .btn-primary, .hero-actions .btn-secondary', { opacity: 0, y: 24, stagger: 0.12 }, '-=0.5');
    }

    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
    buttons.forEach(button => {
        button.addEventListener('click', createRipple);
    });

    document.querySelectorAll('[data-link]').forEach(card => {
        const href = card.getAttribute('data-link');
        if (!href) return;

        const navigateCard = (event) => {
            if (event.target.closest('a, button, input, select, textarea')) {
                return;
            }
            window.location.href = href;
        };

        card.addEventListener('click', navigateCard);
        card.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                window.location.href = href;
            }
        });
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'link');
    });

    function createRipple(event) {
        const button = event.currentTarget;
        const circle = document.createElement('span');
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;
        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${event.clientX - button.getBoundingClientRect().left - radius}px`;
        circle.style.top = `${event.clientY - button.getBoundingClientRect().top - radius}px`;
        circle.classList.add('ripple');
        const ripple = button.getElementsByClassName('ripple')[0];
        if (ripple) ripple.remove();
        button.appendChild(circle);
    }

    const imageObserver = ('IntersectionObserver' in window) ? new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    }, { threshold: 0.2 }) : null;

    document.querySelectorAll('img[data-src]').forEach(img => {
        if (imageObserver) imageObserver.observe(img);
    });

    const navbarLinks = document.querySelectorAll('.navbar-link');
    const sections = document.querySelectorAll('section[id], header[id]');
    function updateActiveNav() {
        if (!navbarLinks.length || !sections.length) {
            return;
        }

        let current = null;
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            if (window.pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navbarLinks.forEach(link => {
            const href = link.getAttribute('href') || '';
            const isActive = Boolean(current && (href.includes(`${current}.html`) || href === `#${current}`));
            link.classList.toggle('active', isActive);
            link.setAttribute('aria-current', isActive ? 'page' : 'false');
        });
    }

    updateActiveNav();
    window.addEventListener('scroll', updateActiveNav, { passive: true });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal').forEach(modal => modal.classList.remove('open'));
        }
    });
});

window.addEventListener('scroll', function() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    parallaxElements.forEach(element => {
        const speed = Number(element.dataset.parallax) || 0.3;
        element.style.transform = `translateY(${window.pageYOffset * speed}px)`;
    });
});

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[\d\s\-\+\(\)]+$/;
    return re.test(phone) && phone.replace(/\D/g, '').length >= 10;
}

function enhanceFormValidation() {
    document.querySelectorAll('input[type="email"]').forEach(input => {
        input.addEventListener('blur', function() {
            this.classList.toggle('error', this.value && !validateEmail(this.value));
        });
    });
    document.querySelectorAll('input[type="tel"]').forEach(input => {
        input.addEventListener('blur', function() {
            this.classList.toggle('error', this.value && !validatePhone(this.value));
        });
    });
}
enhanceFormValidation();

