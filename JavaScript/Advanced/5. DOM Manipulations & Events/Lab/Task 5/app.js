function focused() {
    const inputElements = document.getElementsByTagName('input');

    for (let i = 0; i < inputElements.length; i++) {
        inputElements[i].addEventListener('focus', (e) => {
            const currentSectionDivElement = e.currentTarget.parentNode;
            currentSectionDivElement.classList.add('focused');
        });

        inputElements[i].addEventListener('blur', (e) => {
            const currentSectionDivElement = e.currentTarget.parentNode;
            currentSectionDivElement.classList.remove('focused');
        });
    }
}