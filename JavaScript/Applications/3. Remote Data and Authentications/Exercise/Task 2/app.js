function attachEvents() {
    const baseUrl = 'http://localhost:3030/jsonstore/phonebook';

    const phonebookUlElement = document.querySelector('#phonebook');
    const newContactPersonInputElement = document.querySelector('#person');
    const newContactPhoneInputElement = document.querySelector('#phone');

    const loadContactsButtonElement = document.querySelector('#btnLoad');
    const createContactButtonElement = document.querySelector('#btnCreate');

    loadContactsButtonElement.addEventListener('click', loadContacts);
    createContactButtonElement.addEventListener('click', createContact);
    phonebookUlElement.addEventListener('click', deleteContact);

    async function loadContacts() {
        phonebookUlElement.innerHTML = '';

        const response = await fetch(baseUrl);
        const contacts = await response.json();

        Object.values(contacts).forEach(contact => {
            const contactLiElement = document.createElement('li');
            contactLiElement.id = contact._id;
            contactLiElement.textContent = `${contact.person}: ${contact.phone}`;

            const deleteContactButtonElement = document.createElement('button');
            deleteContactButtonElement.textContent = 'Delete';

            contactLiElement.appendChild(deleteContactButtonElement);
            phonebookUlElement.appendChild(contactLiElement);
        });
    }

    async function createContact() {
        await fetch(baseUrl, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                person: newContactPersonInputElement.value,
                phone: newContactPhoneInputElement.value
            })
        });

        newContactPersonInputElement.value = '';
        newContactPhoneInputElement.value = '';

        loadContacts();
    }

    async function deleteContact(e) {
        if (e.target.tagName === "BUTTON") {
            const contactId = e.target.parentNode.id;
            
            await fetch(`${baseUrl}/${contactId}`, {
                method: 'delete',
                headers: {
                    'Content-type': 'application/json'
                }
            });

            loadContacts();
        }
    }
}

attachEvents();