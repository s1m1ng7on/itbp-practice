const getGCD = ((num1, num2) => {
    let greatestCommonDivider = 1;
    for (let i = 2; i <= Math.max(num1, num2) / 2; i++) {
        if (num1 % i == 0 && num2 % i == 0) {
            greatestCommonDivider = i;
        }
    }
    return greatestCommonDivider;
});

console.log(getGCD(15, 5));
console.log(getGCD(2154, 458));