const { initSmoothScroll } = require('../../main');

function buildNavDOM() {
    document.body.innerHTML = `
        <nav>
            <ul class="nav-links">
                <li><a href="#about">About</a></li>
                <li><a href="#videos">Videos</a></li>
                <li><a href="#faq">FAQ</a></li>
                <li><a href="#newsletter">Newsletter</a></li>
            </ul>
        </nav>
        <section id="about"><h2>About</h2></section>
        <section id="videos"><h2>Videos</h2></section>
        <section id="faq"><h2>FAQ</h2></section>
        <section id="newsletter"><h2>Newsletter</h2></section>
    `;
}

describe('Smooth Scroll Navigation', () => {
    beforeEach(() => {
        buildNavDOM();
        initSmoothScroll();
    });

    afterEach(() => {
        document.body.innerHTML = '';
    });

    test('prevents default click behavior on anchor links', () => {
        // Mock scrollIntoView on the target so the handler doesn't throw in jsdom
        const target = document.getElementById('about');
        target.scrollIntoView = jest.fn();

        const link = document.querySelector('a[href="#about"]');
        const event = new Event('click', { bubbles: true, cancelable: true });
        const preventSpy = jest.spyOn(event, 'preventDefault');

        link.dispatchEvent(event);
        expect(preventSpy).toHaveBeenCalled();
    });

    test('calls scrollIntoView on the target section', () => {
        const target = document.getElementById('about');
        target.scrollIntoView = jest.fn();

        const link = document.querySelector('a[href="#about"]');
        link.click();

        expect(target.scrollIntoView).toHaveBeenCalledWith({
            behavior: 'smooth',
            block: 'start'
        });
    });

    test('does not throw when target section does not exist', () => {
        document.body.innerHTML = `
            <a href="#nonexistent">Missing</a>
        `;
        initSmoothScroll();

        const link = document.querySelector('a[href="#nonexistent"]');
        expect(() => link.click()).not.toThrow();
    });

    test('all nav links have smooth scroll behavior', () => {
        const links = document.querySelectorAll('a[href^="#"]');
        links.forEach(link => {
            const targetId = link.getAttribute('href').substring(1);
            const target = document.getElementById(targetId);
            target.scrollIntoView = jest.fn();

            link.click();
            expect(target.scrollIntoView).toHaveBeenCalledWith({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });
});
