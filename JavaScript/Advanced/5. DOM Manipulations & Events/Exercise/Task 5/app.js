function encodeAndDecodeMessages() {
    const encodeMessageTextArea = document.querySelector('textarea[placeholder="Write your message here..."]');
    const decodeMessageTextArea = document.querySelector('textarea[placeholder="No messages..."]');

    const buttonElements = document.querySelectorAll('button');
    const encodeMessageButtonElement = buttonElements[0];
    const decodeMessageButtonElement = buttonElements[1];

    encodeMessageButtonElement.addEventListener('click', () => {
        const originalMessage = encodeMessageTextArea.value;
        let encodedMessage = '';
        for (let i in originalMessage) {
            encodedMessage += String.fromCharCode(originalMessage.charCodeAt(i) + 1);
        }

        decodeMessageTextArea.value = encodedMessage;
    });

    decodeMessageButtonElement.addEventListener('click', () => {
        const originalMessage = decodeMessageTextArea.value;
        let decodedMessage = '';
        for (let i in originalMessage) {
            decodedMessage += String.fromCharCode(originalMessage.charCodeAt(i) - 1);
        }

        encodeMessageTextArea.value = decodedMessage;
    });
}