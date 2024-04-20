class Contact {
    #online;

    constructor(firstName, lastName, phone, email) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.phone = phone;
        this.email = email;
        this.online = false;
    }

    get online() {
        return this.#online;
    }

    set online(value) {
        this.#online = value;


    }

    render(id) {
        const showContactInfo = (e) => {
            
        };

        this.parentElementId = document.getElementById(id);

        this.contactArticleElement = document.createElement('article');

        this.contactTitleDivElement = document.createElement('div');
        this.contactTitleDivElement.classList.add('title');
        this.contactTitleDivElement.textContent = `${this.firstName} ${this.lastName}`;

        this.contactInfoButtonElement = document.createElement('button');
        this.contactInfoButtonElement.textContent = '&#8505;';
        this.contactInfoButtonElement.addEventListener('click', )
    }
}

let contacts = [
    new Contact("Ivan", "Ivanov", "0888 123 456", "i.ivanov@gmail.com"),
    new Contact("Maria", "Petrova", "0899 987 654", "mar4eto@abv.bg"),
    new Contact("Jordan", "Kirov", "0988 456 789", "jordk@gmail.com")
];
contacts.forEach(c => c.render('main'));

// After 1 second, change the online status to true
setTimeout(() => contacts[1].online = true, 2000);