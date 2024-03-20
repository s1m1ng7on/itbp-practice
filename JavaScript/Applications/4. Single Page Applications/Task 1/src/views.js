let currentView;

export function loadView(id) {
    const selectedView = document.querySelector(`#${id}`);
    if (selectedView.tagName === 'SECTION') {
        currentView = selectedView;
        currentView.style.display = 'block';
    } else {
        throw new Error(`A view with ${id} was not found.`);
    }
}

export function displayYear(year) {
    const yearViewId = `year-${year}`;
    loadView(yearViewId);
}