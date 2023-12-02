const person = {
    firstName: 'Simeon',
    lastName: 'Gunev',
    printFullName() {
        return `${this.firstName} ${this.lastName}`;
    }
}

console.log(person.printFullName());