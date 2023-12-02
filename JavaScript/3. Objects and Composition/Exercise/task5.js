function lowestPricesInCities(input) {
    let products = {};

    input.forEach((arg) => {
        let [townName, productName, productPrice] = arg.split(' | ');
        productPrice = Number(productPrice);

        if (!products[productName] || products[productName].lowestPrice > productPrice) {
            products[productName] = {
                lowestPrice: productPrice,
                town: townName
            };
        }
    });

    for (const product in products) {
        const { lowestPrice, town } = products[product];
        console.log(`${product} -> ${lowestPrice} (${town})`);
    }
}

lowestPricesInCities([
    'Sample Town | Sample Product | 1000',
    'Sample Town | Orange | 2',
    'Sample Town | Peach | 1',
    'Sofia | Orange | 3',
    'Sofia | Peach | 2',
    'New York | Sample Product | 1000.1',
    'New York | Burger | 10'
]);