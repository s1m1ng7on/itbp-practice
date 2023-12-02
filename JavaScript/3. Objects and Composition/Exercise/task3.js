function assembleCar(car) {
    const engines = [
        { power: 90, volume: 1800 },
        { power: 120, volume: 2400 },
        { power: 200, volume: 3500 }
    ]

    const selectedEngine = engines.find(engine => engine.power >= car.power);
    const roundedWheelSize = Math.round(car.wheelSize / 2) * 2 - 1;

    const assembledCar = {
        model: car.model,
        engine: selectedEngine,
        carriage: {
            type: car.carriage,
            color: car.color
        },
        wheels: Array(4).fill(roundedWheelSize)
    }

    return assembledCar;
};

console.log(assembleCar({
    model: 'Opel Vectra',
    power: 110,
    color: 'grey',
    carriage: 'coupe',
    wheelSize: 20
}));