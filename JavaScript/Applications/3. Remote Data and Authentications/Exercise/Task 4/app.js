const baseUrl = 'http://localhost:3030/jsonstore/collections/books';

const booksTbodyElement = document.querySelector('table tbody');
const bookFormElement = document.querySelector('form');
const bookFormTitleElement = bookFormElement.querySelector('h3');
const bookFormSubmitButtonElement = bookFormElement.querySelector('button');

let isInEditMode = false;
let selectedBookId;

bookFormElement.addEventListener('submit', submitBook);

loadBooks();

async function loadBooks() {
    const response = await fetch(baseUrl);
    const books = await response.json();

    booksTbodyElement.innerHTML = '';

    Object.entries(books).forEach(bookObj => {
        const [bookId, book] = bookObj;

        const trElement = document.createElement('tr');
        trElement.id = bookId;
        booksTbodyElement.appendChild(trElement);

        const titleTdElement = document.createElement('td');
        titleTdElement.textContent = book.title;
        trElement.appendChild(titleTdElement);

        const authorTdElement = document.createElement('td');
        authorTdElement.textContent = book.author;
        trElement.appendChild(authorTdElement);

        const actionTdElement = document.createElement('td');
        trElement.appendChild(actionTdElement);

        const editButtonElement = document.createElement('button');
        editButtonElement.value = 'edit';
        editButtonElement.textContent = 'Edit';
        editButtonElement.addEventListener('click', toggleEditMode);
        actionTdElement.appendChild(editButtonElement);

        const deleteButtonElement = document.createElement('button');
        deleteButtonElement.value = 'delete';
        deleteButtonElement.textContent = 'Delete';
        deleteButtonElement.addEventListener('click', deleteBook);
        actionTdElement.appendChild(deleteButtonElement);
    });
}

async function submitBook(e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    const url = isInEditMode ? `${baseUrl}/${selectedBookId}` : baseUrl;

    await fetch(url, {
        method: isInEditMode ? 'put' : 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            author: formData.get('author'),
            title: formData.get('title')
        })
    });

    e.target.reset();

    if (isInEditMode) {
        toggleSubmitMode();
    }

    loadBooks();
}

async function deleteBook(e) {
    selectedBookId = e.target.parentNode.parentNode.id;

    await fetch(`${baseUrl}/${selectedBookId}`, {
        method: 'delete'
    });

    loadBooks();
}

async function toggleEditMode(e) {
    bookFormTitleElement.textContent = 'Edit FORM';
    bookFormSubmitButtonElement.textContent = 'Save';

    selectedBookId = e.target.parentNode.parentNode.id;

    const response = await fetch(`${baseUrl}/${selectedBookId}`);
    const selectedBook = await response.json();

    document.querySelector('[name="title"]').value = selectedBook.title;
    document.querySelector('[name="author"]').value = selectedBook.author;

    isInEditMode = true;
}

function toggleSubmitMode() {
    bookFormTitleElement.textContent = 'FORM';
    bookFormSubmitButtonElement.textContent = 'Submit';

    document.querySelector('[name="title"]').value = '';
    document.querySelector('[name="author"]').value = '';

    isInEditMode = false;
}