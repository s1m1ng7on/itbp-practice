const unorderedListElement = document.getElementById('items');
const textInputElement = document.getElementById('newItemText');

function addItem() {
    let newElement = document.createElement('li');
    newElement.textContent = textInputElement.value;
    textInputElement.value = '';
    unorderedListElement.appendChild(newElement);
}