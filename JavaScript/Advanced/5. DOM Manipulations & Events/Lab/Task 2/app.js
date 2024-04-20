const emailInputElement = document.getElementsByName('email')[0];
const resultDivElement = document.getElementById('result');

function deleteByEmail() {
    const emailCellElements = document.querySelectorAll('#customers tbody tr td:nth-of-type(2)');

    try {
        const targetEmailCellElement = Array.from(emailCellElements).find(element => element.textContent == emailInputElement.value);
        const targetRowElement = targetEmailCellElement.parentElement;

        targetRowElement.remove();
        emailInputElement.value = '';
        resultDivElement.textContent = 'Deleted.';
    } catch {
        resultDivElement.textContent = 'Not found.';
    }
}