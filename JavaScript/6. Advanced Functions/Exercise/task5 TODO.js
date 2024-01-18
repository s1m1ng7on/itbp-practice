function add(number1) {
    let sum = 0;

    function innerAdd(number2) {
        sum += number2;
        return innerAdd;
    }

    innerAdd.toString() = () => sum;
    return innerAdd(number1);
}

console.log(add(1)(6)(-3));