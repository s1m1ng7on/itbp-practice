let number1 = '-8';
let number2 = '20';

console.log(solve(number1, number2));

function solve(number1, number2) {
    number1 = Number(number1);
    number2 = Number(number2);

    let sum = 0;
    for (let i = number1; i <= number2; i++) {
        sum += i;
    }

    return sum;
}