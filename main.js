/**
 * Keys to AI - Main site interactivity
 */

function initFaqAccordion() {
    document.querySelectorAll('.faq-question').forEach(button => {
        button.addEventListener('click', () => {
            const faqItem = button.parentElement;
            const isActive = faqItem.classList.contains('active');

            // Close all FAQ items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });

            // Open clicked item if it wasn't active
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });
}

function initNewsletterForm() {
    const form = document.getElementById('newsletter-form');
    if (!form) return;

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const email = document.getElementById('email-input').value;

        // TODO: Replace this with your ConvertKit form endpoint
        // For now, just show a success message
        alert(`Thanks for subscribing! We'll send updates to ${email}`);
        this.reset();
    });
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.video-card, .feature-item, .benefit-item, .testimonial-card, .faq-item').forEach(el => {
        observer.observe(el);
    });

    return observer;
}

function initAll() {
    initFaqAccordion();
    initNewsletterForm();
    initSmoothScroll();
    initScrollAnimations();
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { initFaqAccordion, initNewsletterForm, initSmoothScroll, initScrollAnimations, initAll };
} else {
    document.addEventListener('DOMContentLoaded', initAll);
}
