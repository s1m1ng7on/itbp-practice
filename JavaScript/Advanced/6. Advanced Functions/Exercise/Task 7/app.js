function calculator() {
    let number1InputElement, number2InputElement, resultNumberInputElement;

    return {
        init: function(selector1, selector2, resultSelector) {
            number1InputElement = document.querySelector(selector1);
            number2InputElement = document.querySelector(selector2);
            resultNumberInputElement = document.querySelector(resultSelector);
        },
        add: function() {
            resultNumberInputElement.value = Number(number1InputElement.value) + Number(number2InputElement.value);
        },
        subtract: function() {
            resultNumberInputElement.value = Number(number1InputElement.value) - Number(number2InputElement.value);
        }
    };
}

const calculate = calculator();
calculate.init('#num1', '#num2', '#result');