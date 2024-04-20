function sum(numbers) {
    return numbers[0] + numbers[1] + numbers[2];
}

function inverseSum(numbers) {
    return 1 / numbers[0] + 1 / numbers[1] + 1 / numbers[2];
}

function concat(numbers) {
    return String(numbers[0]) + String(numbers[1]) + String(numbers[2]);
}

let numbers = [1, 2, 4];
console.log(sum(numbers));
console.log(inverseSum(numbers));
console.log(concat(numbers));