function generateNumberSequence(sequenceLength, numberOfPreviousElementsToSum) {
    let numberSequence = [1];

    for (let i = 1; i < sequenceLength; i++) {
        let currentElement = 0;
        
        let j = i - 1;
        while (j >= 0 && j >= i - numberOfPreviousElementsToSum) {
            currentElement += numberSequence[j];
            j--;
        }
        numberSequence[i] = currentElement;
    }
    
    return numberSequence;
}

console.log(generateNumberSequence(6, 3));
console.log(generateNumberSequence(8, 2));