function formNonDecreasingSubset(array) {
    let maxNumber = array[0];
    let result = [maxNumber];

    for (let i = 1; i < array.length; i++) {
        if (array[i] >= maxNumber) {
            maxNumber = array[i];
            result.push(maxNumber);
        }
    }

    return result;
}

console.log(formNonDecreasingSubset([1, 3, 8, 4, 10, 12, 3, 2, 24]));
console.log(formNonDecreasingSubset([1, 2, 3, 4]));
console.log(formNonDecreasingSubset([20, 3, 2, 15, 6, 1]));