function getInfo() {
    const busesUlElement = document.querySelector('#buses');
    busesUlElement.innerHTML = '';

    const busStopId = document.querySelector('#stopId').value;
    fetch(`http://localhost:3030/jsonstore/bus/businfo/${busStopId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`${response.status} ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            const busStopNameDivElement = document.querySelector('#stopName');
            busStopNameDivElement.textContent = data.name;

            for (const [id, time] of Object.entries(data.buses)) {
                const newBusLiElement = document.createElement('li');
                newBusLiElement.textContent = `Bus ${id} arrives in ${time} minutes`;
                busesUlElement.appendChild(newBusLiElement);
            }
        })
        .catch(() => {
            const busStopNameDivElement = document.querySelector('#stopName');
            busStopNameDivElement.textContent = 'Error';
        });
}