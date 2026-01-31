const { initScrollAnimations } = require('../../main');

describe('Scroll-Triggered Animations', () => {
    let mockObserve;
    let observerCallback;
    let observerOptions;

    beforeEach(() => {
        mockObserve = jest.fn();

        global.IntersectionObserver = jest.fn((callback, options) => {
            observerCallback = callback;
            observerOptions = options;
            return {
                observe: mockObserve,
                unobserve: jest.fn(),
                disconnect: jest.fn(),
            };
        });

        document.body.innerHTML = `
            <div class="video-card">Video 1</div>
            <div class="video-card">Video 2</div>
            <div class="feature-item">Feature 1</div>
            <div class="benefit-item">Benefit 1</div>
            <div class="testimonial-card">Testimonial 1</div>
            <div class="faq-item">FAQ 1</div>
            <div class="unrelated">Not observed</div>
        `;
    });

    afterEach(() => {
        document.body.innerHTML = '';
        delete global.IntersectionObserver;
    });

    test('creates an IntersectionObserver with correct options', () => {
        initScrollAnimations();

        expect(global.IntersectionObserver).toHaveBeenCalledWith(
            expect.any(Function),
            { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
        );
    });

    test('observes all animatable elements', () => {
        initScrollAnimations();

        // 2 video-cards + 1 feature-item + 1 benefit-item + 1 testimonial-card + 1 faq-item = 6
        expect(mockObserve).toHaveBeenCalledTimes(6);
    });

    test('does not observe unrelated elements', () => {
        initScrollAnimations();

        const observedElements = mockObserve.mock.calls.map(call => call[0]);
        const unrelated = document.querySelector('.unrelated');
        expect(observedElements).not.toContain(unrelated);
    });

    test('applies fadeInUp animation when element intersects', () => {
        initScrollAnimations();

        const videoCard = document.querySelector('.video-card');
        observerCallback([{ isIntersecting: true, target: videoCard }]);

        expect(videoCard.style.animation).toBe('fadeInUp 0.8s ease-out forwards');
    });

    test('does not apply animation when element is not intersecting', () => {
        initScrollAnimations();

        const videoCard = document.querySelector('.video-card');
        observerCallback([{ isIntersecting: false, target: videoCard }]);

        expect(videoCard.style.animation).toBe('');
    });

    test('handles multiple entries in a single callback', () => {
        initScrollAnimations();

        const videoCard = document.querySelector('.video-card');
        const featureItem = document.querySelector('.feature-item');

        observerCallback([
            { isIntersecting: true, target: videoCard },
            { isIntersecting: false, target: featureItem },
        ]);

        expect(videoCard.style.animation).toBe('fadeInUp 0.8s ease-out forwards');
        expect(featureItem.style.animation).toBe('');
    });
});
