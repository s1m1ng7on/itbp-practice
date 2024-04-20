function printWithDelimiter(array, delimiter) {
    return array.join(delimiter);
}

function printWithDelimeterImplementation(array, delimiter) {
    let output = '';
    for (let i = 0; i < array.length - 1; i++) {
        output += array[i] + delimiter;
    }
    output += array[array.length - 1];

    return output;
}

console.log(printWithDelimiter(['One', 'Two', 'Three', 'Four', 'Five'], '-'));
console.log(printWithDelimeterImplementation(['How about no?', 'I', 'will', 'not', 'do', 'it!'], '_'));