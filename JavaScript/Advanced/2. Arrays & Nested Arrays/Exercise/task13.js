function generateSpiralMatrix(width, height) {
    let matrix = Array.from({ length: height }, () => Array(width).fill(0));

    let rowStart = 0;
    let columnStart = 0;

    let rowEnd = height - 1;
    let columnEnd = width - 1;

    let currentNumber = 1;
    while (rowStart <= rowEnd && columnStart <= columnEnd) {
        for (let i = columnStart; i <= columnEnd; i++) {
            matrix[rowStart][i] = currentNumber;
            currentNumber++;
        }
        rowStart++;

        for (let i = rowStart; i <= rowEnd; i++) {
            matrix[i][columnEnd] = currentNumber;
            currentNumber++;
        }
        columnEnd--;

        for (let i = columnEnd; i >= columnStart; i--) {
            matrix[rowEnd][i] = currentNumber;
            currentNumber++;
        }
        rowEnd--;

        for (let i = rowEnd; i >= rowStart; i--) {
            matrix[i][columnStart] = currentNumber;
            currentNumber++;
        }
        columnStart++;
    }

    matrix.forEach((row) => {
        console.log(row.join(' '));
    });
}

generateSpiralMatrix(5, 5);
generateSpiralMatrix(3, 3);
generateSpiralMatrix(4, 6);