function solve() {
    const number = Number(document.getElementById('input').value);
    const selectedOptionValue = document.getElementById('selectMenuTo').value;

    let result;
    switch (selectedOptionValue) {
        case 'binary':
            result = number.toString(2);
            break;
        case 'hexadecimal':
            result = number.toString(16).toUpperCase();
            break;
    }

    const resultElement = document.getElementById('result');
    resultElement.value = result;
}