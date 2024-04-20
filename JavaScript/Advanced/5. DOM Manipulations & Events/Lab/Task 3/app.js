const unorderedListElement = document.getElementById('items');
const textInputElement = document.getElementById('newItemText');

function addItem() {
    let newListItemElement = document.createElement('li');

    let newItemTitleSpanElement = document.createElement('span');
    newItemTitleSpanElement.textContent = textInputElement.value;

    let newItemDeleteLinkElement = document.createElement('a');
    newItemDeleteLinkElement.textContent = '[DELETE]';
    newItemDeleteLinkElement.href = '#';
    newItemDeleteLinkElement.addEventListener('click', (e) => {
        e.currentTarget.parentElement.remove();
    });

    newListItemElement.style.flex = "auto";
    newListItemElement.style.justifyContent = "space-between";

    newListItemElement.appendChild(newItemTitleSpanElement);
    newListItemElement.appendChild(newItemDeleteLinkElement);

    textInputElement.value = '';
    unorderedListElement.appendChild(newListItemElement);
}