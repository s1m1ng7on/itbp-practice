function createTownRegistry(townsData) {
    let towns = {};

    townsData.forEach((townData) => {
        const townDataArgs = townData.split(' <-> ');

        const town = townDataArgs[0];
        const population = Number(townDataArgs[1]);

        if (!towns[town]) {
            towns[town] = population;
        } else {
            towns[town] += population;
        }
    });

    for (const town in towns) {
        console.log(`${town} : ${towns[town]}`);
    }
}

createTownRegistry([
    'Sofia <-> 1200000',
    'Montana <-> 20000',
    'New York <-> 10000000',
    'Washington <-> 2345000',
    'Las Vegas <-> 1000000',
    'Montana <-> 3000'
]);