document.addEventListener('DOMContentLoaded', () => {
    const navbarRoot = document.getElementById('navbar');

    if (!navbarRoot || navbarRoot.dataset.navbarInitialized === 'true') {
        return;
    }

    navbarRoot.dataset.navbarInitialized = 'true';

    navbarRoot.innerHTML = `
        <div class="navbar-container" role="navigation" aria-label="Primary Navigation">
            <div class="navbar-content">
                <div class="navbar-logo">
                    <a href="index.html" class="logo-link">
                        <div class="logo-icon">
                            <img src="./images/draneeslogo.jpeg" alt="Dr. Aneesh Sabnis Logo" loading="lazy" decoding="async">
                        </div>
                        <span class="logo-text">Dr. Aneesh Sabnis</span>
                    </a>
                </div>

                <button class="navbar-toggle"
                    id="navbarToggle"
                    type="button"
                    aria-label="Toggle Navigation"
                    aria-controls="navbarMenu"
                    aria-expanded="false">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

                <nav class="navbar-menu" id="navbarMenu" aria-label="Main Navigation" aria-hidden="true">
                    <ul class="navbar-list">
                        <li class="navbar-item">
                            <a href="index.html" class="navbar-link">Home</a>
                        </li>
                        <li class="navbar-item">
                            <a href="about.html" class="navbar-link">About</a>
                        </li>
                        <li class="navbar-item">
                            <a href="services.html" class="navbar-link">Specialities</a>
                        </li>
                        <li class="navbar-item">
                            <a href="gallery.html" class="navbar-link">Gallery</a>
                        </li>
                        <li class="navbar-item">
                            <a href="contact.html" class="navbar-link">Contact</a>
                        </li>
                        <li class="navbar-item mobile-only">
                            <a href="appointment.html" class="navbar-link appointment-link">
                                <i class="fas fa-calendar-check" aria-hidden="true"></i>
                                <span>Book Appointment</span>
                            </a>
                        </li>
                    </ul>
                </nav>

                <a class="navbar-cta desktop-only" href="appointment.html">
                    <i class="fas fa-calendar-check" aria-hidden="true"></i>
                    <span>Book Appointment</span>
                </a>
            </div>
        </div>
    `;

    const navbarContainer = navbarRoot.querySelector('.navbar-container');
    const navbarMenu = navbarRoot.querySelector('.navbar-menu');
    const navbarToggle = navbarRoot.querySelector('.navbar-toggle');
    const navbarLinks = navbarRoot.querySelectorAll('.navbar-link');
    const navbarLogo = navbarRoot.querySelector('.navbar-logo');
    const MOBILE_BREAKPOINT = 768;

    if (!navbarContainer || !navbarMenu || !navbarToggle) {
        return;
    }

    const setMenuState = (isOpen) => {
        navbarMenu.classList.toggle('active', isOpen);
        navbarToggle.classList.toggle('active', isOpen);
        navbarToggle.setAttribute('aria-expanded', String(isOpen));
        navbarMenu.setAttribute('aria-hidden', String(!isOpen));
    };

    const closeMenu = () => {
        setMenuState(false);
    };

    const openMenu = () => {
        if (window.innerWidth <= MOBILE_BREAKPOINT) {
            setMenuState(true);
        }
    };

    const syncActiveLink = () => {
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';

        navbarLinks.forEach((link) => {
            const href = (link.getAttribute('href') || '').trim();
            const targetPage = href.split('/').pop().split('#')[0] || 'index.html';
            const isActive = targetPage === currentPath || (currentPath === 'index.html' && targetPage === 'index.html');
            link.classList.toggle('active', isActive);
            link.setAttribute('aria-current', isActive ? 'page' : 'false');
        });
    };

    const handleScroll = () => {
        navbarContainer.classList.toggle('scrolled', window.scrollY > 30);

        if (window.innerWidth <= MOBILE_BREAKPOINT && navbarMenu.classList.contains('active')) {
            closeMenu();
        }
    };

    const handleWheel = () => {
        if (window.innerWidth > MOBILE_BREAKPOINT && navbarMenu.classList.contains('active')) {
            closeMenu();
        }
    };

    const handleTouchMove = () => {
        if (window.innerWidth <= MOBILE_BREAKPOINT && navbarMenu.classList.contains('active')) {
            closeMenu();
        }
    };

    const handleResize = () => {
        if (window.innerWidth > MOBILE_BREAKPOINT) {
            closeMenu();
        }
    };

    navbarToggle.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();

        if (navbarMenu.classList.contains('active')) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    navbarLinks.forEach((link) => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= MOBILE_BREAKPOINT) {
                closeMenu();
            }
        });
    });

    document.addEventListener('click', (event) => {
        const clickedInside = navbarContainer.contains(event.target);
        const clickedLogo = navbarLogo && navbarLogo.contains(event.target);

        if (!clickedInside && !clickedLogo) {
            closeMenu();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeMenu();
        }
    });

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('wheel', handleWheel, { passive: true });
    document.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('resize', handleResize);
    window.addEventListener('popstate', syncActiveLink);

    syncActiveLink();
    handleScroll();
    handleResize();
});