function orderStoreCatalogue(products) {
    //Create an object for the products
    let unorderedProducts = {};
    products.forEach((productData) => {
        let [productName, productPrice] = productData.split(' : ');
        productPrice = Number(productPrice);

        if (productName[0].toUpperCase() != productName[0]) {
            throw new Error('Argument Exception');
        }

        unorderedProducts[productName] = productPrice;
    });

    //Order products by key
    let orderedProducts = {};
    const orderedProductNames = Object.keys(unorderedProducts).sort();
    orderedProductNames.forEach((productName) => {
        orderedProducts[productName] = unorderedProducts[productName];
    });

    //Print ordered products
    let currentLetter;
    for (const product in orderedProducts) {
        if (product[0] !== currentLetter) {
            currentLetter = product[0];
            console.log(currentLetter);
        }

        console.log(`  ${product}: ${orderedProducts[product]}`);
    }
}

orderStoreCatalogue([
    'Appricot : 20.4',
    'Fridge : 1500',
    'TV : 1499',
    'Deodorant : 10',
    'Boiler : 300',
    'Apple : 1.25',
    'Anti-Bug Spray : 15',
    'T-Shirt : 10'
]);