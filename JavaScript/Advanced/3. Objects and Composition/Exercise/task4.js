function createHeroRegistry(input) {
    const inventory = [];

    input.forEach((heroData) => {
        heroData = heroData.split(' / ');

        const newHero = {
            name: heroData[0],
            level: Number(heroData[1]),
            items: heroData[2] ? heroData[2].split(', ') : []
        };
        inventory.push(newHero);
    });

    console.log(JSON.stringify(inventory));
}

createHeroRegistry([
    'Isacc / 25 / Apple, GravityGun',
    'Derek / 12 / BarrelVest, DestructionSword',
    'Hes / 1 / Desolator, Sentinel, Antara'
]);