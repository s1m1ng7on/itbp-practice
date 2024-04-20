function attachGradientEvents() {
    const gradientDivElement = document.getElementById('gradient');
    const resultDivElement = document.getElementById('result');

    gradientDivElement.addEventListener('mousemove', (e) => {
        const progressPercentage = ((e.offsetX / e.target.clientWidth) * 100).toFixed();
        resultDivElement.textContent = `${progressPercentage}%`;
    });

    gradientDivElement.addEventListener('mouseleave', () => {
        resultDivElement.textContent = '';
    });
}