function attachEventsListeners() {
    const inputDistanceInputElement = document.getElementById('inputDistance');
    const inputUnitsSelectElement = document.getElementById('inputUnits');
    const outputDistanceInputElement = document.getElementById('outputDistance');
    const outputUnitsSelectElement = document.getElementById('outputUnits');

    const convertButtonElement = document.getElementById('convert');
    convertButtonElement.addEventListener('click', () => {
        const inputDistance = inputDistanceInputElement.value;
        const inputUnit = inputUnitsSelectElement.options[inputUnitsSelectElement.selectedIndex].value;
        const outputUnit = outputUnitsSelectElement.options[outputUnitsSelectElement.selectedIndex].value;
        
        let distanceInMeters;
        switch (inputUnit) {
            case 'km':
                distanceInMeters = inputDistance * 1000;
                break;
            case 'm':
                distanceInMeters = inputDistance;
                break;
            case 'cm':
                distanceInMeters = inputDistance * 0.01;
                break;
            case 'mm':
                distanceInMeters = inputDistance * 0.001;
                break;
            case 'mi':
                distanceInMeters = inputDistance * 1609.34;
                break;
            case 'yrd':
                distanceInMeters = inputDistance * 0.9144;
                break;
            case 'ft':
                distanceInMeters = inputDistance * 0.3048;
                break;
            case 'in':
                distanceInMeters = inputDistance * 0.0254;
                break;
        }
        
        let outputDistance;
        switch (outputUnit) {
            case 'km':
                outputDistance = distanceInMeters * 0.001;
                break;
            case 'm':
                outputDistance = distanceInMeters;
                break;
            case 'cm':
                outputDistance = distanceInMeters * 100;
                break;
            case 'mm':
                outputDistance = distanceInMeters * 1000;
                break;
            case 'mi':
                outputDistance = distanceInMeters / 1609;
                break;
            case 'yrd':
                outputDistance = distanceInMeters * 1.094;
                break;
            case 'ft':
                outputDistance = distanceInMeters * 3.281;
                break;
            case 'in':
                outputDistance = distanceInMeters * 39.37;
                break;
        }

        outputDistanceInputElement.value = outputDistance;
    });
}