function attachEvents() {
    const messagesTextareaElement = document.querySelector('#messages');
    const newMessageAuthorInputElement = document.querySelector('input[name="author"]');
    const newMessageContentInputElement = document.querySelector('input[name="content"]');
    const sendMessageButtonInputElement = document.querySelector('#submit');
    const refreshMessagesButtonInputElement = document.querySelector('#refresh');

    const url = 'http://localhost:3030/jsonstore/messenger';

    sendMessageButtonInputElement.addEventListener('click', sendMessage);
    refreshMessagesButtonInputElement.addEventListener('click', refreshMessages);

    async function sendMessage() {
        await fetch(url, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                author: newMessageAuthorInputElement.value,
                content: newMessageContentInputElement.value
            })
        });
    }

    async function refreshMessages() {
        const getMessages = await fetch(url);
        const messages = await getMessages.json();

        messagesTextareaElement.textContent = Object.values(messages).map(message => `${message.author}: ${message.content}`).join('\n');
    }
}

attachEvents();