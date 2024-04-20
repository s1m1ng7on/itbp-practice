function juiceFlavors(inputArgs) {
    let juiceFlavors = new Map();
    let juiceBottles = new Map();

    inputArgs.forEach(inputArg => {
        inputArg = inputArg.split(' => ');

        let [juice, quantity] = inputArg;
        quantity = Number(quantity);

        if (!juiceBottles.has(juice)) {
            const quantity = juiceFlavors.get(juice);
            const producedBottles = Math.floor(quantity / 1000);
        }

        /* if (!juiceFlavors.has(juice)) {
            juiceFlavors.set(juice, quantity);
        } else {
            let newQuantity = juiceFlavors.get(juice) + quantity;
            juiceFlavors.set(juice, newQuantity);
        } */
    });

    /* for (let juice of juiceFlavors.keys()) {
        const quantity = juiceFlavors.get(juice);
        const producedBottles = Math.floor(quantity / 1000);

        if (producedBottles > 0) {
            juiceFlavors.set(juice, producedBottles);
        } else {
            juiceFlavors.delete(juice);
        }
    } */

    return juiceBottles;
}

console.log(juiceFlavors(['Orange => 2000',
    'Peach => 1432',
    'Banana => 450',
    'Peach => 600',
    'Strawberry => 549'
]));

console.log(juiceFlavors(['Kiwi => 234',
    'Pear => 2345',
    'Watermelon => 3456',
    'Kiwi => 4567',
    'Pear => 5678',
    'Watermelon => 6789'
]));