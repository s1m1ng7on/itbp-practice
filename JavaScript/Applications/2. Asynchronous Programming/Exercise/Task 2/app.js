function solve() {
    let currentBusStopName = '';
    let nextStopId = 'depot';

    const busStopInfoDivElement = document.querySelector('#info');
    const departButtonInputElement = document.querySelector('#depart');
    const arriveButtonInputElement = document.querySelector('#arrive');

    function depart() {
        fetch(`http://localhost:3030/jsonstore/bus/schedule/${nextStopId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`${response.status} ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                currentBusStopName = data.name;
                nextStopId = data.next;
                busStopInfoDivElement.textContent = `Next stop ${currentBusStopName}`;
                
                departButtonInputElement.disabled = true;
                arriveButtonInputElement.disabled = false;
            })
            .catch(() => {
                busStopInfoDivElement.textContent = 'Error';

                departButtonInputElement.disabled = true;
                arriveButtonInputElement.disabled = true;
            });
    }

    function arrive() {
        busStopInfoDivElement.textContent = `Arriving at ${currentBusStopName}`;
        
        arriveButtonInputElement.disabled = true;
        departButtonInputElement.disabled = false;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();