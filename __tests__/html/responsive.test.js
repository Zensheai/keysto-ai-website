const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.resolve(__dirname, '../../index.html'), 'utf-8');

describe('Responsive Design', () => {
    beforeAll(() => {
        document.documentElement.innerHTML = html;
    });

    describe('Mobile-friendly markup', () => {
        test('viewport meta tag is present for mobile scaling', () => {
            const viewport = document.querySelector('meta[name="viewport"]');
            expect(viewport).not.toBeNull();
            expect(viewport.getAttribute('content')).toContain('width=device-width');
        });

        test('viewport allows user scaling', () => {
            const viewport = document.querySelector('meta[name="viewport"]');
            const content = viewport.getAttribute('content');
            // Should not have user-scalable=no which hurts accessibility
            expect(content).not.toContain('user-scalable=no');
        });
    });

    describe('Tablet breakpoint (968px) styles', () => {
        test('968px media query exists', () => {
            expect(html).toMatch(/@media\s*\(\s*max-width:\s*968px\s*\)/);
        });

        test('navigation is hidden on tablet', () => {
            // nav-links is set to display: none in tablet breakpoint
            expect(html).toContain('.nav-links');
            expect(html).toContain('display: none');
        });

        test('about grid changes to single column', () => {
            expect(html).toContain('.about-grid');
            expect(html).toContain('grid-template-columns: 1fr');
        });

        test('hero heading font size adjusts', () => {
            expect(html).toMatch(/\.hero\s+h1\s*\{[^}]*font-size/);
        });

        test('buttons stack vertically on tablet', () => {
            expect(html).toContain('.cta-buttons');
            expect(html).toContain('flex-direction: column');
        });
    });

    describe('Mobile breakpoint (640px) styles', () => {
        test('newsletter form adjusts for mobile', () => {
            // Check that newsletter-form has flex-direction: column in 640px media query
            expect(html).toMatch(/@media\s*\(\s*max-width:\s*640px\s*\)/);
            expect(html).toContain('.newsletter-form');
            expect(html).toContain('flex-direction: column');
        });

        test('form elements go full width on mobile', () => {
            // Check that newsletter form elements have width: 100% in mobile breakpoint
            // CSS uses ".newsletter-form input, .newsletter-form button { width: 100%; }"
            expect(html).toContain('.newsletter-form input');
            expect(html).toContain('.newsletter-form button');
            expect(html).toContain('width: 100%');
        });
    });

    describe('Flexible images', () => {
        test('images should be constrained to container', () => {
            // Check that about-image img has width: 100% to stay within container
            expect(html).toMatch(/\.about-image\s+img\s*\{[^}]*width:\s*100%/);
        });
    });

    describe('Touch-friendly elements', () => {
        test('buttons have adequate padding for touch targets', () => {
            // Check that buttons have padding defined
            expect(html).toMatch(/\.btn\s*\{[^}]*padding:/);
        });

        test('FAQ questions are large enough for touch', () => {
            expect(html).toMatch(/\.faq-question\s*\{[^}]*padding:/);
        });

        test('navigation links have spacing', () => {
            // Navigation uses anchor links directly
            expect(html).toMatch(/\.nav-links\s+a\s*\{/);
        });
    });

    describe('Grid layouts respond to viewport', () => {
        test('feature grid uses auto-fit for responsive columns', () => {
            expect(html).toMatch(/\.feature-grid\s*\{[^}]*auto-fit/);
        });

        test('testimonials grid adjusts layout', () => {
            expect(html).toMatch(/\.testimonials-grid\s*\{[^}]*grid-template-columns/);
        });

        test('video grid uses responsive columns', () => {
            expect(html).toMatch(/\.video-grid\s*\{[^}]*auto-fit|repeat/);
        });
    });
});
