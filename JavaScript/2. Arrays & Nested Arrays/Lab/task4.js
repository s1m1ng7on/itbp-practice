function processNegativePositiveNumbers(numbers) {
    let processedNumbers = [];

    numbers.forEach(number => {
        if (number < 0) {
            processedNumbers.unshift(number);
        } else {
            processedNumbers.push(number);
        }
    });

    return processedNumbers;
}

const input1 = [7, -2, 8, 9];
console.log(processNegativePositiveNumbers(input1).join('\n'));

const input2 = [3, -2, 0, -1];
console.log(processNegativePositiveNumbers(input2).join('\n'));