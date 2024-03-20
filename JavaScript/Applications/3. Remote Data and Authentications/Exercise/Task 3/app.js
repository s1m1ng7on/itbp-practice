const url = 'http://localhost:3030/jsonstore/collections/students';

const resultsTableTbodyElement = document.querySelector('#results tbody');
const newStudentFormElement = document.querySelector('#form');

newStudentFormElement.addEventListener('submit', createStudent);

loadStudents();

async function loadStudents() {
    const response = await fetch(url);
    const students = await response.json();

    resultsTableTbodyElement.innerHTML = '';

    Object.values(students).forEach(student => {
        const trElement = document.createElement('tr');
        resultsTableTbodyElement.appendChild(trElement);

        const firstNameTdElement = document.createElement('td');
        firstNameTdElement.textContent = student.firstName;
        trElement.appendChild(firstNameTdElement);

        const lastNameTdElement = document.createElement('td');
        lastNameTdElement.textContent = student.lastName;
        trElement.appendChild(lastNameTdElement);

        const facultyNumberTdElement = document.createElement('td');
        facultyNumberTdElement.textContent = student.facultyNumber;
        trElement.appendChild(facultyNumberTdElement);

        const gradeTdElement = document.createElement('td');
        gradeTdElement.textContent = student.grade;
        trElement.appendChild(gradeTdElement);
    })
}

async function createStudent(e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    await fetch(url, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            facultyNumber: formData.get('facultyNumber'),
            grade: Number(formData.get('grade'))
        })
    });

    e.target.reset();

    loadStudents();
}