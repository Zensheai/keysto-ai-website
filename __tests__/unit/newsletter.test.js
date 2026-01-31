const { initNewsletterForm } = require('../../main');

function buildNewsletterDOM() {
    document.body.innerHTML = `
        <section id="newsletter">
            <form class="newsletter-form" id="newsletter-form">
                <input type="email" id="email-input" placeholder="Enter your email" required>
                <button type="submit" class="btn btn-primary">Subscribe</button>
            </form>
        </section>
    `;
}

describe('Newsletter Form', () => {
    let alertMock;

    beforeEach(() => {
        buildNewsletterDOM();
        alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});
        initNewsletterForm();
    });

    afterEach(() => {
        alertMock.mockRestore();
        document.body.innerHTML = '';
    });

    test('prevents default form submission', () => {
        const form = document.getElementById('newsletter-form');
        const input = document.getElementById('email-input');
        input.value = 'test@example.com';

        const event = new Event('submit', { bubbles: true, cancelable: true });
        const preventSpy = jest.spyOn(event, 'preventDefault');
        form.dispatchEvent(event);

        expect(preventSpy).toHaveBeenCalled();
    });

    test('shows alert with the submitted email', () => {
        const form = document.getElementById('newsletter-form');
        const input = document.getElementById('email-input');
        input.value = 'user@keysto.ai';

        form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));

        expect(alertMock).toHaveBeenCalledWith(
            "Thanks for subscribing! We'll send updates to user@keysto.ai"
        );
    });

    test('resets the form after submission', () => {
        const form = document.getElementById('newsletter-form');
        const input = document.getElementById('email-input');
        input.value = 'test@example.com';

        form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));

        expect(input.value).toBe('');
    });

    test('does not crash when newsletter form is missing', () => {
        document.body.innerHTML = '<div>No form here</div>';
        expect(() => initNewsletterForm()).not.toThrow();
    });
});
