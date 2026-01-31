const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.resolve(__dirname, '../../index.html'), 'utf-8');

describe('HTML Structure', () => {
    beforeAll(() => {
        document.documentElement.innerHTML = html;
    });

    describe('Page metadata', () => {
        test('has a title tag', () => {
            expect(document.title).toBeTruthy();
            expect(document.title).toContain('Keys to AI');
        });

        test('has a viewport meta tag', () => {
            const viewport = document.querySelector('meta[name="viewport"]');
            expect(viewport).not.toBeNull();
            expect(viewport.getAttribute('content')).toContain('width=device-width');
        });

        test('has charset set to UTF-8', () => {
            const charset = document.querySelector('meta[charset]');
            expect(charset).not.toBeNull();
            expect(charset.getAttribute('charset').toUpperCase()).toBe('UTF-8');
        });

        test('html lang attribute is set', () => {
            // The lang attr is on the <html> we replaced, so check the source directly
            expect(html).toMatch(/<html\s+lang="en">/);
        });
    });

    describe('Navigation', () => {
        test('nav element exists', () => {
            expect(document.querySelector('nav')).not.toBeNull();
        });

        test('nav contains logo text', () => {
            const logo = document.querySelector('.logo');
            expect(logo).not.toBeNull();
            expect(logo.textContent).toBe('Keys to AI');
        });

        test('nav contains links to all sections', () => {
            const links = document.querySelectorAll('.nav-links a');
            const hrefs = Array.from(links).map(a => a.getAttribute('href'));
            expect(hrefs).toContain('#about');
            expect(hrefs).toContain('#videos');
            expect(hrefs).toContain('#faq');
            expect(hrefs).toContain('#newsletter');
        });
    });

    describe('Required sections exist', () => {
        test('hero section exists', () => {
            expect(document.querySelector('.hero')).not.toBeNull();
        });

        test('about section exists with correct id', () => {
            expect(document.getElementById('about')).not.toBeNull();
        });

        test('videos section exists with correct id', () => {
            expect(document.getElementById('videos')).not.toBeNull();
        });

        test('faq section exists with correct id', () => {
            expect(document.getElementById('faq')).not.toBeNull();
        });

        test('newsletter section exists with correct id', () => {
            expect(document.getElementById('newsletter')).not.toBeNull();
        });

        test('footer exists', () => {
            expect(document.querySelector('footer')).not.toBeNull();
        });
    });

    describe('Content integrity', () => {
        test('hero has a heading', () => {
            const heading = document.querySelector('.hero h1');
            expect(heading).not.toBeNull();
            expect(heading.textContent).toContain('Unlock AI Automation');
        });

        test('hero has CTA buttons', () => {
            const buttons = document.querySelectorAll('.cta-buttons .btn');
            expect(buttons.length).toBeGreaterThanOrEqual(2);
        });

        test('has 3 video cards', () => {
            const cards = document.querySelectorAll('.video-card');
            expect(cards.length).toBe(3);
        });

        test('has 6 FAQ items', () => {
            const faqItems = document.querySelectorAll('.faq-item');
            expect(faqItems.length).toBe(6);
        });

        test('has 3 feature items', () => {
            const features = document.querySelectorAll('.feature-item');
            expect(features.length).toBe(3);
        });

        test('has 4 benefit items', () => {
            const benefits = document.querySelectorAll('.benefit-item');
            expect(benefits.length).toBe(4);
        });

        test('has 3 testimonial cards', () => {
            const testimonials = document.querySelectorAll('.testimonial-card');
            expect(testimonials.length).toBe(3);
        });

        test('has social proof badges', () => {
            const badges = document.querySelectorAll('.credibility-badges .badge');
            expect(badges.length).toBe(3);
        });
    });

    describe('Newsletter form', () => {
        test('form exists with correct id', () => {
            expect(document.getElementById('newsletter-form')).not.toBeNull();
        });

        test('email input exists and is required', () => {
            const input = document.getElementById('email-input');
            expect(input).not.toBeNull();
            expect(input.type).toBe('email');
            expect(input.required).toBe(true);
        });

        test('submit button exists', () => {
            const btn = document.querySelector('#newsletter-form button[type="submit"]');
            expect(btn).not.toBeNull();
        });
    });

    describe('Footer', () => {
        test('contains copyright notice', () => {
            const copyright = document.querySelector('.copyright');
            expect(copyright).not.toBeNull();
            expect(copyright.textContent).toContain('Keys to AI');
        });

        test('contains social links', () => {
            const socialLinks = document.querySelectorAll('.social-links a');
            expect(socialLinks.length).toBeGreaterThanOrEqual(3);
        });

        test('email link points to correct address', () => {
            const emailLink = document.querySelector('a[href="mailto:hello@keysto.ai"]');
            expect(emailLink).not.toBeNull();
        });
    });
});
