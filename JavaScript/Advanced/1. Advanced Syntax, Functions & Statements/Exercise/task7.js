function cookNumber(number, operator1, operator2, operator3, operator4, operator5) {
    number = Number(number);

    const operators = [operator1, operator2, operator3, operator4, operator5];
    operators.forEach(operator => {
        switch (operator) {
            case 'chop':
                number /= 2;
                break;
            case 'dice':
                number = Math.sqrt(number);
                break;
            case 'spice':
                number++;
                break;
            case 'bake':
                number *= 3;
                break;
            case 'fillet':
                number = 0.8 * number;
                break;
            default:
                throw Error('Invalid input. Please provide valid operators.');
        }

        console.log(number);
    });
}

cookNumber('32', 'chop', 'chop', 'chop', 'chop', 'chop');
cookNumber('9', 'dice', 'spice', 'chop', 'bake', 'fillet');