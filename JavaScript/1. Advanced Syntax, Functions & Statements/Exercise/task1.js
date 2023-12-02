function calculateMoneyToBuyFruit(fruitType, weightInGrams, pricePerKilo) {
    let weightInKilos = weightInGrams / 1000;
    let totalPrice = weightInKilos * pricePerKilo;

    console.log(`I need $${totalPrice.toFixed(2)} to buy ${weightInKilos.toFixed(2)} kilograms ${fruitType}.`)
}

calculateMoneyToBuyFruit('orange', 2500, 1.80);