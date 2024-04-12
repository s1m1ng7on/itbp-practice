import { displayYearRange, displayYear, displayMonth } from "./views.js";

document.querySelectorAll('section').forEach(sectionElement => {
    sectionElement.style.display = 'none';
});

document.addEventListener('click', (e) => {
    let selectedTime;
    if (e.target.tagName === 'TD' && e.target.classList[0] === 'day') {
        selectedTime = e.target.querySelector('div').textContent;
        switch (e.target.parentNode.parentNode.parentNode.parentNode.classList[0]) {
            case 'yearsCalendar':
                displayYear(selectedTime);
                break;
            case 'monthCalendar':
                const selectedYear = e.target.parentNode.parentNode.parentNode.querySelector('caption').textContent;
                displayMonth(selectedTime, selectedYear);
                break;
        }
    } else if (e.target.tagName === 'CAPTION') {
        const selectedTime = e.target.textContent.split(' ');
        if (selectedTime.length === 2) {
            displayYear(selectedTime[1]);
        } else if (selectedTime.length === 1) {
            displayYearRange();
        }
    }
})

displayYearRange();