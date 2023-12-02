let number1 = 5;
let number2 = 6;
let operator = '+';

console.log(solve(number1, number2, operator));

function solve(number1, number2, operator)
{
    switch (operator) {
        case '+':
            return number1 + number2;
        case '-':
            return number1 - number2;
        case '*':
            return number1 * number2;
        case '/':
            return number1 / number2;
        case '%':
            return number1 % number2;
        case '**':
            return number1 ** number2;
        default:
            return NaN;
    }
}