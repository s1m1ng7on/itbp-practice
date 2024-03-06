const url = 'http://localhost:3030/jsonstore/collections/students';

const resultsTableTbodyElement = document.querySelector('#results tbody');
const newStudentFormElement = document.querySelector('#form');

newStudentFormElement.addEventListener('submit', createStudent);

loadStudents();

async function loadStudents() {
    resultsTableTbodyElement.innerHTML = '';

    const response = await fetch(url);
    const students = await response.json();

    Object.values(students).forEach(student => {
        console.log(student);

        const resultsTableStudentTrElement = document.createElement('tr');
    })
}

async function createStudent(e) {
    e.preventDefault();

    const formData = new FormData(newStudentFormElement);
    const inputs = [...formData.entries()];

    console.log(inputs);


    /* await fetch(url, {
        method: 'post',
        headers: {
            'Content-type': 'application/json'
        },
        body: {

        }
    }) */

    loadStudents();
}