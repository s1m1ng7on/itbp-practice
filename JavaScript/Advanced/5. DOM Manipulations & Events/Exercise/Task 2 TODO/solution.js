function attachEventsListeners() {
    const convertButtonElements = document.querySelectorAll('input[type="button"][value="Convert"]');
    convertButtonElements.forEach(convertButtonElement => {
        convertButtonElement.addEventListener('click', (e) => {
            const timeUnitTextInputElement = e.currentTarget.parentNode.querySelector('input[type="text"]');
            const timeUnit = timeUnitTextInputElement.id;
            
            const timeUnitTextInputElements = document.querySelectorAll('input[type="text"]');
            timeUnitTextInputElements.forEach(currentTimeUnitTextInputElement => {
                timeUnitToConvert = currentTimeUnitTextInputElement.id;
                if (timeUnitToConvert != timeUnit) {
                    convertTime(Number(timeUnitTextInputElement.value), timeUnit, timeUnitToConvert);
                }
            })
        });
    });

    function convertTime(time, fromUnit, toUnit) {
        const timeUnits = {
            'second': 1,
            'minute': 60,
            'hour': 3600,
            'day': 86400
        }

        const timeInSeconds = time * timeUnits[fromUnit];
        console.log(timeInSeconds);
    }
}