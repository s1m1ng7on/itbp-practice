function getCityRecord(name, population, treasury) {
    return {
        name,
        population,
        treasury,
        taxRate: 10,
        collectTaxes: function() {
            this.treasury += this.population * this.taxRate;
        },
        applyGrowth: function(percentage) {
            this.population *= 1 + percentage / 100;
            this.population = Math.round(this.population);
            return this.population;
        },
        applyRecession: function(percentage) {
            this.population *= 1 - percentage / 100;
            this.population = Math.round(this.population);
            return this.population;
        }
    }
}

const city = getCityRecord(
    'Tortuga',
    7000,
    15000
);

city.collectTaxes();
console.log(city.treasury);
city.applyGrowth(5);
console.log(city.population);
