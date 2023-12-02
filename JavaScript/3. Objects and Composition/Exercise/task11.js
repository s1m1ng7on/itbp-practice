function calculateInPostfix(input) {
    let operands = [];

    try {
        input.forEach((arg) => {
            if (typeof (arg) == 'number' && Number.isInteger(arg)) {
                operands.push(arg);
            } else if (['+', '-', '*', '/'].includes(arg)) {
                applyOperator(arg);
            } else {
                throw new Error(`Invalid operand '${arg}'!`);
            }
        });

        const result = operands[0];
        console.log(result);
    } catch (error) {
        console.log(`Error: ${error.message.toLowerCase()}`);
    }

    function applyOperator(operator) {
        if (operands.length < 2) {
            throw Error("Not enough operands!");
        }

        const operand2 = operands.pop();
        const operand1 = operands.pop();

        let newOperand;
        switch (operator) {
            case '+':
                newOperand = operand1 + operand2;
                break;
            case '-':
                newOperand = operand1 - operand2;
                break;
            case '*':
                newOperand = operand1 * operand2;
                break;
            case '/':
                newOperand = operand1 / operand2;
        }

        operands.push(Math.round(newOperand));
    }
}

calculateInPostfix([
    15,
    3,
    '+'
]);