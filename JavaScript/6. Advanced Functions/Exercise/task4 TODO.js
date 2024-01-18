function solution() {
    function parseRecipeData(protein, carbohydrate, fat, flavour) {
        return {
            protein,
            carbohydrate,
            fat,
            flavour
        };
    }

    const ingredientsQuantity = parseRecipeData(0, 0, 0, 0);

    const recipes = {
        apple: parseRecipeData(0, 1, 0, 2),
        lemonade: parseRecipeData(0, 10, 0, 20),
        burger: parseRecipeData(0, 5, 7, 3),
        eggs: parseRecipeData(5, 0, 1, 1),
        turkey: parseRecipeData(10, 10, 10, 10)
    }

    function restock(microelement, quantity) {
        ingredientsQuantity[microelement] += quantity;
        return 'Success';
    }

    function prepare(recipe, quantity) {
        const parsedRecipe = Object.entries(recipe).map(x => [
            x[0],
            x[1] * quantity,
        ]);

        console.log(parsedRecipe);
    }

    function report() {
        return `protein=${ingredientsQuantity.protein} carbohydrate=${ingredientsQuantity.carbohydrate} fat=${ingredientsQuantity.fat} flavour=${ingredientsQuantity.flavour}`;
    }

    return function (command) {
        const commandArgs = command.split(' ');
        switch (commandArgs[0]) {
            case 'restock':
                restock(commandArgs[1], Number(commandArgs[2]));
                break;
            case 'prepare':
                prepare(commandArgs[1], Number(commandArgs[2]));
                break;
            case 'report':
                report();
                break;
        }
    }
}

let manager = solution();
console.log(manager("restock flavour 50")); // Success
console.log(manager("prepare lemonade 4")); // Error: not enough carbohydrate in stock