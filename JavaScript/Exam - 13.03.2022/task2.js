class CarDealership {
    constructor(name) {
        this.name = name;
        this.availableCars = [];
        this.soldCars = [];
        this.totalIncome = 0;
    }

    addCar(model, horsepower, price, mileage) {
        if (model.length === 0 || horsepower < 0 || price < 0 || mileage < 0) {
            throw new Error('Invalid input!');
        }

        const newCar = {
            model,
            horsepower,
            price,
            mileage
        };

        this.availableCars.push(newCar);
        
        return `New car added: ${newCar.model} - ${newCar.horsepower} HP - ${newCar.mileage.toFixed(2)} km - ${newCar.price.toFixed(2)}$`;
    }

    sellCar(model, desiredMileage) {
        const selectedCar = this.availableCars.find(car => car.model === model);

        if (selectedCar === undefined) {
            throw new Error(`${model} was not found!`);
        }

        let selectedCarSoldPrice;
        if (selectedCar.mileage <= desiredMileage) {
            selectedCarSoldPrice = selectedCar.price;
        } else {
            const mileageDifference = selectedCar.mileage - desiredMileage;
            if (mileageDifference <= 40000) {
                selectedCarSoldPrice = 0.95 * selectedCar.price;
            } else {
                selectedCarSoldPrice = 0.9 * selectedCar.price;
            }
            selectedCar.price = selectedCarSoldPrice;
        }

        const selectedaCarIndex = this.availableCars.indexOf(selectedCar);
        this.availableCars.splice(selectedaCarIndex, 1);
        this.soldCars.push(selectedCar);

        return `${selectedCar.model} was sold for ${selectedCarSoldPrice.toFixed(2)}$`;
    }

    currentCar() {
        if (this.availableCars.length > 0) {
            return `-Available cars:\n${this.availableCars.map(car => `---${car.model} - ${car.horsepower} HP - ${car.mileage.toFixed(2)} km - ${car.price.toFixed(2)}$`).join('\n')}`;
        } else {
            return 'There are no available cars';
        }
    }

    salesReport(criteria) {
        let sortedCars = [...this.soldCars];
        switch (criteria) {
            case 'horsepower':
                sortedCars.sort((a, b) => b.horsepower - a.horsepower);
                break;
            case 'model':
                sortedCars.sort((a, b) => a.model.localeCompare(b.model));
                break;
            default:
                throw new Error('Invalid criteria!');
        }

        const totalIncome = this.soldCars.reduce((accumulator, car) => accumulator += car.price, 0);

        return `-${this.name} has a total income of ${totalIncome.toFixed(2)}$\n-${this.soldCars.length} cars sold:\n${sortedCars.map(car => `---${car.model} - ${car.horsepower} HP - ${car.price.toFixed(2)}$`).join('\n')}`;
    }
}