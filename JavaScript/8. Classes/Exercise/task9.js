function autoEngineeringCompany(input) {
    let cars = new Map();

    input.forEach(entry => {
        entry = entry.split(' | ');

        let [carBrand, carModel, producedCars] = entry;
        producedCars = Number(producedCars);

        if (!cars.has(carBrand)) {
            cars.set(carBrand, new Map());
        }

        let currentCarInfo = cars.get(carBrand);
        if (!currentCarInfo.has(carModel)) {
            currentCarInfo.set(carModel, producedCars);
        } else {
            currentCarInfo.set(carModel, currentCarInfo.get(carModel) + producedCars);
        }
    });

    cars.forEach((details, brand) => {
        console.log(brand);
        details.forEach((producedCars, model) => {
            console.log(`###${model} -> ${producedCars}`);
        });
    });
}

autoEngineeringCompany(['Audi | Q7 | 1000',
    'Audi | Q6 | 100',
    'BMW | X5 | 1000',
    'BMW | X6 | 100',
    'Citroen | C4 | 123',
    'Volga | GAZ-24 | 1000000',
    'Lada | Niva | 1000000',
    'Lada | Jigula | 1000000',
    'Citroen | C4 | 22',
    'Citroen | C5 | 10'
]);