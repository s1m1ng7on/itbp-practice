function findTwoSmallestNumbers(numbers) {
    let smallestTwoNumbers = [];
    for (let i = 0; i < 2; i++) {
        smallestTwoNumbers[i] = Math.min(numbers);
        numbers.remove()
    }
}

const input1 = [30, 15, 50, 5];
console.log(findTwoSmallestNumbers(input1).join(' '));

const input2 = [3, 0, 10, 4, 7, 3];
console.log(findTwoSmallestNumbers(input2).join(' '));