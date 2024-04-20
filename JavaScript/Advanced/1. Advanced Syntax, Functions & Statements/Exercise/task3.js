function checkSameDigits(number) {
    const digits = number.toString();
    const areSameDigits = true;

    const firstDigit = digits[0];
    for (let i = 1; i < digits.length; i++) {
        if (digits[i] != firstDigit) {
            areSameDigits = false;
        }
    }

    console.log(areSameDigits);

    let sum = 0;
    for (let i = 0; i < digits.length; i++) {
        sum += parseInt(digits[i]);
    }

    console.log(sum);
}

checkSameDigits(2222222);