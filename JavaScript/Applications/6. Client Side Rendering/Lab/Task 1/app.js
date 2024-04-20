import { contacts } from './contacts.js';
import { contactCard } from './contactCard.js';
import { render } from 'https://esm.run/lit-html@1';

const contactsElements = contacts.map(contact => contactCard(contact));
const contactsDivElement = document.querySelector('#contacts');

render(contactsElements, contactsDivElement);