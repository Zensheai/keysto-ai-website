const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.resolve(__dirname, '../../index.html'), 'utf-8');

describe('CSS Design System', () => {
    describe('CSS custom properties are defined', () => {
        test('primary color is defined', () => {
            expect(html).toContain('--primary: #00D9FF');
        });

        test('secondary color is defined', () => {
            expect(html).toContain('--secondary: #7B2FF7');
        });

        test('dark color is defined', () => {
            expect(html).toContain('--dark: #0A0E27');
        });

        test('gradient-1 is defined', () => {
            expect(html).toMatch(/--gradient-1:\s*linear-gradient/);
        });

        test('gradient-2 is defined', () => {
            expect(html).toMatch(/--gradient-2:\s*linear-gradient/);
        });
    });

    describe('Animations are defined', () => {
        test('fadeInUp keyframes exist', () => {
            expect(html).toMatch(/@keyframes\s+fadeInUp/);
        });

        test('float keyframes exist', () => {
            expect(html).toMatch(/@keyframes\s+float/);
        });

        test('pulse keyframes exist', () => {
            expect(html).toMatch(/@keyframes\s+pulse/);
        });
    });

    describe('Responsive breakpoints', () => {
        test('tablet breakpoint at 968px exists', () => {
            expect(html).toContain('max-width: 968px');
        });

        test('mobile breakpoint at 640px exists', () => {
            expect(html).toContain('max-width: 640px');
        });

        test('media queries use proper syntax', () => {
            const mediaQueryMatches = html.match(/@media\s*\([^)]+\)/g);
            expect(mediaQueryMatches).not.toBeNull();
            expect(mediaQueryMatches.length).toBeGreaterThanOrEqual(2);
        });
    });

    describe('Layout styles', () => {
        test('container has max-width defined', () => {
            expect(html).toMatch(/\.container\s*\{[^}]*max-width:/);
        });

        test('feature grid uses CSS grid', () => {
            expect(html).toMatch(/\.feature-grid\s*\{[^}]*display:\s*grid/);
        });

        test('video grid uses CSS grid', () => {
            expect(html).toMatch(/\.video-grid\s*\{[^}]*display:\s*grid/);
        });

        test('flex is used for navigation layout', () => {
            expect(html).toMatch(/\.nav-container\s*\{[^}]*display:\s*flex/);
        });
    });

    describe('Component styles', () => {
        test('buttons have hover states', () => {
            expect(html).toMatch(/\.btn[^{]*:hover\s*\{/);
        });

        test('cards have visual styling', () => {
            expect(html).toMatch(/\.video-card\s*\{[^}]*background/);
        });

        test('FAQ items have styling for active state', () => {
            expect(html).toMatch(/\.faq-item\.active/);
        });

        test('newsletter form has styling', () => {
            expect(html).toMatch(/\.newsletter-form\s*\{/);
        });
    });

    describe('Font configuration', () => {
        test('Google Fonts link for Syne is included', () => {
            expect(html).toContain('family=Syne');
        });

        test('Google Fonts link for Inter is included', () => {
            expect(html).toContain('family=Inter');
        });

        test('body uses Inter font family', () => {
            expect(html).toMatch(/body\s*\{[^}]*font-family:\s*'Inter'/);
        });

        test('headings use Syne font family', () => {
            expect(html).toMatch(/h1,\s*h2,\s*h3\s*\{[^}]*font-family:\s*'Syne'/);
        });
    });
});
