// Footer Component
document.addEventListener('DOMContentLoaded', function() {
    const footer = document.getElementById('footer');

    if (!footer) {
        return;
    }

    const footerHTML = `
        <footer class="footer" role="contentinfo">
            <div class="footer-container">
                <div class="footer-content">
                    <div class="footer-section" data-aos="fade-up">
                        <h3>Dr. Aneesh Sabnis</h3>
                        <p>Consultant Gynaecologist & Obstetrician with 25+ years of dedicated experience in women's healthcare and advanced laparoscopic surgery.</p>
                        <div class="footer-social" aria-label="Social Media Links">
                            <a href="#" title="Facebook" aria-label="Facebook"><i class="fab fa-facebook" aria-hidden="true"></i></a>
                            <a href="#" title="Instagram" aria-label="Instagram"><i class="fab fa-instagram" aria-hidden="true"></i></a>
                            <a href="#" title="LinkedIn" aria-label="LinkedIn"><i class="fab fa-linkedin" aria-hidden="true"></i></a>
                            <a href="#" title="Twitter" aria-label="Twitter"><i class="fab fa-twitter" aria-hidden="true"></i></a>
                        </div>
                    </div>

                    <!-- Quick Links -->
                    <div class="footer-section" data-aos="fade-up" data-aos-delay="100">
                        <h4>Quick Links</h4>
                        <ul class="footer-links">
                            <li><a href="index.html">Home</a></li>
                            <li><a href="about.html">About Dr. Sabnis</a></li>
                            <li><a href="services.html">Services</a></li>
                            <li><a href="gallery.html">Gallery</a></li>
                            <li><a href="contact.html">Contact</a></li>
                            <li><a href="appointment.html">Book Appointment</a></li>
                        </ul>
                    </div>

                    <!-- Services -->
                    <div class="footer-section" data-aos="fade-up" data-aos-delay="200">
                        <h4>Our Services</h4>
                        <ul class="footer-links">
                            <li><a href="high-risk-pregnancy.html">High-Risk Pregnancy</a></li>
                            <li><a href="normal-delivery.html">Normal Delivery</a></li>
                            <li><a href="caesarean-section.html">Caesarean Section</a></li>
                            <li><a href="infertility-treatment.html">Infertility Treatment</a></li>
                            <li><a href="laparoscopic-surgery.html">Laparoscopic Surgery</a></li>
                            <li><a href="menopause-care.html">Menopause Care</a></li>
                        </ul>
                    </div>

                    <!-- Contact Info -->
                    <div class="footer-section" data-aos="fade-up" data-aos-delay="300">
                        <h4>Contact Information</h4>
                        <ul class="footer-contact">
                            <li>
                                <i class="fas fa-phone"></i>
                                <a href="tel:9833966967">9833966967</a>
                            </li>
                            <li>
                                <i class="fas fa-envelope"></i>
                                <a href="mailto:anesab9@gmail.com">anesab9@gmail.com</a>
                            </li>
                            <li>
                                <i class="fas fa-clock"></i>
                                <span>Mon-Sat: 10 AM - 6 PM</span>
                            </li>
                            <li>
                                <i class="fas fa-hospital"></i>
                                <span>6+ Hospital Affiliations</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <!-- Footer Bottom -->
                <div class="footer-bottom">
                    <div class="footer-bottom-content">
                        <p>&copy; 2024 Dr. Aneesh Sabnis. All rights reserved. | Consultant Gynaecologist & Obstetrician</p>
                        <ul class="footer-bottom-links">
                            <li><a href="#">Privacy Policy</a></li>
                            <li><a href="#">Terms & Conditions</a></li>
                            <li><a href="#">Disclaimer</a></li>
                        </ul>
                    </div>
                </div>

                <!-- Scroll to Top Button -->
                <button id="scrollToTopBtn" class="scroll-to-top" title="Back to top">
                    <i class="fas fa-arrow-up"></i>
                </button>
            </div>
        </footer>
    `;

    footer.innerHTML = footerHTML;

    const scrollToTopBtn = document.getElementById('scrollToTopBtn');

    if (!scrollToTopBtn) {
        return;
    }

    const toggleScrollToTop = () => {
        scrollToTopBtn.classList.toggle('visible', window.scrollY > 300);
    };

    window.addEventListener('scroll', toggleScrollToTop, { passive: true });
    toggleScrollToTop();

    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});
