function isMagical(matrix) {
    const referenceSum = calculateRowSum(matrix, 0);

    for (let i = 1; i < matrix.length; i++) {
        const currentRowSum = calculateRowSum(matrix, i);
        if (currentRowSum != referenceSum) return false;
    }

    for (let j = 0; j < matrix[0].length; j++) {
        const currentColumnSum = calculateColumnSum(matrix, j);
        if (currentColumnSum != referenceSum) return false;
    }

    return true;
}

function calculateRowSum(matrix, row) {
    let rowSum = 0;
    matrix[row].forEach((number) => {
        rowSum += number;
    });

    return rowSum;
}

function calculateColumnSum(matrix, column) {
    let columnSum = 0;
    matrix.forEach((row) => {
        columnSum += row[column];
    })
    return columnSum;
}

console.log(isMagical(
    [[4, 5, 6],
    [6, 5, 4],
    [5, 5, 5]]
));

console.log(isMagical(
    [[11, 32, 45],
    [21, 0, 1],
    [21, 1, 1]]
));

console.log(isMagical(
    [[1, 0, 0],
    [0, 0, 1],
    [0, 1, 0]]
));