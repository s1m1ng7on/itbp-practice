function solve() {
    const inputTextAreaElement = document.getElementById('input');
    const inputText = inputTextAreaElement.value;

    const inputTextSentenceGroups = [];
    let currentSentenceGroup = '';
    let sentencesInCurrentGroup = 0;
    for (let i = 0; i < inputText.length; i++) {
        currentSentenceGroup += inputText[i];

        if (['.', '?', '!'].includes(inputText[i])) {
            sentencesInCurrentGroup++;
        }

        if (sentencesInCurrentGroup === 3) {
            inputTextSentenceGroups.push(currentSentenceGroup);
            currentSentenceGroup = '';
            sentencesInCurrentGroup = 0;
        }
    }

    if (currentSentenceGroup !== '') {
        inputTextSentenceGroups.push(currentSentenceGroup);
    }

    console.log(inputTextSentenceGroups);

    /*const outputDivElement = document.getElementById('output');
    outputDivElement.innerHTML = `<p>${inputTextAreaElement.textContent}</p>`;*/
}