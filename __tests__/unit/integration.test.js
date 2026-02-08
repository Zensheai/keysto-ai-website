const fs = require('fs');
const path = require('path');
const { initFaqAccordion, initNewsletterForm, initSmoothScroll, initAll } = require('../../main');

const html = fs.readFileSync(path.resolve(__dirname, '../../index.html'), 'utf-8');

describe('Integration: JavaScript with actual HTML', () => {
    beforeEach(() => {
        document.documentElement.innerHTML = html;
        // Mock scrollIntoView since jsdom doesn't support it
        Element.prototype.scrollIntoView = jest.fn();
        // Mock IntersectionObserver since jsdom doesn't support it
        global.IntersectionObserver = class IntersectionObserver {
            constructor(callback) {
                this.callback = callback;
            }
            observe() {}
            unobserve() {}
            disconnect() {}
        };
    });

    afterEach(() => {
        document.documentElement.innerHTML = '';
        jest.restoreAllMocks();
        delete global.IntersectionObserver;
    });

    describe('FAQ with real HTML structure', () => {
        beforeEach(() => {
            initFaqAccordion();
        });

        test('clicking first FAQ question opens it', () => {
            const firstQuestion = document.querySelector('.faq-question');
            const firstItem = firstQuestion.closest('.faq-item');

            firstQuestion.click();
            expect(firstItem.classList.contains('active')).toBe(true);
        });

        test('all 6 FAQ items can be toggled', () => {
            const questions = document.querySelectorAll('.faq-question');
            expect(questions.length).toBe(6);

            questions.forEach((q, index) => {
                const item = q.closest('.faq-item');
                q.click();
                expect(item.classList.contains('active')).toBe(true);

                // Close for next iteration
                q.click();
                expect(item.classList.contains('active')).toBe(false);
            });
        });

        test('opening one FAQ closes the previously open one', () => {
            const questions = document.querySelectorAll('.faq-question');
            const firstItem = questions[0].closest('.faq-item');
            const secondItem = questions[1].closest('.faq-item');

            questions[0].click();
            expect(firstItem.classList.contains('active')).toBe(true);

            questions[1].click();
            expect(firstItem.classList.contains('active')).toBe(false);
            expect(secondItem.classList.contains('active')).toBe(true);
        });
    });

    describe('Newsletter form with real HTML', () => {
        beforeEach(() => {
            initNewsletterForm();
            jest.spyOn(window, 'alert').mockImplementation(() => {});
        });

        test('form submission shows alert with email', () => {
            const form = document.getElementById('newsletter-form');
            const input = document.getElementById('email-input');

            input.value = 'test@example.com';
            form.dispatchEvent(new Event('submit'));

            expect(window.alert).toHaveBeenCalledWith(
                expect.stringContaining('test@example.com')
            );
        });

        test('form resets after submission', () => {
            const form = document.getElementById('newsletter-form');
            const input = document.getElementById('email-input');

            input.value = 'test@example.com';
            form.dispatchEvent(new Event('submit'));

            expect(input.value).toBe('');
        });
    });

    describe('Smooth scroll with real navigation', () => {
        beforeEach(() => {
            initSmoothScroll();
        });

        test('clicking About nav link scrolls to about section', () => {
            const aboutLink = document.querySelector('a[href="#about"]');
            const aboutSection = document.getElementById('about');

            aboutLink.click();

            expect(aboutSection.scrollIntoView).toHaveBeenCalledWith({
                behavior: 'smooth',
                block: 'start'
            });
        });

        test('all navigation links scroll to their targets', () => {
            const navLinks = document.querySelectorAll('.nav-links a');

            navLinks.forEach(link => {
                const href = link.getAttribute('href');
                const targetId = href.substring(1);
                const target = document.getElementById(targetId);

                link.click();

                expect(target.scrollIntoView).toHaveBeenCalledWith({
                    behavior: 'smooth',
                    block: 'start'
                });
            });
        });

        test('hero CTA buttons scroll to their targets', () => {
            const ctaButtons = document.querySelectorAll('.hero .btn');

            ctaButtons.forEach(btn => {
                const href = btn.getAttribute('href');
                if (href && href.startsWith('#')) {
                    const targetId = href.substring(1);
                    const target = document.getElementById(targetId);

                    btn.click();

                    expect(target.scrollIntoView).toHaveBeenCalled();
                }
            });
        });
    });

    describe('initAll initializes everything', () => {
        test('all interactive features work after initAll', () => {
            jest.spyOn(window, 'alert').mockImplementation(() => {});
            initAll();

            // FAQ works
            const faqQuestion = document.querySelector('.faq-question');
            const faqItem = faqQuestion.closest('.faq-item');
            faqQuestion.click();
            expect(faqItem.classList.contains('active')).toBe(true);

            // Newsletter works
            const form = document.getElementById('newsletter-form');
            const input = document.getElementById('email-input');
            input.value = 'init@test.com';
            form.dispatchEvent(new Event('submit'));
            expect(window.alert).toHaveBeenCalled();

            // Smooth scroll works
            const aboutLink = document.querySelector('a[href="#about"]');
            const aboutSection = document.getElementById('about');
            aboutLink.click();
            expect(aboutSection.scrollIntoView).toHaveBeenCalled();
        });
    });
});
