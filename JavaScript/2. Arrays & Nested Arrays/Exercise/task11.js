function diagonalAttack(numbers) {
    //Split string array into number matrix
    for (let i = 0; i < numbers.length; i++) {
        numbers[i] = numbers[i].split(' ').map(Number);
    }

    //Calculate diagonals sum
    let mainDiagonalSum = 0;
    let secondaryDiagonalSum = 0;
    for (let i = 0; i < numbers.length; i++) {
        mainDiagonalSum += numbers[i][i];
        secondaryDiagonalSum += numbers[numbers.length - i - 1][i];
    }

    //Replace elements not part of the diagonals
    if (mainDiagonalSum == secondaryDiagonalSum) {
        for (let i = 0; i < numbers.length; i++) {
            for (let j = 0; j < numbers[i].length; j++) {
                if (i != j && i + j != numbers.length - 1) {
                    numbers[i][j] = mainDiagonalSum;
                }
            }
        }
    }

    //Print matrix
    numbers.forEach((row) => {
        console.log(row.join(' '));
    });
}

diagonalAttack([
    '5 3 12 3 1',
    '11 4 23 2 5',
    '101 12 3 21 10',
    '1 4 5 2 2',
    '5 22 33 11 1'
]);

diagonalAttack([
    '1 1 1',
    '1 1 1',
    '1 1 0'
]);