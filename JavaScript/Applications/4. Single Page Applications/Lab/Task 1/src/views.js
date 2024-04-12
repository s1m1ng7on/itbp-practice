import { toMonthDigit } from './calendarHelper.js';

let currentView = null;

function loadView(id) {
    const selectedView = document.querySelector(`#${id}`);
    if (selectedView && selectedView.tagName === 'SECTION') {
        hideView(currentView);
        currentView = selectedView;
        currentView.style.display = 'block';
    } else {
        throw new Error(`A view with ${id} was not found.`);
    }
}

function hideView(view) {
    if (view) {
        view.style.display = 'none';
    }
}

export function displayYearRange() {
    loadView('years');
}

export function displayYear(year) {
    loadView(`year-${year}`);
}

export function displayMonth(month, year) {
    loadView(`month-${year}-${toMonthDigit(month)}`);
}