function zigZagSort(numbers) {
    numbers.sort((a, b) => a - b);

    let result = [];
    const numberLength = numbers.length;
    for (let i = 0; i < numberLength; i += 2) {
        result[i] = numbers.shift();
        result[i + 1] = numbers.pop();
    }   

    return result;
}

console.log(zigZagSort([1, 65, 3, 52, 48, 63, 31, -3, 18, 56]));