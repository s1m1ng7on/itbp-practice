import { loadView, displayYear } from "./views.js";

document.querySelectorAll('section').forEach(sectionElement => {
    sectionElement.style.display = 'none';
});

document.addEventListener('click', (e) => {
    if (e.target.tagName === 'TD') {
        switch (e.target.classList[0]) {
            case 'day':
                const selectedYear = e.target.querySelector('div').textContent;
                console.log(selectedYear);
                //displayYear(e.target.textContent);
                break;
        }
    }
})

//loadView('years');
displayYear('2023');