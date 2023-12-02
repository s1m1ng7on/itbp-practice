function findElementsAtEvenPosition(array) {
    let output = '';
    for (let i = 0; i < array.length; i += 2) {
        output += `${array[i]} `;
    }
    return output;
}

const input = ['20', '30', '40', '50', '60'];
console.log(findElementsAtEvenPosition(input));