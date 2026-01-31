const { initFaqAccordion } = require('../../main');

function buildFaqDOM() {
    document.body.innerHTML = `
        <div class="faq-container">
            <div class="faq-item">
                <button class="faq-question">Question 1<span class="faq-icon">+</span></button>
                <div class="faq-answer"><p>Answer 1</p></div>
            </div>
            <div class="faq-item">
                <button class="faq-question">Question 2<span class="faq-icon">+</span></button>
                <div class="faq-answer"><p>Answer 2</p></div>
            </div>
            <div class="faq-item">
                <button class="faq-question">Question 3<span class="faq-icon">+</span></button>
                <div class="faq-answer"><p>Answer 3</p></div>
            </div>
        </div>
    `;
}

describe('FAQ Accordion', () => {
    beforeEach(() => {
        buildFaqDOM();
        initFaqAccordion();
    });

    afterEach(() => {
        document.body.innerHTML = '';
    });

    test('clicking a question opens its FAQ item', () => {
        const buttons = document.querySelectorAll('.faq-question');
        buttons[0].click();
        expect(buttons[0].parentElement.classList.contains('active')).toBe(true);
    });

    test('clicking an open question closes it', () => {
        const buttons = document.querySelectorAll('.faq-question');
        buttons[0].click();
        expect(buttons[0].parentElement.classList.contains('active')).toBe(true);

        buttons[0].click();
        expect(buttons[0].parentElement.classList.contains('active')).toBe(false);
    });

    test('only one FAQ item is open at a time', () => {
        const buttons = document.querySelectorAll('.faq-question');
        const items = document.querySelectorAll('.faq-item');

        buttons[0].click();
        expect(items[0].classList.contains('active')).toBe(true);
        expect(items[1].classList.contains('active')).toBe(false);
        expect(items[2].classList.contains('active')).toBe(false);

        buttons[1].click();
        expect(items[0].classList.contains('active')).toBe(false);
        expect(items[1].classList.contains('active')).toBe(true);
        expect(items[2].classList.contains('active')).toBe(false);

        buttons[2].click();
        expect(items[0].classList.contains('active')).toBe(false);
        expect(items[1].classList.contains('active')).toBe(false);
        expect(items[2].classList.contains('active')).toBe(true);
    });

    test('no FAQ items are open initially', () => {
        const items = document.querySelectorAll('.faq-item');
        items.forEach(item => {
            expect(item.classList.contains('active')).toBe(false);
        });
    });

    test('clicking the third item then the first switches correctly', () => {
        const buttons = document.querySelectorAll('.faq-question');
        const items = document.querySelectorAll('.faq-item');

        buttons[2].click();
        expect(items[2].classList.contains('active')).toBe(true);

        buttons[0].click();
        expect(items[2].classList.contains('active')).toBe(false);
        expect(items[0].classList.contains('active')).toBe(true);
    });
});
