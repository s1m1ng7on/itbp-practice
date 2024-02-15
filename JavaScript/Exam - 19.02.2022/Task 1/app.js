function solve() {
    const firstNameInputElement = document.querySelector('#fname');
    const lastNameInputElement = document.querySelector('#lname');
    const emailInputElement = document.querySelector('#email');
    const dateOfBirthInputElement = document.querySelector('#birth');
    const positionInputElement = document.querySelector('#position');
    const salaryInputElement = document.querySelector('#salary');
    const hireWorkerFormElement = document.querySelector('form');

    const tableContentDivElement = document.querySelector

    hireWorkerFormElement.addEventListener('submit', (e) => {
        const hireWorkerFormInputElements = hireWorkerFormElement.querySelectorAll('input:not([type="button"])');
        Array.from(hireWorkerFormInputElements).forEach(hireWorkerFormInputElement => {
            
        });

        /* newWorker = {
            firstName: firstNameInputElement.value,
            lastName: lastNameInputElement.value,
            email: emailInputElement.value,
            dateOfBirth: dateOfBirthInputElement.value,
            position: positionInputElement.value,
            salary: salaryInputElement.value
        }

        const newWorkerTrElement = document.createElement('tr');

        const newWorkerFirstNameTdElement = document.createElement('td');
        newWorkerFirstNameTdElement.textContent = newWorker.firstName; */
    });
}

solve();