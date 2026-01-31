const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.resolve(__dirname, '../../index.html'), 'utf-8');

describe('Accessibility', () => {
    beforeAll(() => {
        document.documentElement.innerHTML = html;
    });

    describe('Images', () => {
        test('all images have alt attributes', () => {
            const images = document.querySelectorAll('img');
            images.forEach(img => {
                expect(img.hasAttribute('alt')).toBe(true);
                expect(img.getAttribute('alt').trim().length).toBeGreaterThan(0);
            });
        });
    });

    describe('Forms', () => {
        test('email input has a placeholder describing expected input', () => {
            const emailInput = document.getElementById('email-input');
            expect(emailInput).not.toBeNull();
            expect(emailInput.getAttribute('placeholder')).toBeTruthy();
        });

        test('form buttons have descriptive text', () => {
            const buttons = document.querySelectorAll('form button');
            buttons.forEach(btn => {
                expect(btn.textContent.trim().length).toBeGreaterThan(0);
            });
        });
    });

    describe('Semantic HTML', () => {
        test('page uses nav element', () => {
            expect(document.querySelector('nav')).not.toBeNull();
        });

        test('page uses section elements', () => {
            const sections = document.querySelectorAll('section');
            expect(sections.length).toBeGreaterThanOrEqual(4);
        });

        test('page uses footer element', () => {
            expect(document.querySelector('footer')).not.toBeNull();
        });

        test('first heading on the page is h1', () => {
            const headings = document.querySelectorAll('h1, h2, h3, h4, h5');
            expect(headings.length).toBeGreaterThan(0);
            expect(headings[0].tagName).toBe('H1');
        });

        test('page has exactly one h1', () => {
            const h1s = document.querySelectorAll('h1');
            expect(h1s.length).toBe(1);
        });

        test('no heading level is skipped going from h1 to h2', () => {
            // h1 should appear before any h2
            const allHeadings = document.querySelectorAll('h1, h2');
            expect(allHeadings[0].tagName).toBe('H1');
        });
    });

    describe('Links', () => {
        test('external email link uses mailto protocol', () => {
            const mailtoLinks = document.querySelectorAll('a[href^="mailto:"]');
            expect(mailtoLinks.length).toBeGreaterThanOrEqual(1);
        });

        test('social links have title attributes', () => {
            const socialLinks = document.querySelectorAll('.social-links a');
            socialLinks.forEach(link => {
                expect(link.hasAttribute('title')).toBe(true);
                expect(link.getAttribute('title').trim().length).toBeGreaterThan(0);
            });
        });
    });

    describe('FAQ buttons', () => {
        test('FAQ questions use button elements for interactivity', () => {
            const faqQuestions = document.querySelectorAll('.faq-question');
            faqQuestions.forEach(el => {
                expect(el.tagName).toBe('BUTTON');
            });
        });
    });
});
