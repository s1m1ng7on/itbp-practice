function addItem() {
    const menuSelectElement = document.getElementById('menu');
    const newItemTextInputElement = document.getElementById('newItemText');
    const newItemValueInputElement = document.getElementById('newItemValue');

    let newItem = document.createElement('option');
    newItem.textContent = newItemTextInputElement.value;
    newItem.value = newItemValueInputElement.value;
    menuSelectElement.appendChild(newItem);

    newItemTextInputElement.value = '';
    newItemValueInputElement.value = '';
}
