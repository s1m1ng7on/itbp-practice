function solve() {
    const addMailsMenuRecipentNameInputElement = document.querySelector('#recipientName');
    const addMailsMenuTitleInputElement = document.querySelector('#title');
    const addMailsMenuMessageTextAreaElement = document.querySelector('#message');

    const listMailsUlElement = document.querySelector('#list');

    const addToTheListButtonElement = document.querySelector('#add');

    addToTheListButtonElement.addEventListener('click', () => {
        const recipentName = addMailsMenuRecipentNameInputElement.value;
        const title = addMailsMenuTitleInputElement.value;
        const message = addMailsMenuMessageTextAreaElement.textContent;

        if (recipentName.length === 0 || title.length === 0 || message.length === 0) {
            return;
        }

        const emailCardLiElement = document.createElement('li');

        const emailCardTitleH4Element = document.createElement('h4');
        emailCardTitleH4Element.textContent = `Title: ${title}`;
        emailCardLiElement.appendChild(emailCardTitleH4Element);

        const emailCardRecipentNameH4Element = document.createElement('h4');
        emailCardRecipentNameH4Element.textContent = `Recipent Name: ${recipentName}`;
        emailCardLiElement.appendChild(emailCardRecipentNameH4Element);

        const emailCardMessageSpanElement = document.createElement('span');
        emailCardMessageSpanElement.textContent = message;
        emailCardLiElement.appendChild(emailCardMessageSpanElement);

        const emailCardListActionDivElement = document.createElement('div');
        emailCardListActionDivElement.id = 'list-action';
        emailCardLiElement.appendChild(emailCardListActionDivElement);

        const emailCardListActionSendButtonElement = document.createElement('button');
        emailCardListActionSendButtonElement.type = 'submit';
        emailCardListActionSendButtonElement.id = 'send';
        emailCardListActionSendButtonElement.textContent = 'Send';
        emailCardListActionDivElement.appendChild(emailCardListActionSendButtonElement);

        const emailCardListActionDeleteButtonElement = document.createElement('button');
        emailCardListActionDeleteButtonElement.type = 'submit';
        emailCardListActionDeleteButtonElement.id = 'delete';
        emailCardListActionDeleteButtonElement.textContent = 'Delete';
        emailCardListActionDivElement.appendChild(emailCardListActionDeleteButtonElement);

        listMailsUlElement.appendChild(emailCardLiElement);
    });
}

solve();