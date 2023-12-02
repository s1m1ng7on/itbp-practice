function convertAllWordsToUpperCase(text) {
    let upperCaseWords = [];

    let currentWord = '';
    for (let i = 0; i < text.length; i++) {
        const currentCharAsciiValue = text.charCodeAt(i);
        if ((currentCharAsciiValue >= 65 && currentCharAsciiValue <= 90) || (currentCharAsciiValue >= 97 && currentCharAsciiValue <= 122)) {
            currentWord += text[i];
        } else {
            if (currentWord !== '') {
                upperCaseWords.push(currentWord.toUpperCase());
                currentWord = '';
            }
        }
    }

    if (currentWord !== '') {
        upperCaseWords.push(currentWord.toUpperCase());
    }

    console.log(upperCaseWords.join(', '));
}

convertAllWordsToUpperCase('Hi, how are you?');
convertAllWordsToUpperCase('hello man');