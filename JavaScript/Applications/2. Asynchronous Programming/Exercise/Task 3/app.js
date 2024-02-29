function attachEvents() {
    const locationTextInputElement = document.querySelector('#location');
    const submitButtonInputElement = document.querySelector('#submit');
    
    const forecastDivElement = document.querySelector('#forecast');
    const currentForecastDivElement = document.querySelector('#current');
    const upcomingForecastDivElement = document.querySelector('#upcoming');

    let locations;
    fetch('http://localhost:3030/jsonstore/forecaster/locations')
        .then(response => {
            if (!response.ok) {
                throw new Error(`${response.status} ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            locations = data;
        })
        .catch(error => {
            console.log(error);
        });

    submitButtonInputElement.addEventListener('click', () => {
        const locationName = locationTextInputElement.value;
        let locationCode = '';

        forecastDivElement.style.display = 'inline';
        currentForecastDivElement.innerHTML = '<div class="label">Current conditions</div>';
        upcomingForecastDivElement.innerHTML = `<div class="label">Three-day forecast</div>`;

        locations.forEach(location => {
            if (locationName === location.name) {
                locationCode = location.code;
            }
        });

        fetch(`http://localhost:3030/jsonstore/forecaster/today/${locationCode}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`${response.status} ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                handleCurrentWeatherDOM(data);  
            })
            .catch(error => {
                console.log(error);
            });

        fetch(`http://localhost:3030/jsonstore/forecaster/upcoming/${locationCode}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`${response.status} ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                handleUpcomingWeatherDom(data);
            })
            .catch(error => {
                console.log(error);
            });
    });

    function handleCurrentWeatherDOM(data) {
        const forecastsDivElement = document.createElement('div');
        forecastsDivElement.className = 'forecasts';

        const conditionSymbolSpanElement = document.createElement('span');
        conditionSymbolSpanElement.className = 'condition symbol';
        conditionSymbolSpanElement.textContent = toConditionSymbol(data.forecast.condition);
        forecastsDivElement.appendChild(conditionSymbolSpanElement);

        const conditionSpanElement = document.createElement('span');
        conditionSpanElement.className = 'condition';

        const conditionNameSpanElement = document.createElement('span');
        conditionNameSpanElement.className = 'forecast-data';
        conditionNameSpanElement.textContent = data.name;
        conditionSpanElement.appendChild(conditionNameSpanElement);

        const conditionTemperaturesSpanElement = document.createElement('span');
        conditionTemperaturesSpanElement.className = 'forecast-data';
        conditionTemperaturesSpanElement.textContent = `${data.forecast.low}°/${data.forecast.high}°`;
        conditionSpanElement.appendChild(conditionTemperaturesSpanElement);

        const conditionConditionSpanElement = document.createElement('span');
        conditionConditionSpanElement.className = 'forecast-data';
        conditionConditionSpanElement.textContent = data.forecast.condition;
        conditionSpanElement.appendChild(conditionConditionSpanElement);

        forecastsDivElement.appendChild(conditionSpanElement);
        currentForecastDivElement.appendChild(forecastsDivElement);
    }

    function handleUpcomingWeatherDom(data) {
        const forecastInfoDivElement = document.createElement('div');
        forecastInfoDivElement.className = 'forecast-info';

        data.forecast.forEach(singleForecast => {
            const upcomingWeatherSpanElement = document.createElement('span');
            upcomingWeatherSpanElement.className = 'upcoming';

            const upcomingWeatherConditionSymbolSpanElement = document.createElement('span');
            upcomingWeatherConditionSymbolSpanElement.className = 'symbol';
            upcomingWeatherConditionSymbolSpanElement.textContent = toConditionSymbol(singleForecast.condition);
            upcomingWeatherSpanElement.appendChild(upcomingWeatherConditionSymbolSpanElement);

            const upcomingWeatherTemperaturesSpanElement = document.createElement('span');
            upcomingWeatherTemperaturesSpanElement.className = 'forecast-data';
            upcomingWeatherTemperaturesSpanElement.textContent = `${singleForecast.low}°/${singleForecast.high}°`;
            upcomingWeatherSpanElement.appendChild(upcomingWeatherTemperaturesSpanElement);

            const upcomingWeatherConditionSpanElement = document.createElement('span');
            upcomingWeatherConditionSpanElement.className = 'forecast-data';
            upcomingWeatherConditionSpanElement.textContent = singleForecast.condition;
            upcomingWeatherSpanElement.appendChild(upcomingWeatherConditionSpanElement);

            forecastInfoDivElement.appendChild(upcomingWeatherSpanElement);
            upcomingForecastDivElement.appendChild(forecastInfoDivElement);
        })
    }

    function toConditionSymbol(condition) {
        switch (condition) {
            case 'Sunny':
                return '\u2600';
            case 'Partly sunny':
                return '\u26C5';
            case 'Overcast':
                return '\u2601';
            case 'Rain':
                return '\u2614';
        }
    }
}

attachEvents();